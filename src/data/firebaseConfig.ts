// Configuración de Firebase para Inteligencia Prenatal
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCsNRmRkCugFoGP74aWR_086dQ7EN0ChXc",
  authDomain: "inteligencia-prenatal.firebaseapp.com",
  projectId: "inteligencia-prenatal",
  storageBucket: "inteligencia-prenatal.firebasestorage.app",
  messagingSenderId: "567704618820",
  appId: "1:567704618820:web:7b25e7a4e3660dd3c87911",
  measurementId: "G-TTCFEMFK96"
};

export const firebaseApp = initializeApp(firebaseConfig); 