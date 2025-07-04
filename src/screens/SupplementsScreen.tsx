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
  Chip,
  List,
  Dialog,
  Portal,
  Divider,
  Badge,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { theme, customColors } from '../theme';
import { Supplement, User } from '../types';
import { mockSupplements, useUserData } from '../data/mockData';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../types/navigation';

const { width } = Dimensions.get('window');

export default function SupplementsScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  const { user, loading } = useUserData();
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [selectedSupplement, setSelectedSupplement] = useState<Supplement | null>(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (loading) return;
    // Filter supplements based on user's trimester and preferences
    const filteredSupplements = mockSupplements.filter(supplement => {
      const isForCurrentTrimester = supplement.trimester.includes(user.trimester);
      const supplementCerts = Array.isArray(supplement.certifications) ? supplement.certifications : [];
      const userPrefs = Array.isArray(user.preferences.supplementPreferences) ? user.preferences.supplementPreferences : [];
      const matchesPreferences = userPrefs.length > 0
        ? userPrefs.some(pref => 
            supplementCerts.some(cert => {
              if (typeof cert === 'string' && typeof pref === 'string') {
                return (cert as string).toLowerCase().includes((pref as string).toLowerCase());
              }
              return false;
            })
          )
        : false;
      return isForCurrentTrimester || matchesPreferences;
    });
    setSupplements(filteredSupplements);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [user, loading]);

  const showSupplementDetails = (supplement: Supplement) => {
    setSelectedSupplement(supplement);
    setDialogVisible(true);
  };

  const getTrimesterRecommendations = () => {
    switch (user.trimester) {
      case 1:
        return "En el primer trimestre, el ácido fólico es fundamental para el desarrollo del tubo neural.";
      case 2:
        return "El segundo trimestre requiere calcio y vitamina D para el desarrollo óseo del bebé.";
      case 3:
        return "El tercer trimestre necesita omega-3 DHA para el desarrollo cerebral final.";
      default:
        return "Consulta con tu médico para recomendaciones personalizadas.";
    }
  };

  const getPriorityColor = (supplement: Supplement) => {
    if (supplement.trimester.includes(user.trimester)) {
      return theme.colors.primary;
    }
    return theme.colors.secondary;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Card style={styles.headerCard}>
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
        {/* Header with trimester info */}
        <Card style={styles.headerCard}>
          <Card.Content>
            <Title style={styles.headerTitle}>
              Suplementos Personalizados
            </Title>
            <Paragraph style={styles.headerSubtitle}>
              {getTrimesterRecommendations()}
            </Paragraph>
            <View style={styles.trimesterInfo}>
              <Chip mode="outlined" style={styles.trimesterChip}>
                {user.trimester}er Trimestre
              </Chip>
              <Chip mode="outlined" style={styles.weekChip}>
                Semana {user.currentWeek}
              </Chip>
            </View>
          </Card.Content>
        </Card>

        {/* Personalized Recommendations */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Recomendaciones para ti</Title>
            {(user.preferences.dietaryRestrictions.length > 0 || user.preferences.allergies.length > 0) && (
              <Paragraph style={styles.recommendationText}>
                {user.preferences.dietaryRestrictions.length > 0 && (
                  <>Basado en tu perfil: {user.preferences.dietaryRestrictions.join(', ')} </>
                )}
                {user.preferences.allergies.length > 0 && (
                  <>| Alergias: {user.preferences.allergies.join(', ')}</>
                )}
              </Paragraph>
            )}
          </Card.Content>
        </Card>

        {/* Supplements List */}
        {supplements.map((supplement, index) => (
          <Card key={supplement.id} style={styles.supplementCard}>
            <Card.Content>
              <View style={styles.supplementHeader}>
                <View style={styles.supplementInfo}>
                  <Title style={styles.supplementTitle}>{supplement.name}</Title>
                  <Paragraph style={styles.supplementDescription} numberOfLines={0}>
                    {supplement.description}
                  </Paragraph>
                  <View style={styles.supplementTags}>
                    {supplement.trimester.includes(user.trimester) && (
                      <Badge style={styles.priorityBadge}>Prioritario</Badge>
                    )}
                    <Chip 
                      mode="outlined" 
                      style={[styles.trimesterTag, { borderColor: getPriorityColor(supplement) }]}
                      textStyle={{ color: getPriorityColor(supplement) }}
                    >
                      {supplement.trimester.join(', ')}er trimestre
                    </Chip>
                  </View>
                </View>
                <View style={styles.supplementPrice}>
                  <Title style={styles.priceText}>${supplement.price}</Title>
                  <Paragraph style={styles.dosageText}>{supplement.dosage}</Paragraph>
                </View>
              </View>
              
              <View style={styles.benefitsContainer}>
                <Paragraph style={styles.benefitsTitle} numberOfLines={0}>Beneficios principales:</Paragraph>
                {supplement.benefits.slice(0, 2).map((benefit, idx) => (
                  <List.Item
                    key={idx}
                    title={benefit}
                    titleNumberOfLines={4}
                    left={(props) => <List.Icon {...props} icon="check" color={customColors.success} />}
                    style={styles.benefitItem}
                  />
                ))}
              </View>

              <View style={styles.certificationsContainer}>
                {supplement.certifications.slice(0, 2).map((cert, idx) => (
                  <Chip key={idx} mode="outlined" style={styles.certificationChip} textStyle={{flexWrap: 'wrap', maxWidth: 120, textAlign: 'center'}}>
                    {cert}
                  </Chip>
                ))}
              </View>

              <View style={styles.actionButtons}>
                <Button
                  mode="outlined"
                  icon="information"
                  style={styles.actionButton}
                  onPress={() => showSupplementDetails(supplement)}
                >
                  Ver detalles médicos
                </Button>
                <Button
                  mode="contained"
                  icon="cart"
                  style={styles.actionButton}
                  onPress={() => {
                    // Navigate to store to purchase
                    if (navigation) {
                      navigation.navigate('Tienda');
                    }
                  }}
                >
                  Comprar
                </Button>
              </View>
            </Card.Content>
          </Card>
        ))}

        {/* Medical Disclaimer */}
        <Card style={styles.disclaimerCard}>
          <Card.Content>
            <Title style={styles.disclaimerTitle}>Importante</Title>
            <Paragraph style={styles.disclaimerText}>
              Siempre consulta con tu médico antes de tomar cualquier suplemento. 
              Esta información es educativa y no reemplaza el consejo médico profesional.
            </Paragraph>
          </Card.Content>
        </Card>
      </Animated.View>

      {/* Supplement Details Dialog */}
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>Información Médica Detallada</Dialog.Title>
          <Dialog.Content>
            {selectedSupplement && (
              <ScrollView>
                <Title style={styles.dialogTitle}>{selectedSupplement.name}</Title>
                
                <Paragraph style={styles.medicalExplanation} numberOfLines={0}>
                  {selectedSupplement.medicalExplanation}
                </Paragraph>

                <Divider style={styles.divider} />
                
                <Title style={styles.dialogSectionTitle}>Beneficios</Title>
                {selectedSupplement.benefits.map((benefit, index) => (
                  <List.Item
                    key={index}
                    title={benefit}
                    titleNumberOfLines={4}
                    left={(props) => <List.Icon {...props} icon="check-circle" color={customColors.success} />}
                  />
                ))}

                <Divider style={styles.divider} />

                <Title style={styles.dialogSectionTitle}>Efectos secundarios</Title>
                {selectedSupplement.sideEffects.map((effect, index) => (
                  <List.Item
                    key={index}
                    title={effect}
                    titleNumberOfLines={4}
                    left={(props) => <List.Icon {...props} icon="alert" color={customColors.warning} />}
                  />
                ))}

                <Divider style={styles.divider} />

                <Title style={styles.dialogSectionTitle}>Contraindicaciones</Title>
                {selectedSupplement.contraindications.map((contraindication, index) => (
                  <List.Item
                    key={index}
                    title={contraindication}
                    titleNumberOfLines={4}
                    left={(props) => <List.Icon {...props} icon="close-circle" color={theme.colors.error} />}
                  />
                ))}

                <Divider style={styles.divider} />

                <Title style={styles.dialogSectionTitle}>Certificaciones</Title>
                <View style={styles.certificationsGrid}>
                  {selectedSupplement.certifications.map((cert, index) => (
                    <Chip key={index} mode="outlined" style={styles.dialogCertificationChip} textStyle={{flexWrap: 'wrap', maxWidth: 120, textAlign: 'center'}}>
                      {cert}
                    </Chip>
                  ))}
                </View>
              </ScrollView>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Cerrar</Button>
            <Button mode="contained" onPress={() => {
              setDialogVisible(false);
              // Navigate to store to purchase
              if (navigation) {
                navigation.navigate('Tienda');
              }
            }}>
              Comprar ahora
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 32,
  },
  headerCard: {
    marginBottom: 20,
    backgroundColor: customColors.babyBlue,
    borderRadius: 18,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    flexShrink: 1,
    color: theme.colors.onPrimary,
  },
  headerSubtitle: {
    fontSize: 14,
    marginBottom: 12,
  },
  trimesterInfo: {
    flexDirection: 'row',
    gap: 8,
  },
  trimesterChip: {
    backgroundColor: theme.colors.primary,
  },
  weekChip: {
    backgroundColor: theme.colors.secondary,
  },
  card: {
    marginBottom: 18,
    borderRadius: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  recommendationText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  supplementCard: {
    marginBottom: 16,
    elevation: 3,
  },
  supplementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  supplementInfo: {
    flex: 1,
  },
  supplementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    flexShrink: 1,
  },
  supplementDescription: {
    fontSize: 15,
    marginBottom: 8,
    flexShrink: 1,
  },
  supplementTags: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priorityBadge: {
    backgroundColor: theme.colors.primary,
  },
  trimesterTag: {
    height: 24,
  },
  supplementPrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  dosageText: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
  },
  benefitsContainer: {
    marginBottom: 12,
  },
  benefitsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  benefitItem: {
    paddingVertical: 2,
  },
  certificationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  certificationChip: {
    height: 28,
    borderRadius: 8,
    backgroundColor: customColors.softYellow,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
  },
  disclaimerCard: {
    marginTop: 16,
    backgroundColor: customColors.softYellow,
  },
  disclaimerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: customColors.warning,
  },
  disclaimerText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  medicalExplanation: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  divider: {
    marginVertical: 12,
  },
  dialogSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  certificationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dialogCertificationChip: {
    marginBottom: 4,
  },
}); 