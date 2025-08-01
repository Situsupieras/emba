import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/theme';
import HomeScreen from './src/screens/HomeScreen';
import SupplementsScreen from './src/screens/SupplementsScreen';
import GuideScreen from './src/screens/GuideScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import StoreScreen from './src/screens/StoreScreen';
import ChatScreen from './src/screens/ChatScreen';
import AuthScreen from './src/screens/AuthScreen';
import UltimaReglaScreen from './src/screens/UltimaReglaScreen';
import MedicalFeedbackScreen from './src/screens/MedicalFeedbackScreen';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import type { RootStackParamList, MainTabParamList } from './src/types/navigation';
import { View, Text, Platform, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/data/firebaseConfig';
import ProfileScreen from './src/screens/ProfileScreen';
import * as Notifications from 'expo-notifications';
import { UserProvider } from './src/context/UserContext';
import { securityFramework } from './src/security';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Suplementos') iconName = 'flask';
          else if (route.name === 'Guía') iconName = focused ? 'book' : 'book-outline';
          else if (route.name === 'Comunidad') iconName = focused ? 'people' : 'people-outline';
          else if (route.name === 'Tienda') iconName = focused ? 'cart' : 'cart-outline';
          else if (route.name === 'Chat') iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          else if (route.name === 'Perfil') iconName = focused ? 'person' : 'person-outline';
          else iconName = 'help-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: 'white',
        headerTitleStyle: { fontWeight: 'bold' },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Mi Embarazo', headerShown: false }} />
      <Tab.Screen name="Suplementos" component={SupplementsScreen} options={{ title: 'Suplementos' }} />
      <Tab.Screen name="Guía" component={GuideScreen} options={{ title: 'Guía Trimestral' }} />
      <Tab.Screen name="Comunidad" component={CommunityScreen} options={{ title: 'Comunidad' }} />
      <Tab.Screen name="Tienda" component={StoreScreen} options={{ title: 'Tienda Ética' }} />
      <Tab.Screen name="Chat" component={ChatScreen} options={{ title: 'Asistente IA', headerShown: false }} />
      <Tab.Screen name="Perfil" component={ProfileScreen} options={{ title: 'Mi Perfil' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [securityInitialized, setSecurityInitialized] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Inicializar framework de seguridad primero
      await securityFramework.initialize();
      setSecurityInitialized(true);
      
      // Luego inicializar el resto de la app
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });
    } catch (error) {
      console.error('App initialization failed:', error);
    }
  };

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
    if (user) {
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
  }, [user]);

  // No mostrar la app hasta que la seguridad esté inicializada
  if (!securityInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Inicializando seguridad...</Text>
      </View>
    );
  }

  if (loading) {
    return null; // O un splash screen
  }

  return (
    <UserProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="UltimaRegla" component={UltimaReglaScreen} />
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen 
              name="MedicalFeedback" 
              component={MedicalFeedbackScreen} 
              options={{ 
                headerShown: true,
                title: 'Retroalimentación Médica',
                presentation: 'modal'
              }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </UserProvider>
  );
}