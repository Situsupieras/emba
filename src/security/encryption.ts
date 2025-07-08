import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export interface EncryptedData {
  iv: string;
  data: string;
  tag: string;
}

export class SecurityManager {
  private static instance: SecurityManager;
  private encryptionKey: string | null = null;

  static getInstance(): SecurityManager {
    if (!SecurityManager.instance) {
      SecurityManager.instance = new SecurityManager();
    }
    return SecurityManager.instance;
  }

  async initialize(): Promise<void> {
    try {
      // Generar o recuperar clave de encriptación
      this.encryptionKey = await this.getOrCreateEncryptionKey();
    } catch (error) {
      console.error('Error initializing security manager:', error);
      throw new Error('Failed to initialize security');
    }
  }

  private async getOrCreateEncryptionKey(): Promise<string> {
    const keyName = 'app_encryption_key';
    let key = await SecureStore.getItemAsync(keyName);
    
    if (!key) {
      // Generar nueva clave AES-256
      const randomBytes = await Crypto.getRandomBytesAsync(32);
      key = Array.from(randomBytes, byte => byte.toString(16).padStart(2, '0')).join('');
      await SecureStore.setItemAsync(keyName, key);
    }
    
    return key;
  }

  async encrypt(data: string): Promise<EncryptedData> {
    if (!this.encryptionKey) {
      throw new Error('Security manager not initialized');
    }

    try {
      // Generar IV aleatorio
      const iv = await Crypto.getRandomBytesAsync(16);
      const ivHex = Array.from(iv, byte => byte.toString(16).padStart(2, '0')).join('');

      // Encriptar datos usando AES-256-GCM
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data);
      const keyBuffer = encoder.encode(this.encryptionKey);

      // Simular encriptación AES-256-GCM (en producción usar librería nativa)
      const encryptedData = await this.simulateAESEncryption(dataBuffer, keyBuffer, iv);
      
      return {
        iv: ivHex,
        data: encryptedData,
        tag: 'gcm_tag' // En producción sería el tag real de GCM
      };
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Failed to encrypt data');
    }
  }

  async decrypt(encryptedData: EncryptedData): Promise<string> {
    if (!this.encryptionKey) {
      throw new Error('Security manager not initialized');
    }

    try {
      // Desencriptar datos
      const encoder = new TextEncoder();
      const keyBuffer = encoder.encode(this.encryptionKey);
      const ivBuffer = new Uint8Array(encryptedData.iv.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
      
      const decryptedData = await this.simulateAESDecryption(encryptedData.data, keyBuffer, ivBuffer);
      
      const decoder = new TextDecoder();
      return decoder.decode(decryptedData);
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt data');
    }
  }

  private async simulateAESEncryption(data: Uint8Array, key: Uint8Array, iv: Uint8Array): Promise<string> {
    // En producción, usar librería nativa como react-native-crypto-js o expo-crypto
    // Esta es una simulación para demostración
    const encrypted = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      Array.from(data, byte => String.fromCharCode(byte)).join('') + Array.from(key, byte => String.fromCharCode(byte)).join('') + Array.from(iv, byte => String.fromCharCode(byte)).join('')
    );
    return encrypted;
  }

  private async simulateAESDecryption(encryptedData: string, key: Uint8Array, iv: Uint8Array): Promise<Uint8Array> {
    // En producción, implementar desencriptación real
    // Esta es una simulación para demostración
    return new Uint8Array(encryptedData.length);
  }

  async secureStore(key: string, value: string): Promise<void> {
    const encrypted = await this.encrypt(value);
    const encryptedString = JSON.stringify(encrypted);
    await SecureStore.setItemAsync(key, encryptedString);
  }

  async secureRetrieve(key: string): Promise<string | null> {
    const encryptedString = await SecureStore.getItemAsync(key);
    if (!encryptedString) return null;

    const encrypted: EncryptedData = JSON.parse(encryptedString);
    return await this.decrypt(encrypted);
  }

  async secureDelete(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  }

  // Método para borrado seguro de datos sensibles
  async secureWipe(): Promise<void> {
    const keysToWipe = [
      'userProfile',
      'medicalFeedback',
      'medicalRecommendations',
      'semanas',
      'lastMenstruationDate'
    ];

    for (const key of keysToWipe) {
      await this.secureDelete(key);
    }
  }
}

export const securityManager = SecurityManager.getInstance(); 