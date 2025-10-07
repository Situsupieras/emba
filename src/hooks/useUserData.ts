// src/hooks/useUserData.ts
/**
 * Hook para gestión de datos del usuario desde SecureStore
 * Centraliza la lógica de persistencia y cálculos derivados
 */

import { useState, useEffect, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import { calculateTrimester, isValidWeek } from '@/utils/constants/appConstants';

/**
 * Preferencias del usuario desde SecureStore
 */
export interface UserPreferences {
  dietaryRestrictions: string[];
  allergies: string[];
  supplementPreferences: string[];
}

/**
 * Datos del usuario recuperados de SecureStore
 */
export interface UserData {
  id: string;
  name: string;
  currentWeek: number;
  trimester: 1 | 2 | 3;
  preferences: UserPreferences;
}

/**
 * Resultado del hook useUserData
 */
export interface UseUserDataResult {
  user: UserData;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  updateWeek: (newWeek: number) => Promise<void>;
}

/**
 * Claves de SecureStore
 */
const SECURE_STORE_KEYS = {
  USER_NAME: 'userName',
  SEMANAS: 'semanas',
  USER_ID: 'userId',
} as const;

/**
 * Usuario por defecto (fallback)
 */
const DEFAULT_USER: UserData = {
  id: 'default-user',
  name: '',
  currentWeek: 1,
  trimester: 1,
  preferences: {
    dietaryRestrictions: [],
    allergies: [],
    supplementPreferences: [],
  },
};

/**
 * Hook para obtener datos del usuario desde SecureStore
 * Incluye cálculos derivados como trimestre
 * 
 * @example
 * ```tsx
 * const { user, isLoading, error, refetch } = useUserData();
 * 
 * if (isLoading) return <Loader />;
 * if (error) return <ErrorView error={error} />;
 * 
 * return <Profile user={user} />;
 * ```
 */
export function useUserData(): UseUserDataResult {
  const [user, setUser] = useState<UserData>(DEFAULT_USER);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Carga datos del usuario desde SecureStore
   */
  const loadUserData = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      // Cargar datos en paralelo
      const [name, semanasStr, userId] = await Promise.all([
        SecureStore.getItemAsync(SECURE_STORE_KEYS.USER_NAME),
        SecureStore.getItemAsync(SECURE_STORE_KEYS.SEMANAS),
        SecureStore.getItemAsync(SECURE_STORE_KEYS.USER_ID),
      ]);

      // Parsear semanas con validación
      let currentWeek = 1;
      if (semanasStr) {
        const parsedWeek = parseInt(semanasStr, 10);
        if (!isNaN(parsedWeek) && isValidWeek(parsedWeek)) {
          currentWeek = parsedWeek;
        } else {
          console.warn(`Semana inválida en SecureStore: ${semanasStr}. Usando default: 1`);
        }
      }

      // Calcular trimestre basado en semanas
      const trimester = calculateTrimester(currentWeek);

      setUser({
        id: userId || DEFAULT_USER.id,
        name: name || DEFAULT_USER.name,
        currentWeek,
        trimester,
        preferences: DEFAULT_USER.preferences, // TODO: Cargar desde SecureStore
      });
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Error desconocido al cargar datos de usuario');
      console.error('Error en useUserData:', error);
      setError(error);
      setUser(DEFAULT_USER);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Actualiza la semana actual del usuario
   */
  const updateWeek = useCallback(async (newWeek: number): Promise<void> => {
    if (!isValidWeek(newWeek)) {
      throw new Error(`Semana inválida: ${newWeek}. Debe estar entre 1-40.`);
    }

    try {
      await SecureStore.setItemAsync(SECURE_STORE_KEYS.SEMANAS, newWeek.toString());
      
      setUser(prev => ({
        ...prev,
        currentWeek: newWeek,
        trimester: calculateTrimester(newWeek),
      }));
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Error al actualizar semana');
      console.error('Error en updateWeek:', error);
      throw error;
    }
  }, []);

  // Cargar datos al montar el componente
  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  return {
    user,
    isLoading,
    error,
    refetch: loadUserData,
    updateWeek,
  };
}