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
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Suplementos') iconName = focused ? 'medical-bag' : 'medical-bag';
          else if (route.name === 'Guía') iconName = focused ? 'book' : 'book-outline';
          else if (route.name === 'Comunidad') iconName = focused ? 'people' : 'people-outline';
          else if (route.name === 'Tienda') iconName = focused ? 'cart' : 'cart-outline';
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
    </Tab.Navigator>
  );
}

export default function App() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    let didFinish = false;
    const timeout = setTimeout(() => {
      if (!didFinish) {
        console.log('Timeout: SecureStore no respondió, mostrando Auth');
        setInitialRoute('Auth');
      }
    }, 2000);
    (async () => {
      try {
        const userName = await SecureStore.getItemAsync('userName');
        const ultimaRegla = await SecureStore.getItemAsync('ultimaRegla');
        console.log('userName:', userName, 'ultimaRegla:', ultimaRegla);
        if (!userName) setInitialRoute('Auth');
        else if (!ultimaRegla) setInitialRoute('UltimaRegla');
        else setInitialRoute('Main');
      } catch (e) {
        console.log('Error leyendo SecureStore:', e);
        setInitialRoute('Auth');
      } finally {
        didFinish = true;
        clearTimeout(timeout);
      }
    })();
    return () => clearTimeout(timeout);
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Text style={{ color: 'red', fontSize: 18 }}>Cargando... (initialRoute: {String(initialRoute)})</Text>
      </View>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute as keyof RootStackParamList} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="UltimaRegla" component={UltimaReglaScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}