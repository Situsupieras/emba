import * as Localization from 'expo-localization';
import * as SecureStore from 'expo-secure-store';
import I18n from 'i18n-js';

I18n.translations = {
  es: {
    // Navegación principal
    welcome: '¡Bienvenida',
    home: 'Inteligencia Prenatal',
    supplements: 'Suplementos',
    guide: 'Guía Trimestral',
    community: 'Comunidad',
    store: 'Tienda',
    chat: 'Chat',
    profile: 'Perfil',
    
    // Autenticación
    login: 'Iniciar sesión',
    register: 'Crear cuenta',
    email: 'Correo electrónico',
    password: 'Contraseña',
    forgotPassword: '¿Olvidaste tu contraseña?',
    logout: 'Cerrar sesión',
    send: 'Enviar',
    
    // Información del embarazo
    week: 'Semana',
    trimester: 'Trimestre',
    trimesterShort: 'er Trimestre',
    weekOf: 'Semana {{week}} de 40',
    development: 'Desarrollo del bebé',
    milestones: 'Hitos importantes',
    tips: 'Consejos para esta semana',
    babySizeThisWeek: 'Tamaño del bebé esta semana',
    approxWeight: 'Peso aproximado',
    
    // Acciones
    quickActions: 'Acciones rápidas',
    nextAppointment: 'Próxima cita',
    loadingRealInfo: 'Cargando información...',
    
    // Categorías
    categories: {
      nutrition: 'Nutrición',
      exercise: 'Ejercicio',
      health: 'Salud',
      emotions: 'Emociones',
      babyDevelopment: 'Desarrollo del bebé',
      general: 'General',
    },
    
    // Dietas
    diets: {
      omnivorous: 'Omnívora',
      vegetarian: 'Vegetariana',
      vegan: 'Vegana',
    },
    
    // Perfil
    profile: {
      title: 'Perfil',
      editProfile: 'Editar perfil',
      save: 'Guardar',
      cancel: 'Cancelar',
      pregnancyInfo: 'Información del Embarazo',
      age: 'Edad',
      currentPregnancyWeek: 'Semana actual de embarazo',
      previousChildren: 'Hijos previos',
      dietType: 'Tipo de dieta',
      hasBoughtSupplements: 'Ha comprado suplementos',
      hasNotBoughtSupplements: 'No ha comprado suplementos',
      supplements: 'Suplementos',
      yes: 'Sí',
      no: 'No',
      years: 'años',
      language: 'Idioma / Language',
      emailVerification: 'Verificación de Email',
      emailVerified: 'Email verificado',
      emailNotVerified: 'Email no verificado',
      resendVerification: 'Reenviar verificación',
      verificationSent: 'Correo de verificación enviado. Revisa tu bandeja de entrada.',
      profileUpdated: 'Perfil actualizado correctamente.',
      errorSavingProfile: 'Error al guardar el perfil.',
      noAuthenticatedUser: 'No hay usuario autenticado.',
      loadingProfile: 'Cargando perfil...',
      errorLogout: 'Error al cerrar sesión.',
      logout: 'Cerrar sesión',
    },
    
    // Chat
    chat: {
      title: 'Asistente IA',
      subtitle: 'Tu compañero de embarazo inteligente',
      welcome: '¡Hola! Soy tu asistente de embarazo. Puedo ayudarte con preguntas sobre nutrición, ejercicio, síntomas, medicamentos y citas médicas. ¿En qué puedo ayudarte hoy?',
      placeholder: 'Escribe tu pregunta...',
      typing: 'Escribiendo...',
      error: 'Lo siento, no pude procesar tu mensaje. Por favor, intenta de nuevo.',
      errorTitle: 'Error de conexión',
      errorMessage: 'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
      quickQuestions: 'Preguntas rápidas',
      suggestions: 'Aquí tienes algunas sugerencias para continuar la conversación:',
      questions: {
        nutrition: '¿Qué debo comer?',
        exercise: '¿Puedo hacer ejercicio?',
        symptoms: '¿Es normal este síntoma?',
        medication: '¿Qué medicamentos puedo tomar?',
        appointments: '¿Cuándo es mi próxima cita?',
      },
    },
    
    // Retroalimentación médica
    medicalFeedback: {
      title: 'Retroalimentación Médica',
      doctorName: 'Nombre del médico',
      recommendations: 'Recomendaciones del médico',
      concerns: 'Preocupaciones o síntomas',
      nextAppointment: 'Próxima cita médica',
      notes: 'Notas adicionales',
      supplementsPrescribed: 'Suplementos recetados',
      testsOrdered: 'Exámenes ordenados',
      weight: 'Peso (kg)',
      bloodPressure: 'Presión arterial',
      babyHeartbeat: 'Latidos del bebé (bpm)',
      ultrasoundNotes: 'Notas de ecografía',
      saveFeedback: 'Guardar retroalimentación',
      feedbackSaved: 'Retroalimentación médica guardada correctamente.',
      errorSavingFeedback: 'Error al guardar la retroalimentación médica.',
      requiredFields: 'Por favor completa todos los campos requeridos.',
      invalidWeight: 'Peso inválido',
      invalidHeartbeat: 'Latidos del bebé inválidos',
    },
    
    // Mensajes generales
    messages: {
      loading: 'Cargando información...',
      noPosts: 'No hay publicaciones',
      beFirst: 'Sé la primera en iniciar una conversación en esta categoría',
      createPost: 'Crear publicación',
      close: 'Cerrar',
      cancel: 'Cancelar',
      publish: 'Publicar',
      buyNow: 'Comprar ahora',
      seeDetails: 'Ver detalles',
      important: 'Importante',
      disclaimer: 'Siempre consulta con tu médico antes de tomar cualquier suplemento. Esta información es educativa y no reemplaza el consejo médico profesional.',
    },
    
    // Chips y etiquetas
    chips: {
      verified: 'Verificado',
      expert: 'Experto',
      priority: 'Prioritario',
      trimester: 'Trimestre',
      week: 'Semana',
      allergy: 'Alergia',
      dietary: 'Dieta',
      certification: 'Certificación',
    },
    
    // Fechas y selección
    selectDate: 'Seleccionar fecha',
    confirm: 'Confirmar',
    pregnancyWeek: 'Semana de embarazo',
    customWeeks: 'Guardar semana personalizada',
    lastMenstruationDate: 'Fecha de tu última menstruación',
    thisAllowsUsToCalculateYourPregnancyWeek: 'Esto nos permite calcular tu semana de embarazo.',
    selectedDate: 'Seleccionada',
    confirmPregnancyWeek: 'Confirmar semana',
    accordingToTheDateEnteredYouHave: 'Según la fecha ingresada, tienes',
    pregnancyWeeks: 'semanas de embarazo. ¿Es correcto? ',
    ifNotCorrectYouCanModifyItManually: 'Si no es correcto, puedes modificarlo manualmente',
    
    // Recomendaciones
    recommendationsForYou: 'Recomendaciones para ti',
    basedOnYourProfile: 'Basado en tu perfil',
    firstTrimesterRecommendation: 'En el primer trimestre, el ácido fólico es fundamental para el desarrollo del tubo neural.',
    secondTrimesterRecommendation: 'El segundo trimestre requiere calcio y vitamina D para el desarrollo óseo del bebé.',
    thirdTrimesterRecommendation: 'El tercer trimestre necesita omega-3 DHA para el desarrollo cerebral final.',
    customRecommendation: 'Consulta con tu médico para recomendaciones personalizadas.',
    
    // Productos y tienda
    storeSubtitle: 'Productos certificados con explicaciones médicas detalladas',
    seeCart: 'Ver carrito',
    cart: 'Carrito',
    articles: 'Artículos',
    videos: 'Videos',
    checklist: 'Checklist',
    all: 'Todos',
    communitySubtitle: 'Conecta con otras mamás y expertos en un espacio seguro y moderado',
    allergies: 'Alergias',
    priority: 'Prioritario',
    mainBenefits: 'Beneficios principales:',
    seeMedicalDetails: 'Ver detalles médicos',
    buy: 'Comprar',
    medicalDisclaimer: 'Siempre consulta con tu médico antes de tomar cualquier suplemento. Esta información es educativa y no reemplaza el consejo médico profesional.',
    detailedMedicalInfo: 'Información Médica Detallada',
    benefits: 'Beneficios',
    sideEffects: 'Efectos secundarios',
    contraindications: 'Contraindicaciones',
    certifications: 'Certificaciones',
    qualityCertified: '✓ Certificados de calidad',
    medicalExplanations: '✓ Explicaciones médicas',
    noToxicChemicals: '✓ Sin químicos tóxicos',
    searchProducts: 'Buscar productos...',
    products: 'Productos',
    items: 'artículos',
    recommended: 'Recomendado',
    reviews: 'reseñas',
    details: 'Detalles',
    add: 'Agregar',
    noProductsFound: 'No se encontraron productos',
    tryOtherSearchTerms: 'Intenta con otros términos de búsqueda o categorías',
    productDetails: 'Detalles del producto',
    outOfFive: 'de 5',
    medicalBenefits: 'Beneficios médicos',
    
    // Suplementos específicos
    mockUserName: 'María García',
    noRelevantHistory: 'Sin antecedentes relevantes',
    vegetarian: 'Vegetariana',
    nuts: 'Nueces',
    natural: 'Natural',
    glutenFree: 'Sin gluten',
    folicAcidPremium: 'Ácido Fólico Premium',
    folicAcidDescription: 'Suplemento esencial para el desarrollo del tubo neural del bebé',
    preventsNeuralTubeDefects: 'Previene defectos del tubo neural',
    supportsBrainDevelopment: 'Apoya el desarrollo cerebral',
    reducesPreeclampsiaRisk: 'Reduce el riesgo de preeclampsia',
    folicAcidDosage: '400 mcg diarios',
    folicAcidMedicalExplanation: 'El ácido fólico es una vitamina B esencial que ayuda a formar el tubo neural del bebé durante las primeras semanas del embarazo. Es crucial para prevenir defectos congénitos como la espina bífida.',
    fdaApproved: 'FDA Aprobado',
    gmpCertified: 'GMP Certificado',
    mayCauseMildNausea: 'Puede causar náuseas leves',
    folicAcidAllergy: 'Alergia al ácido fólico',
    calciumVitaminD: 'Calcio + Vitamina D',
    calciumDescription: 'Fórmula especial para fortalecer huesos y dientes',
    strengthensBonesTeeth: 'Fortalece huesos y dientes',
    preventsOsteoporosis: 'Previene osteoporosis',
    supportsSkeletalDevelopment: 'Apoya el desarrollo esquelético del bebé',
    calciumDosage: '1000 mg calcio + 400 UI vitamina D',
    calciumMedicalExplanation: 'Durante el embarazo, el bebé necesita calcio para desarrollar huesos y dientes fuertes. Si no consumes suficiente calcio, tu cuerpo lo tomará de tus propios huesos.',
    uspVerified: 'USP Verificado',
    lactoseFree: 'Sin lactosa',
    mayCauseConstipation: 'Puede causar estreñimiento',
    kidneyStones: 'Cálculos renales',
    omega3dha: 'Omega-3 DHA',
    omega3Description: 'Ácidos grasos esenciales para el desarrollo cerebral',
    babyBrainDevelopment: 'Desarrollo cerebral del bebé',
    improvesCognitiveFunction: 'Mejora la función cognitiva',
    reducesPretermBirthRisk: 'Reduce riesgo de parto prematuro',
    omega3Dosage: '200 mg DHA diarios',
    omega3MedicalExplanation: 'El DHA es un ácido graso omega-3 que es fundamental para el desarrollo del cerebro y los ojos del bebé. Es especialmente importante durante el segundo y tercer trimestre.',
    sustainableFishing: 'Pesca Sostenible',
    mercuryFree: 'Libre de mercurio',
    mayCauseFishyBurps: 'Puede causar eructos con sabor a pescado',
    fishAllergy: 'Alergia al pescado',
  },
  en: {
    // Navigation
    welcome: 'Welcome',
    home: 'Prenatal Intelligence',
    supplements: 'Supplements',
    guide: 'Trimester Guide',
    community: 'Community',
    store: 'Store',
    chat: 'Chat',
    profile: 'Profile',
    
    // Authentication
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot password?',
    logout: 'Logout',
    send: 'Send',
    
    // Pregnancy information
    week: 'Week',
    trimester: 'Trimester',
    trimesterShort: 'st Trimester',
    weekOf: 'Week {{week}} of 40',
    development: 'Baby development',
    milestones: 'Important milestones',
    tips: 'Tips for this week',
    babySizeThisWeek: 'Baby size this week',
    approxWeight: 'Approximate weight',
    
    // Actions
    quickActions: 'Quick actions',
    nextAppointment: 'Next appointment',
    loadingRealInfo: 'Loading information...',
    
    // Categories
    categories: {
      nutrition: 'Nutrition',
      exercise: 'Exercise',
      health: 'Health',
      emotions: 'Emotions',
      babyDevelopment: 'Baby development',
      general: 'General',
    },
    
    // Diets
    diets: {
      omnivorous: 'Omnivorous',
      vegetarian: 'Vegetarian',
      vegan: 'Vegan',
    },
    
    // Profile
    profile: {
      title: 'Profile',
      editProfile: 'Edit profile',
      save: 'Save',
      cancel: 'Cancel',
      pregnancyInfo: 'Pregnancy Information',
      age: 'Age',
      currentPregnancyWeek: 'Current pregnancy week',
      previousChildren: 'Previous children',
      dietType: 'Diet type',
      hasBoughtSupplements: 'Has bought supplements',
      hasNotBoughtSupplements: 'Has not bought supplements',
      supplements: 'Supplements',
      yes: 'Yes',
      no: 'No',
      years: 'years',
      language: 'Language / Idioma',
      emailVerification: 'Email Verification',
      emailVerified: 'Email verified',
      emailNotVerified: 'Email not verified',
      resendVerification: 'Resend verification',
      verificationSent: 'Verification email sent. Check your inbox.',
      profileUpdated: 'Profile updated successfully.',
      errorSavingProfile: 'Error saving profile.',
      noAuthenticatedUser: 'No authenticated user.',
      loadingProfile: 'Loading profile...',
      errorLogout: 'Error logging out.',
      logout: 'Logout',
    },
    
    // Chat
    chat: {
      title: 'AI Assistant',
      subtitle: 'Your smart pregnancy companion',
      welcome: 'Hello! I\'m your pregnancy assistant. I can help you with questions about nutrition, exercise, symptoms, medications and medical appointments. How can I help you today?',
      placeholder: 'Write your question...',
      typing: 'Typing...',
      error: 'Sorry, I couldn\'t process your message. Please try again.',
      errorTitle: 'Connection error',
      errorMessage: 'Could not connect to server. Check your internet connection.',
      quickQuestions: 'Quick questions',
      suggestions: 'Here are some suggestions to continue the conversation:',
      questions: {
        nutrition: 'What should I eat?',
        exercise: 'Can I exercise?',
        symptoms: 'Is this symptom normal?',
        medication: 'What medications can I take?',
        appointments: 'When is my next appointment?',
      },
    },
    
    // Medical feedback
    medicalFeedback: {
      title: 'Medical Feedback',
      doctorName: 'Doctor name',
      recommendations: 'Doctor recommendations',
      concerns: 'Concerns or symptoms',
      nextAppointment: 'Next medical appointment',
      notes: 'Additional notes',
      supplementsPrescribed: 'Prescribed supplements',
      testsOrdered: 'Tests ordered',
      weight: 'Weight (kg)',
      bloodPressure: 'Blood pressure',
      babyHeartbeat: 'Baby heartbeat (bpm)',
      ultrasoundNotes: 'Ultrasound notes',
      saveFeedback: 'Save feedback',
      feedbackSaved: 'Medical feedback saved successfully.',
      errorSavingFeedback: 'Error saving medical feedback.',
      requiredFields: 'Please complete all required fields.',
      invalidWeight: 'Invalid weight',
      invalidHeartbeat: 'Invalid baby heartbeat',
    },
    
    // General messages
    messages: {
      loading: 'Loading information...',
      noPosts: 'No posts yet',
      beFirst: 'Be the first to start a conversation in this category',
      createPost: 'Create post',
      close: 'Close',
      cancel: 'Cancel',
      publish: 'Publish',
      buyNow: 'Buy now',
      seeDetails: 'See details',
      important: 'Important',
      disclaimer: 'Always consult your doctor before taking any supplement. This information is educational and does not replace professional medical advice.',
    },
    
    // Chips and labels
    chips: {
      verified: 'Verified',
      expert: 'Expert',
      priority: 'Priority',
      trimester: 'Trimester',
      week: 'Week',
      allergy: 'Allergy',
      dietary: 'Dietary',
      certification: 'Certification',
    },
    
    // Dates and selection
    selectDate: 'Select date',
    confirm: 'Confirm',
    pregnancyWeek: 'Pregnancy week',
    customWeeks: 'Save custom week',
    lastMenstruationDate: 'Date of your last menstruation',
    thisAllowsUsToCalculateYourPregnancyWeek: 'This allows us to calculate your pregnancy week.',
    selectedDate: 'Selected',
    confirmPregnancyWeek: 'Confirm week',
    accordingToTheDateEnteredYouHave: 'According to the entered date, you have',
    pregnancyWeeks: 'pregnancy weeks. Is this correct? ',
    ifNotCorrectYouCanModifyItManually: 'If not correct, you can modify it manually',
    
    // Recommendations
    recommendationsForYou: 'Recommendations for you',
    basedOnYourProfile: 'Based on your profile',
    firstTrimesterRecommendation: 'In the first trimester, folic acid is essential for neural tube development.',
    secondTrimesterRecommendation: 'The second trimester requires calcium and vitamin D for the baby\'s bone development.',
    thirdTrimesterRecommendation: 'The third trimester needs omega-3 DHA for final brain development.',
    customRecommendation: 'Consult your doctor for personalized recommendations.',
    
    // Products and store
    storeSubtitle: 'Certified products with detailed medical explanations',
    seeCart: 'See cart',
    cart: 'Cart',
    articles: 'Articles',
    videos: 'Videos',
    checklist: 'Checklist',
    all: 'All',
    communitySubtitle: 'Connect with other moms and experts in a safe and moderated space',
    allergies: 'Allergies',
    priority: 'Priority',
    mainBenefits: 'Main benefits:',
    seeMedicalDetails: 'See medical details',
    buy: 'Buy',
    medicalDisclaimer: 'Always consult your doctor before taking any supplement. This information is educational and does not replace professional medical advice.',
    detailedMedicalInfo: 'Detailed Medical Information',
    benefits: 'Benefits',
    sideEffects: 'Side effects',
    contraindications: 'Contraindications',
    certifications: 'Certifications',
    qualityCertified: '✓ Quality certified',
    medicalExplanations: '✓ Medical explanations',
    noToxicChemicals: '✓ No toxic chemicals',
    searchProducts: 'Search products...',
    products: 'Products',
    items: 'items',
    recommended: 'Recommended',
    reviews: 'reviews',
    details: 'Details',
    add: 'Add',
    noProductsFound: 'No products found',
    tryOtherSearchTerms: 'Try other search terms or categories',
    productDetails: 'Product details',
    outOfFive: 'of 5',
    medicalBenefits: 'Medical benefits',
    
    // Specific supplements
    mockUserName: 'Maria Garcia',
    noRelevantHistory: 'No relevant history',
    vegetarian: 'Vegetarian',
    nuts: 'Nuts',
    natural: 'Natural',
    glutenFree: 'Gluten free',
    folicAcidPremium: 'Premium Folic Acid',
    folicAcidDescription: 'Essential supplement for the development of the baby\'s neural tube',
    preventsNeuralTubeDefects: 'Prevents neural tube defects',
    supportsBrainDevelopment: 'Supports brain development',
    reducesPreeclampsiaRisk: 'Reduces preeclampsia risk',
    folicAcidDosage: '400 mcg daily',
    folicAcidMedicalExplanation: 'Folic acid is an essential B vitamin that helps form the baby\'s neural tube during the first weeks of pregnancy. It is crucial for preventing birth defects such as spina bifida.',
    fdaApproved: 'FDA Approved',
    gmpCertified: 'GMP Certified',
    mayCauseMildNausea: 'May cause mild nausea',
    folicAcidAllergy: 'Folic acid allergy',
    calciumVitaminD: 'Calcium + Vitamin D',
    calciumDescription: 'Special formula to strengthen bones and teeth',
    strengthensBonesTeeth: 'Strengthens bones and teeth',
    preventsOsteoporosis: 'Prevents osteoporosis',
    supportsSkeletalDevelopment: 'Supports baby\'s skeletal development',
    calciumDosage: '1000 mg calcium + 400 IU vitamin D',
    calciumMedicalExplanation: 'During pregnancy, the baby needs calcium to develop strong bones and teeth. If you don\'t consume enough calcium, your body will take it from your own bones.',
    uspVerified: 'USP Verified',
    lactoseFree: 'Lactose free',
    mayCauseConstipation: 'May cause constipation',
    kidneyStones: 'Kidney stones',
    omega3dha: 'Omega-3 DHA',
    omega3Description: 'Essential fatty acids for brain development',
    babyBrainDevelopment: 'Baby\'s brain development',
    improvesCognitiveFunction: 'Improves cognitive function',
    reducesPretermBirthRisk: 'Reduces preterm birth risk',
    omega3Dosage: '200 mg DHA daily',
    omega3MedicalExplanation: 'DHA is an omega-3 fatty acid that is fundamental for the development of the baby\'s brain and eyes. It is especially important during the second and third trimester.',
    sustainableFishing: 'Sustainable Fishing',
    mercuryFree: 'Mercury free',
    mayCauseFishyBurps: 'May cause fishy burps',
    fishAllergy: 'Fish allergy',
  },
};

// Configurar idioma por defecto
I18n.locale = Localization.getLocales()[0]?.languageCode || 'es';
I18n.fallbacks = true;
I18n.defaultLocale = 'es';

// Inicializar idioma desde almacenamiento
const initializeLanguage = async () => {
  try {
    const savedLanguage = await SecureStore.getItemAsync('language');
    if (savedLanguage) {
      I18n.locale = savedLanguage;
    }
  } catch (error) {
    console.log('Error loading language:', error);
  }
};

initializeLanguage();

export const t = (key: string, config?: any) => I18n.t(key, config);
export const setLanguage = (locale: string) => {
  I18n.locale = locale;
  SecureStore.setItemAsync('language', locale);
};
export const getCurrentLanguage = () => I18n.locale; 