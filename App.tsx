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
import AuthScreen from './src/screens/AuthScreen';
import UltimaReglaScreen from './src/screens/UltimaReglaScreen';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import type { RootStackParamList, MainTabParamList } from './src/types/navigation';
import { View, Text, Platform } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from './src/data/firebaseConfig';
import ProfileScreen from './src/screens/ProfileScreen';
import * as Notifications from 'expo-notifications';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Suplementos') iconName = 'medkit';
          else if (route.name === 'Guía') iconName = focused ? 'book' : 'book-outline';
          else if (route.name === 'Comunidad') iconName = focused ? 'people' : 'people-outline';
          else if (route.name === 'Tienda') iconName = focused ? 'cart' : 'cart-outline';
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
      <Tab.Screen name="Home" key="Home" component={HomeScreen} options={{ title: 'Mi Embarazo', headerShown: false }} />
      <Tab.Screen name="Suplementos" key="Suplementos" component={SupplementsScreen} options={{ title: 'Suplementos' }} />
      <Tab.Screen name="Guía" key="Guía" component={GuideScreen} options={{ title: 'Guía Trimestral' }} />
      <Tab.Screen name="Comunidad" key="Comunidad" component={CommunityScreen} options={{ title: 'Comunidad' }} />
      <Tab.Screen name="Tienda" key="Tienda" component={StoreScreen} options={{ title: 'Tienda Ética' }} />
      <Tab.Screen name="Perfil" key="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
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

  if (loading) {
    return null; // O un splash screen
  }

  return user ? (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="UltimaRegla" component={UltimaReglaScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  ) : (
    <AuthScreen />
  );
}