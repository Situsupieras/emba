import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  ProgressBar,
  Chip,
  Avatar,
  List,
} from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { theme, customColors } from '../theme';
import { FetalDevelopment, User } from '../types';
import { fetalDevelopmentData } from '../data/fetalDevelopment';
import { mockUser } from '../data/mockData';
import { Ionicons } from '@expo/vector-icons';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../types/navigation';
import * as SecureStore from 'expo-secure-store';
import { getAuth, signOut } from 'firebase/auth';
import { t } from '../data/i18n';
import { UserContext } from '../context/UserContext';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  const { user, reloadUser } = useContext(UserContext);
  const [currentDevelopment, setCurrentDevelopment] = useState<FetalDevelopment | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [loading, setLoading] = useState(true);
  const [profileUpdated, setProfileUpdated] = useState(false); // Nuevo estado para controlar actualizaciones de perfil

  useEffect(() => {
    (async () => {
      try {
        const name = await SecureStore.getItemAsync('userName');
        const userProfileData = await SecureStore.getItemAsync('userProfile');
        const semanasStr = await SecureStore.getItemAsync('semanas');
        const ultimaReglaStr = await SecureStore.getItemAsync('ultimaRegla');
        
        let currentWeek = 1;
        let userName = name || 'Usuario';
        
        // Primero intentar obtener la semana del perfil del usuario
        if (userProfileData) {
          try {
            const profile = JSON.parse(userProfileData);
            if (profile.currentWeek && !isNaN(Number(profile.currentWeek))) {
              currentWeek = Number(profile.currentWeek);
            }
            if (profile.name && profile.name.trim()) {
              userName = profile.name;
            }
          } catch (e) {
            console.log('Error parsing user profile:', e);
          }
        }
        
        // Si no hay perfil o no tiene semana, usar los datos de última regla
        if (currentWeek === 1) {
          if (semanasStr && !isNaN(Number(semanasStr))) {
            currentWeek = Number(semanasStr);
          } else if (ultimaReglaStr) {
            const ultimaRegla = new Date(ultimaReglaStr);
            const hoy = new Date();
            const diff = hoy.getTime() - ultimaRegla.getTime();
            const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
            currentWeek = Math.max(1, Math.floor(dias / 7));
          }
        }

        // Calcular trimestre basado en la semana actual
        let trimester = 1;
        if (currentWeek >= 1 && currentWeek <= 13) {
          trimester = 1;
        } else if (currentWeek >= 14 && currentWeek <= 27) {
          trimester = 2;
        } else if (currentWeek >= 28) {
          trimester = 3;
        }

        // El nombre ya se obtuvo arriba del perfil del usuario

        console.log('HomeScreen - Semana cargada:', currentWeek);
        console.log('HomeScreen - Nombre cargado:', userName);
        console.log('HomeScreen - Trimestre calculado:', trimester);
        
        setUser((prev) => ({
          ...prev,
          name: userName,
          currentWeek,
          trimester,
        }));
      } catch (e) {
        console.log('Error leyendo datos reales:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const development = fetalDevelopmentData.find(d => d.week === user.currentWeek);
    setCurrentDevelopment(development || null);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [user.currentWeek]);

  // Recalcular trimestre cuando cambie la semana
  useEffect(() => {
    let newTrimester = 1;
    if (user.currentWeek >= 1 && user.currentWeek <= 13) {
      newTrimester = 1;
    } else if (user.currentWeek >= 14 && user.currentWeek <= 27) {
      newTrimester = 2;
    } else if (user.currentWeek >= 28) {
      newTrimester = 3;
    }

    if (newTrimester !== user.trimester) {
      setUser(prev => ({
        ...prev,
        trimester: newTrimester,
      }));
    }
  }, [user.currentWeek, user.trimester]);

  // Agregar efecto para escuchar cambios de perfil
  useEffect(() => {
    // Recargar usuario y semana si se actualiza el perfil
    loadUser();
  }, [profileUpdated]);

  // Cuando se navega de vuelta desde ProfileScreen, llamar reloadUser() para actualizar la semana.
  useFocusEffect(
    React.useCallback(() => {
      reloadUser();
    }, [navigation])
  );

  const calculateProgress = () => {
    return user.currentWeek / 40; // 40 weeks total pregnancy
  };

  const getTrimesterColor = () => {
    switch (user.trimester) {
      case 1: return customColors.pregnancyPink;
      case 2: return customColors.babyBlue;
      case 3: return customColors.softYellow;
      default: return customColors.neutralGray;
    }
  };

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Card style={styles.loadingCard}>
          <Card.Content>
            <Title>{t('loadingRealInfo')}</Title>
          </Card.Content>
        </Card>
      </View>
    );
  }

  if (!currentDevelopment) {
    return (
      <View style={styles.container}>
        <Card style={styles.loadingCard}>
          <Card.Content>
            <Title>{t('loadingInfo')}</Title>
          </Card.Content>
        </Card>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Button mode="outlined" onPress={handleLogout} style={{ marginBottom: 16, alignSelf: 'flex-end' }}>
          {t('logout')}
        </Button>
        {/* Header with user info */}
        <Card style={[styles.headerCard, { backgroundColor: getTrimesterColor() }]}>
          <Card.Content>
            <View style={styles.headerContent}>
              <Avatar.Text size={60} label={user.name.charAt(0)} />
              <View style={styles.userInfo}>
                <Title style={styles.userName}>
                  {t('welcome')}, {user.name}!
                </Title>
                <Paragraph>
                  {t('weekOf', { week: user.currentWeek })}
                </Paragraph>
                <Chip mode="outlined" style={styles.trimesterChip}>
                  {user.trimester}{t('trimesterShort')} {t('trimester')}
                </Chip>
              </View>
            </View>
            <ProgressBar
              progress={calculateProgress()}
              color={theme.colors.primary}
              style={styles.progressBar}
            />
          </Card.Content>
        </Card>

        {/* Weekly Development */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>{t('development')}</Title>
            <View style={styles.developmentInfo}>
              <View style={styles.sizeInfo}>
                <Title style={styles.sizeTitle}>{currentDevelopment.size}</Title>
                <Paragraph style={styles.sizeSubtitle}>{t('babySizeThisWeek')}</Paragraph>
              </View>
              <View style={styles.weightInfo}>
                <Title style={styles.weightTitle}>{currentDevelopment.weight}</Title>
                <Paragraph style={styles.weightSubtitle}>{t('approxWeight')}</Paragraph>
              </View>
            </View>
            <Paragraph style={styles.description}>
              {currentDevelopment.description}
            </Paragraph>
          </Card.Content>
        </Card>

        {/* Milestones */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>{t('milestones')}</Title>
            {currentDevelopment.milestones.map((milestone, index) => (
              <View key={`milestone-${index}`} style={styles.milestoneItem}>
                <Paragraph style={styles.milestoneText}>{milestone}</Paragraph>
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Tips */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>{t('tips')}</Title>
            {currentDevelopment.tips.map((tip, index) => (
              <View key={`tip-${index}`} style={styles.tipItem}>
                <Paragraph style={styles.tipText}>{tip}</Paragraph>
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Quick Actions */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>{t('quickActions')}</Title>
            <View style={styles.actionButtons}>
              <Button
                mode="contained"
                icon="pill"
                style={styles.actionButton}
                onPress={() => {
                  // Navigate to supplements tab
                  if (navigation) {
                    navigation.navigate('Suplementos');
                  }
                }}
              >
                {t('supplements')}
              </Button>
              <Button
                mode="outlined"
                icon="calendar"
                style={styles.actionButton}
                onPress={() => {
                  // Navigate to guide tab for appointments info
                  if (navigation) {
                    navigation.navigate('Guía');
                  }
                }}
              >
                {t('nextAppointment')}
              </Button>
            </View>
            <View style={styles.actionButtons}>
              <Button
                mode="contained"
                icon="hospital-box"
                style={[styles.actionButton, styles.medicalButton]}
                onPress={() => {
                  // Navigate to medical feedback screen
                  if (navigation) {
                    navigation.navigate('MedicalFeedback');
                  }
                }}
              >
                {t('medicalFeedback.title')}
              </Button>
            </View>
          </Card.Content>
        </Card>
      </Animated.View>
      
      {/* Floating Chat Button */}
      <TouchableOpacity
        style={styles.floatingChatButton}
        onPress={() => navigation.navigate('Chat')}
        activeOpacity={0.8}
      >
        <Ionicons name="chatbubbles" size={24} color="white" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
  },
  headerCard: {
    marginBottom: 20,
    backgroundColor: customColors.babyBlue,
    borderRadius: 18,
    elevation: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
    minWidth: 0,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    flexShrink: 1,
  },
  trimesterChip: {
    marginTop: 4,
    alignSelf: 'flex-start',
    maxWidth: 140,
    flexWrap: 'wrap',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
    flexShrink: 1,
  },
  developmentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sizeInfo: {
    flex: 1,
    alignItems: 'center',
  },
  sizeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  sizeSubtitle: {
    textAlign: 'center',
    fontSize: 12,
  },
  weightInfo: {
    flex: 1,
    alignItems: 'center',
  },
  weightTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.secondary,
  },
  weightSubtitle: {
    textAlign: 'center',
    fontSize: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
  milestoneItem: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  milestoneText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    flexWrap: 'wrap',
  },
  tipItem: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    flexWrap: 'wrap',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
    minHeight: 48,
    borderRadius: 10,
  },
  loadingCard: {
    marginTop: 60,
    padding: 32,
    alignItems: 'center',
    borderRadius: 16,
    elevation: 2,
  },
  floatingChatButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  medicalButton: {
    backgroundColor: customColors.pregnancyPink,
    marginTop: 8,
  },
}); 