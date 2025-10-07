// scripts/generate-i18n-structure.js
const fs = require('fs');
const path = require('path');

const translations = {
  es: {
    common: {
      welcome: '¡Bienvenida',
      home: 'Inteligencia Prenatal',
      supplements: 'Suplementos',
      guide: 'Guía Trimestral',
      community: 'Comunidad',
      store: 'Tienda',
      chat: 'Chat',
      profile: 'Perfil',
      login: 'Iniciar sesión',
      register: 'Crear cuenta',
      email: 'Correo electrónico',
      password: 'Contraseña',
      forgotPassword: '¿Olvidaste tu contraseña?',
      logout: 'Cerrar sesión',
      send: 'Enviar',
      week: 'Semana',
      trimester: 'Trimestre',
      trimesterShort: 'er Trimestre',
      weekOf: 'Semana {{week}} de 40',
      development: 'Desarrollo del bebé',
      milestones: 'Hitos importantes',
      tips: 'Consejos para esta semana',
      babySizeThisWeek: 'Tamaño del bebé esta semana',
      approxWeight: 'Peso aproximado',
      quickActions: 'Acciones rápidas',
      nextAppointment: 'Próxima cita',
      loadingRealInfo: 'Cargando información...',
      loading: 'Cargando información...',
      noPosts: 'No hay publicaciones',
      beFirst: 'Sé la primera en iniciar una conversación en esta categoría',
      createPost: 'Crear publicación',
      close: 'Cerrar',
      publish: 'Publicar',
      yes: 'Sí',
      no: 'No',
      years: 'años',
      language: 'Idioma',
      verified: 'Verificado',
      expert: 'Experto',
      priority: 'Prioritario',
      allergy: 'Alergia',
      dietary: 'Dieta',
      certification: 'Certificación',
      nutrition: 'Nutrición',
      exercise: 'Ejercicio',
      health: 'Salud',
      emotions: 'Emociones',
      babyDevelopment: 'Desarrollo del bebé',
      general: 'General',
      omnivorous: 'Omnívora',
      vegetarian: 'Vegetariana',
      vegan: 'Vegana',
    },
    profile: {
      profileTitle: 'Perfil',
      editProfile: 'Editar perfil',
      save: 'Guardar',
      cancel: 'Cancelar',
      pregnancyInfo: 'Información del Embarazo',
      age: 'Edad',
      currentPregnancyWeek: 'Semana actual de embarazo',
      previousChildren: 'Hijos previos',
      dietType: 'Tipo de dieta',
      hasBoughtSupplements: 'Ha comprado suplementos',
      hasNotBoughtSupplements: 'No ha comprado suplementos',
      emailVerification: 'Verificación de Email',
      emailVerified: 'Email verificado',
      emailNotVerified: 'Email no verificado',
      resendVerification: 'Reenviar verificación',
      verificationSent: 'Correo de verificación enviado. Revisa tu bandeja de entrada.',
      profileUpdated: 'Perfil actualizado correctamente.',
      errorSavingProfile: 'Error al guardar el perfil.',
      noAuthenticatedUser: 'No hay usuario autenticado.',
      loadingProfile: 'Cargando perfil...',
      errorLogout: 'Error al cerrar sesión.',
    },
    chat: {
      chatTitle: 'Asistente IA',
      chatSubtitle: 'Tu compañero de embarazo inteligente',
      chatWelcome: '¡Hola! Soy tu asistente de embarazo. Puedo ayudarte con preguntas sobre nutrición, ejercicio, síntomas, medicamentos y citas médicas. ¿En qué puedo ayudarte hoy?',
      chatPlaceholder: 'Escribe tu pregunta...',
      chatTyping: 'Escribiendo...',
      chatError: 'Lo siento, no pude procesar tu mensaje. Por favor, intenta de nuevo.',
      chatErrorTitle: 'Error de conexión',
      chatErrorMessage: 'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
      chatQuickQuestions: 'Preguntas rápidas',
      chatSuggestions: 'Aquí tienes algunas sugerencias para continuar la conversación:',
      chatQuestionNutrition: '¿Qué debo comer?',
      chatQuestionExercise: '¿Puedo hacer ejercicio?',
      chatQuestionSymptoms: '¿Es normal este síntoma?',
      chatQuestionMedication: '¿Qué medicamentos puedo tomar?',
      chatQuestionAppointments: '¿Cuándo es mi próxima cita?',
      medicalFeedbackTitle: 'Retroalimentación Médica',
      doctorName: 'Nombre del médico',
      recommendations: 'Recomendaciones del médico',
      concerns: 'Preocupaciones o síntomas',
      nextAppointmentMedical: 'Próxima cita médica',
      notes: 'Notas adicionales',
      supplementsPrescribed: 'Suplementos recetados',
      testsOrdered: 'Exámenes ordenados',
      weight: 'Peso (kg)',
      bloodPressure: 'Presión arterial',
      babyHeartbeat: 'Latidos del bebé (bpm)',
      ultrasoundNotes: 'Notas de ecografía',
      saveFeedback: 'Guardar retroalimentación',
      feedbackSaved: 'Retroalimentación médica guardada correctamente.',
      errorSavingFeedback: 'Error al guardar la retroalimentación.',
      requiredFields: 'Por favor completa todos los campos requeridos.',
      invalidWeight: 'Peso inválido',
      invalidHeartbeat: 'Latidos del bebé inválidos',
    },
    supplements: {
      buyNow: 'Comprar ahora',
      seeDetails: 'Ver detalles',
      important: 'Importante',
      disclaimer: 'Siempre consulta con tu médico antes de tomar cualquier suplemento. Esta información es educativa y no reemplaza el consejo médico profesional.',
    },
    fetalDevelopment: {
      week1: {
        size: "Microscópico",
        weight: "<0.1g",
        description: "Preparación del cuerpo para la ovulación. El endometrio se engrosa para recibir un posible embrión.",
        milestones: [
          "Preparación endometrial",
          "Desarrollo folicular",
          "Cambios hormonales"
        ],
        tips: [
          "Inicia suplementos de ácido fólico",
          "Mantén hábitos saludables",
          "Consulta preconcepcional"
        ]
      },
      week2: {
        size: "Microscópico",
        weight: "<0.1g",
        description: "Ovulación y posible fecundación. El óvulo es liberado y puede ser fecundado en las trompas de Falopio.",
        milestones: [
          "Ovulación",
          "Posible fecundación",
          "Viaje del óvulo"
        ],
        tips: [
          "Continúa con ácido fólico",
          "Evita toxinas ambientales",
          "Mantén vida saludable"
        ]
      }
      // ... continuar con las 40 semanas
    }
  },
  en: {
    common: {
      welcome: 'Welcome',
      home: 'Prenatal Intelligence',
      supplements: 'Supplements',
      guide: 'Trimester Guide',
      community: 'Community',
      store: 'Store',
      chat: 'Chat',
      profile: 'Profile',
      login: 'Login',
      register: 'Create account',
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot your password?',
      logout: 'Logout',
      send: 'Send',
      week: 'Week',
      trimester: 'Trimester',
      trimesterShort: 'rd Trimester',
      weekOf: 'Week {{week}} of 40',
      development: 'Baby development',
      milestones: 'Important milestones',
      tips: 'Tips for this week',
      babySizeThisWeek: 'Baby size this week',
      approxWeight: 'Approximate weight',
      quickActions: 'Quick actions',
      nextAppointment: 'Next appointment',
      loadingRealInfo: 'Loading information...',
      loading: 'Loading information...',
      noPosts: 'No posts yet',
      beFirst: 'Be the first to start a conversation in this category',
      createPost: 'Create post',
      close: 'Close',
      publish: 'Publish',
      yes: 'Yes',
      no: 'No',
      years: 'years',
      language: 'Language',
      verified: 'Verified',
      expert: 'Expert',
      priority: 'Priority',
      allergy: 'Allergy',
      dietary: 'Dietary',
      certification: 'Certification',
      nutrition: 'Nutrition',
      exercise: 'Exercise',
      health: 'Health',
      emotions: 'Emotions',
      babyDevelopment: 'Baby development',
      general: 'General',
      omnivorous: 'Omnivorous',
      vegetarian: 'Vegetarian',
      vegan: 'Vegan',
    },
    profile: {
      profileTitle: 'Profile',
      editProfile: 'Edit profile',
      save: 'Save',
      cancel: 'Cancel',
      pregnancyInfo: 'Pregnancy Information',
      age: 'Age',
      currentPregnancyWeek: 'Current pregnancy week',
      previousChildren: 'Previous children',
      dietType: 'Diet type',
      hasBoughtSupplements: 'Has bought supplements',
      hasNotBoughtSupplements: 'Has not bought supplements',
      emailVerification: 'Email Verification',
      emailVerified: 'Email verified',
      emailNotVerified: 'Email not verified',
      resendVerification: 'Resend verification',
      verificationSent: 'Verification email sent. Check your inbox.',
      profileUpdated: 'Profile updated successfully.',
      errorSavingProfile: 'Error saving profile.',
      noAuthenticatedUser: 'No authenticated user.',
      loadingProfile: 'Loading profile...',
      errorLogout: 'Error logging out.',
    },
    chat: {
      chatTitle: 'AI Assistant',
      chatSubtitle: 'Your smart pregnancy companion',
      chatWelcome: 'Hello! I\'m your pregnancy assistant. I can help you with questions about nutrition, exercise, symptoms, medications and medical appointments. How can I help you today?',
      chatPlaceholder: 'Write your question...',
      chatTyping: 'Typing...',
      chatError: 'Sorry, I couldn\'t process your message. Please try again.',
      chatErrorTitle: 'Connection error',
      chatErrorMessage: 'Could not connect to server. Check your internet connection.',
      chatQuickQuestions: 'Quick questions',
      chatSuggestions: 'Here are some suggestions to continue the conversation:',
      chatQuestionNutrition: 'What should I eat?',
      chatQuestionExercise: 'Can I exercise?',
      chatQuestionSymptoms: 'Is this symptom normal?',
      chatQuestionMedication: 'What medications can I take?',
      chatQuestionAppointments: 'When is my next appointment?',
      medicalFeedbackTitle: 'Medical Feedback',
      doctorName: 'Doctor name',
      recommendations: 'Doctor recommendations',
      concerns: 'Concerns or symptoms',
      nextAppointmentMedical: 'Next medical appointment',
      notes: 'Additional notes',
      supplementsPrescribed: 'Prescribed supplements',
      testsOrdered: 'Tests ordered',
      weight: 'Weight (kg)',
      bloodPressure: 'Blood pressure',
      babyHeartbeat: 'Baby heartbeat (bpm)',
      ultrasoundNotes: 'Ultrasound notes',
      saveFeedback: 'Save feedback',
      feedbackSaved: 'Medical feedback saved successfully.',
      errorSavingFeedback: 'Error saving medical feedback.',
      requiredFields: 'Please complete all required fields.',
      invalidWeight: 'Invalid weight',
      invalidHeartbeat: 'Invalid baby heartbeat',
    },
    supplements: {
      buyNow: 'Buy now',
      seeDetails: 'See details',
      important: 'Important',
      disclaimer: 'Always consult your doctor before taking any supplement. This information is educational and does not replace professional medical advice.',
    },
    fetalDevelopment: {
      week1: {
        size: "Microscopic",
        weight: "<0.1g",
        description: "Body preparation for ovulation. The endometrium thickens to receive a possible embryo.",
        milestones: [
          "Endometrial preparation",
          "Follicular development",
          "Hormonal changes"
        ],
        tips: [
          "Start folic acid supplements",
          "Maintain healthy habits",
          "Preconception consultation"
        ]
      },
      week2: {
        size: "Microscopic",
        weight: "<0.1g",
        description: "Ovulation and possible fertilization. The egg is released and can be fertilized in the fallopian tubes.",
        milestones: [
          "Ovulation",
          "Possible fertilization",
          "Egg journey"
        ],
        tips: [
          "Continue with folic acid",
          "Avoid environmental toxins",
          "Maintain healthy lifestyle"
        ]
      }
      // ... continue with all 40 weeks
    }
  }
};

function createDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function createFile(filePath, content) {
  fs.writeFileSync(filePath, content);
  console.log(`Created: ${filePath}`);
}

function generateModuleFile(language, moduleName, data) {
  const content = `export default ${JSON.stringify(data, null, 2)};\n`;
  const filePath = path.join(__dirname, '..', 'src', 'locales', language, `${moduleName}.ts`);
  createFile(filePath, content);
}

function generateLanguageIndex(language, modules) {
  const imports = modules.map(module => `import ${module} from './${module}';`).join('\n');
  const exports = `export default {\n  ${modules.join(',\n  ')}\n};\n`;
  const content = `${imports}\n\n${exports}`;
  const filePath = path.join(__dirname, '..', 'src', 'locales', language, 'index.ts');
  createFile(filePath, content);
}

function generateMainIndex(languages) {
  const imports = languages.map(lang => `import ${lang} from './${lang}';`).join('\n');
  const exports = `export default {\n  ${languages.join(',\n  ')}\n};\n`;
  const content = `${imports}\n\n${exports}`;
  const filePath = path.join(__dirname, '..', 'src', 'locales', 'index.ts');
  createFile(filePath, content);
}

function generateI18nConfig() {
  const content = `import * as Localization from 'expo-localization';
import * as SecureStore from 'expo-secure-store';
import I18n from 'i18n-js';
import translations from '../locales';

// Configurar i18n
I18n.translations = translations;
I18n.fallbacks = true;
I18n.defaultLocale = 'es';

// Inicializar idioma desde almacenamiento
const initializeLanguage = async () => {
  try {
    const savedLanguage = await SecureStore.getItemAsync('language');
    if (savedLanguage) {
      I18n.locale = savedLanguage;
    } else {
      const locale = Localization.getLocales()[0]?.languageCode;
      if (locale && typeof locale === 'string' && locale.startsWith('es')) {
		I18n.locale = 'es';
		} else {
		I18n.locale = 'en';
	}
    }
  } catch (error) {
    console.log('Error loading language:', error);
  }
};

initializeLanguage();

export const t = (key: string, config?: any) => I18n.t(key, config);
export const setLanguage = (locale: string) => {
  I18n.locale = locale;
  SecureStore.setItemAsync('language', locale);
};
export const getCurrentLanguage = () => I18n.locale;
`;

  const filePath = path.join(__dirname, '..', 'src', 'data', 'i18n.ts');
  createFile(filePath, content);
}

// Generar estructura
console.log('Generando estructura de i18n...');

// Crear directorios
const baseLocalesPath = path.join(__dirname, '..', 'src', 'locales');
createDirectory(baseLocalesPath);
createDirectory(path.join(baseLocalesPath, 'es'));
createDirectory(path.join(baseLocalesPath, 'en'));
createDirectory(path.join(__dirname, '..', 'src', 'data'));

// Generar archivos para cada idioma y módulo
Object.keys(translations).forEach(language => {
  const languageData = translations[language];
  Object.keys(languageData).forEach(module => {
    generateModuleFile(language, module, languageData[module]);
  });
  
  // Generar index.ts para cada idioma
  generateLanguageIndex(language, Object.keys(languageData));
});

// Generar index.ts principal
generateMainIndex(Object.keys(translations));

// Generar configuración i18n
generateI18nConfig();

console.log('¡Estructura de i18n generada exitosamente!');