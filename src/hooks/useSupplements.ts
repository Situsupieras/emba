// src/hooks/useSupplements.ts
/**
 * Hook personalizado para gestión de suplementos
 * Encapsula lógica de estado y efectos secundarios
 */

import { useState, useEffect, useMemo } from 'react';
import { Supplement } from '@/types';
import {
  SupplementService,
  GetSupplementsParams,
} from '@/services/supplementService';
import { PersonalizedRecommendations, DietType } from '@/data/supplements';

export interface UseSupplementsParams {
  currentWeek: number;
  age?: number;
  previousChildren?: number;
  diet?: DietType;
  enabled?: boolean; // Permite deshabilitar el hook
}

export interface UseSupplementsResult {
  supplements: Supplement[];
  recommendations: PersonalizedRecommendations | null;
  trimester: number;
  isLoading: boolean;
  isError: boolean;
  errors: string[];
  refetch: () => void;
}

/**
 * Hook para obtener suplementos personalizados
 * @param params - Parámetros de personalización
 * @returns Estado y funciones para gestionar suplementos
 */
export function useSupplements(
  params: UseSupplementsParams
): UseSupplementsResult {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendations | null>(null);
  const [trimester, setTrimester] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const enabled = params.enabled ?? true;

  const fetchSupplements = useMemo(() => {
    return () => {
      if (!enabled) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setIsError(false);
        setErrors([]);

        const result = SupplementService.getPersonalizedLegacySupplements({
          currentWeek: params.currentWeek,
          age: params.age,
          previousChildren: params.previousChildren,
          diet: params.diet,
        });

        if (!result.isValid) {
          setIsError(true);
          setErrors(result.errors);
        }

        setSupplements(result.supplements);
        setRecommendations(result.recommendations);
        setTrimester(result.trimester);
      } catch (error) {
        console.error('Error fetching supplements:', error);
        setIsError(true);
        setErrors(['Error al cargar suplementos. Por favor intenta de nuevo.']);
      } finally {
        setIsLoading(false);
      }
    };
  }, [
    params.currentWeek,
    params.age,
    params.previousChildren,
    params.diet,
    enabled,
  ]);

  useEffect(() => {
    fetchSupplements();
  }, [fetchSupplements]);

  return {
    supplements,
    recommendations,
    trimester,
    isLoading,
    isError,
    errors,
    refetch: fetchSupplements,
  };
}