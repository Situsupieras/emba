// src/utils/converters/supplementConverter.ts
/**
 * Convertidor entre formato nuevo (RealSupplement) y formato legacy (Supplement)
 * Mantiene compatibilidad durante la migración
 */

import { RealSupplement } from '@/data/supplements';
import { Supplement } from '@/types';
import { EXCHANGE_RATE } from '@/utils/constants/appConstants';

/**
 * Convierte RealSupplement a formato legacy Supplement
 * @param realSupplement - Suplemento en formato nuevo
 * @returns Suplemento en formato legacy compatible con pantallas existentes
 */
export function toLegacySupplement(realSupplement: RealSupplement): Supplement {
  // Combinar beneficios de madre y bebé en un solo array
  const allBenefits = [
    ...realSupplement.benefits.mother,
    ...realSupplement.benefits.baby,
  ];

  // Convertir precio de GTQ a USD (aproximado)
  const priceInUSD = Number((realSupplement.priceGTQ * EXCHANGE_RATE.USD_TO_GTQ).toFixed(2));

  return {
    id: realSupplement.id,
    name: realSupplement.name,
    description: realSupplement.description,
    benefits: allBenefits,
    dosage: realSupplement.recommendedDose,
    trimester: realSupplement.trimesters,
    price: priceInUSD,
    image: realSupplement.image || 'https://via.placeholder.com/150',
    medicalExplanation: realSupplement.medicalExplanation,
    certifications: realSupplement.certifications,
    sideEffects: realSupplement.sideEffects,
    contraindications: realSupplement.contraindications,
  };
}

/**
 * Convierte array de RealSupplements a formato legacy
 * @param realSupplements - Array de suplementos en formato nuevo
 * @returns Array de suplementos en formato legacy
 */
export function toLegacySupplements(realSupplements: RealSupplement[]): Supplement[] {
  return realSupplements.map(toLegacySupplement);
}

/**
 * Filtra suplementos según criterios de compatibilidad
 * @param supplements - Suplementos a filtrar
 * @param trimester - Trimestre actual del embarazo
 * @returns Suplementos relevantes para el trimestre
 */
export function filterByTrimester(
  supplements: Supplement[],
  trimester: number
): Supplement[] {
  return supplements.filter(supp => 
    Array.isArray(supp.trimester) && supp.trimester.includes(trimester)
  );
}