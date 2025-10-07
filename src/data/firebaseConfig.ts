// Configuración de Firebase para Inteligencia Prenatal
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { ENV } from '../config/environment';

// Configuración de Firebase desde variables de entorno
const firebaseConfig = {
  apiKey: ENV.FIREBASE.API_KEY,
  authDomain: ENV.FIREBASE.AUTH_DOMAIN,
  projectId: ENV.FIREBASE.PROJECT_ID,
  storageBucket: ENV.FIREBASE.STORAGE_BUCKET,
  messagingSenderId: ENV.FIREBASE.MESSAGING_SENDER_ID,
  appId: ENV.FIREBASE.APP_ID,
  measurementId: ENV.FIREBASE.MEASUREMENT_ID
};

// Inicializar Firebase solo si no hay instancias previas
let firebaseApp;
if (getApps().length === 0) {
  try {
    firebaseApp = initializeApp(firebaseConfig);
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    throw new Error('Failed to initialize Firebase');
  }
} else {
  firebaseApp = getApps()[0];
}

// Inicializar Auth
const auth: Auth = getAuth(firebaseApp);

export { firebaseApp, auth }; 