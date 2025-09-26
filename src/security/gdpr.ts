import * as SecureStore from 'expo-secure-store';
import { securityManager } from './encryption';
import { auditManager } from './audit';

export interface GDPRConsent {
  id: string;
  userId: string;
  consentType: ConsentType;
  granted: boolean;
  timestamp: Date;
  version: string;
  details: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export interface GDPRRequest {
  id: string;
  userId: string;
  requestType: GDPRRequestType;
  status: GDPRRequestStatus;
  createdAt: Date;
  completedAt?: Date;
  details: Record<string, any>;
  dataExported?: string; // URL o datos exportados
}

export enum ConsentType {
  DATA_PROCESSING = 'data_processing',
  MEDICAL_DATA = 'medical_data',
  MARKETING = 'marketing',
  ANALYTICS = 'analytics',
  THIRD_PARTY = 'third_party',
  COOKIES = 'cookies'
}

export enum GDPRRequestType {
  ACCESS = 'access',
  RECTIFICATION = 'rectification',
  ERASURE = 'erasure',
  PORTABILITY = 'portability',
  RESTRICTION = 'restriction',
  OBJECTION = 'objection'
}

export enum GDPRRequestStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  REJECTED = 'rejected'
}

export interface DataInventory {
  category: string;
  purpose: string;
  legalBasis: string;
  retentionPeriod: string;
  dataSubjects: string[];
  thirdParties: string[];
  safeguards: string[];
}

export class GDPRManager {
  private static instance: GDPRManager;
  private dataInventory: DataInventory[] = [];

  static getInstance(): GDPRManager {
    if (!GDPRManager.instance) {
      GDPRManager.instance = new GDPRManager();
    }
    return GDPRManager.instance;
  }

  async initialize(): Promise<void> {
    await this.loadDataInventory();
  }

  private async loadDataInventory(): Promise<void> {
    this.dataInventory = [
      {
        category: 'Datos personales básicos',
        purpose: 'Identificación y gestión de cuenta',
        legalBasis: 'Ejecución del contrato',
        retentionPeriod: 'Mientras la cuenta esté activa',
        dataSubjects: ['Nombre', 'Email', 'Fecha de nacimiento'],
        thirdParties: ['Firebase Auth'],
        safeguards: ['Encriptación AES-256', 'Autenticación biométrica']
      },
      {
        category: 'Datos médicos sensibles',
        purpose: 'Proporcionar recomendaciones personalizadas',
        legalBasis: 'Consentimiento explícito',
        retentionPeriod: 'Hasta 7 años después del parto',
        dataSubjects: ['Semana de embarazo', 'Historial médico', 'Suplementos'],
        thirdParties: ['Servicios médicos autorizados'],
        safeguards: ['Encriptación end-to-end', 'Acceso restringido', 'Auditoría completa']
      },
      {
        category: 'Datos de uso',
        purpose: 'Mejora del servicio',
        legalBasis: 'Interés legítimo',
        retentionPeriod: '2 años',
        dataSubjects: ['Actividad en la app', 'Preferencias'],
        thirdParties: ['Analytics internos'],
        safeguards: ['Anonimización', 'Pseudonimización']
      }
    ];
  }

  async recordConsent(userId: string, consentType: ConsentType, granted: boolean, details: Record<string, any> = {}): Promise<void> {
    const consent: GDPRConsent = {
      id: await this.generateId(),
      userId,
      consentType,
      granted,
      timestamp: new Date(),
      version: '1.0',
      details
    };

    await securityManager.secureStore(`consent_${userId}_${consentType}`, JSON.stringify(consent));
    
    // Registrar en auditoría
    await auditManager.logGDPRRequest(userId, 'system', 'consent_recorded', {
      consentType,
      granted,
      timestamp: consent.timestamp
    });
  }

  async getConsent(userId: string, consentType: ConsentType): Promise<GDPRConsent | null> {
    const consentData = await securityManager.secureRetrieve(`consent_${userId}_${consentType}`);
    return consentData ? JSON.parse(consentData) : null;
  }

  async getAllConsents(userId: string): Promise<GDPRConsent[]> {
    const consents: GDPRConsent[] = [];
    
    for (const consentType of Object.values(ConsentType)) {
      const consent = await this.getConsent(userId, consentType);
      if (consent) {
        consents.push(consent);
      }
    }
    
    return consents;
  }

  async requestDataAccess(userId: string): Promise<GDPRRequest> {
    const request: GDPRRequest = {
      id: await this.generateId(),
      userId,
      requestType: GDPRRequestType.ACCESS,
      status: GDPRRequestStatus.PENDING,
      createdAt: new Date(),
      details: {}
    };

    await securityManager.secureStore(`gdpr_request_${request.id}`, JSON.stringify(request));
    
    // Registrar en auditoría
    await auditManager.logGDPRRequest(userId, 'system', 'data_access_requested', {
      requestId: request.id,
      timestamp: request.createdAt
    });

    return request;
  }

  async requestDataRectification(userId: string, changes: Record<string, any>): Promise<GDPRRequest> {
    const request: GDPRRequest = {
      id: await this.generateId(),
      userId,
      requestType: GDPRRequestType.RECTIFICATION,
      status: GDPRRequestStatus.PENDING,
      createdAt: new Date(),
      details: { changes }
    };

    await securityManager.secureStore(`gdpr_request_${request.id}`, JSON.stringify(request));
    
    // Registrar en auditoría
    await auditManager.logGDPRRequest(userId, 'system', 'data_rectification_requested', {
      requestId: request.id,
      changes,
      timestamp: request.createdAt
    });

    return request;
  }

  async requestDataErasure(userId: string, reason?: string): Promise<GDPRRequest> {
    const request: GDPRRequest = {
      id: await this.generateId(),
      userId,
      requestType: GDPRRequestType.ERASURE,
      status: GDPRRequestStatus.PENDING,
      createdAt: new Date(),
      details: { reason }
    };

    await securityManager.secureStore(`gdpr_request_${request.id}`, JSON.stringify(request));
    
    // Registrar en auditoría
    await auditManager.logGDPRRequest(userId, 'system', 'data_erasure_requested', {
      requestId: request.id,
      reason,
      timestamp: request.createdAt
    });

    return request;
  }

  async requestDataPortability(userId: string): Promise<GDPRRequest> {
    const request: GDPRRequest = {
      id: await this.generateId(),
      userId,
      requestType: GDPRRequestType.PORTABILITY,
      status: GDPRRequestStatus.PENDING,
      createdAt: new Date(),
      details: {}
    };

    await securityManager.secureStore(`gdpr_request_${request.id}`, JSON.stringify(request));
    
    // Registrar en auditoría
    await auditManager.logGDPRRequest(userId, 'system', 'data_portability_requested', {
      requestId: request.id,
      timestamp: request.createdAt
    });

    return request;
  }

  async processGDPRRequest(requestId: string): Promise<void> {
    const requestData = await securityManager.secureRetrieve(`gdpr_request_${requestId}`);
    if (!requestData) return;

    const request: GDPRRequest = JSON.parse(requestData);
    request.status = GDPRRequestStatus.IN_PROGRESS;

    try {
      switch (request.requestType) {
        case GDPRRequestType.ACCESS:
          await this.processAccessRequest(request);
          break;
        case GDPRRequestType.RECTIFICATION:
          await this.processRectificationRequest(request);
          break;
        case GDPRRequestType.ERASURE:
          await this.processErasureRequest(request);
          break;
        case GDPRRequestType.PORTABILITY:
          await this.processPortabilityRequest(request);
          break;
      }

      request.status = GDPRRequestStatus.COMPLETED;
      request.completedAt = new Date();
    } catch (error) {
      request.status = GDPRRequestStatus.REJECTED;
      request.details.error = error.message;
    }

    await securityManager.secureStore(`gdpr_request_${requestId}`, JSON.stringify(request));
  }

  private async processAccessRequest(request: GDPRRequest): Promise<void> {
    // Recopilar todos los datos del usuario
    const userData = await this.collectUserData(request.userId);
    request.dataExported = JSON.stringify(userData);
  }

  private async processRectificationRequest(request: GDPRRequest): Promise<void> {
    const changes = request.details.changes;
    
    // Aplicar cambios a los datos del usuario
    for (const [key, value] of Object.entries(changes)) {
      await securityManager.secureStore(key, JSON.stringify(value));
    }
  }

  private async processErasureRequest(request: GDPRRequest): Promise<void> {
    // Borrado seguro de todos los datos del usuario
    await securityManager.secureWipe();
    
    // Registrar borrado en auditoría
    await auditManager.logGDPRRequest(request.userId, 'system', 'data_erased', {
      requestId: request.id,
      timestamp: new Date()
    });
  }

  private async processPortabilityRequest(request: GDPRRequest): Promise<void> {
    // Exportar datos en formato estándar (JSON)
    const userData = await this.collectUserData(request.userId);
    const exportData = {
      format: 'JSON',
      version: '1.0',
      exportedAt: new Date(),
      data: userData
    };
    
    request.dataExported = JSON.stringify(exportData);
  }

  private async collectUserData(userId: string): Promise<Record<string, any>> {
    const userData: Record<string, any> = {};
    
    // Recopilar datos del perfil
    const profileData = await securityManager.secureRetrieve('userProfile');
    if (profileData) {
      userData.profile = JSON.parse(profileData);
    }
    
    // Recopilar datos médicos
    const medicalData = await securityManager.secureRetrieve('medicalFeedback');
    if (medicalData) {
      userData.medical = JSON.parse(medicalData);
    }
    
    // Recopilar consentimientos
    userData.consents = await this.getAllConsents(userId);
    
    return userData;
  }

  async getDataInventory(): Promise<DataInventory[]> {
    return this.dataInventory;
  }

  async generatePrivacyPolicy(): Promise<string> {
    return `
# Política de Privacidad - Inteligencia Prenatal

## 1. Responsable del Tratamiento
[Tu empresa]
[Dirección]
[Email de contacto]

## 2. Datos Personales Recopilados
${this.dataInventory.map(item => `
### ${item.category}
- **Propósito**: ${item.purpose}
- **Base Legal**: ${item.legalBasis}
- **Período de Retención**: ${item.retentionPeriod}
- **Datos**: ${item.dataSubjects.join(', ')}
`).join('')}

## 3. Derechos GDPR
- **Acceso**: Solicitar copia de sus datos
- **Rectificación**: Corregir datos inexactos
- **Borrado**: Solicitar eliminación de datos
- **Portabilidad**: Recibir datos en formato estructurado
- **Restricción**: Limitar el procesamiento
- **Oposición**: Oponerse al procesamiento

## 4. Medidas de Seguridad
- Encriptación AES-256
- Autenticación biométrica
- Auditoría completa
- Acceso restringido

## 5. Contacto
Para ejercer sus derechos GDPR, contacte: [email]
    `;
  }

  private async generateId(): Promise<string> {
    const crypto = require('crypto');
    return crypto.randomBytes(16).toString('hex');
  }
}

export const gdprManager = GDPRManager.getInstance(); 