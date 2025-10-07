import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import { Platform } from 'react-native';
import { securityManager } from './encryption';

// Importación condicional para evitar errores en Web
let LocalAuthentication: any = null;
if (Platform.OS !== 'web') {
  try {
    LocalAuthentication = require('expo-local-authentication');
  } catch (error) {
    console.warn('expo-local-authentication not available:', error);
  }
}

export interface AuthSession {
  userId: string;
  sessionId: string;
  createdAt: Date;
  expiresAt: Date;
  deviceId: string;
  biometricVerified: boolean;
  twoFactorVerified: boolean;
}

export interface BiometricConfig {
  enabled: boolean;
  type: 'fingerprint' | 'face' | 'iris';
  fallbackEnabled: boolean;
}

export class AuthenticationManager {
  private static instance: AuthenticationManager;
  private currentSession: AuthSession | null = null;
  private biometricConfig: BiometricConfig | null = null;

  static getInstance(): AuthenticationManager {
    if (!AuthenticationManager.instance) {
      AuthenticationManager.instance = new AuthenticationManager();
    }
    return AuthenticationManager.instance;
  }

  async initialize(): Promise<void> {
    try {
      // Solo inicializar autenticación biométrica en plataformas nativas
      if (Platform.OS === 'web' || !LocalAuthentication) {
        this.biometricConfig = {
          enabled: false,
          type: 'fingerprint',
          fallbackEnabled: true
        };
        return;
      }

      // Verificar disponibilidad de autenticación biométrica
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      
      if (hasHardware && isEnrolled) {
        this.biometricConfig = {
          enabled: true,
          type: await this.getBiometricType(),
          fallbackEnabled: true
        };
      } else {
        this.biometricConfig = {
          enabled: false,
          type: 'fingerprint',
          fallbackEnabled: true
        };
      }
    } catch (error) {
      console.error('Error initializing authentication:', error);
      this.biometricConfig = {
        enabled: false,
        type: 'fingerprint',
        fallbackEnabled: true
      };
    }
  }

  private async getBiometricType(): Promise<'fingerprint' | 'face' | 'iris'> {
    if (Platform.OS === 'web' || !LocalAuthentication) {
      return 'fingerprint'; // Default para Web
    }

    const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
    
    if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
      return 'face';
    } else if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
      return 'fingerprint';
    } else {
      return 'fingerprint'; // Default fallback
    }
  }

  async authenticateWithBiometrics(): Promise<boolean> {
    if (Platform.OS === 'web' || !LocalAuthentication || !this.biometricConfig?.enabled) {
      return false;
    }

    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autenticación biométrica requerida',
        fallbackLabel: 'Usar PIN',
        cancelLabel: 'Cancelar',
        disableDeviceFallback: !this.biometricConfig.fallbackEnabled,
      });

      return result.success;
    } catch (error) {
      console.error('Biometric authentication error:', error);
      return false;
    }
  }

  async generateTwoFactorCode(): Promise<string> {
    // Generar código TOTP de 6 dígitos
    const timestamp = Math.floor(Date.now() / 30000); // 30 segundos window
    const secret = await this.getTwoFactorSecret();
    
    // Implementar algoritmo TOTP (RFC 6238)
    const code = this.generateTOTP(secret, timestamp);
    return code.toString().padStart(6, '0');
  }

  private async getTwoFactorSecret(): Promise<string> {
    let secret = await SecureStore.getItemAsync('2fa_secret');
    if (!secret) {
      // Generar nuevo secreto usando expo-crypto
      const randomBytes = await Crypto.getRandomBytesAsync(20);
      secret = this.bytesToBase32(randomBytes);
      await SecureStore.setItemAsync('2fa_secret', secret);
    }
    return secret;
  }

  private bytesToBase32(bytes: Uint8Array): string {
    const base32chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let bits = '';
    let result = '';
    
    for (let i = 0; i < bytes.length; i++) {
      bits += bytes[i].toString(2).padStart(8, '0');
    }
    
    for (let i = 0; i < bits.length; i += 5) {
      const chunk = bits.substr(i, 5).padEnd(5, '0');
      result += base32chars[parseInt(chunk, 2)];
    }
    
    return result;
  }

  private async generateTOTP(secret: string, timestamp: number): Promise<number> {
    // Implementación simplificada de TOTP usando expo-crypto
    const message = timestamp.toString();
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA1,
      secret + message
    );
    
    // Convertir hash a número
    const offset = parseInt(hash.slice(-1), 16);
    const code = parseInt(hash.slice(offset, offset + 6), 16) % 1000000;
    return code;
  }

  async verifyTwoFactorCode(code: string): Promise<boolean> {
    const expectedCode = await this.generateTwoFactorCode();
    return code === expectedCode;
  }

  async createSession(userId: string): Promise<AuthSession> {
    const sessionId = await this.generateSessionId();
    const deviceId = await this.getDeviceId();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 horas

    const session: AuthSession = {
      userId,
      sessionId,
      createdAt: now,
      expiresAt,
      deviceId,
      biometricVerified: false,
      twoFactorVerified: false
    };

    // Encriptar y almacenar sesión
    await securityManager.secureStore(`session_${sessionId}`, JSON.stringify(session));
    this.currentSession = session;

    return session;
  }

  async validateSession(sessionId: string): Promise<AuthSession | null> {
    try {
      const sessionData = await securityManager.secureRetrieve(`session_${sessionId}`);
      if (!sessionData) return null;

      const session: AuthSession = JSON.parse(sessionData);
      
      // Verificar expiración
      if (new Date() > new Date(session.expiresAt)) {
        await this.destroySession(sessionId);
        return null;
      }

      this.currentSession = session;
      return session;
    } catch (error) {
      console.error('Session validation error:', error);
      return null;
    }
  }

  async destroySession(sessionId: string): Promise<void> {
    await securityManager.secureDelete(`session_${sessionId}`);
    if (this.currentSession?.sessionId === sessionId) {
      this.currentSession = null;
    }
  }

  async destroyAllSessions(userId: string): Promise<void> {
    // En producción, mantener registro de sesiones activas
    // Por ahora, limpiar todas las sesiones del usuario
    const sessionKeys = await this.getAllSessionKeys();
    for (const key of sessionKeys) {
      const sessionData = await securityManager.secureRetrieve(key);
      if (sessionData) {
        const session: AuthSession = JSON.parse(sessionData);
        if (session.userId === userId) {
          await securityManager.secureDelete(key);
        }
      }
    }
  }

  private async generateSessionId(): Promise<string> {
    const randomBytes = await Crypto.getRandomBytesAsync(32);
    return Array.from(randomBytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  private async getDeviceId(): Promise<string> {
    let deviceId = await SecureStore.getItemAsync('device_id');
    if (!deviceId) {
      const randomBytes = await Crypto.getRandomBytesAsync(16);
      deviceId = Array.from(randomBytes)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      await SecureStore.setItemAsync('device_id', deviceId);
    }
    return deviceId;
  }

  private async getAllSessionKeys(): Promise<string[]> {
    // En producción, mantener registro de sesiones activas
    // Por ahora, retornar array vacío
    return [];
  }

  getCurrentSession(): AuthSession | null {
    return this.currentSession;
  }

  getBiometricConfig(): BiometricConfig | null {
    return this.biometricConfig;
  }

  // Método para logout completo y seguro
  async logout(): Promise<void> {
    if (this.currentSession) {
      await this.destroySession(this.currentSession.sessionId);
    }
    this.currentSession = null;
  }
}

export const authManager = AuthenticationManager.getInstance();