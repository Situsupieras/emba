import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import { securityManager } from './encryption';

export interface AuditEvent {
  id: string;
  timestamp: Date;
  userId: string;
  sessionId: string;
  eventType: AuditEventType;
  resource: string;
  action: string;
  details: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  success: boolean;
  errorMessage?: string;
}

export enum AuditEventType {
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  DATA_ACCESS = 'data_access',
  DATA_MODIFICATION = 'data_modification',
  DATA_DELETION = 'data_deletion',
  CONFIGURATION_CHANGE = 'configuration_change',
  SECURITY_EVENT = 'security_event',
  PRIVACY_REQUEST = 'privacy_request',
  GDPR_RIGHT = 'gdpr_right',
  BACKUP = 'backup',
  RESTORE = 'restore'
}

export interface AuditFilter {
  startDate?: Date;
  endDate?: Date;
  userId?: string;
  eventType?: AuditEventType;
  resource?: string;
  success?: boolean;
}

export class AuditManager {
  private static instance: AuditManager;
  private auditQueue: AuditEvent[] = [];
  private isProcessing = false;

  static getInstance(): AuditManager {
    if (!AuditManager.instance) {
      AuditManager.instance = new AuditManager();
    }
    return AuditManager.instance;
  }

  async logEvent(event: Omit<AuditEvent, 'id' | 'timestamp'>): Promise<void> {
    const auditEvent: AuditEvent = {
      ...event,
      id: await this.generateEventId(),
      timestamp: new Date()
    };

    // Agregar a cola para procesamiento asíncrono
    this.auditQueue.push(auditEvent);
    
    // Procesar cola si no está procesando
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.auditQueue.length === 0) {
      return;
    }

    this.isProcessing = true;

    try {
      while (this.auditQueue.length > 0) {
        const event = this.auditQueue.shift();
        if (event) {
          await this.storeAuditEvent(event);
        }
      }
    } catch (error) {
      console.error('Error processing audit queue:', error);
    } finally {
      this.isProcessing = false;
    }
  }

  private async storeAuditEvent(event: AuditEvent): Promise<void> {
    try {
      const auditKey = `audit_${event.timestamp.getTime()}_${event.id}`;
      const encryptedEvent = JSON.stringify(event);
      await securityManager.secureStore(auditKey, encryptedEvent);
    } catch (error) {
      console.error('Error storing audit event:', error);
    }
  }

  async getAuditEvents(filter: AuditFilter = {}): Promise<AuditEvent[]> {
    try {
      const events: AuditEvent[] = [];
      const auditKeys = await this.getAllAuditKeys();

      for (const key of auditKeys) {
        const eventData = await securityManager.secureRetrieve(key);
        if (eventData) {
          const event: AuditEvent = JSON.parse(eventData);
          
          if (this.matchesFilter(event, filter)) {
            events.push(event);
          }
        }
      }

      // Ordenar por timestamp descendente
      return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    } catch (error) {
      console.error('Error retrieving audit events:', error);
      return [];
    }
  }

  private matchesFilter(event: AuditEvent, filter: AuditFilter): boolean {
    if (filter.startDate && event.timestamp < filter.startDate) return false;
    if (filter.endDate && event.timestamp > filter.endDate) return false;
    if (filter.userId && event.userId !== filter.userId) return false;
    if (filter.eventType && event.eventType !== filter.eventType) return false;
    if (filter.resource && event.resource !== filter.resource) return false;
    if (filter.success !== undefined && event.success !== filter.success) return false;
    
    return true;
  }

  async generateAuditReport(filter: AuditFilter = {}): Promise<AuditReport> {
    const events = await this.getAuditEvents(filter);
    
    const report: AuditReport = {
      generatedAt: new Date(),
      filter,
      totalEvents: events.length,
      eventsByType: this.groupEventsByType(events),
      eventsByUser: this.groupEventsByUser(events),
      securityEvents: events.filter(e => e.eventType === AuditEventType.SECURITY_EVENT),
      failedEvents: events.filter(e => !e.success),
      gdprEvents: events.filter(e => e.eventType === AuditEventType.GDPR_RIGHT),
      dataAccessEvents: events.filter(e => e.eventType === AuditEventType.DATA_ACCESS),
      dataModificationEvents: events.filter(e => e.eventType === AuditEventType.DATA_MODIFICATION)
    };

    return report;
  }

  private groupEventsByType(events: AuditEvent[]): Record<AuditEventType, number> {
    const grouped: Record<AuditEventType, number> = {} as any;
    
    for (const event of events) {
      grouped[event.eventType] = (grouped[event.eventType] || 0) + 1;
    }
    
    return grouped;
  }

  private groupEventsByUser(events: AuditEvent[]): Record<string, number> {
    const grouped: Record<string, number> = {};
    
    for (const event of events) {
      grouped[event.userId] = (grouped[event.userId] || 0) + 1;
    }
    
    return grouped;
  }

  async logAuthentication(userId: string, sessionId: string, success: boolean, method: string, errorMessage?: string): Promise<void> {
    await this.logEvent({
      userId,
      sessionId,
      eventType: AuditEventType.AUTHENTICATION,
      resource: 'auth',
      action: 'login',
      details: { method },
      success,
      errorMessage
    });
  }

  async logDataAccess(userId: string, sessionId: string, resource: string, action: string, success: boolean): Promise<void> {
    await this.logEvent({
      userId,
      sessionId,
      eventType: AuditEventType.DATA_ACCESS,
      resource,
      action,
      details: {},
      success
    });
  }

  async logDataModification(userId: string, sessionId: string, resource: string, action: string, changes: Record<string, any>, success: boolean): Promise<void> {
    await this.logEvent({
      userId,
      sessionId,
      eventType: AuditEventType.DATA_MODIFICATION,
      resource,
      action,
      details: { changes },
      success
    });
  }

  async logGDPRRequest(userId: string, sessionId: string, right: string, details: Record<string, any>): Promise<void> {
    await this.logEvent({
      userId,
      sessionId,
      eventType: AuditEventType.GDPR_RIGHT,
      resource: 'gdpr',
      action: right,
      details,
      success: true
    });
  }

  async logSecurityEvent(userId: string, sessionId: string, event: string, details: Record<string, any>): Promise<void> {
    await this.logEvent({
      userId,
      sessionId,
      eventType: AuditEventType.SECURITY_EVENT,
      resource: 'security',
      action: event,
      details,
      success: false
    });
  }

  private async generateEventId(): Promise<string> {
    const randomBytes = await Crypto.getRandomBytesAsync(16);
    return Array.from(randomBytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  private async getAllAuditKeys(): Promise<string[]> {
    // En producción, mantener índice de claves de auditoría
    // Por ahora, retornar array vacío
    return [];
  }

  // Método para limpiar eventos antiguos (retención de datos)
  async cleanupOldEvents(retentionDays: number = 90): Promise<void> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

    const auditKeys = await this.getAllAuditKeys();
    
    for (const key of auditKeys) {
      const eventData = await securityManager.secureRetrieve(key);
      if (eventData) {
        const event: AuditEvent = JSON.parse(eventData);
        if (event.timestamp < cutoffDate) {
          await securityManager.secureDelete(key);
        }
      }
    }
  }
}

export interface AuditReport {
  generatedAt: Date;
  filter: AuditFilter;
  totalEvents: number;
  eventsByType: Record<AuditEventType, number>;
  eventsByUser: Record<string, number>;
  securityEvents: AuditEvent[];
  failedEvents: AuditEvent[];
  gdprEvents: AuditEvent[];
  dataAccessEvents: AuditEvent[];
  dataModificationEvents: AuditEvent[];
}

export const auditManager = AuditManager.getInstance();