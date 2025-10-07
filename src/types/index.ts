// Tipos base para la aplicación
export interface User {
  id: string;
  name: string;
  email: string;
  dueDate: Date;
  currentWeek: number;
  trimester: number;
  medicalHistory: string[];
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
  isEmailVerified: boolean;
  lastLoginAt: Date;
}

// Tipos específicos para Firebase
export interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: {
    creationTime: string;
    lastSignInTime: string;
  };
}

export interface FirebaseAuthError {
  code: string;
  message: string;
  email?: string;
  credential?: any;
}

export interface UserPreferences {
  dietaryRestrictions: string[];
  allergies: string[];
  supplementPreferences: string[];
  notificationSettings: NotificationSettings;
}

export interface NotificationSettings {
  weeklyUpdates: boolean;
  supplementReminders: boolean;
  appointmentReminders: boolean;
  communityUpdates: boolean;
}

export interface FetalDevelopment {
  week: number;
  size: string;
  weight: string;
  description: string;
  milestones: string[];
  tips: string[];
  animation: string;
  motherChanges: string[];
}

export interface Supplement {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  dosage: string;
  trimester: number[];
  price: number;
  image: string;
  medicalExplanation: string;
  certifications: string[];
  sideEffects: string[];
  contraindications: string[];
}

export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  publishDate: Date;
  category: string;
  tags: string[];
  image: string;
  readTime: number;
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  category: string;
  likes: number;
  comments: Comment[];
  createdAt: Date;
  isExpertVerified: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
  isExpert: boolean;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  trimester: number;
  completed: boolean;
  dueDate?: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  certifications: string[];
  medicalBenefits: string[];
}

export interface MedicalFeedback {
  id: string;
  week: number;
  date: Date;
  doctorName: string;
  recommendations: string[];
  concerns: string[];
  nextAppointment: Date;
  notes: string;
  supplementsPrescribed: string[];
  testsOrdered: string[];
  weight: number;
  bloodPressure: string;
  babyHeartbeat: number;
  ultrasoundNotes?: string;
}

export interface MedicalRecommendation {
  id: string;
  week: number;
  category: 'diet' | 'exercise' | 'supplements' | 'lifestyle' | 'medical' | 'general';
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
  source: 'doctor' | 'app' | 'user';
  dateAdded: Date;
  isFollowed: boolean;
  notes?: string;
}

export interface MedicalSync {
  lastSyncDate: Date;
  doctorRecommendations: MedicalRecommendation[];
  appRecommendations: MedicalRecommendation[];
  conflicts: MedicalConflict[];
  resolvedConflicts: MedicalConflict[];
}

export interface MedicalConflict {
  id: string;
  appRecommendation: string;
  doctorRecommendation: string;
  week: number;
  dateDetected: Date;
  resolution: 'doctor_priority' | 'app_priority' | 'compromise' | 'pending';
  notes?: string;
} 