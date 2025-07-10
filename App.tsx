import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/theme';
import AuthScreen from './src/screens/AuthScreen';
import UltimaReglaScreen from './src/screens/UltimaReglaScreen';
import MedicalFeedbackScreen from './src/screens/MedicalFeedbackScreen';
import * as SecureStore from 'expo-secure-store';
import type { RootStackParamList } from './src/types/navigation';
import { View, Text, Platform } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/data/firebaseConfig';
import * as Notifications from 'expo-notifications';
import { t } from './src/data/i18n';
import { LanguageProvider } from './src/context/LanguageContext';
import LanguageAwareNavigator from './src/components/LanguageAwareNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

function MainTabs() {
  return <LanguageAwareNavigator />;
}

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hasUserData, setHasUserData] = useState(false);

  useEffect(() => {
    const checkUserData = async () => {
      try {
        // Verificar si hay datos de usuario guardados
        const userProfile = await SecureStore.getItemAsync('userProfile');
        const userName = await SecureStore.getItemAsync('userName');
        const semanas = await SecureStore.getItemAsync('semanas');
        
        if (userProfile || userName || semanas) {
          setHasUserData(true);
        }
      } catch (error) {
        console.log('Error verificando datos de usuario:', error);
      }
    };

    checkUserData();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Configuración de notificaciones
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  // Solicitar permisos y mostrar notificación de bienvenida
  useEffect(() => {
    if (user || hasUserData) {
      (async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status === 'granted') {
          const tokenData = await Notifications.getExpoPushTokenAsync();
          // Aquí puedes guardar el token en Firestore si lo deseas
          await Notifications.scheduleNotificationAsync({
            content: {
              title: '¡Bienvenida a Inteligencia Prenatal!',
              body: 'Recibirás recordatorios y novedades importantes aquí.',
            },
            trigger: null,
          });
        }
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      })();
    }
  }, [user, hasUserData]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.primary }}>
        <Text style={{ color: 'white', fontSize: 18 }}>Cargando Inteligencia Prenatal...</Text>
      </View>
    );
  }

  // Si hay datos de usuario guardados o usuario autenticado, mostrar la app principal
  const shouldShowMain = user || hasUserData;

  return (
    <LanguageProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={shouldShowMain ? "Main" : "Auth"} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="UltimaRegla" component={UltimaReglaScreen} />
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen 
              name="MedicalFeedback" 
              component={MedicalFeedbackScreen} 
              options={{ 
                headerShown: true,
                title: t('medicalFeedback.title'),
                presentation: 'modal'
              }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </LanguageProvider>
  );
}