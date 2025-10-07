import { FetalDevelopment } from '../types';
import { getCurrentLanguage } from '../config/i18n';

export const fetalDevelopmentData: FetalDevelopment[] = [
  {
    week: 1,
    size: "Microscópico",
    weight: "<0.1g",
    description: "Fecundación e implantación. El óvulo fecundado viaja por la trompa de Falopio y se implanta en el útero.",
    milestones: [
      "Fecundación",
      "Implantación en el útero",
      "Formación del blastocisto"
    ],
    tips: [
      "Toma ácido fólico",
      "Evita alcohol y tabaco",
      "Consulta a tu médico"
    ],
    animation: "week1"
  },
  {
    week: 2,
    size: "Microscópico",
    weight: "<0.1g",
    description: "El embrión se implanta completamente y comienza la formación de la placenta.",
    milestones: [
      "Implantación completa",
      "Formación de la placenta",
      "Inicio del desarrollo embrionario"
    ],
    tips: [
      "Mantén una dieta saludable",
      "Descansa lo suficiente"
    ],
    animation: "week2"
  },
  {
    week: 3,
    size: "Microscópico",
    weight: "<0.1g",
    description: "Comienza la formación del tubo neural, que dará lugar al cerebro y la médula espinal.",
    milestones: [
      "Formación del tubo neural",
      "Inicio del desarrollo del sistema nervioso"
    ],
    tips: [
      "Continúa tomando ácido fólico",
      "Evita medicamentos sin receta"
    ],
    animation: "week3"
  },
  {
    week: 4,
    size: "Semilla de amapola",
    weight: "0.4g",
    description: "El corazón primitivo comienza a latir. Se forman los primeros vasos sanguíneos.",
    milestones: [
      "Primeros latidos del corazón",
      "Formación de vasos sanguíneos",
      "Desarrollo inicial de la placenta"
    ],
    tips: [
      "Haz tu primera cita prenatal",
      "Evita el estrés"
    ],
    animation: "week4"
  },
  {
    week: 5,
    size: "Semilla de sésamo",
    weight: "0.5g",
    description: "Se forman los brotes de brazos y piernas. El corazón late de forma regular.",
    milestones: [
      "Formación de brotes de extremidades",
      "Desarrollo del corazón",
      "Inicio de la formación de órganos principales"
    ],
    tips: [
      "Mantén una hidratación adecuada",
      "Consulta sobre suplementos prenatales"
    ],
    animation: "week5"
  },
  {
    week: 6,
    size: "Lenteja",
    weight: "0.8g",
    description: "El embrión tiene forma de C. El corazón late con regularidad y se forman los ojos y oídos.",
    milestones: [
      "Formación de ojos y oídos",
      "El corazón late con regularidad",
      "Aparición de brotes de brazos y piernas"
    ],
    tips: [
      "Evita el consumo de sustancias nocivas",
      "Sigue las indicaciones médicas"
    ],
    animation: "week6"
  },
  {
    week: 7,
    size: "Arándano",
    weight: "1.1g",
    description: "Se desarrollan los dedos de manos y pies. El cerebro crece rápidamente.",
    milestones: [
      "Formación de dedos",
      "Crecimiento rápido del cerebro",
      "Desarrollo de órganos principales"
    ],
    tips: [
      "Mantén una dieta equilibrada",
      "Descansa lo suficiente"
    ],
    animation: "week7"
  },
  {
    week: 8,
    size: "Frambuesa",
    weight: "1.5g",
    description: "Todos los órganos principales están formándose. El corazón late regularmente.",
    milestones: [
      "Formación de todos los órganos principales",
      "Desarrollo de brazos y piernas",
      "El corazón late regularmente"
    ],
    tips: [
      "Come pequeñas porciones frecuentemente",
      "Evita alimentos crudos",
      "Practica ejercicios suaves"
    ],
    animation: "week8"
  },
  {
    week: 9,
    size: "Aceituna",
    weight: "2g",
    description: "El embrión ahora es un feto. Se desarrollan los párpados y los órganos reproductores.",
    milestones: [
      "Inicio de la etapa fetal",
      "Desarrollo de párpados",
      "Formación de órganos reproductores"
    ],
    tips: [
      "Continúa con tus controles prenatales",
      "Evita el estrés"
    ],
    animation: "week9"
  },
  {
    week: 10,
    size: "Cereza",
    weight: "4g",
    description: "El feto puede mover brazos y piernas. Los órganos vitales están en su lugar y comienzan a funcionar.",
    milestones: [
      "Movimiento de extremidades",
      "Órganos vitales en funcionamiento",
      "Desarrollo de uñas"
    ],
    tips: [
      "Mantén una alimentación variada",
      "Consulta sobre ejercicios prenatales"
    ],
    animation: "week10"
  },
  {
    week: 11,
    size: "Higo",
    weight: "7g",
    description: "El feto crece rápidamente. Se desarrollan los folículos pilosos y los órganos genitales empiezan a diferenciarse.",
    milestones: [
      "Desarrollo de folículos pilosos",
      "Diferenciación de órganos genitales",
      "El diafragma se forma"
    ],
    tips: [
      "Mantén tus controles prenatales",
      "Sigue una dieta rica en hierro"
    ],
    animation: "week11"
  },
  {
    week: 12,
    size: "Lima",
    weight: "14g",
    description: "Los órganos están completamente formados y comienza el período fetal. El bebé puede mover los dedos.",
    milestones: [
      "Fin del primer trimestre",
      "Órganos completamente formados",
      "Movimientos fetales (aún no perceptibles)"
    ],
    tips: [
      "Las náuseas suelen mejorar",
      "Tu energía aumenta",
      "Considera hacer ejercicio prenatal"
    ],
    animation: "week12"
  },
  {
    week: 13,
    size: "Ciruela",
    weight: "23g",
    description: "El bebé comienza a formar huellas dactilares. Los huesos se endurecen y los intestinos se desarrollan.",
    milestones: [
      "Formación de huellas dactilares",
      "Endurecimiento de huesos",
      "Desarrollo de intestinos"
    ],
    tips: [
      "Mantén una buena hidratación",
      "Consulta sobre vitaminas prenatales"
    ],
    animation: "week13"
  },
  {
    week: 14,
    size: "Limón",
    weight: "43g",
    description: "El bebé puede hacer expresiones faciales y comienza a succionar el pulgar. El cabello fino (lanugo) cubre su cuerpo.",
    milestones: [
      "Primeras expresiones faciales",
      "Succión del pulgar",
      "Aparición de lanugo"
    ],
    tips: [
      "Come alimentos ricos en calcio",
      "Evita el estrés"
    ],
    animation: "week14"
  },
  {
    week: 15,
    size: "Manzana pequeña",
    weight: "70g",
    description: "El bebé puede percibir la luz a través de los párpados cerrados. Se desarrollan los huesos del oído medio.",
    milestones: [
      "Percepción de luz",
      "Desarrollo del oído medio",
      "Crecimiento de extremidades"
    ],
    tips: [
      "Realiza caminatas suaves",
      "Consulta sobre ejercicios de relajación"
    ],
    animation: "week15"
  },
  {
    week: 16,
    size: "Manzana",
    weight: "100g",
    description: "Puedes empezar a sentir los primeros movimientos. Se desarrollan uñas y cabello.",
    milestones: [
      "Primeros movimientos perceptibles",
      "Desarrollo de uñas y cabello",
      "El bebé puede hacer gestos faciales"
    ],
    tips: [
      "Presta atención a los primeros movimientos",
      "Mantén una buena postura",
      "Usa crema hidratante para la piel"
    ],
    animation: "week16"
  },
  {
    week: 17,
    size: "Nabo",
    weight: "140g",
    description: "El esqueleto del bebé se transforma de cartílago a hueso. Se desarrolla la grasa corporal.",
    milestones: [
      "Transformación de cartílago a hueso",
      "Desarrollo de grasa corporal",
      "El cordón umbilical se fortalece"
    ],
    tips: [
      "Incluye alimentos ricos en vitamina D",
      "Descansa con las piernas elevadas"
    ],
    animation: "week17"
  },
  {
    week: 18,
    size: "Pimiento",
    weight: "190g",
    description: "El bebé puede oír sonidos externos. Se desarrollan las huellas dactilares y los órganos reproductores.",
    milestones: [
      "Desarrollo de huellas dactilares",
      "Órganos reproductores diferenciados",
      "El bebé responde a sonidos"
    ],
    tips: [
      "Habla y canta a tu bebé",
      "Haz ejercicios de respiración"
    ],
    animation: "week18"
  },
  {
    week: 19,
    size: "Tomate",
    weight: "240g",
    description: "El bebé desarrolla vérnix caseosa (capa protectora). Se afinan los sentidos y los movimientos son más coordinados.",
    milestones: [
      "Formación de vérnix caseosa",
      "Coordinación de movimientos",
      "Desarrollo de sentidos"
    ],
    tips: [
      "Mantén una dieta variada",
      "Realiza ejercicios de estiramiento"
    ],
    animation: "week19"
  },
  {
    week: 20,
    size: "Plátano",
    weight: "300g",
    description: "Es la mitad del embarazo. El bebé puede oír tu voz y se desarrolla el sentido del gusto.",
    milestones: [
      "Mitad del embarazo",
      "Desarrollo de los sentidos",
      "El bebé puede oír tu voz"
    ],
    tips: [
      "Habla y canta a tu bebé",
      "Haz la ecografía morfológica",
      "Prepara la habitación del bebé"
    ],
    animation: "week20"
  },
  {
    week: 21,
    size: "Zanahoria",
    weight: "360g",
    description: "El bebé mide unos 27 cm. Se desarrollan las cejas y las uñas. Puede percibir los sonidos del exterior.",
    milestones: [
      "Desarrollo de cejas y uñas",
      "Percepción de sonidos externos",
      "Movimientos más coordinados"
    ],
    tips: [
      "Escucha música relajante",
      "Mantén una dieta rica en proteínas"
    ],
    animation: "week21"
  },
  {
    week: 22,
    size: "Calabacín",
    weight: "430g",
    description: "El bebé responde a la voz de la madre. Se forman las huellas plantares y palmares.",
    milestones: [
      "Respuesta a la voz materna",
      "Formación de huellas plantares y palmares",
      "Desarrollo de pestañas"
    ],
    tips: [
      "Habla y lee en voz alta",
      "Descansa con las piernas elevadas"
    ],
    animation: "week22"
  },
  {
    week: 23,
    size: "Berenjena",
    weight: "500g",
    description: "El bebé puede abrir y cerrar los ojos. Su piel es rojiza y arrugada, pero pronto ganará grasa.",
    milestones: [
      "Apertura de los ojos",
      "Desarrollo de grasa subcutánea",
      "Mayor actividad motora"
    ],
    tips: [
      "Mantén una buena hidratación",
      "Consulta sobre clases de preparación al parto"
    ],
    animation: "week23"
  },
  {
    week: 24,
    size: "Maíz",
    weight: "600g",
    description: "Los pulmones producen surfactante. El bebé responde a sonidos y movimientos.",
    milestones: [
      "Desarrollo de las huellas dactilares",
      "Los pulmones producen surfactante",
      "El bebé responde a sonidos"
    ],
    tips: [
      "Practica ejercicios de respiración",
      "Mantén una buena higiene dental",
      "Prepara tu plan de parto"
    ],
    animation: "week24"
  },
  {
    week: 25,
    size: "Nabo grande",
    weight: "700g",
    description: "El bebé comienza a acumular grasa. Su piel se vuelve más opaca y menos arrugada.",
    milestones: [
      "Acumulación de grasa corporal",
      "Piel menos arrugada",
      "Desarrollo de reflejos"
    ],
    tips: [
      "Incluye alimentos ricos en omega 3",
      "Descansa frecuentemente"
    ],
    animation: "week25"
  },
  {
    week: 26,
    size: "Lechuga",
    weight: "800g",
    description: "El sistema nervioso central madura. El bebé puede abrir los ojos y responder a la luz.",
    milestones: [
      "Maduración del sistema nervioso",
      "Respuesta a la luz",
      "Mayor coordinación de movimientos"
    ],
    tips: [
      "Evita estar mucho tiempo de pie",
      "Haz ejercicios de relajación"
    ],
    animation: "week26"
  },
  {
    week: 27,
    size: "Coliflor",
    weight: "900g",
    description: "El bebé puede soñar (movimientos oculares rápidos). Se desarrollan los pulmones y el cerebro.",
    milestones: [
      "Desarrollo de pulmones y cerebro",
      "Movimientos oculares rápidos (REM)",
      "Mayor sensibilidad a estímulos"
    ],
    tips: [
      "Descansa de lado izquierdo",
      "Prepara la bolsa para el hospital"
    ],
    animation: "week27"
  },
  {
    week: 28,
    size: "Berenjena",
    weight: "1 kilogramo",
    description: "Comienza el tercer trimestre. Los ojos pueden abrirse y cerrarse. El bebé tiene ciclos de sueño.",
    milestones: [
      "Inicio del tercer trimestre",
      "Los ojos pueden abrirse y cerrarse",
      "El bebé tiene ciclos de sueño"
    ],
    tips: [
      "Descansa más frecuentemente",
      "Mantén una buena hidratación",
      "Prepara la bolsa para el hospital"
    ],
    animation: "week28"
  },
  {
    week: 29,
    size: "Calabaza pequeña",
    weight: "1.2kg",
    description: "El bebé puede distinguir sabores. Su cerebro y músculos se desarrollan rápidamente.",
    milestones: [
      "Desarrollo rápido del cerebro",
      "Distinción de sabores",
      "Mayor fuerza muscular"
    ],
    tips: [
      "Incluye alimentos ricos en magnesio",
      "Haz ejercicios de estiramiento"
    ],
    animation: "week29"
  },
  {
    week: 30,
    size: "Repollo",
    weight: "1.4kg",
    description: "El bebé regula mejor la temperatura corporal. Sus movimientos son más fuertes y definidos.",
    milestones: [
      "Regulación de temperatura corporal",
      "Movimientos más fuertes",
      "Desarrollo de médula ósea"
    ],
    tips: [
      "Descansa con las piernas elevadas",
      "Prepara el espacio para el bebé"
    ],
    animation: "week30"
  },
  {
    week: 31,
    size: "Coco",
    weight: "1.6kg",
    description: "El bebé gana peso rápidamente. Sus pulmones y sistema nervioso siguen madurando.",
    milestones: [
      "Rápido aumento de peso",
      "Maduración pulmonar",
      "Mayor coordinación de movimientos"
    ],
    tips: [
      "Descansa frecuentemente",
      "Prepara la maleta para el hospital"
    ],
    animation: "week31"
  },
  {
    week: 32,
    size: "Piña",
    weight: "1.7 kilogramos",
    description: "Está ganando peso rápidamente. Los huesos se endurecen y el bebé practica la respiración.",
    milestones: [
      "Rápido aumento de peso",
      "Los huesos se endurecen",
      "El bebé practica la respiración"
    ],
    tips: [
      "Come alimentos ricos en calcio",
      "Practica posiciones para el parto",
      "Mantén contacto con tu médico"
    ],
    animation: "week32"
  },
  {
    week: 33,
    size: "Puerro",
    weight: "1.9kg",
    description: "El cráneo sigue siendo flexible. El bebé detecta la luz y se prepara para el nacimiento.",
    milestones: [
      "Cráneo flexible",
      "Mayor percepción de luz",
      "Preparación para el nacimiento"
    ],
    tips: [
      "Descansa de lado izquierdo",
      "Haz ejercicios de relajación"
    ],
    animation: "week33"
  },
  {
    week: 34,
    size: "Melón",
    weight: "2.1kg",
    description: "El sistema inmunológico se fortalece. El bebé se posiciona para el parto.",
    milestones: [
      "Fortalecimiento del sistema inmunológico",
      "Posicionamiento para el parto",
      "Desarrollo de reflejos"
    ],
    tips: [
      "Prepara el espacio para el bebé",
      "Consulta sobre señales de parto"
    ],
    animation: "week34"
  },
  {
    week: 35,
    size: "Mielón cantalupo",
    weight: "2.4kg",
    description: "El bebé llena casi todo el útero. Sus riñones están completamente desarrollados.",
    milestones: [
      "Riñones completamente desarrollados",
      "Mayor acumulación de grasa",
      "Preparación final para el nacimiento"
    ],
    tips: [
      "Ten lista la maleta para el hospital",
      "Descansa todo lo posible"
    ],
    animation: "week35"
  },
  {
    week: 36,
    size: "Lechuga romana",
    weight: "2.6 kilogramos",
    description: "Está casi listo para nacer. La mayoría de los órganos están maduros y se posiciona para el parto.",
    milestones: [
      "El bebé está casi completamente desarrollado",
      "La mayoría de los órganos están maduros",
      "El bebé se posiciona para el parto"
    ],
    tips: [
      "Reconoce los signos del parto",
      "Ten todo listo para el hospital",
      "Descansa todo lo posible"
    ],
    animation: "week36"
  },
  {
    week: 37,
    size: "Acelga",
    weight: "2.9kg",
    description: "El bebé es considerado a término temprano. Sus pulmones están listos para funcionar fuera del útero.",
    milestones: [
      "Pulmones listos para el nacimiento",
      "Mayor acumulación de grasa",
      "Preparación para el parto"
    ],
    tips: [
      "Mantén la calma",
      "Confía en tu cuerpo"
    ],
    animation: "week37"
  },
  {
    week: 38,
    size: "Puerro grande",
    weight: "3.1kg",
    description: "El bebé sigue ganando peso. El vérnix caseosa y el lanugo desaparecen casi por completo.",
    milestones: [
      "Desaparición del lanugo",
      "Mayor acumulación de grasa",
      "Preparación final para el nacimiento"
    ],
    tips: [
      "Descansa y relájate",
      "Prepara todo para la llegada"
    ],
    animation: "week38"
  },
  {
    week: 39,
    size: "Sandía pequeña",
    weight: "3.3kg",
    description: "El bebé está a término. Todos los órganos están maduros y listo para nacer en cualquier momento.",
    milestones: [
      "Órganos completamente maduros",
      "Preparación para el nacimiento",
      "El bebé puede nacer en cualquier momento"
    ],
    tips: [
      "Mantén la calma",
      "Confía en tu equipo médico"
    ],
    animation: "week39"
  },
  {
    week: 40,
    size: "Sandía pequeña",
    weight: "3.4 kilogramos",
    description: "¡Es hora de conocer a tu bebé! Todos los órganos están maduros y el bebé puede sobrevivir fuera del útero.",
    milestones: [
      "¡Tu bebé está listo para nacer!",
      "Todos los órganos están maduros",
      "El bebé puede sobrevivir fuera del útero"
    ],
    tips: [
      "Mantén la calma",
      "Confía en tu cuerpo",
      "¡Disfruta el momento!"
    ],
    animation: "week40"
  }
];

// Datos de desarrollo fetal en inglés
export const fetalDevelopmentDataEn: FetalDevelopment[] = [
  {
    week: 1,
    size: "Microscopic",
    weight: "<0.1g",
    description: "Fertilization and implantation. The fertilized egg travels through the fallopian tube and implants in the uterus.",
    milestones: [
      "Fertilization",
      "Uterine implantation",
      "Blastocyst formation"
    ],
    tips: [
      "Take folic acid",
      "Avoid alcohol and tobacco",
      "Consult your doctor"
    ],
    animation: "week1"
  },
  {
    week: 2,
    size: "Microscopic",
    weight: "<0.1g",
    description: "The embryo implants completely and placenta formation begins.",
    milestones: [
      "Complete implantation",
      "Placenta formation",
      "Beginning of embryonic development"
    ],
    tips: [
      "Maintain a healthy diet",
      "Get enough rest"
    ],
    animation: "week2"
  },
  {
    week: 3,
    size: "Microscopic",
    weight: "<0.1g",
    description: "Neural tube formation begins, which will give rise to the brain and spinal cord.",
    milestones: [
      "Neural tube formation",
      "Beginning of nervous system development"
    ],
    tips: [
      "Continue taking folic acid",
      "Avoid over-the-counter medications"
    ],
    animation: "week3"
  },
  {
    week: 4,
    size: "Poppy seed",
    weight: "0.4g",
    description: "The primitive heart begins to beat. The first blood vessels form.",
    milestones: [
      "First heartbeats",
      "Blood vessel formation",
      "Initial placenta development"
    ],
    tips: [
      "Schedule your first prenatal appointment",
      "Avoid stress"
    ],
    animation: "week4"
  },
  {
    week: 5,
    size: "Sesame seed",
    weight: "0.5g",
    description: "Arm and leg buds form. The heart beats regularly.",
    milestones: [
      "Formation of limb buds",
      "Heart development",
      "Beginning of major organ formation"
    ],
    tips: [
      "Maintain adequate hydration",
      "Consult about prenatal supplements"
    ],
    animation: "week5"
  },
  {
    week: 6,
    size: "Lentil",
    weight: "0.8g",
    description: "The embryo has a C-shape. The heart beats regularly and eyes and ears form.",
    milestones: [
      "Formation of eyes and ears",
      "Heart beats regularly",
      "Appearance of arm and leg buds"
    ],
    tips: [
      "Avoid harmful substances",
      "Follow medical instructions"
    ],
    animation: "week6"
  },
  {
    week: 7,
    size: "Blueberry",
    weight: "1.1g",
    description: "Fingers and toes develop. The brain grows rapidly.",
    milestones: [
      "Finger formation",
      "Rapid brain growth",
      "Development of major organs"
    ],
    tips: [
      "Maintain a balanced diet",
      "Get enough rest"
    ],
    animation: "week7"
  },
  {
    week: 8,
    size: "Raspberry",
    weight: "1.5g",
    description: "All major organs are forming. The heart beats regularly.",
    milestones: [
      "Formation of all major organs",
      "Development of arms and legs",
      "Heart beats regularly"
    ],
    tips: [
      "Eat small frequent meals",
      "Avoid raw foods",
      "Practice gentle exercises"
    ],
    animation: "week8"
  },
  {
    week: 9,
    size: "Olive",
    weight: "2g",
    description: "The embryo is now a fetus. Eyelids and reproductive organs develop.",
    milestones: [
      "Beginning of fetal stage",
      "Eyelid development",
      "Formation of reproductive organs"
    ],
    tips: [
      "Continue with prenatal checkups",
      "Avoid stress"
    ],
    animation: "week9"
  },
  {
    week: 10,
    size: "Cherry",
    weight: "4g",
    description: "The fetus can move arms and legs. Vital organs are in place and begin to function.",
    milestones: [
      "Limb movement",
      "Vital organs functioning",
      "Nail development"
    ],
    tips: [
      "Maintain a varied diet",
      "Consult about prenatal exercises"
    ],
    animation: "week10"
  },
  {
    week: 11,
    size: "Fig",
    weight: "7g",
    description: "The fetus grows rapidly. Hair follicles develop and genital organs begin to differentiate.",
    milestones: [
      "Hair follicle development",
      "Genital organ differentiation",
      "Diaphragm formation"
    ],
    tips: [
      "Maintain prenatal checkups",
      "Follow an iron-rich diet"
    ],
    animation: "week11"
  },
  {
    week: 12,
    size: "Lime",
    weight: "14g",
    description: "Organs are completely formed and the fetal period begins. The baby can move fingers.",
    milestones: [
      "End of first trimester",
      "Organs completely formed",
      "Fetal movements (not yet perceptible)"
    ],
    tips: [
      "Nausea usually improves",
      "Your energy increases",
      "Consider prenatal exercise"
    ],
    animation: "week12"
  },
  {
    week: 13,
    size: "Plum",
    weight: "23g",
    description: "The fetus begins to practice breathing movements. The head is proportionally larger.",
    milestones: [
      "Breathing practice movements",
      "Proportional head growth",
      "Development of reflexes"
    ],
    tips: [
      "You may feel more energetic",
      "Continue with prenatal vitamins",
      "Stay hydrated"
    ],
    animation: "week13"
  },
  {
    week: 14,
    size: "Lemon",
    weight: "43g",
    description: "The fetus can make facial expressions and begins to suck its thumb. The fine hair (lanugo) covers its body.",
    milestones: [
      "First facial expressions",
      "Thumb sucking",
      "Appearance of lanugo"
    ],
    tips: [
      "Eat foods rich in calcium",
      "Avoid stress"
    ],
    animation: "week14"
  },
  {
    week: 15,
    size: "Small apple",
    weight: "70g",
    description: "The fetus can perceive light through closed eyelids. The middle ear bones develop.",
    milestones: [
      "Light perception",
      "Middle ear bone development",
      "Extremity growth"
    ],
    tips: [
      "Practice gentle walks",
      "Consult about relaxation exercises"
    ],
    animation: "week15"
  },
  {
    week: 16,
    size: "Apple",
    weight: "100g",
    description: "You can start feeling the first movements. Nails and hair develop.",
    milestones: [
      "First perceptible movements",
      "Nail and hair development",
      "The baby can make facial gestures"
    ],
    tips: [
      "Pay attention to the first movements",
      "Maintain a good posture",
      "Use moisturizing cream for the skin"
    ],
    animation: "week16"
  },
  {
    week: 17,
    size: "Turnip",
    weight: "140g",
    description: "The baby's skeleton transforms from cartilage to bone. Fatty tissue develops.",
    milestones: [
      "Cartilage to bone transformation",
      "Fatty tissue development",
      "Umbilical cord strengthening"
    ],
    tips: [
      "Include foods rich in vitamin D",
      "Rest with legs elevated"
    ],
    animation: "week17"
  },
  {
    week: 18,
    size: "Pepper",
    weight: "190g",
    description: "The fetus can hear external sounds. Fingerprints and reproductive organs develop.",
    milestones: [
      "Fingerprint development",
      "Differentiated reproductive organs",
      "The baby responds to sounds"
    ],
    tips: [
      "Talk and sing to your baby",
      "Practice breathing exercises"
    ],
    animation: "week18"
  },
  {
    week: 19,
    size: "Tomato",
    weight: "240g",
    description: "The fetus develops caseous vernix (protective layer). Senses are refined and movements are more coordinated.",
    milestones: [
      "Caseous vernix formation",
      "Movement coordination",
      "Sense development"
    ],
    tips: [
      "Maintain a varied diet",
      "Practice stretching exercises"
    ],
    animation: "week19"
  },
  {
    week: 20,
    size: "Banana",
    weight: "300g",
    description: "It's half of pregnancy. The fetus can hear your voice and the sense of taste develops.",
    milestones: [
      "Half of pregnancy",
      "Sense development",
      "The fetus can hear your voice"
    ],
    tips: [
      "Talk and sing to your baby",
      "Have a morphological ultrasound",
      "Prepare the baby's room"
    ],
    animation: "week20"
  },
  {
    week: 21,
    size: "Carrot",
    weight: "360g",
    description: "The fetus measures about 27 cm. Eyebrows and nails develop. It can perceive external sounds.",
    milestones: [
      "Eyebrow and nail development",
      "Perception of external sounds",
      "More coordinated movements"
    ],
    tips: [
      "Listen to relaxing music",
      "Maintain a protein-rich diet"
    ],
    animation: "week21"
  },
  {
    week: 22,
    size: "Cucumber",
    weight: "430g",
    description: "The fetus responds to the mother's voice. Plantar and palmar footprints form.",
    milestones: [
      "Response to mother's voice",
      "Formation of plantar and palmar footprints",
      "Eyelash development"
    ],
    tips: [
      "Talk and read aloud",
      "Rest with legs elevated"
    ],
    animation: "week22"
  },
  {
    week: 23,
    size: "Eggplant",
    weight: "500g",
    description: "The fetus can open and close its eyes. Its skin is reddish and wrinkled, but soon will gain fat.",
    milestones: [
      "Eye opening",
      "Subcutaneous fat development",
      "Greater motor activity"
    ],
    tips: [
      "Maintain adequate hydration",
      "Consult about labor preparation classes"
    ],
    animation: "week23"
  },
  {
    week: 24,
    size: "Corn",
    weight: "600g",
    description: "The lungs produce surfactant. The fetus responds to sounds and movements.",
    milestones: [
      "Development of fingerprints",
      "Lungs produce surfactant",
      "The fetus responds to sounds"
    ],
    tips: [
      "Practice breathing exercises",
      "Maintain good dental hygiene",
      "Prepare your birth plan"
    ],
    animation: "week24"
  },
  {
    week: 25,
    size: "Large turnip",
    weight: "700g",
    description: "The fetus begins to accumulate fat. Its skin becomes more opaque and less wrinkled.",
    milestones: [
      "Fat accumulation",
      "Less wrinkled skin",
      "Development of reflexes"
    ],
    tips: [
      "Include foods rich in omega 3",
      "Rest frequently"
    ],
    animation: "week25"
  },
  {
    week: 26,
    size: "Lettuce",
    weight: "800g",
    description: "The central nervous system matures. The fetus can open its eyes and respond to light.",
    milestones: [
      "Central nervous system maturation",
      "Response to light",
      "Greater movement coordination"
    ],
    tips: [
      "Avoid standing for long periods",
      "Practice relaxation exercises"
    ],
    animation: "week26"
  },
  {
    week: 27,
    size: "Broccoli",
    weight: "900g",
    description: "The fetus can dream (rapid eye movements). The lungs and brain develop.",
    milestones: [
      "Lung and brain development",
      "Rapid eye movements (REM)",
      "Greater sensitivity to stimuli"
    ],
    tips: [
      "Rest on the left side",
      "Prepare the hospital bag"
    ],
    animation: "week27"
  },
  {
    week: 28,
    size: "Eggplant",
    weight: "1 kilogram",
    description: "The third trimester begins. Eyes can open and close. The fetus has sleep cycles.",
    milestones: [
      "Beginning of third trimester",
      "Eyes can open and close",
      "Fetus has sleep cycles"
    ],
    tips: [
      "Rest more frequently",
      "Maintain adequate hydration",
      "Prepare the hospital bag"
    ],
    animation: "week28"
  },
  {
    week: 29,
    size: "Small pumpkin",
    weight: "1.2kg",
    description: "The fetus can distinguish tastes. Its brain and muscles develop rapidly.",
    milestones: [
      "Rapid brain development",
      "Taste discrimination",
      "Greater muscle strength"
    ],
    tips: [
      "Include foods rich in magnesium",
      "Practice stretching exercises"
    ],
    animation: "week29"
  },
  {
    week: 30,
    size: "Cabbage",
    weight: "1.4kg",
    description: "The fetus regulates body temperature better. Its movements are stronger and more defined.",
    milestones: [
      "Body temperature regulation",
      "Stronger movements",
      "Bone marrow development"
    ],
    tips: [
      "Rest with legs elevated",
      "Prepare space for the baby"
    ],
    animation: "week30"
  },
  {
    week: 31,
    size: "Coconut",
    weight: "1.6kg",
    description: "The fetus gains weight rapidly. Its lungs and nervous system continue maturing.",
    milestones: [
      "Rapid weight gain",
      "Pulmonary maturation",
      "Greater movement coordination"
    ],
    tips: [
      "Rest frequently",
      "Prepare the suitcase for the hospital"
    ],
    animation: "week31"
  },
  {
    week: 32,
    size: "Pineapple",
    weight: "1.7 kilograms",
    description: "It's gaining weight rapidly. Bones harden and the fetus practices breathing.",
    milestones: [
      "Rapid weight gain",
      "Bones harden",
      "Fetus practices breathing"
    ],
    tips: [
      "Eat foods rich in calcium",
      "Practice labor positions",
      "Maintain contact with your doctor"
    ],
    animation: "week32"
  },
  {
    week: 33,
    size: "Leek",
    weight: "1.9kg",
    description: "The skull remains flexible. The fetus detects light and prepares for birth.",
    milestones: [
      "Flexible skull",
      "Greater light perception",
      "Preparation for birth"
    ],
    tips: [
      "Rest on the left side",
      "Practice relaxation exercises"
    ],
    animation: "week33"
  },
  {
    week: 34,
    size: "Melon",
    weight: "2.1kg",
    description: "The immune system strengthens. The fetus positions itself for birth.",
    milestones: [
      "Strengthening of the immune system",
      "Positioning for birth",
      "Development of reflexes"
    ],
    tips: [
      "Prepare space for the baby",
      "Consult about labor signs"
    ],
    animation: "week34"
  },
  {
    week: 35,
    size: "Cantaloupe melon",
    weight: "2.4kg",
    description: "The fetus almost fills the uterus. Its kidneys are completely developed.",
    milestones: [
      "Completely developed kidneys",
      "Greater fat accumulation",
      "Final preparation for birth"
    ],
    tips: [
      "Have your hospital bag ready",
      "Rest as much as possible"
    ],
    animation: "week35"
  },
  {
    week: 36,
    size: "Romaine lettuce",
    weight: "2.6 kilograms",
    description: "It's almost ready to be born. Most organs are mature and positioning for birth.",
    milestones: [
      "The baby is almost completely developed",
      "Most organs are mature",
      "The fetus positions itself for birth"
    ],
    tips: [
      "Recognize labor signs",
      "Have everything ready for the hospital",
      "Rest as much as possible",
      "Stay calm"
    ],
    animation: "week36"
  },
  {
    week: 37,
    size: "Swiss chard",
    weight: "2.9kg",
    description: "The fetus is considered early term. Their lungs are ready to function outside the uterus.",
    milestones: [
      "Lungs ready for birth",
      "Greater fat accumulation",
      "Preparation for labor"
    ],
    tips: [
      "Stay calm",
      "Trust your body"
    ],
    animation: "week37"
  },
  {
    week: 38,
    size: "Large leek",
    weight: "3.1kg",
    description: "The fetus continues gaining weight. The vernix caseosa and lanugo almost completely disappear.",
    milestones: [
      "Lanugo disappearance",
      "Greater fat accumulation",
      "Final preparation for birth"
    ],
    tips: [
      "Rest and relax",
      "Prepare everything for arrival"
    ],
    animation: "week38"
  },
  {
    week: 39,
    size: "Small watermelon",
    weight: "3.3kg",
    description: "The fetus is full term. All organs are mature and ready to be born at any moment.",
    milestones: [
      "Completely mature organs",
      "Preparation for birth",
      "The baby can be born at any moment",
      "Full term"
    ],
    tips: [
      "Stay calm",
      "Trust your medical team"
    ],
    animation: "week39"
  },
  {
    week: 40,
    size: "Small watermelon",
    weight: "3.4 kilograms",
    description: "It's time to meet your baby! All organs are mature and the baby can survive outside the uterus.",
    milestones: [
      "Your baby is ready to be born!",
      "All organs are mature",
      "The baby can survive outside the uterus",
      "The miracle of life!"
    ],
    tips: [
      "Stay calm",
      "Trust your body",
      "Enjoy the moment!",
      "Prepare for the greatest love"
    ],
    animation: "week40"
  }
];

// Semanario emocional y visual de las 40 semanas del embarazo
// Cada semana incluye textos en español e inglés y una imagen visual (fruta/objeto)

export interface WeekDevelopment {
  week: number;
  es: {
    title: string;
    description: string;
    babyDevelopment: string;
    motherChanges: string;
    tips: string[];
    milestones: string[];
    size: string;
    weight: string;
    image: string; // URL de imagen libre de derechos
  };
  en: {
    title: string;
    description: string;
    babyDevelopment: string;
    motherChanges: string;
    tips: string[];
    milestones: string[];
    size: string;
    weight: string;
    image: string; // Free image URL
  };
}

export const fetalDevelopment: WeekDevelopment[] = [
  // Semana 1
  {
    week: 1,
    es: {
      title: 'Semana 1: Un nuevo comienzo',
      description: '¡Empieza el viaje! Aunque aún no hay embarazo confirmado, tu cuerpo se prepara para una nueva vida.',
      babyDevelopment: 'No hay embrión todavía, pero tu cuerpo está ovulando y preparándose.',
      motherChanges: 'Puedes sentirte igual, pero tu ciclo menstrual está en marcha.',
      tips: [
        'Lleva una vida saludable y equilibrada.',
        'Empieza a tomar ácido fólico si no lo hacías.',
      ],
      milestones: [
        'Ovulación',
        'Preparación del útero',
      ],
      size: 'No aplica',
      weight: 'No aplica',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', // Semilla
    },
    en: {
      title: 'Week 1: A New Beginning',
      description: 'The journey begins! Although pregnancy is not confirmed yet, your body is preparing for new life.',
      babyDevelopment: 'No embryo yet, but your body is ovulating and getting ready.',
      motherChanges: 'You may feel the same, but your menstrual cycle is in progress.',
      tips: [
        'Live a healthy and balanced life.',
        'Start taking folic acid if you haven\'t already.',
      ],
      milestones: [
        'Ovulation',
        'Uterus preparation',
      ],
      size: 'N/A',
      weight: 'N/A',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', // Seed
    },
  },
  // Semana 2
  {
    week: 2,
    es: {
      title: 'Semana 2: Esperanza en el aire',
      description: 'Tu cuerpo sigue preparándose. Pronto, una nueva vida podría comenzar.',
      babyDevelopment: 'Aún no hay embarazo, pero el óvulo está listo para ser fecundado.',
      motherChanges: 'Puedes notar cambios leves en tu temperatura basal.',
      tips: [
        'Escucha a tu cuerpo y relájate.',
        'Mantén hábitos saludables.',
      ],
      milestones: [
        'Ovulación cercana',
        'Óvulo maduro',
      ],
      size: 'No aplica',
      weight: 'No aplica',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', // Aire/hojas
    },
    en: {
      title: 'Week 2: Hope in the Air',
      description: 'Your body keeps preparing. Soon, a new life may begin.',
      babyDevelopment: 'Still no pregnancy, but the egg is ready to be fertilized.',
      motherChanges: 'You may notice slight changes in your basal temperature.',
      tips: [
        'Listen to your body and relax.',
        'Maintain healthy habits.',
      ],
      milestones: [
        'Ovulation approaching',
        'Mature egg',
      ],
      size: 'N/A',
      weight: 'N/A',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', // Air/leaves
    },
  },
  // Semana 35
  {
    week: 35,
    es: {
      title: 'Semana 35: Casi listo para el mundo',
      description: '¡Tu bebé está casi completamente desarrollado! Solo necesita un poco más de tiempo para estar perfecto.',
      babyDevelopment: 'Los riñones están completamente desarrollados y el hígado puede procesar algunos productos de desecho. La mayoría de los sistemas básicos están bien desarrollados.',
      motherChanges: 'Puedes sentir más presión en la pelvis y dificultad para respirar. El bebé está descendiendo.',
      tips: [
        'Descansa todo lo posible',
        'Ten lista la maleta para el hospital',
        'Practica técnicas de respiración',
        'Mantén una postura cómoda'
      ],
      milestones: [
        'Riñones completamente desarrollados',
        'Hígado funcional',
        'Sistemas básicos desarrollados',
        'Preparación para el nacimiento'
      ],
      size: 'Melón cantalupo',
      weight: '2.4 kilogramos',
      image: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=400&q=80', // Melón
    },
    en: {
      title: 'Week 35: Almost Ready for the World',
      description: 'Your baby is almost fully developed! Just needs a little more time to be perfect.',
      babyDevelopment: 'The kidneys are fully developed and the liver can process some waste products. Most basic systems are well developed.',
      motherChanges: 'You may feel more pressure in your pelvis and difficulty breathing. The baby is descending.',
      tips: [
        'Rest as much as possible',
        'Have your hospital bag ready',
        'Practice breathing techniques',
        'Maintain comfortable posture'
      ],
      milestones: [
        'Fully developed kidneys',
        'Functional liver',
        'Developed basic systems',
        'Preparation for birth'
      ],
      size: 'Cantaloupe melon',
      weight: '2.4 kilograms',
      image: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=400&q=80', // Melon
    },
  },
  // Semana 36
  {
    week: 36,
    es: {
      title: 'Semana 36: El final está cerca',
      description: '¡Estás en la recta final! Tu bebé está casi listo para nacer y cada día que pasa lo hace más fuerte.',
      babyDevelopment: 'El bebé está casi completamente desarrollado. La mayoría de los órganos están maduros y se posiciona para el parto.',
      motherChanges: 'Puedes sentir contracciones de Braxton Hicks más frecuentes. El bebé puede estar encajado.',
      tips: [
        'Reconoce los signos del parto',
        'Ten todo listo para el hospital',
        'Descansa todo lo posible',
        'Mantén la calma'
      ],
      milestones: [
        'Bebé casi completamente desarrollado',
        'Órganos maduros',
        'Posicionamiento para el parto',
        'Preparación final'
      ],
      size: 'Lechuga romana',
      weight: '2.6 kilogramos',
      image: 'https://images.unsplash.com/photo-1622205313162-be1d5716a43b?auto=format&fit=crop&w=400&q=80', // Lechuga
    },
    en: {
      title: 'Week 36: The End is Near',
      description: 'You\'re in the final stretch! Your baby is almost ready to be born and each passing day makes them stronger.',
      babyDevelopment: 'The baby is almost fully developed. Most organs are mature and positioning for birth.',
      motherChanges: 'You may feel more frequent Braxton Hicks contractions. The baby may be engaged.',
      tips: [
        'Recognize labor signs',
        'Have everything ready for the hospital',
        'Rest as much as possible',
        'Stay calm'
      ],
      milestones: [
        'Baby almost fully developed',
        'Mature organs',
        'Positioning for birth',
        'Final preparation'
      ],
      size: 'Romaine lettuce',
      weight: '2.6 kilograms',
      image: 'https://images.unsplash.com/photo-1622205313162-be1d5716a43b?auto=format&fit=crop&w=400&q=80', // Lettuce
    },
  },
  // Semana 37
  {
    week: 37,
    es: {
      title: 'Semana 37: ¡A término temprano!',
      description: '¡Felicidades! Tu bebé es considerado a término temprano. Sus pulmones están listos para funcionar fuera del útero.',
      babyDevelopment: 'Los pulmones están listos para el nacimiento. El bebé sigue ganando peso y acumulando grasa.',
      motherChanges: 'Puedes sentir más presión en la pelvis. El bebé puede nacer en cualquier momento.',
      tips: [
        'Mantén la calma',
        'Confía en tu cuerpo',
        'Ten todo preparado',
        'Disfruta estos últimos días'
      ],
      milestones: [
        'Pulmones listos para el nacimiento',
        'Mayor acumulación de grasa',
        'Preparación para el parto',
        'A término temprano'
      ],
      size: 'Acelga',
      weight: '2.9 kilogramos',
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80', // Acelga
    },
    en: {
      title: 'Week 37: Early Term!',
      description: 'Congratulations! Your baby is considered early term. Their lungs are ready to function outside the uterus.',
      babyDevelopment: 'The lungs are ready for birth. The baby continues gaining weight and accumulating fat.',
      motherChanges: 'You may feel more pressure in your pelvis. The baby can be born at any time.',
      tips: [
        'Stay calm',
        'Trust your body',
        'Have everything prepared',
        'Enjoy these last days'
      ],
      milestones: [
        'Lungs ready for birth',
        'Greater fat accumulation',
        'Preparation for labor',
        'Early term'
      ],
      size: 'Swiss chard',
      weight: '2.9 kilograms',
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80', // Swiss chard
    },
  },
  // Semana 38
  {
    week: 38,
    es: {
      title: 'Semana 38: Preparación final',
      description: 'Tu bebé sigue ganando peso y se prepara para el gran momento. El vérnix caseosa y el lanugo desaparecen casi por completo.',
      babyDevelopment: 'El bebé sigue ganando peso. El vérnix caseosa y el lanugo desaparecen casi por completo.',
      motherChanges: 'Puedes sentir contracciones más intensas. El bebé está listo para nacer.',
      tips: [
        'Descansa y relájate',
        'Prepara todo para la llegada',
        'Mantén la calma',
        'Confía en el proceso'
      ],
      milestones: [
        'Desaparición del lanugo',
        'Mayor acumulación de grasa',
        'Preparación final para el nacimiento',
        'Órganos completamente maduros'
      ],
      size: 'Puerro grande',
      weight: '3.1 kilogramos',
      image: 'https://images.unsplash.com/photo-1580013759032-c96505e24c1f?auto=format&fit=crop&w=400&q=80', // Puerro
    },
    en: {
      title: 'Week 38: Final Preparation',
      description: 'Your baby continues gaining weight and preparing for the big moment. The vernix caseosa and lanugo almost completely disappear.',
      babyDevelopment: 'The baby continues gaining weight. The vernix caseosa and lanugo almost completely disappear.',
      motherChanges: 'You may feel more intense contractions. The baby is ready to be born.',
      tips: [
        'Rest and relax',
        'Prepare everything for arrival',
        'Stay calm',
        'Trust the process'
      ],
      milestones: [
        'Lanugo disappearance',
        'Greater fat accumulation',
        'Final preparation for birth',
        'Completely mature organs'
      ],
      size: 'Large leek',
      weight: '3.1 kilograms',
      image: 'https://images.unsplash.com/photo-1580013759032-c96505e24c1f?auto=format&fit=crop&w=400&q=80', // Leek
    },
  },
  // Semana 39
  {
    week: 39,
    es: {
      title: 'Semana 39: ¡A término completo!',
      description: '¡Tu bebé está a término completo! Todos los órganos están maduros y listo para nacer en cualquier momento.',
      babyDevelopment: 'El bebé está a término. Todos los órganos están maduros y listo para nacer en cualquier momento.',
      motherChanges: 'Puedes sentir contracciones más regulares. El bebé puede nacer en cualquier momento.',
      tips: [
        'Mantén la calma',
        'Confía en tu equipo médico',
        'Disfruta estos últimos momentos',
        'Prepárate para el milagro'
      ],
      milestones: [
        'Órganos completamente maduros',
        'Preparación para el nacimiento',
        'El bebé puede nacer en cualquier momento',
        'A término completo'
      ],
      size: 'Sandía pequeña',
      weight: '3.3 kilogramos',
      image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=400&q=80', // Sandía
    },
    en: {
      title: 'Week 39: Full Term!',
      description: 'Your baby is full term! All organs are mature and ready to be born at any moment.',
      babyDevelopment: 'The baby is full term. All organs are mature and ready to be born at any moment.',
      motherChanges: 'You may feel more regular contractions. The baby can be born at any moment.',
      tips: [
        'Stay calm',
        'Trust your medical team',
        'Enjoy these last moments',
        'Prepare for the miracle'
      ],
      milestones: [
        'Completely mature organs',
        'Preparation for birth',
        'Baby can be born at any moment',
        'Full term'
      ],
      size: 'Small watermelon',
      weight: '3.3 kilograms',
      image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=400&q=80', // Watermelon
    },
  },
  // Semana 40
  {
    week: 40,
    es: {
      title: 'Semana 40: ¡Es hora de conocer a tu bebé!',
      description: '¡El momento ha llegado! Todos los órganos están maduros y el bebé puede sobrevivir fuera del útero.',
      babyDevelopment: '¡Tu bebé está listo para nacer! Todos los órganos están maduros y el bebé puede sobrevivir fuera del útero.',
      motherChanges: 'Puedes sentir contracciones regulares. El bebé está listo para nacer.',
      tips: [
        'Mantén la calma',
        'Confía en tu cuerpo',
        '¡Disfruta el momento!',
        'Prepárate para el amor más grande'
      ],
      milestones: [
        '¡Tu bebé está listo para nacer!',
        'Todos los órganos están maduros',
        'El bebé puede sobrevivir fuera del útero',
        '¡El milagro de la vida!'
      ],
      size: 'Sandía pequeña',
      weight: '3.4 kilogramos',
      image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=400&q=80', // Sandía
    },
    en: {
      title: 'Week 40: Time to Meet Your Baby!',
      description: 'The moment has arrived! All organs are mature and the baby can survive outside the uterus.',
      babyDevelopment: 'Your baby is ready to be born! All organs are mature and the baby can survive outside the uterus.',
      motherChanges: 'You may feel regular contractions. The baby is ready to be born.',
      tips: [
        'Stay calm',
        'Trust your body',
        'Enjoy the moment!',
        'Prepare for the greatest love'
      ],
      milestones: [
        'Your baby is ready to be born!',
        'All organs are mature',
        'Baby can survive outside the uterus',
        'The miracle of life!'
      ],
      size: 'Small watermelon',
      weight: '3.4 kilograms',
      image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=400&q=80', // Watermelon
    },
  }
];

// Función para obtener datos según el idioma actual
export const getFetalDevelopmentData = (week: number): FetalDevelopment | null => {
  const currentLanguage = getCurrentLanguage();
  const data = currentLanguage === 'en' ? fetalDevelopmentDataEn : fetalDevelopmentData;
  return data.find(d => d.week === week) || null;
};

// Función para obtener todos los datos según el idioma actual
export const getAllFetalDevelopmentData = (): FetalDevelopment[] => {
  const currentLanguage = getCurrentLanguage();
  return currentLanguage === 'en' ? fetalDevelopmentDataEn : fetalDevelopmentData;
}; 
