import * as SecureStore from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';
import { securityManager } from './encryption';
import { auditManager } from './audit';

export interface BackupMetadata {
  id: string;
  timestamp: Date;
  version: string;
  size: number;
  checksum: string;
  encrypted: boolean;
  compression: boolean;
  dataTypes: string[];
  status: BackupStatus;
  errorMessage?: string;
}

export interface BackupConfig {
  enabled: boolean;
  frequency: 'daily' | 'weekly' | 'monthly';
  retentionDays: number;
  encryption: boolean;
  compression: boolean;
  includeAuditLogs: boolean;
  includeUserData: boolean;
  includeSettings: boolean;
}

export enum BackupStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  VERIFIED = 'verified'
}

export class BackupManager {
  private static instance: BackupManager;
  private config: BackupConfig;
  private backups: BackupMetadata[] = [];
  private isBackupInProgress = false;

  static getInstance(): BackupManager {
    if (!BackupManager.instance) {
      BackupManager.instance = new BackupManager();
    }
    return BackupManager.instance;
  }

  async initialize(): Promise<void> {
    await this.loadConfig();
    await this.loadBackupHistory();
    this.scheduleBackups();
  }

  private async loadConfig(): Promise<void> {
    const configData = await SecureStore.getItemAsync('backup_config');
    if (configData) {
      this.config = JSON.parse(configData);
    } else {
      this.config = {
        enabled: true,
        frequency: 'daily',
        retentionDays: 30,
        encryption: true,
        compression: true,
        includeAuditLogs: true,
        includeUserData: true,
        includeSettings: true
      };
      await SecureStore.setItemAsync('backup_config', JSON.stringify(this.config));
    }
  }

  private async loadBackupHistory(): Promise<void> {
    const historyData = await SecureStore.getItemAsync('backup_history');
    if (historyData) {
      this.backups = JSON.parse(historyData);
    }
  }

  private async saveBackupHistory(): Promise<void> {
    await SecureStore.setItemAsync('backup_history', JSON.stringify(this.backups));
  }

  private scheduleBackups(): void {
    if (!this.config.enabled) return;

    const interval = this.getBackupInterval();
    setInterval(() => {
      this.performBackup();
    }, interval);
  }

  private getBackupInterval(): number {
    switch (this.config.frequency) {
      case 'daily':
        return 24 * 60 * 60 * 1000; // 24 horas
      case 'weekly':
        return 7 * 24 * 60 * 60 * 1000; // 7 días
      case 'monthly':
        return 30 * 24 * 60 * 60 * 1000; // 30 días
      default:
        return 24 * 60 * 60 * 1000;
    }
  }

  async performBackup(): Promise<BackupMetadata> {
    if (this.isBackupInProgress) {
      throw new Error('Backup already in progress');
    }

    this.isBackupInProgress = true;
    const backupId = await this.generateBackupId();
    
    const metadata: BackupMetadata = {
      id: backupId,
      timestamp: new Date(),
      version: '1.0',
      size: 0,
      checksum: '',
      encrypted: this.config.encryption,
      compression: this.config.compression,
      dataTypes: [],
      status: BackupStatus.IN_PROGRESS
    };

    try {
      // Recopilar datos para backup
      const backupData = await this.collectBackupData();
      metadata.dataTypes = Object.keys(backupData);
      
      // Comprimir datos si está habilitado
      let processedData = backupData;
      if (this.config.compression) {
        processedData = await this.compressData(backupData);
      }
      
      // Encriptar datos si está habilitado
      if (this.config.encryption) {
        processedData = await this.encryptBackupData(processedData);
      }
      
      // Calcular checksum
      metadata.checksum = await this.calculateChecksum(processedData);
      
      // Guardar backup
      await this.saveBackup(backupId, processedData);
      
      // Actualizar metadata
      metadata.size = JSON.stringify(processedData).length;
      metadata.status = BackupStatus.COMPLETED;
      
      // Verificar integridad
      const integrityCheck = await this.verifyBackupIntegrity(backupId, metadata.checksum);
      if (integrityCheck) {
        metadata.status = BackupStatus.VERIFIED;
      }
      
      // Registrar en auditoría
      await auditManager.logEvent({
        userId: 'system',
        sessionId: 'system',
        eventType: 'backup',
        resource: 'backup',
        action: 'backup_created',
        details: {
          backupId,
          size: metadata.size,
          dataTypes: metadata.dataTypes
        },
        success: true
      });
      
    } catch (error) {
      metadata.status = BackupStatus.FAILED;
      metadata.errorMessage = error.message;
      
      // Registrar error en auditoría
      await auditManager.logEvent({
        userId: 'system',
        sessionId: 'system',
        eventType: 'backup',
        resource: 'backup',
        action: 'backup_failed',
        details: {
          backupId,
          error: error.message
        },
        success: false
      });
    } finally {
      this.isBackupInProgress = false;
    }
    
    // Guardar metadata
    this.backups.push(metadata);
    await this.saveBackupHistory();
    
    // Limpiar backups antiguos
    await this.cleanupOldBackups();
    
    return metadata;
  }

  private async collectBackupData(): Promise<Record<string, any>> {
    const backupData: Record<string, any> = {};
    
    if (this.config.includeUserData) {
      // Backup de datos de usuario
      const userKeys = [
        'userProfile',
        'medicalFeedback',
        'medicalRecommendations',
        'semanas',
        'lastMenstruationDate'
      ];
      
      for (const key of userKeys) {
        const data = await SecureStore.getItemAsync(key);
        if (data) {
          backupData[key] = data;
        }
      }
    }
    
    if (this.config.includeSettings) {
      // Backup de configuración
      const settingsKeys = [
        'userLanguage',
        'backup_config',
        'app_settings'
      ];
      
      for (const key of settingsKeys) {
        const data = await SecureStore.getItemAsync(key);
        if (data) {
          backupData[key] = data;
        }
      }
    }
    
    if (this.config.includeAuditLogs) {
      // Backup de logs de auditoría (últimos 7 días)
      const auditEvents = await auditManager.getAuditEvents({
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      });
      backupData.auditLogs = auditEvents;
    }
    
    return backupData;
  }

  private async compressData(data: Record<string, any>): Promise<Record<string, any>> {
    // En producción, usar librería de compresión como zlib
    // Por ahora, simular compresión
    const compressed = {
      compressed: true,
      originalSize: JSON.stringify(data).length,
      data: JSON.stringify(data)
    };
    
    return compressed;
  }

  private async encryptBackupData(data: Record<string, any>): Promise<Record<string, any>> {
    const dataString = JSON.stringify(data);
    const encrypted = await securityManager.encrypt(dataString);
    
    return {
      encrypted: true,
      algorithm: 'AES-256-GCM',
      iv: encrypted.iv,
      data: encrypted.data,
      tag: encrypted.tag
    };
  }

  private async calculateChecksum(data: Record<string, any>): Promise<string> {
    const dataString = JSON.stringify(data);
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(dataString).digest('hex');
  }

  private async saveBackup(backupId: string, data: Record<string, any>): Promise<void> {
    const backupKey = `backup_${backupId}`;
    await securityManager.secureStore(backupKey, JSON.stringify(data));
  }

  private async verifyBackupIntegrity(backupId: string, expectedChecksum: string): Promise<boolean> {
    try {
      const backupKey = `backup_${backupId}`;
      const backupData = await securityManager.secureRetrieve(backupKey);
      
      if (!backupData) return false;
      
      const actualChecksum = await this.calculateChecksum(JSON.parse(backupData));
      return actualChecksum === expectedChecksum;
    } catch (error) {
      console.error('Backup integrity check failed:', error);
      return false;
    }
  }

  async restoreBackup(backupId: string): Promise<void> {
    const backup = this.backups.find(b => b.id === backupId);
    if (!backup) {
      throw new Error('Backup not found');
    }
    
    if (backup.status !== BackupStatus.VERIFIED) {
      throw new Error('Backup not verified, cannot restore');
    }
    
    try {
      // Obtener datos del backup
      const backupKey = `backup_${backupId}`;
      const backupData = await securityManager.secureRetrieve(backupKey);
      
      if (!backupData) {
        throw new Error('Backup data not found');
      }
      
      let data = JSON.parse(backupData);
      
      // Desencriptar si es necesario
      if (data.encrypted) {
        data = await this.decryptBackupData(data);
      }
      
      // Descomprimir si es necesario
      if (data.compressed) {
        data = JSON.parse(data.data);
      }
      
      // Restaurar datos
      await this.restoreData(data);
      
      // Registrar restauración en auditoría
      await auditManager.logEvent({
        userId: 'system',
        sessionId: 'system',
        eventType: 'restore',
        resource: 'backup',
        action: 'backup_restored',
        details: {
          backupId,
          timestamp: backup.timestamp
        },
        success: true
      });
      
    } catch (error) {
      // Registrar error en auditoría
      await auditManager.logEvent({
        userId: 'system',
        sessionId: 'system',
        eventType: 'restore',
        resource: 'backup',
        action: 'backup_restore_failed',
        details: {
          backupId,
          error: error.message
        },
        success: false
      });
      
      throw error;
    }
  }

  private async decryptBackupData(encryptedData: any): Promise<Record<string, any>> {
    const decrypted = await securityManager.decrypt({
      iv: encryptedData.iv,
      data: encryptedData.data,
      tag: encryptedData.tag
    });
    
    return JSON.parse(decrypted);
  }

  private async restoreData(data: Record<string, any>): Promise<void> {
    for (const [key, value] of Object.entries(data)) {
      if (key !== 'auditLogs') { // No restaurar logs de auditoría
        await SecureStore.setItemAsync(key, JSON.stringify(value));
      }
    }
  }

  private async cleanupOldBackups(): Promise<void> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - this.config.retentionDays);
    
    const oldBackups = this.backups.filter(b => b.timestamp < cutoffDate);
    
    for (const backup of oldBackups) {
      await this.deleteBackup(backup.id);
    }
    
    this.backups = this.backups.filter(b => b.timestamp >= cutoffDate);
    await this.saveBackupHistory();
  }

  async deleteBackup(backupId: string): Promise<void> {
    const backupKey = `backup_${backupId}`;
    await securityManager.secureDelete(backupKey);
    
    this.backups = this.backups.filter(b => b.id !== backupId);
    await this.saveBackupHistory();
  }

  async getBackups(): Promise<BackupMetadata[]> {
    return this.backups.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async getBackupConfig(): Promise<BackupConfig> {
    return this.config;
  }

  async updateBackupConfig(newConfig: Partial<BackupConfig>): Promise<void> {
    this.config = { ...this.config, ...newConfig };
    await SecureStore.setItemAsync('backup_config', JSON.stringify(this.config));
  }

  private async generateBackupId(): Promise<string> {
    const crypto = require('crypto');
    return crypto.randomBytes(16).toString('hex');
  }

  // Método para verificar estado de backups
  async getBackupStatus(): Promise<BackupStatus> {
    const latestBackup = this.backups[0];
    if (!latestBackup) {
      return BackupStatus.PENDING;
    }
    
    const daysSinceLastBackup = (Date.now() - latestBackup.timestamp.getTime()) / (24 * 60 * 60 * 1000);
    
    if (daysSinceLastBackup > 1) {
      return BackupStatus.PENDING;
    }
    
    return latestBackup.status;
  }
}

export const backupManager = BackupManager.getInstance(); 