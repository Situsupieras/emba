// src/data/supplements/bundles.ts
// Definición de bundles/paquetes de suplementos

import { SupplementBundle, BundleCalculation } from './types';
import { SHIPPING } from './constants';

/**
 * Bundles preconfigurados con descuentos
 */
export const SUPPLEMENT_BUNDLES: SupplementBundle[] = [
  {
    id: 'bundle-esencial-completo',
    name: 'Pack Esencial Completo',
    description: 'Todo lo necesario para un embarazo saludable a precio accesible',
    tier: 'esencial',
    targetProfile: 'Primerizas 25-32 años, conscientes del precio',
    supplements: ['prenatal-esencial', 'folic-acid-esencial', 'iron-esencial', 'calcium-esencial'],
    originalPrice: 866,
    bundlePrice: 779,
    discount: 10,
    shippingDays: SHIPPING.STANDARD,
    benefits: [
      'Ahorra Q87 (10%)',
      'Todas las vitaminas esenciales',
      'Marcas USP certificadas',
      'Plan de 1 mes completo'
    ]
  },
  {
    id: 'bundle-premium-completo',
    name: 'Pack Premium Completo',
    description: 'Nutrición optimizada con las mejores formas biodisponibles',
    tier: 'premium',
    targetProfile: '30-38 años, segundo embarazo, profesionales',
    supplements: ['prenatal-premium', 'dha-premium', 'probiotic-premium', 'choline-premium', 'magnesium-premium'],
    originalPrice: 2135,
    bundlePrice: 1899,
    discount: 11,
    shippingDays: SHIPPING.STANDARD,
    benefits: [
      'Ahorra Q236 (11%)',
      'Sin náuseas (Ritual)',
      'DHA premium Nordic Naturals',
      'Probiótico 20 billones CFU',
      'Colina para cerebro del bebé'
    ]
  },
  {
    id: 'bundle-elite-vegano',
    name: 'Pack Elite Vegano',
    description: 'El programa más completo para mamás veganas comprometidas',
    tier: 'elite',
    targetProfile: 'Veganas, 35+, ejecutivas, enfoque holístico',
    supplements: ['prenatal-elite', 'dha-elite-vegan', 'methylfolate-elite', 'b12-elite', 'calcium-elite', 'choline-elite', 'iodine-elite'],
    originalPrice: 3953,
    bundlePrice: 3549,
    discount: 10,
    shippingDays: SHIPPING.STANDARD,
    benefits: [
      'Ahorra Q404 (10%)',
      '100% vegano certificado',
      'Dosis óptimas (no mínimas)',
      'DHA de microalgas',
      'B12 forma activa esencial',
      'Colina 600mg (Cornell study)',
      'Todo lo que necesitas'
    ]
  },
  {
    id: 'bundle-edad-avanzada',
    name: 'Pack Edad 35+',
    description: 'Fórmula especializada para embarazo de edad avanzada materna',
    tier: 'premium',
    targetProfile: '35+ años, primípara o multípara',
    supplements: ['prenatal-premium', 'dha-premium', 'iron-esencial', 'calcium-elite', 'choline-premium', 'vitamin-d-elite'],
    originalPrice: 2444,
    bundlePrice: 2199,
    discount: 10,
    shippingDays: SHIPPING.STANDARD,
    benefits: [
      'Ahorra Q245 (10%)',
      'Hierro para prevenir anemia',
      'Calcio elite para preeclampsia',
      'DHA dosis alta (500mg)',
      'Vitamina D 5000 UI',
      'Colina para desarrollo cerebral'
    ]
  },
  {
    id: 'bundle-trimestre1',
    name: 'Pack Primer Trimestre',
    description: 'Lo esencial para las primeras 13 semanas críticas',
    tier: 'premium',
    targetProfile: 'Semanas 1-13, todas las edades',
    supplements: ['prenatal-premium', 'folic-acid-esencial', 'iodine-elite', 'b12-elite'],
    originalPrice: 1806,
    bundlePrice: 1625,
    discount: 10,
    shippingDays: SHIPPING.STANDARD,
    benefits: [
      'Ahorra Q181 (10%)',
      'Prevención defectos tubo neural',
      'Yodo para desarrollo cerebral',
      'B12 activa energizante',
      'Enfoque en T1'
    ]
  },
  {
    id: 'bundle-trimestre2-3',
    name: 'Pack Segundo y Tercer Trimestre',
    description: 'Nutrición intensiva para crecimiento máximo del bebé',
    tier: 'premium',
    targetProfile: 'Semanas 14-40, todas las edades',
    supplements: ['prenatal-premium', 'dha-premium', 'calcium-elite', 'iron-esencial', 'magnesium-premium'],
    originalPrice: 2045,
    bundlePrice: 1840,
    discount: 10,
    shippingDays: SHIPPING.STANDARD,
    benefits: [
      'Ahorra Q205 (10%)',
      'DHA para cerebro fetal',
      'Calcio para huesos y preeclampsia',
      'Hierro para volumen sanguíneo',
      'Magnesio para calambres'
    ]
  }
];

/**
 * Calcula el total de un bundle
 */
export function calculateBundleTotal(bundleId: string): BundleCalculation | null {
  const bundle = SUPPLEMENT_BUNDLES.find(b => b.id === bundleId);
  if (!bundle) return null;

  return {
    original: bundle.originalPrice,
    final: bundle.bundlePrice,
    savings: bundle.originalPrice - bundle.bundlePrice
  };
}

/**
 * Obtiene bundles por tier
 */
export function getBundlesByTier(tier: 'esencial' | 'premium' | 'elite'): SupplementBundle[] {
  return SUPPLEMENT_BUNDLES.filter(b => b.tier === tier);
}

/**
 * Obtiene bundle recomendado según perfil
 */
export function getRecommendedBundle(profile: {
  age: number;
  diet: 'omnivora' | 'vegetariana' | 'vegana';
  currentWeek: number;
  budget: 'esencial' | 'premium' | 'elite';
}): SupplementBundle | null {
  // Veganas -> Bundle Elite Vegano
  if (profile.diet === 'vegana') {
    return SUPPLEMENT_BUNDLES.find(b => b.id === 'bundle-elite-vegano') || null;
  }

  // 35+ -> Bundle Edad Avanzada
  if (profile.age >= 35) {
    return SUPPLEMENT_BUNDLES.find(b => b.id === 'bundle-edad-avanzada') || null;
  }

  // Por trimestre
  if (profile.currentWeek <= 13) {
    return SUPPLEMENT_BUNDLES.find(b => b.id === 'bundle-trimestre1') || null;
  }

  // Por presupuesto
  if (profile.budget === 'esencial') {
    return SUPPLEMENT_BUNDLES.find(b => b.id === 'bundle-esencial-completo') || null;
  }

  // Default premium completo
  return SUPPLEMENT_BUNDLES.find(b => b.id === 'bundle-premium-completo') || null;
}