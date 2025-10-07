// src/data/supplements/constants.ts
// Constantes para el sistema de suplementos

/**
 * Marcas premium de Amazon
 */
export const BRANDS = {
  NATURE_MADE: 'Nature Made',
  RITUAL: 'Ritual Essential Prenatal',
  NORDIC_NATURALS: 'Nordic Naturals Prenatal DHA',
  GARDEN_OF_LIFE: 'Garden of Life Dr. Formulated Probiotics',
  NOW_FOODS: 'NOW Foods',
  PURE_ENCAPSULATIONS: 'Pure Encapsulations',
  FULLWELL: 'FullWell Prenatal Multivitamin',
  OVEGA: 'Ovega-3 Plant-Based',
  THORNE: 'Thorne Research',
  SEEKING_HEALTH: 'Seeking Health Phosphatidylcholine',
} as const;

/**
 * Certificaciones reconocidas
 */
export const CERTIFICATIONS = {
  USP: 'USP Verified',
  NSF: 'NSF Certified',
  GMP: 'GMP Certified',
  IFOS: 'IFOS 5-Star',
  NON_GMO: 'Non-GMO',
  VEGAN: 'Vegan',
  GLUTEN_FREE: 'Gluten Free',
  USDA_ORGANIC: 'USDA Organic',
  KOSHER: 'Kosher',
  HYPOALLERGENIC: 'Hypoallergenic',
} as const;

/**
 * Badges visuales para UI
 */
export const BADGES = {
  BEST_SELLER: 'Best Seller',
  PREMIUM: 'Premium',
  ELITE: 'Elite',
  ESSENTIAL: 'Esencial',
  VEGAN: 'Vegano',
  ORGANIC: 'Orgánico',
  NO_NAUSEA: 'Sin Náuseas',
  HIGH_ABSORPTION: 'Máxima Absorción',
  MEDICAL_GRADE: 'Grado Médico',
  PHARMACIST_RECOMMENDED: 'Farmacéutico Recomendado',
  MERCURY_FREE: 'Sin Mercurio',
  SUSTAINABLE: 'Sostenible',
  ACTIVE_FORM: 'Forma Activa',
  MTHFR_FRIENDLY: 'MTHFR',
  TRACEABLE: 'Trazable',
  HYPOALLERGENIC: 'Hipoalergénico',
} as const;

/**
 * Tiempo de envío estándar
 */
export const SHIPPING = {
  STANDARD: '7-10 días',
  EXPRESS: '3-5 días',
} as const;

/**
 * Información de timing para toma de suplementos
 */
export const TIMING_INFO = {
  morning: {
    label: 'Por la mañana',
    icon: 'white-balance-sunny',
    description: 'Tomar al despertar con el desayuno'
  },
  night: {
    label: 'Por la noche',
    icon: 'weather-night',
    description: 'Tomar antes de dormir'
  },
  with_meals: {
    label: 'Con las comidas',
    icon: 'food-apple',
    description: 'Tomar con cualquier comida principal'
  },
  any: {
    label: 'Cualquier momento',
    icon: 'clock-outline',
    description: 'Flexible, a tu conveniencia'
  }
} as const;