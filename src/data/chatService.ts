import * as SecureStore from 'expo-secure-store';

export interface ChatMessage {
  message: string;
  user: UserContext;
  timestamp: string;
  platform: string;
  app: string;
  sessionId?: string;
  responseLanguage: string; // Idioma en que debe responder el webhook
}

export interface UserContext {
  id?: string;
  name: string;
  age: number;
  currentWeek: number;
  diet: string;
  previousChildren: number;
  hasBoughtSupplements: boolean;
  supplements: any[];
  email?: string;
  language: string;
}

export interface ChatResponse {
  response: string;
  suggestions?: string[];
  error?: string;
  status: 'success' | 'error';
}

class ChatService {
  private baseUrl = 'https://situsupieras.org/n8n/webhook/chat_Inteligencia_Prenatal';
  private sessionId: string;

  constructor() {
    // Generar un ID de sesión único para esta instancia
    this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async getUserContext(): Promise<UserContext> {
    try {
      const userProfileData = await SecureStore.getItemAsync('userProfile');
      if (userProfileData) {
        const profile = JSON.parse(userProfileData);
        return {
          id: profile.id || 'user-unknown',
          name: profile.name || 'Usuario',
          age: profile.age || 25,
          currentWeek: profile.currentWeek || 12,
          diet: profile.diet || 'omnívora',
          previousChildren: profile.previousChildren || 0,
          hasBoughtSupplements: profile.hasBoughtSupplements || false,
          supplements: profile.supplements || [],
          email: profile.email || '',
          language: await this.getCurrentLanguage(),
        };
      }
    } catch (error) {
      console.error('Error loading user context:', error);
    }
    
    // Contexto por defecto si no hay datos
    return {
      id: 'user-default',
      name: 'Usuario',
      age: 25,
      currentWeek: 12,
      diet: 'omnívora',
      previousChildren: 0,
      hasBoughtSupplements: false,
      supplements: [],
      email: '',
      language: await this.getCurrentLanguage(),
    };
  }

  private async getCurrentLanguage(): Promise<string> {
    try {
      // Intentar obtener el idioma desde SecureStore
      const language = await SecureStore.getItemAsync('userLanguage');
      if (language) {
        return language;
      }
      
      // Si no hay idioma guardado, usar el idioma del sistema
      const systemLanguage = await SecureStore.getItemAsync('systemLanguage');
      if (systemLanguage) {
        return systemLanguage;
      }
      
      // Por defecto español
      return 'es';
    } catch (error) {
      console.error('Error getting language:', error);
      return 'es';
    }
  }

  async sendMessage(message: string): Promise<ChatResponse> {
    try {
      const userContext = await this.getUserContext();
      
      const chatMessage: ChatMessage = {
        message: message.trim(),
        user: userContext,
        timestamp: new Date().toISOString(),
        platform: 'mobile',
        app: 'Inteligencia_Prenatal',
        sessionId: this.sessionId,
        responseLanguage: userContext.language,
      };

      console.log('Sending message with context:', chatMessage);

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Inteligencia_Prenatal_Mobile/1.0.0',
        },
        body: JSON.stringify(chatMessage),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Manejar el formato específico del webhook n8n
      let responseText = 'Respuesta recibida';
      let suggestions: string[] = [];
      
      if (Array.isArray(data) && data.length > 0) {
        // Formato: [{"output": "mensaje"}]
        responseText = data[0].output || data[0].message || responseText;
        suggestions = data[0].suggestions || [];
      } else if (data.output) {
        // Formato: {"output": "mensaje"}
        responseText = data.output;
        suggestions = data.suggestions || [];
      } else if (data.response) {
        // Formato: {"response": "mensaje"}
        responseText = data.response;
        suggestions = data.suggestions || [];
      } else if (data.message) {
        // Formato: {"message": "mensaje"}
        responseText = data.message;
        suggestions = data.suggestions || [];
      }
      
      return {
        response: responseText,
        suggestions: suggestions,
        status: 'success',
      };

    } catch (error) {
      console.error('ChatService error:', error);
      console.log('Request details:', {
        url: this.baseUrl,
        message: message,
        timestamp: new Date().toISOString(),
      });
      
      return {
        response: 'Lo siento, no pude procesar tu mensaje. Por favor, intenta de nuevo.',
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Método para enviar mensaje de prueba
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.sendMessage('Hola, ¿estás funcionando?');
      console.log('Test connection response:', response);
      return response.status === 'success';
    } catch (error) {
      console.error('Test connection failed:', error);
      return false;
    }
  }

  // Método para debuggear la respuesta del webhook
  async debugResponse(message: string): Promise<any> {
    try {
      const userContext = await this.getUserContext();
      
      const chatMessage: ChatMessage = {
        message: message.trim(),
        user: userContext,
        timestamp: new Date().toISOString(),
        platform: 'mobile',
        app: 'Inteligencia_Prenatal',
        sessionId: this.sessionId,
        responseLanguage: userContext.language,
      };

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Inteligencia_Prenatal_Mobile/1.0.0',
        },
        body: JSON.stringify(chatMessage),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Raw webhook response:', data);
      return data;

    } catch (error) {
      console.error('Debug response error:', error);
      return null;
    }
  }

  // Método para obtener sugerencias de preguntas comunes
  getQuickQuestions() {
    return [
      '¿Qué alimentos debo evitar durante el embarazo?',
      '¿Puedo hacer ejercicio en el primer trimestre?',
      '¿Es normal sentir náuseas todo el día?',
      '¿Qué vitaminas necesito tomar?',
      '¿Cuándo debo ir al médico?',
      '¿Puedo tomar café durante el embarazo?',
      '¿Qué ejercicios son seguros?',
      '¿Cómo puedo aliviar el dolor de espalda?',
    ];
  }

  // Método para obtener el ID de sesión
  getSessionId(): string {
    return this.sessionId;
  }

  // Método para reiniciar la sesión
  resetSession(): void {
    this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Exportar una instancia singleton
export const chatService = new ChatService();
export default chatService; 