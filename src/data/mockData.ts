import { User, Supplement, Article, CommunityPost, Product } from '../types';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export const mockUser: User = {
  id: '1',
  name: 'María García',
  email: 'maria@example.com',
  dueDate: new Date('2024-06-15'),
  currentWeek: 20,
  trimester: 2,
  medicalHistory: ['Sin antecedentes relevantes'],
  preferences: {
    dietaryRestrictions: ['Vegetariana'],
    allergies: ['Nueces'],
    supplementPreferences: ['Natural', 'Sin gluten'],
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
    name: 'Ácido Fólico Premium',
    description: 'Suplemento esencial para el desarrollo del tubo neural del bebé',
    benefits: [
      'Previene defectos del tubo neural',
      'Apoya el desarrollo cerebral',
      'Reduce el riesgo de preeclampsia'
    ],
    dosage: '400 mcg diarios',
    trimester: [1, 2, 3],
    price: 25.99,
    image: 'https://via.placeholder.com/150',
    medicalExplanation: 'El ácido fólico es una vitamina B esencial que ayuda a formar el tubo neural del bebé durante las primeras semanas del embarazo. Es crucial para prevenir defectos congénitos como la espina bífida.',
    certifications: ['FDA Aprobado', 'GMP Certificado', 'Sin gluten'],
    sideEffects: ['Puede causar náuseas leves'],
    contraindications: ['Alergia al ácido fólico']
  },
  {
    id: '2',
    name: 'Calcio + Vitamina D',
    description: 'Fórmula especial para fortalecer huesos y dientes',
    benefits: [
      'Fortalece huesos y dientes',
      'Previene osteoporosis',
      'Apoya el desarrollo esquelético del bebé'
    ],
    dosage: '1000 mg calcio + 400 UI vitamina D',
    trimester: [2, 3],
    price: 32.50,
    image: 'https://via.placeholder.com/150',
    medicalExplanation: 'Durante el embarazo, el bebé necesita calcio para desarrollar huesos y dientes fuertes. Si no consumes suficiente calcio, tu cuerpo lo tomará de tus propios huesos.',
    certifications: ['USP Verificado', 'Sin lactosa'],
    sideEffects: ['Puede causar estreñimiento'],
    contraindications: ['Cálculos renales']
  },
  {
    id: '3',
    name: 'Omega-3 DHA',
    description: 'Ácidos grasos esenciales para el desarrollo cerebral',
    benefits: [
      'Desarrollo cerebral del bebé',
      'Mejora la función cognitiva',
      'Reduce riesgo de parto prematuro'
    ],
    dosage: '200 mg DHA diarios',
    trimester: [2, 3],
    price: 45.00,
    image: 'https://via.placeholder.com/150',
    medicalExplanation: 'El DHA es un ácido graso omega-3 que es fundamental para el desarrollo del cerebro y los ojos del bebé. Es especialmente importante durante el segundo y tercer trimestre.',
    certifications: ['Pesca Sostenible', 'Libre de mercurio'],
    sideEffects: ['Puede causar eructos con sabor a pescado'],
    contraindications: ['Alergia al pescado']
  }
];

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Guía completa de nutrición en el primer trimestre',
    content: 'Durante el primer trimestre, tu bebé está desarrollando todos sus órganos principales...',
    author: 'Dr. Ana Martínez',
    publishDate: new Date('2024-01-15'),
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
    publishDate: new Date('2024-01-10'),
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
        createdAt: new Date('2024-01-12'),
        isExpert: true
      }
    ],
    createdAt: new Date('2024-01-11'),
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