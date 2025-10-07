import * as Localization from 'expo-localization';
import * as SecureStore from 'expo-secure-store';
import I18n from 'i18n-js';
import translations from '../locales';

// Configurar i18n
I18n.translations = translations;
I18n.fallbacks = true;
I18n.defaultLocale = 'es';

// DEBUG: Ver estructura de traducciones al iniciar
console.log('🔍 DEBUG - Idiomas disponibles:', Object.keys(I18n.translations));
console.log('🔍 DEBUG - Keys en español:', Object.keys(I18n.translations.es || {}).slice(0, 10));

// Inicializar idioma desde almacenamiento
const initializeLanguage = async () => {
  try {
    const savedLanguage = await SecureStore.getItemAsync('language');
    if (savedLanguage) {
      I18n.locale = savedLanguage;
      console.log('✅ Idioma cargado desde storage:', savedLanguage);
    } else {
      const locale = Localization.getLocales()[0]?.languageCode;
      if (locale && locale.startsWith('es')) {
        I18n.locale = 'es';
      } else {
        I18n.locale = 'en';
      }
      console.log('✅ Idioma detectado:', I18n.locale);
    }
  } catch (error) {
    console.log('⚠️ Error loading language:', error);
    I18n.locale = 'es';
  }
};

initializeLanguage();

// Función de traducción con DEBUG mejorado
export const t = (key: string, config?: any) => {
  try {
    const translation = I18n.t(key, config);
    
    // Si la traducción devuelve la key, significa que no existe
    if (translation === key || translation.startsWith('[missing')) {
      console.warn(`⚠️ TRADUCCIÓN FALTANTE: "${key}" en idioma "${I18n.locale}"`);
      
      // DEBUG: Verificar si la key existe en el objeto de traducciones
      const parts = key.split('.');
      let current = I18n.translations[I18n.locale];
      let path = I18n.locale;
      
      for (const part of parts) {
        if (current && typeof current === 'object' && part in current) {
          current = current[part];
          path += `.${part}`;
        } else {
          console.warn(`   ❌ La key no existe en: ${path}`);
          break;
        }
      }
      
      // Devolver una versión legible de la key
      return key.split('.').pop()?.replace(/([A-Z])/g, ' $1').trim() || key;
    }
    return translation;
  } catch (error) {
    console.error(`❌ Error translating key: ${key}`, error);
    return key;
  }
};

export const setLanguage = async (locale: string) => {
  try {
    I18n.locale = locale;
    await SecureStore.setItemAsync('language', locale);
    console.log('✅ Idioma cambiado a:', locale);
  } catch (error) {
    console.error('❌ Error saving language:', error);
  }
};

export const getCurrentLanguage = () => I18n.locale;

export default I18n;