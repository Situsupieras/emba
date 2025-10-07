// src/services/supplementService.ts
/**
 * Servicio de suplementos - Capa de lógica de negocio
 * Centraliza todas las operaciones relacionadas con suplementos
 */

import {
  getPersonalizedSupplements,
  RealSupplement,
  UserSupplementProfile,
  PersonalizedRecommendations,
  DietType,
} from '@/data/supplements';
import { Supplement } from '@/types';
import {
  toLegacySupplements,
  filterByTrimester,
} from '@/utils/converters/supplementConverter';
import {
  calculateTrimester,
  isValidWeek,
  isValidAge,
  DEFAULT_USER_AGE,
  DIET_TYPES,
} from '@/utils/constants/appConstants';

/**
 * Parámetros para obtener suplementos personalizados
 */
export interface GetSupplementsParams {
  currentWeek: number;
  age?: number;
  previousChildren?: number;
  diet?: DietType;
  hasBoughtSupplements?: boolean;
}

/**
 * Resultado del servicio de suplementos
 */
export interface SupplementServiceResult {
  supplements: Supplement[];
  recommendations: PersonalizedRecommendations;
  trimester: number;
  isValid: boolean;
  errors: string[];
}

/**
 * Servicio principal de suplementos
 */
export class SupplementService {
  /**
   * Obtiene suplementos personalizados en formato legacy
   * @param params - Parámetros de personalización
   * @returns Resultado con suplementos y recomendaciones
   */
  static getPersonalizedLegacySupplements(
    params: GetSupplementsParams
  ): SupplementServiceResult {
    const errors: string[] = [];

    // Validaciones
    if (!isValidWeek(params.currentWeek)) {
      errors.push(`Semana inválida: ${params.currentWeek}. Debe estar entre 1-40.`);
    }

    const age = params.age ?? DEFAULT_USER_AGE.FALLBACK;
    if (!isValidAge(age)) {
      errors.push(`Edad inválida: ${age}. Debe estar entre 18-50.`);
    }

    // Si hay errores críticos, retornar resultado vacío
    if (errors.length > 0) {
      return {
        supplements: [],
        recommendations: {
          essential: [],
          recommended: [],
          optional: [],
          suggestedBundle: null,
          personalizedNotes: errors,
        },
        trimester: calculateTrimester(params.currentWeek),
        isValid: false,
        errors,
      };
    }

    // Crear perfil de usuario
    const userProfile: UserSupplementProfile = {
      currentWeek: params.currentWeek,
      age,
      previousChildren: params.previousChildren ?? 0,
      diet: params.diet ?? (DIET_TYPES.OMNIVORA as DietType),
      hasBoughtSupplements: params.hasBoughtSupplements ?? false,
    };

    // Obtener recomendaciones personalizadas
    const recommendations = getPersonalizedSupplements(userProfile);

    // Combinar essential + recommended para pantalla actual
    const allRecommendedSupplements = [
      ...recommendations.essential,
      ...recommendations.recommended,
    ];

    // Convertir a formato legacy
    const legacySupplements = toLegacySupplements(allRecommendedSupplements);

    return {
      supplements: legacySupplements,
      recommendations,
      trimester: calculateTrimester(params.currentWeek),
      isValid: true,
      errors: [],
    };
  }

  /**
   * Obtiene solo suplementos esenciales
   */
  static getEssentialSupplements(params: GetSupplementsParams): Supplement[] {
    const result = this.getPersonalizedLegacySupplements(params);
    const essentialIds = result.recommendations.essential.map(s => s.id);
    return result.supplements.filter(s => essentialIds.includes(s.id));
  }

  /**
   * Obtiene suplementos filtrados por trimestre
   */
  static getSupplementsForTrimester(
    params: GetSupplementsParams
  ): Supplement[] {
    const result = this.getPersonalizedLegacySupplements(params);
    return filterByTrimester(result.supplements, result.trimester);
  }
}