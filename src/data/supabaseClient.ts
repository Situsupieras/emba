// Cliente de Supabase para Inteligencia Prenatal
import 'react-native-url-polyfill/auto';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { ENV } from '../config/environment';

if (!ENV.SUPABASE.URL || !ENV.SUPABASE.KEY) {
  throw new Error('Faltan EXPO_PUBLIC_SUPABASE_URL o EXPO_PUBLIC_SUPABASE_KEY en .env');
}

export const supabase = createClient(ENV.SUPABASE.URL, ENV.SUPABASE.KEY, {
  auth: {
    // En web supabase-js usa localStorage por su cuenta; en móvil, AsyncStorage
    storage: Platform.OS === 'web' ? undefined : AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: Platform.OS === 'web',
  },
});
