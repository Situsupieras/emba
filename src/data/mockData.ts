import { User, Supplement, Article, CommunityPost, Product } from '../types';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { t } from './i18n';

export const mockUser: User = {
  id: '1',
  name: t('mockUserName'),
  email: 'maria@example.com',
  dueDate: new Date('2025-06-15'),
  currentWeek: 20,
  trimester: 2,
  medicalHistory: [t('noRelevantHistory')],
  preferences: {
    dietaryRestrictions: [t('vegetarian')],
    allergies: [t('nuts')],
    supplementPreferences: [t('natural'), t('glutenFree')],
    notificationSettings: {
      weeklyUpdates: true,
      supplementReminders: true,
      appointmentReminders: true,
      communityUpdates: false,
    },
  },
};

export const mockSupplements: Supplement[] = [
  {
    id: '1',
    name: t('folicAcidPremium'),
    description: t('folicAcidDescription'),
    benefits: [
      t('preventsNeuralTubeDefects'),
      t('supportsBrainDevelopment'),
      t('reducesPreeclampsiaRisk')
    ],
    dosage: t('folicAcidDosage'),
    trimester: [1, 2, 3],
    price: 25.99,
    image: 'https://via.placeholder.com/150',
    medicalExplanation: t('folicAcidMedicalExplanation'),
    certifications: [t('fdaApproved'), t('gmpCertified'), t('glutenFree')],
    sideEffects: [t('mayCauseMildNausea')],
    contraindications: [t('folicAcidAllergy')]
  },
  {
    id: '2',
    name: t('calciumVitaminD'),
    description: t('calciumDescription'),
    benefits: [
      t('strengthensBonesTeeth'),
      t('preventsOsteoporosis'),
      t('supportsSkeletalDevelopment')
    ],
    dosage: t('calciumDosage'),
    trimester: [2, 3],
    price: 32.50,
    image: 'https://via.placeholder.com/150',
    medicalExplanation: t('calciumMedicalExplanation'),
    certifications: [t('uspVerified'), t('lactoseFree')],
    sideEffects: [t('mayCauseConstipation')],
    contraindications: [t('kidneyStones')]
  },
  {
    id: '3',
    name: t('omega3dha'),
    description: t('omega3Description'),
    benefits: [
      t('babyBrainDevelopment'),
      t('improvesCognitiveFunction'),
      t('reducesPretermBirthRisk')
    ],
    dosage: t('omega3Dosage'),
    trimester: [2, 3],
    price: 45.00,
    image: 'https://via.placeholder.com/150',
    medicalExplanation: t('omega3MedicalExplanation'),
    certifications: [t('sustainableFishing'), t('mercuryFree')],
    sideEffects: [t('mayCauseFishyBurps')],
    contraindications: [t('fishAllergy')]
  }
];

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Guía completa de nutrición en el primer trimestre',
    content: 'Durante el primer trimestre, tu bebé está desarrollando todos sus órganos principales...',
    author: 'Dr. Ana Martínez',
    publishDate: new Date('2025-01-15'),
    category: 'Nutrición',
    tags: ['primer trimestre', 'nutrición', 'ácido fólico'],
    image: 'https://via.placeholder.com/300x200',
    readTime: 5
  },
  {
    id: '2',
    title: 'Ejercicios seguros durante el embarazo',
    content: 'El ejercicio moderado durante el embarazo tiene múltiples beneficios...',
    author: 'Lic. Carlos Rodríguez',
    publishDate: new Date('2025-01-10'),
    category: 'Ejercicio',
    tags: ['ejercicio', 'seguridad', 'bienestar'],
    image: 'https://via.placeholder.com/300x200',
    readTime: 7
  }
];

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Laura Pérez',
    title: '¿Cuándo empezaron a sentir los movimientos?',
    content: 'Tengo 18 semanas y aún no he sentido movimientos claros. ¿Es normal?',
    category: 'Desarrollo del bebé',
    likes: 15,
    comments: [
      {
        id: '1',
        userId: '3',
        userName: 'Dr. García',
        content: 'Es completamente normal. Los primeros movimientos se sienten entre las semanas 16-22.',
        createdAt: new Date('2025-01-12'),
        isExpert: true
      }
    ],
    createdAt: new Date('2025-01-11'),
    isExpertVerified: true
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Cojín de Lactancia Premium',
    description: 'Cojín ergonómico para amamantar cómodamente',
    price: 89.99,
    originalPrice: 120.00,
    image: 'https://via.placeholder.com/200',
    category: 'Lactancia',
    rating: 4.8,
    reviews: 156,
    inStock: true,
    certifications: ['Certificado Oeko-Tex', 'Sin químicos tóxicos'],
    medicalBenefits: ['Reduce dolor de espalda', 'Mejora posición de lactancia']
  },
  {
    id: '2',
    name: 'Aceite de Masaje Prenatal',
    description: 'Aceite natural para prevenir estrías',
    price: 45.50,
    image: 'https://via.placeholder.com/200',
    category: 'Cuidado de la piel',
    rating: 4.6,
    reviews: 89,
    inStock: true,
    certifications: ['Orgánico', 'Sin parabenos'],
    medicalBenefits: ['Hidrata la piel', 'Reduce aparición de estrías']
  }
];

// Hook para obtener datos reales del usuario desde SecureStore
export function useUserData() {
  const [user, setUser] = useState({
    id: 'real-user',
    name: '',
    currentWeek: 1,
    trimester: 1,
    preferences: {
      dietaryRestrictions: [],
      allergies: [],
      supplementPreferences: [],
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const name = await SecureStore.getItemAsync('userName');
        const semanasStr = await SecureStore.getItemAsync('semanas');
        let currentWeek = 1;
        if (semanasStr && !isNaN(Number(semanasStr))) {
          currentWeek = Number(semanasStr);
        }
        // Calcular trimestre
        let trimester = 1;
        if (currentWeek >= 1 && currentWeek <= 13) trimester = 1;
        else if (currentWeek >= 14 && currentWeek <= 27) trimester = 2;
        else if (currentWeek >= 28) trimester = 3;
        setUser((prev) => ({
          ...prev,
          id: prev.id || 'real-user',
          name: name || '',
          currentWeek,
          trimester,
        }));
      } catch (e) {
        console.log('Error leyendo datos de usuario:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { user, loading };
} 