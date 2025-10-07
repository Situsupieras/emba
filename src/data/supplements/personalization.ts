// src/data/supplements/personalization.ts
// Lógica de personalización de recomendaciones de suplementos

import { 
  RealSupplement, 
  UserSupplementProfile, 
  PersonalizedRecommendations,
  ProductTier 
} from './types';
import { ESENCIAL_SUPPLEMENTS } from './supplements.esencial';
import { PREMIUM_SUPPLEMENTS } from './supplements.premium';
import { ELITE_SUPPLEMENTS } from './supplements.elite';
import { SUPPLEMENT_BUNDLES } from './bundles';

/**
 * Obtiene todos los suplementos disponibles
 */
function getAllSupplements(): RealSupplement[] {
  return [...ESENCIAL_SUPPLEMENTS, ...PREMIUM_SUPPLEMENTS, ...ELITE_SUPPLEMENTS];
}

/**
 * Filtra suplementos por tier
 */
export function getSupplementsByTier(tier: ProductTier): RealSupplement[] {
  const allSupplements = getAllSupplements();
  return allSupplements.filter(s => s.tier === tier);
}

/**
 * Determina el tier recomendado según perfil
 */
function getRecommendedTier(userProfile: UserSupplementProfile): ProductTier {
  const { age, diet, previousChildren } = userProfile;
  
  // Elite para casos especiales
  if (diet === 'vegana') return 'elite';
  if (age >= 35) return 'elite';
  if (previousChildren >= 3) return 'premium';
  
  // Premium por defecto (target medio-alto)
  return 'premium';
}

/**
 * Obtiene recomendaciones personalizadas de suplementos
 */
export function getPersonalizedSupplements(
  userProfile: UserSupplementProfile
): PersonalizedRecommendations {
  const trimester = Math.ceil(userProfile.currentWeek / 13.33);
  const isAge35Plus = userProfile.age >= 35;
  const isMultiparous = userProfile.previousChildren > 0;
  const recommendedTier = getRecommendedTier(userProfile);
  
  // Obtener suplementos relevantes
  const allSupplements = getAllSupplements();
  
  // Filtrar por trimestre y tier apropiado
  const relevantSupplements = allSupplements.filter(supp => {
    const isRelevantTrimester = supp.trimesters.includes(trimester);
    const isAppropriatedTier = supp.tier === recommendedTier || supp.tier === 'esencial';
    return isRelevantTrimester && isAppropriatedTier;
  });

  // Clasificar por prioridad
  const essential = relevantSupplements.filter(s => s.priority === 'essential');
  const recommended = relevantSupplements.filter(s => s.priority === 'recommended');
  const optional = relevantSupplements.filter(s => s.priority === 'optional');

  // Sugerir bundle apropiado
  let suggestedBundle = null;
  
  if (userProfile.diet === 'vegana') {
    suggestedBundle = SUPPLEMENT_BUNDLES.find(b => b.id === 'bundle-elite-vegano') || null;
  } else if (isAge35Plus) {
    suggestedBundle = SUPPLEMENT_BUNDLES.find(b => b.id === 'bundle-edad-avanzada') || null;
  } else if (trimester === 1) {
    suggestedBundle = SUPPLEMENT_BUNDLES.find(b => b.id === 'bundle-trimestre1') || null;
  } else if (trimester >= 2) {
    suggestedBundle = SUPPLEMENT_BUNDLES.find(b => b.id === 'bundle-trimestre2-3') || null;
  } else {
    suggestedBundle = SUPPLEMENT_BUNDLES.find(b => b.id === 'bundle-premium-completo') || null;
  }

  // Generar notas personalizadas
  const personalizedNotes = generatePersonalizedNotes(userProfile, trimester, isAge35Plus, isMultiparous);

  return {
    essential,
    recommended,
    optional,
    suggestedBundle,
    personalizedNotes
  };
}

/**
 * Genera notas personalizadas según perfil
 */
function generatePersonalizedNotes(
  userProfile: UserSupplementProfile,
  trimester: number,
  isAge35Plus: boolean,
  isMultiparous: boolean
): string[] {
  const notes: string[] = [];

  // Notas por edad
  if (isAge35Plus) {
    notes.push(
      '👩 **Edad 35+**: Recomendamos línea Premium/Elite. Mayor riesgo de anemia (hierro extra), preeclampsia (calcio 1500mg), y necesitas vitamina D alta potencia.'
    );
  }

  // Notas por paridad
  if (isMultiparous) {
    notes.push(
      '👶 **Multípara**: Las reservas de hierro, calcio, B12 y colina pueden estar bajas por embarazos/lactancias previas. Solicita panel de ferritina.'
    );
  }

  // Notas por dieta
  switch (userProfile.diet) {
    case 'vegetariana':
      notes.push(
        '🥗 **Dieta vegetariana**: CRÍTICO suplementar B12 (forma activa), hierro con vitamina C, zinc y asegurar calcio 1200mg/día. Considera DHA de microalgas.'
      );
      break;
    case 'vegana':
      notes.push(
        '🌱 **Dieta vegana**: Línea ELITE obligatoria. B12 metilcobalamina 5000mcg diario es VITAL (daño neurológico irreversible). DHA microalgas, yodo 225mcg, calcio citrato, colina 600-930mg. No negociable.'
      );
      break;
  }

  // Notas por trimestre
  if (trimester === 1) {
    notes.push(
      '📅 **Primer trimester (Semanas 1-13)**: Ácido fólico y yodo son CRÍTICOS ahora para prevenir defectos del tubo neural. Considera metilfolato si tienes mutación MTHFR.'
    );
  } else if (trimester === 2) {
    notes.push(
      '📅 **Segundo trimester (Semanas 14-27)**: Aumenta calcio a 1500mg y añade DHA 300-500mg para desarrollo cerebral. El bebé está construyendo huesos y neuronas rápidamente.'
    );
  } else if (trimester === 3) {
    notes.push(
      '📅 **Tercer trimester (Semanas 28-40)**: Hierro es crítico ahora (volumen sanguíneo máximo). DHA hasta semana 37, magnesio para calambres. El cerebro del bebé acumula 50-70mg DHA/día.'
    );
  }

  // Nota para primera compra
  if (!userProfile.hasBoughtSupplements) {
    notes.push(
      '🎁 **Primera compra**: Considera nuestros bundles con 10-11% descuento. Incluyen todo lo necesario para 1 mes y ahorras en envío consolidado desde Amazon USA.'
    );
  }

  // Nota sobre importación Guatemala
  notes.push(
    '🇬🇹 **Importación Guatemala**: Todos los productos llegan en 7-10 días desde Amazon USA. Precios en Quetzales incluyen envío e impuestos. Sin sorpresas.'
  );

  return notes;
}

/**
 * Filtra suplementos según consideraciones especiales
 */
export function filterByDietaryRestrictions(
  supplements: RealSupplement[],
  diet: 'omnivora' | 'vegetariana' | 'vegana'
): RealSupplement[] {
  if (diet === 'omnivora') return supplements;
  
  return supplements.filter(supp => {
    const considerations = supp.specialConsiderations;
    
    if (diet === 'vegana') {
      // Excluir si tiene nota negativa para veganos
      if (considerations.vegan?.includes('No apto')) return false;
      // Preferir productos con certificación vegana
      return supp.certifications.includes('Vegan') || !considerations.vegan;
    }
    
    if (diet === 'vegetariana') {
      // Excluir si tiene nota negativa para vegetarianos
      if (considerations.vegetarian?.includes('No apto')) return false;
      return true;
    }
    
    return true;
  });
}

/**
 * Obtiene suplementos por prioridad
 */
export function getSupplementsByPriority(
  supplements: RealSupplement[],
  priority: 'essential' | 'recommended' | 'optional'
): RealSupplement[] {
  return supplements.filter(s => s.priority === priority);
}

/**
 * Busca suplemento por ID
 */
export function getSupplementById(id: string): RealSupplement | undefined {
  const allSupplements = getAllSupplements();
  return allSupplements.find(s => s.id === id);
}

/**
 * Calcula precio total de una lista de suplementos
 */
export function calculateTotalPrice(supplementIds: string[]): number {
  const allSupplements = getAllSupplements();
  return supplementIds.reduce((total, id) => {
    const supplement = allSupplements.find(s => s.id === id);
    return total + (supplement?.priceGTQ || 0);
  }, 0);
}

/**
 * Obtiene alternativas por tier
 */
export function getAlternativesByTier(
  supplementId: string,
  targetTier: ProductTier
): RealSupplement[] {
  const original = getSupplementById(supplementId);
  if (!original) return [];
  
  const allSupplements = getAllSupplements();
  
  // Buscar suplementos del mismo tipo (por nombre científico similar)
  return allSupplements.filter(s => 
    s.id !== supplementId &&
    s.tier === targetTier &&
    s.scientificName.includes(original.scientificName.split(' ')[0])
  );
}