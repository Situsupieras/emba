import * as Crypto from 'expo-crypto';
import { auditManager, AuditEventType } from './audit';
import { securityManager } from './encryption';
import { authManager } from './authentication';

export interface SecurityAlert {
  id: string;
  timestamp: Date;
  severity: AlertSeverity;
  type: AlertType;
  message: string;
  details: Record<string, any>;
  userId?: string;
  sessionId?: string;
  resolved: boolean;
  resolvedAt?: Date;
  resolvedBy?: string;
}

export interface MonitoringRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  conditions: MonitoringCondition[];
  actions: MonitoringAction[];
  severity: AlertSeverity;
}

export interface MonitoringCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'regex';
  value: any;
}

export interface MonitoringAction {
  type: 'alert' | 'block' | 'log' | 'email' | 'sms';
  config: Record<string, any>;
}

export enum AlertSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum AlertType {
  AUTHENTICATION_FAILURE = 'authentication_failure',
  SUSPICIOUS_ACTIVITY = 'suspicious_activity',
  DATA_BREACH = 'data_breach',
  UNAUTHORIZED_ACCESS = 'unauthorized_access',
  RATE_LIMIT_EXCEEDED = 'rate_limit_exceeded',
  ANOMALOUS_BEHAVIOR = 'anomalous_behavior',
  SECURITY_CONFIGURATION = 'security_configuration',
  SYSTEM_INTEGRITY = 'system_integrity'
}

export class SecurityMonitoringManager {
  private static instance: SecurityMonitoringManager;
  private alerts: SecurityAlert[] = [];
  private rules: MonitoringRule[] = [];
  private isMonitoring = false;
  private rateLimitMap: Map<string, { count: number; resetTime: number }> = new Map();

  static getInstance(): SecurityMonitoringManager {
    if (!SecurityMonitoringManager.instance) {
      SecurityMonitoringManager.instance = new SecurityMonitoringManager();
    }
    return SecurityMonitoringManager.instance;
  }

  async initialize(): Promise<void> {
    await this.loadDefaultRules();
    this.startMonitoring();
  }

  private async loadDefaultRules(): Promise<void> {
    this.rules = [
      {
        id: 'auth_failure_threshold',
        name: 'Multiple Authentication Failures',
        description: 'Alert when user has multiple failed login attempts',
        enabled: true,
        severity: AlertSeverity.HIGH,
        conditions: [
          { field: 'eventType', operator: 'equals', value: AuditEventType.AUTHENTICATION },
          { field: 'success', operator: 'equals', value: false }
        ],
        actions: [
          { type: 'alert', config: { threshold: 5, windowMinutes: 15 } },
          { type: 'block', config: { durationMinutes: 30 } }
        ]
      },
      {
        id: 'suspicious_data_access',
        name: 'Suspicious Data Access Pattern',
        description: 'Alert when user accesses sensitive data outside normal hours',
        enabled: true,
        severity: AlertSeverity.MEDIUM,
        conditions: [
          { field: 'eventType', operator: 'equals', value: AuditEventType.DATA_ACCESS },
          { field: 'resource', operator: 'contains', value: 'medical' }
        ],
        actions: [
          { type: 'alert', config: { timeWindow: '22:00-06:00' } },
          { type: 'log', config: { level: 'warning' } }
        ]
      },
      {
        id: 'unusual_activity',
        name: 'Unusual User Activity',
        description: 'Alert when user performs unusual number of actions',
        enabled: true,
        severity: AlertSeverity.MEDIUM,
        conditions: [
          { field: 'eventType', operator: 'not_equals', value: AuditEventType.AUTHENTICATION }
        ],
        actions: [
          { type: 'alert', config: { threshold: 50, windowMinutes: 60 } }
        ]
      }
    ];
  }

  private startMonitoring(): void {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    
    // Monitorear eventos de auditoría en tiempo real
    setInterval(() => {
      this.checkSecurityEvents();
    }, 30000); // Cada 30 segundos
    
    // Limpiar alertas antiguas
    setInterval(() => {
      this.cleanupOldAlerts();
    }, 3600000); // Cada hora
  }

  async checkSecurityEvents(): Promise<void> {
    try {
      // Obtener eventos recientes
      const recentEvents = await auditManager.getAuditEvents({
        startDate: new Date(Date.now() - 15 * 60 * 1000) // Últimos 15 minutos
      });

      // Evaluar reglas de monitoreo
      for (const event of recentEvents) {
        await this.evaluateRules(event);
      }

      // Verificar límites de tasa
      await this.checkRateLimits(recentEvents);
      
      // Detectar comportamiento anómalo
      await this.detectAnomalies(recentEvents);
      
    } catch (error) {
      console.error('Error checking security events:', error);
    }
  }

  private async evaluateRules(event: any): Promise<void> {
    for (const rule of this.rules) {
      if (!rule.enabled) continue;

      if (this.matchesRule(event, rule)) {
        await this.triggerAlert(rule, event);
      }
    }
  }

  private matchesRule(event: any, rule: MonitoringRule): boolean {
    for (const condition of rule.conditions) {
      const fieldValue = this.getFieldValue(event, condition.field);
      
      if (!this.evaluateCondition(fieldValue, condition)) {
        return false;
      }
    }
    
    return true;
  }

  private getFieldValue(event: any, field: string): any {
    const fieldPath = field.split('.');
    let value = event;
    
    for (const path of fieldPath) {
      value = value?.[path];
    }
    
    return value;
  }

  private evaluateCondition(value: any, condition: MonitoringCondition): boolean {
    switch (condition.operator) {
      case 'equals':
        return value === condition.value;
      case 'not_equals':
        return value !== condition.value;
      case 'greater_than':
        return value > condition.value;
      case 'less_than':
        return value < condition.value;
      case 'contains':
        return String(value).includes(String(condition.value));
      case 'regex':
        return new RegExp(condition.value).test(String(value));
      default:
        return false;
    }
  }

  private async triggerAlert(rule: MonitoringRule, event: any): Promise<void> {
    const alert: SecurityAlert = {
      id: await this.generateAlertId(),
      timestamp: new Date(),
      severity: rule.severity,
      type: this.mapRuleToAlertType(rule),
      message: `${rule.name}: ${rule.description}`,
      details: {
        ruleId: rule.id,
        event: event,
        conditions: rule.conditions
      },
      userId: event.userId,
      sessionId: event.sessionId,
      resolved: false
    };

    this.alerts.push(alert);

    // Ejecutar acciones de la regla
    for (const action of rule.actions) {
      await this.executeAction(action, alert);
    }

    // Registrar alerta en auditoría
    await auditManager.logSecurityEvent(
      event.userId || 'system',
      event.sessionId || 'system',
      'security_alert_triggered',
      {
        alertId: alert.id,
        ruleId: rule.id,
        severity: alert.severity
      }
    );
  }

  private mapRuleToAlertType(rule: MonitoringRule): AlertType {
    if (rule.id.includes('auth_failure')) {
      return AlertType.AUTHENTICATION_FAILURE;
    } else if (rule.id.includes('data_access')) {
      return AlertType.UNAUTHORIZED_ACCESS;
    } else if (rule.id.includes('unusual')) {
      return AlertType.ANOMALOUS_BEHAVIOR;
    } else {
      return AlertType.SUSPICIOUS_ACTIVITY;
    }
  }

  private async executeAction(action: MonitoringAction, alert: SecurityAlert): Promise<void> {
    switch (action.type) {
      case 'alert':
        await this.sendAlert(alert, action.config);
        break;
      case 'block':
        await this.blockUser(alert.userId, action.config);
        break;
      case 'log':
        await this.logSecurityEvent(alert, action.config);
        break;
      case 'email':
        await this.sendEmailAlert(alert, action.config);
        break;
      case 'sms':
        await this.sendSMSAlert(alert, action.config);
        break;
    }
  }

  private async sendAlert(alert: SecurityAlert, config: Record<string, any>): Promise<void> {
    // En producción, enviar notificación push o email
    console.log(`SECURITY ALERT [${alert.severity.toUpperCase()}]: ${alert.message}`, alert.details);
  }

  private async blockUser(userId: string | undefined, config: Record<string, any>): Promise<void> {
    if (!userId) return;
    
    // Bloquear usuario temporalmente
    const duration = config.durationMinutes || 30;
    await authManager.destroyAllSessions(userId);
    
    console.log(`User ${userId} blocked for ${duration} minutes`);
  }

  private async logSecurityEvent(alert: SecurityAlert, config: Record<string, any>): Promise<void> {
    // Registrar en logs del sistema
    const logLevel = config.level || 'warning';
    console.log(`[${logLevel.toUpperCase()}] Security Event: ${alert.message}`);
  }

  private async sendEmailAlert(alert: SecurityAlert, config: Record<string, any>): Promise<void> {
    // En producción, enviar email a administradores
    console.log(`Email alert sent for: ${alert.message}`);
  }

  private async sendSMSAlert(alert: SecurityAlert, config: Record<string, any>): Promise<void> {
    // En producción, enviar SMS a administradores
    console.log(`SMS alert sent for: ${alert.message}`);
  }

  private async checkRateLimits(events: any[]): Promise<void> {
    const rateLimits = new Map<string, number>();
    
    for (const event of events) {
      const key = `${event.userId}_${event.eventType}`;
      const currentCount = rateLimits.get(key) || 0;
      rateLimits.set(key, currentCount + 1);
      
      // Verificar límites
      if (currentCount > 100) { // 100 eventos por minuto
        await this.triggerRateLimitAlert(event);
      }
    }
  }

  private async triggerRateLimitAlert(event: any): Promise<void> {
    const alert: SecurityAlert = {
      id: await this.generateAlertId(),
      timestamp: new Date(),
      severity: AlertSeverity.HIGH,
      type: AlertType.RATE_LIMIT_EXCEEDED,
      message: `Rate limit exceeded for user ${event.userId}`,
      details: {
        userId: event.userId,
        eventType: event.eventType,
        threshold: 100
      },
      userId: event.userId,
      sessionId: event.sessionId,
      resolved: false
    };

    this.alerts.push(alert);
  }

  private async detectAnomalies(events: any[]): Promise<void> {
    // Implementar detección de anomalías basada en patrones
    const userActivity = new Map<string, number>();
    
    for (const event of events) {
      const count = userActivity.get(event.userId) || 0;
      userActivity.set(event.userId, count + 1);
    }
    
    // Detectar usuarios con actividad inusual
    for (const [userId, count] of userActivity) {
      if (count > 50) { // Más de 50 eventos en 15 minutos
        await this.triggerAnomalyAlert(userId, count);
      }
    }
  }

  private async triggerAnomalyAlert(userId: string, count: number): Promise<void> {
    const alert: SecurityAlert = {
      id: await this.generateAlertId(),
      timestamp: new Date(),
      severity: AlertSeverity.MEDIUM,
      type: AlertType.ANOMALOUS_BEHAVIOR,
      message: `Unusual activity detected for user ${userId}`,
      details: {
        userId,
        eventCount: count,
        timeWindow: '15 minutes'
      },
      userId,
      resolved: false
    };

    this.alerts.push(alert);
  }

  async getAlerts(filter: Partial<SecurityAlert> = {}): Promise<SecurityAlert[]> {
    return this.alerts.filter(alert => {
      for (const [key, value] of Object.entries(filter)) {
        if (alert[key as keyof SecurityAlert] !== value) {
          return false;
        }
      }
      return true;
    });
  }

  async resolveAlert(alertId: string, resolvedBy: string): Promise<void> {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.resolved = true;
      alert.resolvedAt = new Date();
      alert.resolvedBy = resolvedBy;
    }
  }

  private async cleanupOldAlerts(): Promise<void> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 30); // 30 días
    
    this.alerts = this.alerts.filter(alert => 
      alert.timestamp > cutoffDate || !alert.resolved
    );
  }

  private async generateAlertId(): Promise<string> {
    const randomBytes = await Crypto.getRandomBytesAsync(16);
    return Array.from(randomBytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  // Método para obtener métricas de seguridad
  async getSecurityMetrics(): Promise<SecurityMetrics> {
    const totalAlerts = this.alerts.length;
    const unresolvedAlerts = this.alerts.filter(a => !a.resolved).length;
    const criticalAlerts = this.alerts.filter(a => a.severity === AlertSeverity.CRITICAL).length;
    
    return {
      totalAlerts,
      unresolvedAlerts,
      criticalAlerts,
      alertSeverityDistribution: this.getSeverityDistribution(),
      alertTypeDistribution: this.getTypeDistribution(),
      recentActivity: this.getRecentActivity()
    };
  }

  private getSeverityDistribution(): Record<AlertSeverity, number> {
    const distribution: Record<AlertSeverity, number> = {
      [AlertSeverity.LOW]: 0,
      [AlertSeverity.MEDIUM]: 0,
      [AlertSeverity.HIGH]: 0,
      [AlertSeverity.CRITICAL]: 0
    };
    
    for (const alert of this.alerts) {
      distribution[alert.severity]++;
    }
    
    return distribution;
  }

  private getTypeDistribution(): Record<AlertType, number> {
    const distribution: Record<AlertType, number> = {} as any;
    
    for (const alert of this.alerts) {
      distribution[alert.type] = (distribution[alert.type] || 0) + 1;
    }
    
    return distribution;
  }

  private getRecentActivity(): any[] {
    const recentAlerts = this.alerts
      .filter(a => a.timestamp > new Date(Date.now() - 24 * 60 * 60 * 1000))
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    return recentAlerts.slice(0, 10);
  }
}

export interface SecurityMetrics {
  totalAlerts: number;
  unresolvedAlerts: number;
  criticalAlerts: number;
  alertSeverityDistribution: Record<AlertSeverity, number>;
  alertTypeDistribution: Record<AlertType, number>;
  recentActivity: any[];
}

export const securityMonitoring = SecurityMonitoringManager.getInstance();