import { MedicalRecommendation, MedicalConflict, MedicalSync } from '../types';
import { getFetalDevelopmentData } from '../services/fetalDevelopmentService';

export interface SyncResult {
  conflicts: MedicalConflict[];
  recommendations: MedicalRecommendation[];
  needsUpdate: boolean;
}

export class MedicalSyncService {
  private static instance: MedicalSyncService;
  private syncData: MedicalSync = {
    lastSyncDate: new Date(),
    doctorRecommendations: [],
    appRecommendations: [],
    conflicts: [],
    resolvedConflicts: [],
  };

  static getInstance(): MedicalSyncService {
    if (!MedicalSyncService.instance) {
      MedicalSyncService.instance = new MedicalSyncService();
    }
    return MedicalSyncService.instance;
  }

  // Generar recomendaciones de la app basadas en la semana actual
  generateAppRecommendations(week: number): MedicalRecommendation[] {
    const weekData = getFetalDevelopmentData(week);
    if (!weekData) return [];

    const recommendations: MedicalRecommendation[] = [];

    // Convertir tips en recomendaciones
    weekData.tips.forEach((tip: string, index: number) => {
      recommendations.push({
        id: `app-${week}-${index}`,
        week,
        category: this.categorizeRecommendation(tip),
        recommendation: tip,
        priority: this.assessPriority(tip),
        source: 'app',
        dateAdded: new Date(),
        isFollowed: false,
      });
    });

    // Agregar recomendaciones específicas por semana
    const weekSpecificRecommendations = this.getWeekSpecificRecommendations(week);
    recommendations.push(...weekSpecificRecommendations);

    return recommendations;
  }

  // Categorizar recomendaciones automáticamente
  private categorizeRecommendation(recommendation: string): MedicalRecommendation['category'] {
    const lowerRec = recommendation.toLowerCase();

    if (lowerRec.includes('dieta') || lowerRec.includes('comida') || lowerRec.includes('aliment') || lowerRec.includes('vitamina')) {
      return 'diet';
    }
    if (lowerRec.includes('ejercicio') || lowerRec.includes('caminar') || lowerRec.includes('actividad')) {
      return 'exercise';
    }
    if (lowerRec.includes('suplemento') || lowerRec.includes('vitamina') || lowerRec.includes('ácido fólico')) {
      return 'supplements';
    }
    if (lowerRec.includes('descanso') || lowerRec.includes('dormir') || lowerRec.includes('estrés')) {
      return 'lifestyle';
    }
    if (lowerRec.includes('médico') || lowerRec.includes('consulta') || lowerRec.includes('control')) {
      return 'medical';
    }

    return 'general';
  }

  // Evaluar prioridad de recomendaciones
  private assessPriority(recommendation: string): MedicalRecommendation['priority'] {
    const lowerRec = recommendation.toLowerCase();

    if (lowerRec.includes('importante') || lowerRec.includes('urgente') || lowerRec.includes('consulta')) {
      return 'high';
    }
    if (lowerRec.includes('recomendado') || lowerRec.includes('sugerido')) {
      return 'medium';
    }

    return 'low';
  }

  // Obtener recomendaciones específicas por semana
  private getWeekSpecificRecommendations(week: number): MedicalRecommendation[] {
    const recommendations: MedicalRecommendation[] = [];

    // Primer trimestre (semanas 1-12)
    if (week <= 12) {
      recommendations.push({
        id: `app-${week}-specific-1`,
        week,
        category: 'supplements',
        recommendation: 'Tomar ácido fólico diariamente',
        priority: 'high',
        source: 'app',
        dateAdded: new Date(),
        isFollowed: false,
      });

      if (week >= 8) {
        recommendations.push({
          id: `app-${week}-specific-2`,
          week,
          category: 'medical',
          recommendation: 'Programar primera consulta prenatal',
          priority: 'high',
          source: 'app',
          dateAdded: new Date(),
          isFollowed: false,
        });
      }
    }

    // Segundo trimestre (semanas 13-26)
    if (week >= 13 && week <= 26) {
      recommendations.push({
        id: `app-${week}-specific-3`,
        week,
        category: 'exercise',
        recommendation: 'Iniciar ejercicios prenatales suaves',
        priority: 'medium',
        source: 'app',
        dateAdded: new Date(),
        isFollowed: false,
      });
    }

    // Tercer trimestre (semanas 27-40)
    if (week >= 27) {
      recommendations.push({
        id: `app-${week}-specific-4`,
        week,
        category: 'lifestyle',
        recommendation: 'Preparar maleta para el hospital',
        priority: 'medium',
        source: 'app',
        dateAdded: new Date(),
        isFollowed: false,
      });
    }

    return recommendations;
  }

  // Detectar conflictos entre recomendaciones de la app y del médico
  detectConflicts(
    appRecommendations: MedicalRecommendation[],
    doctorRecommendations: MedicalRecommendation[]
  ): MedicalConflict[] {
    const conflicts: MedicalConflict[] = [];

    appRecommendations.forEach(appRec => {
      doctorRecommendations.forEach(docRec => {
        if (this.isConflicting(appRec, docRec)) {
          conflicts.push({
            id: `conflict-${appRec.id}-${docRec.id}`,
            appRecommendation: appRec.recommendation,
            doctorRecommendation: docRec.recommendation,
            week: appRec.week,
            dateDetected: new Date(),
            resolution: 'pending',
          });
        }
      });
    });

    return conflicts;
  }

  // Determinar si dos recomendaciones son conflictivas
  private isConflicting(appRec: MedicalRecommendation, docRec: MedicalRecommendation): boolean {
    // Verificar si están en la misma categoría y semana
    if (appRec.category !== docRec.category || appRec.week !== docRec.week) {
      return false;
    }

    const appText = appRec.recommendation.toLowerCase();
    const docText = docRec.recommendation.toLowerCase();

    // Detectar conflictos específicos
    const conflicts = [
      { app: 'ejercicio', doc: 'reposo' },
      { app: 'suplemento', doc: 'no suplemento' },
      { app: 'dieta', doc: 'restricción' },
      { app: 'actividad', doc: 'inactividad' },
    ];

    return conflicts.some(conflict =>
      (appText.includes(conflict.app) && docText.includes(conflict.doc)) ||
      (appText.includes(conflict.doc) && docText.includes(conflict.app))
    );
  }

  // Resolver conflictos
  resolveConflict(conflictId: string, resolution: MedicalConflict['resolution'], notes?: string): void {
    const conflict = this.syncData.conflicts.find(c => c.id === conflictId);
    if (conflict) {
      conflict.resolution = resolution;
      conflict.notes = notes;

      // Mover a conflictos resueltos
      this.syncData.resolvedConflicts.push(conflict);
      this.syncData.conflicts = this.syncData.conflicts.filter(c => c.id !== conflictId);
    }
  }

  // Obtener recomendaciones sincronizadas (priorizando médico sobre app)
  getSyncedRecommendations(
    appRecommendations: MedicalRecommendation[],
    doctorRecommendations: MedicalRecommendation[]
  ): MedicalRecommendation[] {
    const synced: MedicalRecommendation[] = [];
    const conflicts = this.detectConflicts(appRecommendations, doctorRecommendations);

    // Agregar todas las recomendaciones del médico
    synced.push(...doctorRecommendations);

    // Agregar recomendaciones de la app que no tengan conflictos
    appRecommendations.forEach(appRec => {
      const hasConflict = conflicts.some(conflict =>
        conflict.appRecommendation === appRec.recommendation
      );

      if (!hasConflict) {
        synced.push(appRec);
      }
    });

    return synced;
  }

  // Generar reporte de sincronización
  generateSyncReport(week: number): SyncResult {
    const appRecommendations = this.generateAppRecommendations(week);
    const doctorRecommendations = this.syncData.doctorRecommendations.filter(
      rec => rec.week === week
    );

    const conflicts = this.detectConflicts(appRecommendations, doctorRecommendations);
    const syncedRecommendations = this.getSyncedRecommendations(appRecommendations, doctorRecommendations);

    return {
      conflicts,
      recommendations: syncedRecommendations,
      needsUpdate: conflicts.length > 0,
    };
  }

  // Actualizar datos de sincronización
  updateSyncData(data: Partial<MedicalSync>): void {
    this.syncData = { ...this.syncData, ...data, lastSyncDate: new Date() };
  }

  // Obtener datos de sincronización
  getSyncData(): MedicalSync {
    return this.syncData;
  }
}

export const medicalSyncService = MedicalSyncService.getInstance();