import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import SupplementsScreen from './src/screens/SupplementsScreen';
import GuideScreen from './src/screens/GuideScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import StoreScreen from './src/screens/StoreScreen';

// Import theme
import { theme } from './src/theme';
import { customColors } from './src/theme';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap;

              if (route.name === 'Mi Embarazo') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Suplementos') {
                iconName = focused ? 'medical' : 'medical-outline';
              } else if (route.name === 'Guía') {
                iconName = focused ? 'book' : 'book-outline';
              } else if (route.name === 'Comunidad') {
                iconName = focused ? 'people' : 'people-outline';
              } else if (route.name === 'Tienda') {
                iconName = focused ? 'cart' : 'cart-outline';
              } else {
                iconName = 'help-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: customColors.disabled,
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        >
          <Tab.Screen name="Mi Embarazo" component={HomeScreen} />
          <Tab.Screen name="Suplementos" component={SupplementsScreen} />
          <Tab.Screen name="Guía" component={GuideScreen} />
          <Tab.Screen name="Comunidad" component={CommunityScreen} />
          <Tab.Screen name="Tienda" component={StoreScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
} 