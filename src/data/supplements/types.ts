// src/data/supplements/types.ts
// Tipos e interfaces para el sistema de suplementos

export type ProductTier = 'esencial' | 'premium' | 'elite';
export type DietType = 'omnivora' | 'vegetariana' | 'vegana';
export type Priority = 'essential' | 'recommended' | 'optional';
export type Timing = 'morning' | 'night' | 'with_meals' | 'any';

/**
 * Interfaz principal para suplementos
 */
export interface RealSupplement {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  brand: string;
  amazonASIN?: string;
  tier: ProductTier;
  recommendedDose: string;
  priority: Priority;
  trimesters: number[];
  benefits: {
    mother: string[];
    baby: string[];
  };
  timing: Timing;
  medicalExplanation: string;
  specialConsiderations: {
    age35Plus?: string;
    multiparous?: string;
    vegetarian?: string;
    vegan?: string;
  };
  contraindications: string[];
  interactions: string[];
  sideEffects: string[];
  certifications: string[];
  badges: string[];
  image?: string;
  priceGTQ: number;
  shippingDays: string;
  inStock: boolean;
}

/**
 * Interfaz para bundles/paquetes
 */
export interface SupplementBundle {
  id: string;
  name: string;
  description: string;
  tier: ProductTier;
  targetProfile: string;
  supplements: string[];
  originalPrice: number;
  bundlePrice: number;
  discount: number;
  shippingDays: string;
  benefits: string[];
}

/**
 * Perfil de usuario para personalización
 */
export interface UserSupplementProfile {
  currentWeek: number;
  age: number;
  previousChildren: number;
  diet: DietType;
  hasBoughtSupplements: boolean;
}

/**
 * Resultado de recomendaciones personalizadas
 */
export interface PersonalizedRecommendations {
  essential: RealSupplement[];
  recommended: RealSupplement[];
  optional: RealSupplement[];
  suggestedBundle: SupplementBundle | null;
  personalizedNotes: string[];
}

/**
 * Información de cálculo de bundle
 */
export interface BundleCalculation {
  original: number;
  final: number;
  savings: number;
}