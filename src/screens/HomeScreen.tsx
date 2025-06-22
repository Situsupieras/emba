import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
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
import { theme, customColors } from '../theme';
import { FetalDevelopment, User } from '../types';
import { fetalDevelopmentData } from '../data/fetalDevelopment';
import { mockUser } from '../data/mockData';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [user, setUser] = useState<User>(mockUser);
  const [currentDevelopment, setCurrentDevelopment] = useState<FetalDevelopment | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const development = fetalDevelopmentData.find(d => d.week === user.currentWeek);
    setCurrentDevelopment(development || null);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [user.currentWeek]);

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

  if (!currentDevelopment) {
    return (
      <View style={styles.container}>
        <Card style={styles.loadingCard}>
          <Card.Content>
            <Title>Cargando información...</Title>
          </Card.Content>
        </Card>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        {/* Header with user info */}
        <Card style={[styles.headerCard, { backgroundColor: getTrimesterColor() }]}>
          <Card.Content>
            <View style={styles.headerContent}>
              <Avatar.Text size={60} label={user.name.charAt(0)} />
              <View style={styles.userInfo}>
                <Title style={styles.userName}>¡Hola, {user.name}!</Title>
                <Paragraph>Semana {user.currentWeek} de 40</Paragraph>
                <Chip mode="outlined" style={styles.trimesterChip}>
                  {user.trimester}er Trimestre
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
            <Title style={styles.cardTitle}>Desarrollo de tu bebé</Title>
            <View style={styles.developmentInfo}>
              <View style={styles.sizeInfo}>
                <Title style={styles.sizeTitle}>{currentDevelopment.size}</Title>
                <Paragraph style={styles.sizeSubtitle}>
                  Tamaño de tu bebé esta semana
                </Paragraph>
              </View>
              <View style={styles.weightInfo}>
                <Title style={styles.weightTitle}>{currentDevelopment.weight}</Title>
                <Paragraph style={styles.weightSubtitle}>Peso aproximado</Paragraph>
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
            <Title style={styles.cardTitle}>Hitos de esta semana</Title>
            {currentDevelopment.milestones.map((milestone, index) => (
              <List.Item
                key={index}
                title={milestone}
                left={(props) => <List.Icon {...props} icon="check-circle" color={customColors.success} />}
                style={styles.milestoneItem}
              />
            ))}
          </Card.Content>
        </Card>

        {/* Tips */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Consejos para esta semana</Title>
            {currentDevelopment.tips.map((tip, index) => (
              <List.Item
                key={index}
                title={tip}
                left={(props) => <List.Icon {...props} icon="lightbulb" color={customColors.warning} />}
                style={styles.tipItem}
              />
            ))}
          </Card.Content>
        </Card>

        {/* Quick Actions */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Acciones rápidas</Title>
            <View style={styles.actionButtons}>
              <Button
                mode="contained"
                icon="medical"
                style={styles.actionButton}
                onPress={() => {/* Navigate to supplements */}}
              >
                Ver suplementos
              </Button>
              <Button
                mode="outlined"
                icon="calendar"
                style={styles.actionButton}
                onPress={() => {/* Navigate to appointments */}}
              >
                Próxima cita
              </Button>
            </View>
          </Card.Content>
        </Card>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
  },
  headerCard: {
    marginBottom: 16,
    elevation: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  trimesterChip: {
    alignSelf: 'flex-start',
    marginTop: 8,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
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
    paddingVertical: 4,
  },
  tipItem: {
    paddingVertical: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  loadingCard: {
    margin: 16,
  },
}); 