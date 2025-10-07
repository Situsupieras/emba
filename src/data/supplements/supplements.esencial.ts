// src/data/supplements/supplements.esencial.ts
// Productos de línea ESENCIAL - Target: precio consciente, accesible, confiable

import { RealSupplement } from './types';
import { BRANDS, CERTIFICATIONS, BADGES, SHIPPING } from './constants';

export const ESENCIAL_SUPPLEMENTS: RealSupplement[] = [
  {
    id: 'prenatal-esencial',
    name: 'Prenatal Multivitamínico Esencial',
    scientificName: 'Complejo vitamínico prenatal completo',
    description: 'Multivitamínico prenatal completo con todas las vitaminas esenciales para un embarazo saludable',
    brand: BRANDS.NATURE_MADE,
    amazonASIN: 'B00ARA0G8C',
    tier: 'esencial',
    recommendedDose: '1 softgel al día',
    priority: 'essential',
    trimesters: [1, 2, 3],
    benefits: {
      mother: ['Nutrición completa diaria', 'Energía y vitalidad', 'Soporte inmunológico'],
      baby: ['Desarrollo saludable integral', 'Formación de órganos vitales', 'Crecimiento óptimo']
    },
    timing: 'with_meals',
    medicalExplanation: 'Fórmula completa que incluye 23 nutrientes clave incluyendo ácido fólico (800 mcg), hierro (27 mg), calcio, vitaminas D, B6, B12 y DHA (200 mg). Nature Made es la marca #1 recomendada por farmacéuticos en USA con certificación USP, garantizando pureza y potencia verificadas.',
    specialConsiderations: {
      age35Plus: 'Fórmula completa adecuada, considerar suplementos adicionales según análisis médico',
      multiparous: 'Excelente base nutricional, añadir hierro extra si ferritina <30 ng/mL',
      vegetarian: 'Contiene gelatina, consultar alternativas veganas',
      vegan: 'No apto, ver línea Elite vegana'
    },
    contraindications: ['Hipersensibilidad a algún componente', 'Hipervitaminosis A o D'],
    interactions: ['No tomar con antiácidos (esperar 2 horas)', 'Separar de café/té por el hierro'],
    sideEffects: ['Náuseas leves si se toma en ayunas', 'Estreñimiento leve', 'Heces oscuras (normal por el hierro)'],
    certifications: [CERTIFICATIONS.USP, CERTIFICATIONS.GMP, 'No Synthetic Dyes'],
    badges: [BADGES.ESSENTIAL, BADGES.BEST_SELLER, BADGES.PHARMACIST_RECOMMENDED],
    image: 'https://via.placeholder.com/150',
    priceGTQ: 349,
    shippingDays: SHIPPING.STANDARD,
    inStock: true
  },
  {
    id: 'folic-acid-esencial',
    name: 'Ácido Fólico 800mcg',
    scientificName: 'Ácido pteroilmonoglutámico',
    description: 'Ácido fólico de alta calidad para prevenir defectos del tubo neural',
    brand: BRANDS.NATURE_MADE,
    amazonASIN: 'B000NPYY04',
    tier: 'esencial',
    recommendedDose: '800 mcg/día (1 tableta)',
    priority: 'essential',
    trimesters: [1, 2, 3],
    benefits: {
      mother: ['Previene anemia megaloblástica', 'Reduce homocisteína', 'Apoya formación de glóbulos rojos'],
      baby: ['Reduce 70% riesgo de defectos del tubo neural', 'Previene espina bífida', 'Previene defectos cardiacos']
    },
    timing: 'morning',
    medicalExplanation: 'El ácido fólico es crucial para la síntesis de ADN y división celular. Debe iniciarse 3 meses antes del embarazo y continuar durante el primer trimestre. La dosis de 800 mcg es superior a la mínima (400 mcg) y ofrece protección óptima según estudios recientes.',
    specialConsiderations: {
      age35Plus: 'Si diabetes, obesidad o antecedentes de DTN: considerar 4-5 mg/día (prescripción médica)',
      multiparous: 'Intervalos cortos entre embarazos aumentan riesgo de depleción',
      vegetarian: 'Mantener suplementación aunque haya buena ingesta de folato vegetal',
      vegan: 'Esencial mantener 800 mcg/día todo el embarazo'
    },
    contraindications: ['>1 mg/día puede enmascarar deficiencia de B12', 'Alergia al ácido fólico (raro)'],
    interactions: ['Antiepilépticos reducen absorción', 'Metotrexato (contraindicado)', 'Puede enmascarar déficit de B12'],
    sideEffects: ['Náuseas muy leves (raras)', 'Reacciones alérgicas (extremadamente raras)'],
    certifications: [CERTIFICATIONS.USP, CERTIFICATIONS.GLUTEN_FREE, 'No Artificial Colors'],
    badges: [BADGES.ESSENTIAL, 'Sin Gluten'],
    image: 'https://via.placeholder.com/150',
    priceGTQ: 149,
    shippingDays: SHIPPING.STANDARD,
    inStock: true
  },
  {
    id: 'iron-esencial',
    name: 'Hierro 27mg + Vitamina C',
    scientificName: 'Hierro elemental (sulfato ferroso)',
    description: 'Hierro de alta absorción con vitamina C para prevenir anemia',
    brand: BRANDS.NATURE_MADE,
    amazonASIN: 'B00CQ73A90',
    tier: 'esencial',
    recommendedDose: '27 mg/día con comidas',
    priority: 'essential',
    trimesters: [1, 2, 3],
    benefits: {
      mother: ['Previene anemia ferropénica', 'Reduce fatiga extrema', 'Mejora capacidad de concentración'],
      baby: ['Mejores reservas de hierro al nacer', 'Reduce riesgo de bajo peso', 'Desarrollo cognitivo óptimo']
    },
    timing: 'with_meals',
    medicalExplanation: 'Durante el embarazo, el volumen sanguíneo aumenta 50%, incrementando necesidades a 27 mg/día. La vitamina C incluida aumenta absorción hasta 3x. La deficiencia afecta al 40% de embarazadas globalmente y está asociada con parto prematuro.',
    specialConsiderations: {
      age35Plus: 'Mayor riesgo de anemia: solicitar ferritina; si <30 ng/mL considerar 60 mg/día',
      multiparous: 'Reservas frecuentemente bajas, monitorear ferritina cada trimestre',
      vegetarian: 'Hierro no hemo tiene menor biodisponibilidad, la vitamina C ayuda',
      vegan: 'Vigilar ferritina cada trimestre, combinar con alimentos ricos en vitamina C'
    },
    contraindications: ['Hemocromatosis', 'Talasemias con sobrecarga de hierro'],
    interactions: ['Calcio reduce absorción (separar 2h)', 'Antiácidos reducen absorción', 'Levotiroxina (separar 4h)'],
    sideEffects: ['Estreñimiento (común)', 'Náuseas', 'Heces oscuras (normal)', 'Sabor metálico'],
    certifications: [CERTIFICATIONS.USP, CERTIFICATIONS.GLUTEN_FREE],
    badges: [BADGES.ESSENTIAL, 'Con Vitamina C'],
    image: 'https://via.placeholder.com/150',
    priceGTQ: 179,
    shippingDays: SHIPPING.STANDARD,
    inStock: true
  },
  {
    id: 'calcium-esencial',
    name: 'Calcio 600mg + Vitamina D',
    scientificName: 'Carbonato de calcio + Colecalciferol',
    description: 'Calcio con vitamina D para huesos fuertes y prevención de preeclampsia',
    brand: BRANDS.NATURE_MADE,
    amazonASIN: 'B001G7QR0M',
    tier: 'esencial',
    recommendedDose: '600 mg calcio + 400 UI D3, 2 veces al día',
    priority: 'recommended',
    trimesters: [2, 3],
    benefits: {
      mother: ['Reduce 50% riesgo de preeclampsia', 'Protege masa ósea materna', 'Previene calambres'],
      baby: ['Mineralización ósea óptima', 'Desarrollo dental', 'Reduce riesgo de parto pretérmino']
    },
    timing: 'with_meals',
    medicalExplanation: 'El calcio es esencial para la formación del esqueleto fetal, especialmente en T3 cuando se mineraliza el 80%. La OMS recomienda 1500-2000 mg/día en poblaciones con baja ingesta para prevenir preeclampsia (5-8% de embarazos).',
    specialConsiderations: {
      age35Plus: 'Mayor riesgo de preeclampsia: 1500-2000 mg/día desde semana 20',
      multiparous: 'Si antecedente de preeclampsia, beneficio significativo',
      vegetarian: 'Considerar citrato si baja ingesta láctea',
      vegan: 'Alto riesgo: suplementar y consumir alimentos fortificados'
    },
    contraindications: ['Hipercalcemia', 'Cálculos renales de calcio', 'Hiperparatiroidismo'],
    interactions: ['Compite con hierro (separar 2h)', 'Levotiroxina (separar 4h)', 'Antibióticos quinolonas'],
    sideEffects: ['Estreñimiento leve', 'Gases', 'Hinchazón abdominal'],
    certifications: [CERTIFICATIONS.USP, CERTIFICATIONS.GLUTEN_FREE],
    badges: [BADGES.ESSENTIAL, 'Con Vitamina D'],
    image: 'https://via.placeholder.com/150',
    priceGTQ: 189,
    shippingDays: SHIPPING.STANDARD,
    inStock: true
  }
];