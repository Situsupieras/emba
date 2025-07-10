import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../data/i18n';
import { theme } from '../theme';
import HomeScreen from '../screens/HomeScreen';
import SupplementsScreen from '../screens/SupplementsScreen';
import GuideScreen from '../screens/GuideScreen';
import CommunityScreen from '../screens/CommunityScreen';
import StoreScreen from '../screens/StoreScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { MainTabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function LanguageAwareNavigator() {
  const { currentLanguage } = useLanguage();
  
  return (
    <Tab.Navigator
      key={currentLanguage}
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
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: t('home'),
          headerShown: true
        }} 
      />
      <Tab.Screen 
        name="Suplementos" 
        component={SupplementsScreen} 
        options={{ 
          title: t('supplements'),
          headerShown: true
        }} 
      />
      <Tab.Screen 
        name="Guía" 
        component={GuideScreen} 
        options={{ 
          title: t('guide'),
          headerShown: true
        }} 
      />
      <Tab.Screen 
        name="Comunidad" 
        component={CommunityScreen} 
        options={{ 
          title: t('community'),
          headerShown: true
        }} 
      />
      <Tab.Screen 
        name="Tienda" 
        component={StoreScreen} 
        options={{ 
          title: t('store'),
          headerShown: true
        }} 
      />
      <Tab.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={{ 
          title: t('chat.title'),
          headerShown: true
        }} 
      />
      <Tab.Screen 
        name="Perfil" 
        component={ProfileScreen} 
        options={{ 
          title: t('profile.title'),
          headerShown: true
        }} 
      />
    </Tab.Navigator>
  );
} 