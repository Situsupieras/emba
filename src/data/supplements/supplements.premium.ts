// src/data/supplements/supplements.premium.ts
// Productos de línea PREMIUM - Target: profesionales 30-38, mejor biodisponibilidad

import { RealSupplement } from './types';
import { BRANDS, CERTIFICATIONS, BADGES, SHIPPING } from './constants';

export const PREMIUM_SUPPLEMENTS: RealSupplement[] = [
  {
    id: 'prenatal-premium',
    name: 'Prenatal Premium Completo',
    scientificName: 'Complejo vitamínico prenatal de grado médico',
    description: 'Multivitamínico prenatal premium con metilfolato, forma activa de B12 y nutrientes quelatados',
    brand: BRANDS.RITUAL,
    amazonASIN: 'B09W363MVD',
    tier: 'premium',
    recommendedDose: '2 cápsulas al día',
    priority: 'essential',
    trimesters: [1, 2, 3],
    benefits: {
      mother: ['Nutrición científicamente optimizada', 'Sin náuseas gracias a cápsula retardada', 'Mayor biodisponibilidad'],
      baby: ['Desarrollo cerebral superior', 'Metilfolato mejor absorbido', 'Omega-3 vegano incluido']
    },
    timing: 'any',
    medicalExplanation: 'Fórmula de nueva generación con 12 nutrientes trazables hasta su origen. Incluye metilfolato (forma activa), hierro quelado (sin estreñimiento), vitamina D3 vegana, B12 metilcobalamina, colina, omega-3 de microalgas. Cápsula retardada libera en intestino delgado para eliminar náuseas.',
    specialConsiderations: {
      age35Plus: 'Fórmula óptima para edad avanzada materna, biodisponibilidad superior',
      multiparous: 'Excelente para recuperar reservas nutricionales',
      vegetarian: 'Cápsula vegetal, todos los ingredientes plant-based',
      vegan: 'Completamente vegano, incluye DHA de microalgas'
    },
    contraindications: ['Hipersensibilidad a algún componente'],
    interactions: ['Separar de levotiroxina 4h', 'No combinar con otros multivitamínicos'],
    sideEffects: ['Mínimos gracias a liberación retardada', 'Raramente: malestar digestivo leve'],
    certifications: [CERTIFICATIONS.NON_GMO, CERTIFICATIONS.VEGAN, CERTIFICATIONS.GLUTEN_FREE, 'Major Allergen Free', 'Made Traceable'],
    badges: [BADGES.PREMIUM, BADGES.VEGAN, BADGES.NO_NAUSEA, BADGES.TRACEABLE],
    image: 'https://via.placeholder.com/150',
    priceGTQ: 679,
    shippingDays: SHIPPING.STANDARD,
    inStock: true
  },
  {
    id: 'dha-premium',
    name: 'DHA Omega-3 Premium 1000mg',
    scientificName: 'Ácido docosahexaenoico + EPA',
    description: 'Omega-3 de grado farmacéutico, triple purificado, sin sabor a pescado',
    brand: BRANDS.NORDIC_NATURALS,
    amazonASIN: 'B001VZLB8W',
    tier: 'premium',
    recommendedDose: '480 mg DHA + 205 mg EPA por día',
    priority: 'recommended',
    trimesters: [2, 3],
    benefits: {
      mother: ['Reduce 42% riesgo de depresión postparto', 'Disminuye riesgo de parto prematuro', 'Antiinflamatorio natural'],
      baby: ['Desarrollo cerebral superior (IQ +3-5 puntos)', 'Agudeza visual mejorada', 'Menos alergias infantiles']
    },
    timing: 'with_meals',
    medicalExplanation: 'DHA constituye 40% de ácidos grasos del cerebro y 60% de la retina. Durante T3, el cerebro fetal acumula 50-70 mg/día. Nordic Naturals usa aceite de anchoa/sardina pequeñas (bajo mercurio), triple destilación molecular. Certificación IFOS 5 estrellas (máxima pureza).',
    specialConsiderations: {
      age35Plus: '500 mg DHA por mayor riesgo de parto pretérmino',
      multiparous: 'Si antecedente de pretérmino: continuar hasta semana 37',
      vegetarian: 'Usar versión de microalgas (ver línea Elite)',
      vegan: 'Usar Ovega-3 (microalgas, ver línea Elite)'
    },
    contraindications: ['Alergia a pescado (usar microalgas)', 'Trastornos de coagulación sin supervisión médica'],
    interactions: ['Anticoagulantes: consultar médico', 'Puede potenciar efecto de aspirina'],
    sideEffects: ['Eructos con sabor limón (fórmula saborizada)', 'Raramente: heces blandas'],
    certifications: ['IFOS 5-Star', 'Friend of the Sea', CERTIFICATIONS.NON_GMO, 'No Gluten/Dairy'],
    badges: [BADGES.PREMIUM, 'IFOS 5★', BADGES.MERCURY_FREE, 'Sabor Limón'],
    image: 'https://via.placeholder.com/150',
    priceGTQ: 449,
    shippingDays: SHIPPING.STANDARD,
    inStock: true
  },
  {
    id: 'probiotic-premium',
    name: 'Probiótico Prenatal 20 Billones CFU',
    scientificName: 'Lactobacillus + Bifidobacterium complex',
    description: 'Probiótico específico para embarazo con 16 cepas clínicamente estudiadas',
    brand: BRANDS.GARDEN_OF_LIFE,
    amazonASIN: 'B01J6BQQ6C',
    tier: 'premium',
    recommendedDose: '1 cápsula al día',
    priority: 'recommended',
    trimesters: [1, 2, 3],
    benefits: {
      mother: ['Reduce estreñimiento y náuseas', 'Fortalece sistema inmune', 'Previene candidiasis vaginal'],
      baby: ['Microbioma saludable desde nacimiento', 'Reduce riesgo de alergias 50%', 'Menos cólicos infantiles']
    },
    timing: 'morning',
    medicalExplanation: 'El microbioma materno coloniza al bebé durante el parto vaginal. Estudios muestran que probióticos prenatales reducen eccema infantil 50% y alergias alimentarias 40%. Incluye L. rhamnosus GG (más estudiada) y L. reuteri (reduce cólicos).',
    specialConsiderations: {
      age35Plus: 'Beneficio adicional por sistema inmune',
      multiparous: 'Si cesárea previa: extra importante para parto vaginal',
      vegetarian: 'Cápsula vegetariana, apto',
      vegan: 'Completamente vegano y orgánico'
    },
    contraindications: ['Inmunosupresión severa', 'Válvulas cardiacas artificiales (consultar)'],
    interactions: ['Antibióticos reducen efecto (tomar 2h después)'],
    sideEffects: ['Primera semana: gases leves (adaptación)', 'Muy raros después'],
    certifications: [CERTIFICATIONS.USDA_ORGANIC, CERTIFICATIONS.NON_GMO, CERTIFICATIONS.GLUTEN_FREE, CERTIFICATIONS.VEGAN, 'No Refrigeration Needed'],
    badges: [BADGES.PREMIUM, BADGES.ORGANIC, BADGES.VEGAN, '20 Mil Millones'],
    image: 'https://via.placeholder.com/150',
    priceGTQ: 389,
    shippingDays: SHIPPING.STANDARD,
    inStock: true
  },
  {
    id: 'choline-premium',
    name: 'Colina 450mg Premium',
    scientificName: 'Bitartrato de colina',
    description: 'Nutriente emergente para memoria y desarrollo cognitivo superior del bebé',
    brand: BRANDS.NOW_FOODS,
    amazonASIN: 'B0013OSGJ6',
    tier: 'premium',
    recommendedDose: '450 mg/día',
    priority: 'recommended',
    trimesters: [1, 2, 3],
    benefits: {
      mother: ['Salud hepática', 'Función cognitiva mejorada', 'Reduce riesgo de hígado graso'],
      baby: ['Memoria superior a largo plazo', 'Atención sostenida mejorada', 'CI +7 puntos en estudios']
    },
    timing: 'with_meals',
    medicalExplanation: 'Estudios de Cornell (2024) muestran que 930 mg/día en T2-T3 mejoran memoria y atención del niño hasta los 7 años. Solo 10% de embarazadas alcanza ingesta adecuada. Esencial para acetilcolina (neurotransmisor) y membranas celulares.',
    specialConsiderations: {
      age35Plus: 'Considerar elevar a 930 mg/día en T2-T3 (2 cápsulas)',
      multiparous: 'Reservas menores si hubo lactancia prolongada',
      vegetarian: 'Riesgo si evita huevos: esencial suplementar',
      vegan: 'Alto riesgo sin huevo/carne: obligatorio suplementar'
    },
    contraindications: ['>3.5 g/día causan hipotensión'],
    interactions: ['Sinergia con folato y B12'],
    sideEffects: ['Olor corporal a pescado solo con >2g/día', 'Náuseas leves raras'],
    certifications: [CERTIFICATIONS.GMP, CERTIFICATIONS.KOSHER, CERTIFICATIONS.NON_GMO, CERTIFICATIONS.VEGAN],
    badges: [BADGES.PREMIUM, BADGES.VEGAN, 'Neurociencia', 'NOW Foods'],
    image: 'https://via.placeholder.com/150',
    priceGTQ: 289,
    shippingDays: SHIPPING.STANDARD,
    inStock: true
  },
  {
    id: 'magnesium-premium',
    name: 'Magnesio Glicinato 200mg',
    scientificName: 'Magnesio quelado con glicina',
    description: 'Forma premium de magnesio de alta absorción y sin efecto laxante',
    brand: BRANDS.PURE_ENCAPSULATIONS,
    amazonASIN: 'B000FGYOG2',
    tier: 'premium',
    recommendedDose: '200 mg al día',
    priority: 'optional',
    trimesters: [2, 3],
    benefits: {
      mother: ['Elimina calambres nocturnos 90%', 'Mejora calidad del sueño', 'Reduce contracciones Braxton Hicks'],
      baby: ['Desarrollo neuromuscular', 'Mineralización ósea', 'Regulación ritmo cardiaco']
    },
    timing: 'night',
    medicalExplanation: 'El magnesio glicinato es la forma mejor absorbida (80% vs 30% del óxido) y no causa diarrea. Alivia calambres en piernas que afectan al 50% en T3. También mejora estreñimiento sin efecto laxante agresivo. Pure Encapsulations es marca hipoalergénica.',
    specialConsiderations: {
      age35Plus: 'Útil para calambres y calidad de sueño',
      multiparous: 'Calambres más frecuentes en T3',
      vegetarian: 'Cápsula vegetariana, apto',
      vegan: 'Completamente vegano'
    },
    contraindications: ['Insuficiencia renal severa', 'Bloqueo cardiaco'],
    interactions: ['Reduce absorción de antibióticos (separar 2h)', 'Bifosfonatos (separar 2h)'],
    sideEffects: ['Mínimos con glicinato', 'Raramente: somnolencia excesiva'],
    certifications: [CERTIFICATIONS.HYPOALLERGENIC, CERTIFICATIONS.GLUTEN_FREE, CERTIFICATIONS.NON_GMO, CERTIFICATIONS.VEGAN],
    badges: [BADGES.PREMIUM, BADGES.HYPOALLERGENIC, 'Sin Laxante', 'Médicos Recomiendan'],
    image: 'https://via.placeholder.com/150',
    priceGTQ: 329,
    shippingDays: SHIPPING.STANDARD,
    inStock: true
  }
];