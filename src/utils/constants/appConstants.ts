// src/utils/constants/appConstants.ts
/**
 * Constantes de configuración de la aplicación
 * Centraliza valores que pueden cambiar entre ambientes
 */

/**
 * Tipo de cambio GTQ -> USD
 * @todo Mover a servicio de API cuando esté disponible
 */
export const EXCHANGE_RATE = {
  GTQ_TO_USD: 7.8,
  USD_TO_GTQ: 1 / 7.8,
} as const;

/**
 * Configuración de edad por defecto para análisis
 */
export const DEFAULT_USER_AGE = {
  MIN: 18,
  MAX: 50,
  FALLBACK: 28, // Edad promedio de embarazo en Guatemala
} as const;

/**
 * Configuración de semanas de embarazo
 */
export const PREGNANCY_WEEKS = {
  TOTAL: 40,
  TRIMESTER_1_END: 13,
  TRIMESTER_2_END: 27,
  TRIMESTER_3_END: 40,
} as const;

/**
 * Tipos de dieta soportados
 */
export const DIET_TYPES = {
  OMNIVORA: 'omnivora',
  VEGETARIANA: 'vegetariana',
  VEGANA: 'vegana',
} as const;

/**
 * Calcula el trimestre basado en la semana actual
 */
export function calculateTrimester(week: number): 1 | 2 | 3 {
  if (week <= PREGNANCY_WEEKS.TRIMESTER_1_END) return 1;
  if (week <= PREGNANCY_WEEKS.TRIMESTER_2_END) return 2;
  return 3;
}

/**
 * Valida que la semana esté en rango válido
 */
export function isValidWeek(week: number): boolean {
  return week >= 1 && week <= PREGNANCY_WEEKS.TOTAL;
}

/**
 * Valida que la edad esté en rango válido
 */
export function isValidAge(age: number): boolean {
  return age >= DEFAULT_USER_AGE.MIN && age <= DEFAULT_USER_AGE.MAX;
}