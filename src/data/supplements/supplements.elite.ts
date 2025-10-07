// src/data/supplements/supplements.elite.ts
// Productos de línea ELITE - Target: 35+, veganas, ejecutivas, dosis óptimas

import { RealSupplement } from './types';
import { BRANDS, CERTIFICATIONS, BADGES, SHIPPING } from './constants';

export const ELITE_SUPPLEMENTS: RealSupplement[] = [
  {
    id: 'prenatal-elite',
    name: 'Prenatal Elite Óptimo',
    scientificName: 'Complejo prenatal de dosis terapéuticas',
    description: 'El prenatal más completo del mercado con dosis óptimas basadas en investigación científica',
    brand: BRANDS.FULLWELL,
    amazonASIN: 'B08CNKQ2VD',
    tier: 'elite',
    recommendedDose: '8 cápsulas al día (dividir en 2-3 tomas)',
    priority: 'essential',
    trimesters: [1, 2, 3],
    benefits: {
      mother: ['Nutrición óptima de grado funcional', 'Formulado por nutricionista prenatal', 'Formas más biodisponibles'],
      baby: ['Dosis terapéuticas para desarrollo superior', 'Incluye nutrientes olvidados (boro, manganeso)', 'Base para CI superior']
    },
    timing: 'with_meals',
    medicalExplanation: 'Formulado por Ayla Barmmer (MS, RD) con dosis basadas en Optimal Prenatal Nutrition (no mínimos RDA). Incluye: metilfolato 1000mcg, colina 300mg (agregar 600mg más), hierro quelado 27mg, magnesio 300mg, zinc 25mg, vitaminas liposomales. 8 cápsulas pequeñas vs 6 grandes.',
    specialConsiderations: {
      age35Plus: 'Fórmula diseñada específicamente para edad avanzada materna',
      multiparous: 'Ideal para recuperación nutricional profunda',
      vegetarian: 'Cápsula vegetariana, apto',
      vegan: 'Apto, agregar DHA de microalgas'
    },
    contraindications: ['Hipersensibilidad', 'Hemocromatosis (por hierro)'],
    interactions: ['No combinar con otros multivitamínicos', 'Levotiroxina (separar 4h)'],
    sideEffects: ['Mínimos por formas queladas', 'Orina amarilla brillante (B2, normal)'],
    certifications: ['Third-Party Tested', CERTIFICATIONS.NON_GMO, CERTIFICATIONS.GLUTEN_FREE, 'Soy Free'],
    badges: [BADGES.ELITE, 'Funcional', 'Nutricionista Formulado', 'Dosis Óptimas'],
    image: 'https://via.placeholder.com/150',
    priceGTQ: 1069,
    shippingDays: SHIPPING.STANDARD,
    inStock: true
  },
  {
    id: 'dha-elite-vegan',
    name: 'DHA Vegano de Microalgas 500mg',
    scientificName: 'DHA de Schizochytrium sp. (microalgas)',
    description: 'DHA 100% vegano de microalgas, más puro que aceite de pescado, sin contaminantes',
    brand: BRANDS.OVEGA,
    amazonASIN: 'B004LL7AXE',
    tier: 'elite',
    recommendedDose: '500 mg DHA + 135 mg EPA por día',
    priority: 'recommended',
    trimesters: [2, 3],
    benefits: {
      mother: ['Fuente vegana sostenible', 'Sin metales pesados', 'Sin sabor a pescado'],
      baby: ['Desarrollo cerebral superior', 'DHA es la fuente original (peces lo obtienen de algas)', 'Más estable (no oxidado)']
    },
    timing: 'with_meals',
    medicalExplanation: 'Las microalgas son la fuente ORIGINAL de DHA (los peces lo acumulan comiendo algas). Ventajas: cero mercurio/PCBs, más sustentable, menos oxidación. Estudio 2023: DHA de algas = bioequivalente a pescado. Ideal para veganas, vegetarianas o alérgicas a pescado.',
    specialConsiderations: {
      age35Plus: 'Excelente opción premium',
      multiparous: 'Si antecedente de pretérmino, ideal',
      vegetarian: 'Solución perfecta, vegetal',
      vegan: 'Única opción ética y efectiva'
    },
    contraindications: ['Ninguna conocida'],
    interactions: ['Anticoagulantes: monitoreo médico'],
    sideEffects: ['Prácticamente ninguno', 'Sin eructos de pescado'],
    certifications: [CERTIFICATIONS.VEGAN, CERTIFICATIONS.NON_GMO, CERTIFICATIONS.GLUTEN_FREE, 'Carrageenan Free'],
    badges: [BADGES.ELITE, BADGES.VEGAN, BADGES.MERCURY_FREE, BADGES.SUSTAINABLE],
    image: 'https://via.placeholder.com/150',
    priceGTQ: 549,
    shippingDays: SHIPPING.STANDARD,
    inStock: true
  },
  {
    id: 'methylfolate-elite',
    name: 'Metilfolato 1000mcg (Forma Activa)',
    scientificName: 'L-5-metiltetrahidrofolato (forma activa)',
    description: 'Forma activa de folato, no requiere conversión metabólica (ideal para mutación MTHFR)',
    brand: BRANDS.THORNE,
    amazonASIN: 'B0797GGV7Q',
    tier: 'elite',
    recommendedDose: '1000 mcg/día',
    priority: 'essential',
    trimesters: [1, 2, 3],
    benefits: {
      mother: ['Activo inmediatamente', 'Ideal para mutación MTHFR (40% población)', 'Mayor biodisponibilidad'],
      baby: ['Reducción máxima de DTN', 'No depende de conversión enzimática', 'Protección superior']
    },
    timing: 'morning',
    medicalExplanation: '40% de población tiene mutación MTHFR que dificulta convertir ácido fólico sintético en forma activa (metilfolato). Esta forma ya está activada, biodisponible al 100%. Thorne es marca de grado médico usada en estudios clínicos. Dosis 1000mcg ofrece protección superior vs 400mcg estándar.',
    specialConsiderations: {
      age35Plus: 'Mayor riesgo de DTN, forma activa óptima',
      multiparous: 'Si embarazos cercanos, forma activa asegura niveles',
      vegetarian: 'Cápsula vegetariana, apto',
      vegan: 'Completamente vegano'
    },
    contraindications: ['Hipersensibilidad al folato'],
    interactions: ['No enmascara déficit B12 como ácido fólico sintético'],
    sideEffects: ['Prácticamente ninguno', 'Mejor tolerado que sintético'],
    certifications: [CERTIFICATIONS.NSF + ' Sport Certified', CERTIFICATIONS.GLUTEN_FREE, 'Dairy Free'],
    badges: [BADGES.ELITE, BADGES.ACTIVE_FORM, BADGES.MTHFR_FRIENDLY, BADGES.MEDICAL_GRADE],
    image: 'https://via.placeholder.com/150',
    priceGTQ: 429,
    shippingDays: SHIPPING.STANDARD,
    inStock: true
  },
  {
    id: 'b12-elite',
    name: 'B12 Metilcobalamina 5000mcg',
    scientificName: 'Metilcobalamina (forma activa)',
    description: 'Vitamina B12 en su forma más biodisponible, sublingual de absorción rápida',
    brand: BRANDS.PURE_ENCAPSULATIONS,
    amazonASIN: 'B0017LXN1A',
    tier: 'elite',
    recommendedDose: '5000 mcg (1 cápsula) al día',
    priority: 'essential',
    trimesters: [1, 2, 3],
    benefits: {
      mother: ['Energía inmediata', 'Previene anemia megaloblástica', 'Mejora función cognitiva'],
      baby: ['Neurodesarrollo óptimo', 'Previene retraso desarrollo', 'Formación de glóbulos rojos']
    },
    timing: 'morning',
    medicalExplanation: 'Metilcobalamina es forma activa (vs cianocobalamina sintética que requiere conversión). Esencial para síntesis ADN y mielina nerviosa. Deficiencia causa daño neurológico IRREVERSIBLE en bebé. Obligatorio para veganas/vegetarianas. 5000mcg asegura saturación de receptores.',
    specialConsiderations: {
      age35Plus: 'Absorción reducida por gastritis atrófica, dosis alta compensa',
      multiparous: 'Lactancias previas agotan reservas significativamente',
      vegetarian: 'Suplementación obligatoria',
      vegan: 'CRÍTICO: única fuente confiable es suplemento'
    },
    contraindications: ['Neuropatía óptica de Leber (evitar cianocobalamina, usar metil)'],
    interactions: ['Metformina reduce absorción (común en SOP)', 'IBP reducen absorción'],
    sideEffects: ['Ninguno conocido', 'Orina amarilla (normal)'],
    certifications: [CERTIFICATIONS.HYPOALLERGENIC, CERTIFICATIONS.GLUTEN_FREE, CERTIFICATIONS.NON_GMO, CERTIFICATIONS.VEGAN],
    badges: [BADGES.ELITE, BADGES.ACTIVE_FORM, BADGES.HYPOALLERGENIC, 'Esencial Vegano'],
    image: 'https://via.placeholder.com/150',
    priceGTQ: 349,
    shippingDays: SHIPPING.STANDARD,
    inStock: true
  },
  {
    id: 'calcium-elite',
    name: 'Calcio Citrato + K2 + D3 Elite',
    scientificName: 'Citrato de calcio + Menaquinona-7 + Colecalciferol',
    description: 'Fórmula sinérgica: calcio mejor absorbido + K2 dirige calcio a huesos + D3 optimiza absorción',
    brand: BRANDS.THORNE,
    amazonASIN: 'B000FQNZVE',
    tier: 'elite',
    recommendedDose: '500 mg calcio, 2-3 veces al día',
    priority: 'recommended',
    trimesters: [2, 3],
    benefits: {
      mother: ['Máxima absorción con citrato', 'K2 previene calcificación arterial', 'D3 optimiza uso'],
      baby: ['Mineralización ósea superior', 'K2 guía calcio a huesos (no arterias)', 'Desarrollo dental óptimo']
    },
    timing: 'with_meals',
    medicalExplanation: 'Citrato se absorbe 2x mejor que carbonato y no requiere ácido estomacal. Vitamina K2 (MK-7) activa osteocalcina que "pega" calcio en huesos y previene depósitos arteriales. D3 aumenta absorción intestinal 60%. Sinergia perfecta para salud ósea y cardiovascular.',
    specialConsiderations: {
      age35Plus: 'Fórmula óptima para prevención preeclampsia',
      multiparous: 'Si antecedente preeclampsia: iniciar semana 14',
      vegetarian: 'Cápsula vegetal, apto',
      vegan: 'D3 vegana (líquenes), K2 vegano (natto)'
    },
    contraindications: ['Hipercalcemia', 'Cálculos renales activos'],
    interactions: ['Warfarina (K2 es seguro con MK-7)', 'Levotiroxina (separar 4h)'],
    sideEffects: ['Mínimos con citrato', 'Sin estreñimiento vs carbonato'],
    certifications: [CERTIFICATIONS.NSF + ' Sport', CERTIFICATIONS.GLUTEN_FREE, CERTIFICATIONS.NON_GMO],
    badges: [BADGES.ELITE, 'Con K2', BADGES.HIGH_ABSORPTION, BADGES.MEDICAL_GRADE],
    image: 'https://via.placeholder.com/150',
    priceGTQ: 459,
    shippingDays: SHIPPING.STANDARD,
    inStock: true
  },
  {
    id: 'choline-elite',
    name: 'Colina 600mg Óptima',
    scientificName: 'Fosfatidilcolina + Bitartrato de colina',
    description: 'Dosis óptima para máximo beneficio cognitivo del bebé (estudios Cornell)',
    brand: BRANDS.SEEKING_HEALTH,
    amazonASIN: 'B00E8KRQ3A',
    tier: 'elite',
    recommendedDose: '600 mg/día (complementar a 930 mg con dieta)',
    priority: 'recommended',
    trimesters: [2, 3],
    benefits: {
      mother: ['Previene hígado graso', 'Mejora memoria gestacional', 'Salud cardiovascular'],
      baby: ['Memoria +18% a largo plazo', 'Atención sostenida superior', 'Velocidad procesamiento +15%']
    },
    timing: 'with_meals',
    medicalExplanation: 'Estudio Cornell 2024: 930 mg/día en T2-T3 mejora función cognitiva del niño medida a los 7 años (memoria, atención, velocidad procesamiento). 95% de embarazadas NO alcanzan esta dosis. Fosfatidilcolina es forma fosfolípida mejor absorbida. Seeking Health es marca de Dr. Ben Lynch (genetista).',
    specialConsiderations: {
      age35Plus: 'CRÍTICO: elevar a 930 mg/día total (suplemento + dieta)',
      multiparous: 'Reservas depletas si lactancia previa',
      vegetarian: 'Si evita huevos: esencial suplementar 600-930 mg',
      vegan: 'CRÍTICO: 930 mg/día obligatorio (huevos son fuente principal)'
    },
    contraindications: ['>3500 mg/día causan hipotensión y olor a pescado'],
    interactions: ['Sinergia con folato, B12 para metilación'],
    sideEffects: ['Olor corporal a pescado solo >2000 mg/día', 'GI leve raro'],
    certifications: [CERTIFICATIONS.NON_GMO, CERTIFICATIONS.GLUTEN_FREE, CERTIFICATIONS.VEGAN],
    badges: [BADGES.ELITE, 'Dosis Óptima', 'Neurociencia', 'Cornell Study'],
    image: 'https://via.placeholder.com/150',
    priceGTQ: 489,
    shippingDays: SHIPPING.STANDARD,
    inStock: true
  },
  {
    id: 'iodine-elite',
    name: 'Yodo de Kelp Orgánico 325mcg',
    scientificName: 'Yodo natural de Laminaria japonica',
    description: 'Yodo orgánico de alga kelp con cofactores naturales para máxima absorción',
    brand: BRANDS.GARDEN_OF_LIFE,
    amazonASIN: 'B00Y2BTTP6',
    tier: 'elite',
    recommendedDose: '325 mcg/día (incluye 225 mcg de alimento + 150 mcg suplemento)',
    priority: 'essential',
    trimesters: [1, 2, 3],
    benefits: {
      mother: ['Previene hipotiroidismo', 'Metabolismo óptimo', 'Energía sostenida'],
      baby: ['CI +13 puntos vs deficiencia', 'Previene cretinismo', 'Desarrollo tiroideo normal']
    },
    timing: 'with_meals',
    medicalExplanation: 'Yodo es crítico para hormonas tiroideas T3/T4 que regulan desarrollo cerebral fetal. Deficiencia en T1 causa daño IRREVERSIBLE (CI reducido 13 puntos). Guatemala es zona de deficiencia endémica. Kelp orgánico aporta yodo natural + minerales traza sinérgicos.',
    specialConsiderations: {
      age35Plus: 'Mayor prevalencia tiroiditis autoinmune: monitorear TSH',
      multiparous: 'Lactancia agota reservas: esencial desde preconcepcional',
      vegetarian: 'Riesgo si no usa sal yodada: suplementar',
      vegan: 'ALTO RIESGO: sal yodada + 150-225 mcg/día obligatorio'
    },
    contraindications: ['Hipertiroidismo activo', 'Alergia a mariscos (kelp es seguro)', 'Evitar >500 mcg/día'],
    interactions: ['Amiodarona (sobrecarga yodo)', 'Antitiroideos: ajustar dosis'],
    sideEffects: ['Ninguno a dosis recomendada', 'Exceso >500mcg: hipertiroidismo'],
    certifications: [CERTIFICATIONS.USDA_ORGANIC, CERTIFICATIONS.NON_GMO, CERTIFICATIONS.VEGAN, CERTIFICATIONS.GLUTEN_FREE],
    badges: [BADGES.ELITE, BADGES.ORGANIC, BADGES.VEGAN, 'Kelp Natural'],
    image: 'https://via.placeholder.com/150',
    priceGTQ: 319,
    shippingDays: SHIPPING.STANDARD,
    inStock: true
  },
  {
    id: 'vitamin-d-elite',
    name: 'Vitamina D3 5000 UI Premium',
    scientificName: 'Colecalciferol D3 de alta potencia',
    description: 'Dosis terapéutica para corregir deficiencia (común en Guatemala)',
    brand: BRANDS.THORNE,
    amazonASIN: 'B0047HWVTY',
    tier: 'elite',
    recommendedDose: '5000 UI/día (si deficiencia) o 2000 UI (mantenimiento)',
    priority: 'recommended',
    trimesters: [1, 2, 3],
    benefits: {
      mother: ['Reduce preeclampsia 50%', 'Previene diabetes gestacional', 'Sistema inmune óptimo'],
      baby: ['Mineralización ósea superior', 'Previene raquitismo', 'Menos infecciones respiratorias']
    },
    timing: 'with_meals',
    medicalExplanation: 'Deficiencia D (<20 ng/mL) afecta 60% embarazadas en Guatemala (baja exposición solar). Dosis 4000-5000 UI/día es segura y necesaria para alcanzar 40-60 ng/mL óptimo. Reduce riesgo preeclampsia 50% y DG 40%. Thorne usa D3 (22x más potente que D2).',
    specialConsiderations: {
      age35Plus: 'Deficiencia común: medir 25(OH)D, ajustar dosis',
      multiparous: 'Lactancias previas reducen reservas',
      vegetarian: 'Verificar fuente D3 (lanolina oveja es aceptable)',
      vegan: 'Usar D3 vegana de líquenes (vitashine)'
    },
    contraindications: ['Hipercalcemia', 'Sarcoidosis', 'Hiperparatiroidismo'],
    interactions: ['Aumenta absorción calcio (beneficioso)', 'Anticonvulsivantes aumentan catabolismo'],
    sideEffects: ['Ninguno a dosis recomendada', 'Toxicidad solo >10,000 UI/día crónico'],
    certifications: [CERTIFICATIONS.NSF + ' Sport', CERTIFICATIONS.GLUTEN_FREE, CERTIFICATIONS.NON_GMO],
    badges: [BADGES.ELITE, 'Alta Potencia', BADGES.MEDICAL_GRADE, 'NSF'],
    image: 'https://via.placeholder.com/150',
    priceGTQ: 349,
    shippingDays: SHIPPING.STANDARD,
    inStock: true
  }
];