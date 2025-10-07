// Configuración de entorno para Inteligencia Prenatal
export const ENV = {
  // Firebase Configuration
  FIREBASE: {
    API_KEY: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "AIzaSyCsNRmRkCugFoGP74aWR_086dQ7EN0ChXc",
    AUTH_DOMAIN: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "inteligencia-prenatal.firebaseapp.com",
    PROJECT_ID: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "inteligencia-prenatal",
    STORAGE_BUCKET: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "inteligencia-prenatal.firebasestorage.app",
    MESSAGING_SENDER_ID: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "567704618820",
    APP_ID: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "1:567704618820:web:7b25e7a4e3660dd3c87911",
    MEASUREMENT_ID: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-TTCFEMFK96"
  },
  
  // App Configuration
  APP: {
    NAME: "Inteligencia Prenatal",
    VERSION: "1.0.0",
    BUILD_NUMBER: "1"
  },
  
  // Feature Flags
  FEATURES: {
    ENABLE_PUSH_NOTIFICATIONS: true,
    ENABLE_ANALYTICS: true,
    ENABLE_CRASH_REPORTING: true
  }
};

// Función para verificar si estamos en desarrollo
export const isDevelopment = () => __DEV__;

// Función para verificar si estamos en producción
export const isProduction = () => !__DEV__;

