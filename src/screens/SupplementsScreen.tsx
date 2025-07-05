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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme, customColors } from '../theme';
import { Supplement, User } from '../types';
import { mockSupplements, useUserData } from '../data/mockData';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../types/navigation';
import { t } from '../data/i18n';

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
        return t('firstTrimesterRecommendation');
      case 2:
        return t('secondTrimesterRecommendation');
      case 3:
        return t('thirdTrimesterRecommendation');
      default:
        return t('customRecommendation');
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
            <Title style={styles.headerTitle}>{t('supplements')}</Title>
            <Paragraph style={styles.headerSubtitle}>
              {getTrimesterRecommendations()}
            </Paragraph>
            <View style={styles.trimesterInfo}>
              <Chip mode="outlined" style={styles.trimesterChip}>
                {user.trimester}{t('trimesterShort')}
              </Chip>
              <Chip mode="outlined" style={styles.weekChip}>
                {t('week')} {user.currentWeek}
              </Chip>
            </View>
          </Card.Content>
        </Card>

        {/* Personalized Recommendations */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>{t('recommendationsForYou')}</Title>
            {(user.preferences.dietaryRestrictions.length > 0 || user.preferences.allergies.length > 0) && (
              <Paragraph style={styles.recommendationText}>
                {user.preferences.dietaryRestrictions.length > 0 && (
                  <>{t('basedOnYourProfile')}: {user.preferences.dietaryRestrictions.join(', ')}</>
                )}
                {user.preferences.allergies.length > 0 && (
                  <>| {t('allergies')}: {user.preferences.allergies.join(', ')}</>
                )}
              </Paragraph>
            )}
          </Card.Content>
        </Card>

        {/* Supplements List */}
        {supplements.map((supplement) => (
          <Card key={supplement.id} style={styles.supplementCard}>
            <Card.Content>
              <View style={styles.supplementHeader}>
                <View style={styles.supplementInfo}>
                  <Title style={styles.supplementTitle}>{supplement.name}</Title>
                  <Paragraph style={styles.supplementDescription}>
                    {supplement.description}
                  </Paragraph>
                  <View style={styles.supplementTags}>
                    {supplement.trimester.includes(user.trimester) && (
                      <Badge style={styles.priorityBadge}>{t('priority')}</Badge>
                    )}
                    <Chip 
                      mode="outlined" 
                      style={[styles.trimesterTag, { borderColor: getPriorityColor(supplement) }]}
                      textStyle={{ color: getPriorityColor(supplement) }}
                    >
                      {supplement.trimester.join(', ')}{t('trimesterShort')}
                    </Chip>
                  </View>
                </View>
                <View style={styles.supplementPrice}>
                  <Title style={styles.priceText}>${supplement.price}</Title>
                  <Paragraph style={styles.dosageText}>{supplement.dosage}</Paragraph>
                </View>
              </View>
              
              <View style={styles.benefitsContainer}>
                <Paragraph style={styles.benefitsTitle}>{t('mainBenefits')}</Paragraph>
                {supplement.benefits.slice(0, 2).map((benefit, idx) => (
                  <View key={`benefit-${idx}`} style={styles.benefitItem}>
                    <View style={styles.benefitContent}>
                      <MaterialCommunityIcons name="check" size={20} color={customColors.success} style={styles.benefitIcon} />
                      <Paragraph style={styles.benefitText}>{benefit}</Paragraph>
                    </View>
                  </View>
                ))}
              </View>

              <View style={styles.certificationsContainer}>
                {supplement.certifications.map((cert) => (
                  <Chip key={cert} mode="outlined" style={styles.certificationChip} textStyle={{flexWrap: 'wrap', maxWidth: 120, textAlign: 'center'}}>
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
                  {t('seeMedicalDetails')}
                </Button>
                <Button
                  mode="contained"
                  icon="cart"
                  style={styles.actionButton}
                  onPress={() => {
                    if (navigation) {
                      navigation.navigate('Tienda');
                    }
                  }}
                >
                  {t('buy')}
                </Button>
              </View>
            </Card.Content>
          </Card>
        ))}

        {/* Medical Disclaimer */}
        <Card style={styles.disclaimerCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>{t('important')}</Title>
            <Paragraph style={styles.disclaimerText}>
              {t('medicalDisclaimer')}
            </Paragraph>
          </Card.Content>
        </Card>
      </Animated.View>

      {/* Supplement Details Dialog */}
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>{t('detailedMedicalInfo')}</Dialog.Title>
          <Dialog.Content>
            {selectedSupplement && (
              <ScrollView>
                <Title style={styles.dialogTitle}>{selectedSupplement.name}</Title>
                
                <Paragraph style={styles.medicalExplanation} numberOfLines={0}>
                  {selectedSupplement.medicalExplanation}
                </Paragraph>

                <Divider style={styles.divider} />
                
                <Title style={styles.dialogSectionTitle}>{t('benefits')}</Title>
                {selectedSupplement.benefits.map((benefit, index) => (
                  <List.Item
                    key={benefit}
                    title={benefit}
                    titleNumberOfLines={4}
                    left={(props) => <List.Icon {...props} icon="check-circle" color={customColors.success} />}
                  />
                ))}

                <Divider style={styles.divider} />

                <Title style={styles.dialogSectionTitle}>{t('sideEffects')}</Title>
                {selectedSupplement.sideEffects.map((effect, index) => (
                  <List.Item
                    key={effect}
                    title={effect}
                    titleNumberOfLines={4}
                    left={(props) => <List.Icon {...props} icon="alert" color={customColors.warning} />}
                  />
                ))}

                <Divider style={styles.divider} />

                <Title style={styles.dialogSectionTitle}>{t('contraindications')}</Title>
                {selectedSupplement.contraindications.map((contraindication, index) => (
                  <List.Item
                    key={contraindication}
                    title={contraindication}
                    titleNumberOfLines={4}
                    left={(props) => <List.Icon {...props} icon="close-circle" color={theme.colors.error} />}
                  />
                ))}

                <Divider style={styles.divider} />

                <Title style={styles.dialogSectionTitle}>{t('certifications')}</Title>
                <View style={styles.certificationsGrid}>
                  {selectedSupplement.certifications.map((cert) => (
                    <Chip key={cert} mode="outlined" style={styles.dialogCertificationChip} textStyle={{flexWrap: 'wrap', maxWidth: 120, textAlign: 'center'}}>
                      {cert}
                    </Chip>
                  ))}
                </View>
              </ScrollView>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>{t('close')}</Button>
            <Button mode="contained" onPress={() => {
              setDialogVisible(false);
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
    color: '#444',
    marginBottom: 6,
    textAlign: 'justify',
    flexWrap: 'wrap',
    minHeight: 40,
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
    fontWeight: 'bold',
    marginBottom: 2,
    fontSize: 15,
    textAlign: 'left',
  },
  benefitItem: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  benefitContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  benefitIcon: {
    marginTop: 2,
  },
  benefitText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    flexWrap: 'wrap',
    flex: 1,
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