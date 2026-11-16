// Configuración de entorno para Inteligencia Prenatal
export const ENV = {
  // Supabase Configuration (valores en .env, ver .env.example)
  SUPABASE: {
    URL: process.env.EXPO_PUBLIC_SUPABASE_URL || "",
    // Clave publishable (sb_publishable_...) o anon: es pública, la protección real es RLS
    KEY: process.env.EXPO_PUBLIC_SUPABASE_KEY || ""
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

