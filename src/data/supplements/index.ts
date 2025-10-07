// src/data/supplements/index.ts
// Exports públicos del módulo de suplementos

// ==================== TYPES ====================
export type {
  ProductTier,
  DietType,
  Priority,
  Timing,
  RealSupplement,
  SupplementBundle,
  UserSupplementProfile,
  PersonalizedRecommendations,
  BundleCalculation
} from './types';

// ==================== CONSTANTS ====================
export {
  BRANDS,
  CERTIFICATIONS,
  BADGES,
  SHIPPING,
  TIMING_INFO
} from './constants';

// ==================== SUPPLEMENTS DATA ====================
export { ESENCIAL_SUPPLEMENTS } from './supplements.esencial';
export { PREMIUM_SUPPLEMENTS } from './supplements.premium';
export { ELITE_SUPPLEMENTS } from './supplements.elite';

// ==================== BUNDLES ====================
export {
  SUPPLEMENT_BUNDLES,
  calculateBundleTotal,
  getBundlesByTier,
  getRecommendedBundle
} from './bundles';

// ==================== PERSONALIZATION ====================
export {
  getPersonalizedSupplements,
  getSupplementsByTier,
  filterByDietaryRestrictions,
  getSupplementsByPriority,
  getSupplementById,
  calculateTotalPrice,
  getAlternativesByTier
} from './personalization';

// ==================== LEGACY EXPORTS (for backward compatibility) ====================
// Mantener exports originales si hay código existente que los usa
import { ESENCIAL_SUPPLEMENTS } from './supplements.esencial';
import { PREMIUM_SUPPLEMENTS } from './supplements.premium';
import { ELITE_SUPPLEMENTS } from './supplements.elite';

/**
 * Array con todos los suplementos (legacy)
 * @deprecated Use getSupplementsByTier() or specific tier imports instead
 */
export const REAL_SUPPLEMENTS = [
  ...ESENCIAL_SUPPLEMENTS,
  ...PREMIUM_SUPPLEMENTS,
  ...ELITE_SUPPLEMENTS
];