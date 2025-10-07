import { FetalDevelopment } from '../types';
import translations from '../locales';
import { getCurrentLanguage } from '../config/i18n';

/**
 * Obtiene los datos de desarrollo fetal para una semana específica
 * @param week - Número de semana de gestación (1-40)
 * @returns Objeto FetalDevelopment con información de la semana o null si no hay datos
 */
export function getFetalDevelopmentData(week: number): FetalDevelopment | null {
  // Validar que la semana esté en un rango razonable
  if (week < 1 || week > 40) {
    return null;
  }

  // Redondear la semana al entero más cercano
  const roundedWeek = Math.round(week);
  
  // Obtener el idioma actual
  const currentLanguage = getCurrentLanguage() as 'es' | 'en';
  
  // Construir la clave para acceder a los datos
  const weekKey = `week${roundedWeek}` as keyof typeof translations.es.fetalDevelopment;
  
  // Obtener los datos del idioma actual
  const fetalData = translations[currentLanguage]?.fetalDevelopment;
  
  if (!fetalData || !fetalData[weekKey]) {
    return null;
  }

  const weekData = fetalData[weekKey];

  return {
    week: roundedWeek,
    size: weekData.size,
    weight: weekData.weight,
    description: weekData.description,
    milestones: weekData.milestones,
    tips: weekData.tips,
    motherChanges: weekData.motherChanges,
    animation: `week${roundedWeek}`,
  };
}

/**
 * Obtiene todos los datos de desarrollo fetal (semanas 1-40)
 * @returns Array de objetos FetalDevelopment
 */
export function getAllFetalDevelopmentData(): FetalDevelopment[] {
  const weeks: FetalDevelopment[] = [];
  
  for (let week = 1; week <= 40; week++) {
    const weekData = getFetalDevelopmentData(week);
    if (weekData) {
      weeks.push(weekData);
    }
  }
  
  return weeks;
}

/**
 * Obtiene el rango de semanas disponibles
 * @returns Objeto con semana mínima y máxima
 */
export function getAvailableWeeksRange(): { min: number; max: number } {
  return {
    min: 1,
    max: 40,
  };
}

/**
 * Verifica si hay datos disponibles para una semana específica
 * @param week - Número de semana
 * @returns true si hay datos disponibles
 */
export function hasDataForWeek(week: number): boolean {
  const { min, max } = getAvailableWeeksRange();
  return week >= min && week <= max;
}