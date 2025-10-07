import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  TextInput,
  Chip,
  List,
  Divider,
  FAB,
  Portal,
  Modal,
  Text,
  Checkbox,
  Badge,
} from 'react-native-paper';
import { theme, customColors } from '../theme';
import { MedicalFeedback, MedicalRecommendation, User, MedicalConflict } from '../types';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { t } from '../config/i18n';
import { medicalSyncService, SyncResult } from '../data/medicalSync';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface MedicalFeedbackScreenProps {
  navigation: any;
}

export default function MedicalFeedbackScreen({ navigation }: MedicalFeedbackScreenProps) {
  const [user, setUser] = useState<User | null>(null);
  const [feedbackList, setFeedbackList] = useState<MedicalFeedback[]>([]);
  const [recommendations, setRecommendations] = useState<MedicalRecommendation[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newFeedback, setNewFeedback] = useState<Partial<MedicalFeedback>>({
    week: 1,
    date: new Date(),
    doctorName: '',
    recommendations: [],
    concerns: [],
    notes: '',
    supplementsPrescribed: [],
    testsOrdered: [],
    weight: 0,
    bloodPressure: '',
    babyHeartbeat: 0,
  });
  const [newRecommendation, setNewRecommendation] = useState('');
  const [newConcern, setNewConcern] = useState('');
  const [newSupplement, setNewSupplement] = useState('');
  const [newTest, setNewTest] = useState('');
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);
  const [conflicts, setConflicts] = useState<MedicalConflict[]>([]);
  const [syncedRecommendations, setSyncedRecommendations] = useState<MedicalRecommendation[]>([]);

  useEffect(() => {
    loadUserData();
    loadFeedbackData();
  }, []);

  const loadUserData = async () => {
    try {
      const name = await SecureStore.getItemAsync('userName');
      const semanasStr = await SecureStore.getItemAsync('semanas');
      let currentWeek = 1;
      if (semanasStr && !isNaN(Number(semanasStr))) {
        currentWeek = Number(semanasStr);
      }
      setUser({
        id: '1',
        name: name || 'Usuario',
        email: '',
        dueDate: new Date(),
        currentWeek,
        trimester: Math.ceil(currentWeek / 13),
        medicalHistory: [],
        preferences: {
          dietaryRestrictions: [],
          allergies: [],
          supplementPreferences: [],
          notificationSettings: {
            weeklyUpdates: true,
            supplementReminders: true,
            appointmentReminders: true,
            communityUpdates: true,
          },
        },
      });
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const loadFeedbackData = async () => {
    try {
      const feedbackData = await SecureStore.getItemAsync('medicalFeedback');
      if (feedbackData) {
        setFeedbackList(JSON.parse(feedbackData));
      }
      
      const recommendationsData = await SecureStore.getItemAsync('medicalRecommendations');
      if (recommendationsData) {
        setRecommendations(JSON.parse(recommendationsData));
      }
      
      // Realizar sincronización médica
      if (user) {
        performMedicalSync();
      }
    } catch (error) {
      console.error('Error loading feedback data:', error);
    }
  };

  const performMedicalSync = () => {
    if (!user) return;
    
    const result = medicalSyncService.generateSyncReport(user.currentWeek);
    setSyncResult(result);
    setConflicts(result.conflicts);
    setSyncedRecommendations(result.recommendations);
    
    // Actualizar recomendaciones con las sincronizadas
    if (result.recommendations.length > 0) {
      setRecommendations(prev => {
        const existingIds = new Set(prev.map(r => r.id));
        const newRecommendations = result.recommendations.filter(r => !existingIds.has(r.id));
        return [...newRecommendations, ...prev];
      });
    }
  };

  const saveFeedbackData = async () => {
    try {
      await SecureStore.setItemAsync('medicalFeedback', JSON.stringify(feedbackList));
      await SecureStore.setItemAsync('medicalRecommendations', JSON.stringify(recommendations));
    } catch (error) {
      console.error('Error saving feedback data:', error);
    }
  };

  const addFeedback = () => {
    if (!newFeedback.doctorName?.trim()) {
      Alert.alert('Error', t('medicalFeedback.requiredFields'));
      return;
    }
    
    if (!newFeedback.recommendations?.length) {
      Alert.alert('Error', t('medicalFeedback.requiredFields'));
      return;
    }

    const feedback: MedicalFeedback = {
      id: Date.now().toString(),
      week: user?.currentWeek || 1,
      date: new Date(),
      doctorName: newFeedback.doctorName || '',
      recommendations: newFeedback.recommendations || [],
      concerns: newFeedback.concerns || [],
      nextAppointment: newFeedback.nextAppointment || new Date(),
      notes: newFeedback.notes || '',
      supplementsPrescribed: newFeedback.supplementsPrescribed || [],
      testsOrdered: newFeedback.testsOrdered || [],
      weight: newFeedback.weight || 0,
      bloodPressure: newFeedback.bloodPressure || '',
      babyHeartbeat: newFeedback.babyHeartbeat || 0,
      ultrasoundNotes: newFeedback.ultrasoundNotes,
    };

    setFeedbackList([feedback, ...feedbackList]);
    
    // Convert recommendations to MedicalRecommendation format
    const newRecommendations: MedicalRecommendation[] = feedback.recommendations.map(rec => ({
      id: Date.now().toString() + Math.random(),
      week: feedback.week,
      category: 'general',
      recommendation: rec,
      priority: 'medium',
      source: 'doctor',
      dateAdded: new Date(),
      isFollowed: false,
    }));

    setRecommendations([...newRecommendations, ...recommendations]);
    
    // Reset form
    setNewFeedback({
      week: user?.currentWeek || 1,
      date: new Date(),
      doctorName: '',
      recommendations: [],
      concerns: [],
      notes: '',
      supplementsPrescribed: [],
      testsOrdered: [],
      weight: 0,
      bloodPressure: '',
      babyHeartbeat: 0,
    });
    
    setModalVisible(false);
    saveFeedbackData();
    
    Alert.alert('Éxito', 'Retroalimentación médica guardada correctamente.');
  };

  const addRecommendation = () => {
    if (newRecommendation.trim()) {
      setNewFeedback(prev => ({
        ...prev,
        recommendations: [...(prev.recommendations || []), newRecommendation.trim()],
      }));
      setNewRecommendation('');
    }
  };

  const addConcern = () => {
    if (newConcern.trim()) {
      setNewFeedback(prev => ({
        ...prev,
        concerns: [...(prev.concerns || []), newConcern.trim()],
      }));
      setNewConcern('');
    }
  };

  const addSupplement = () => {
    if (newSupplement.trim()) {
      setNewFeedback(prev => ({
        ...prev,
        supplementsPrescribed: [...(prev.supplementsPrescribed || []), newSupplement.trim()],
      }));
      setNewSupplement('');
    }
  };

  const addTest = () => {
    if (newTest.trim()) {
      setNewFeedback(prev => ({
        ...prev,
        testsOrdered: [...(prev.testsOrdered || []), newTest.trim()],
      }));
      setNewTest('');
    }
  };

  const removeItem = (list: string[], item: string, field: keyof MedicalFeedback) => {
    setNewFeedback(prev => ({
      ...prev,
      [field]: list.filter(i => i !== item),
    }));
  };

  const toggleRecommendationFollowed = (id: string) => {
    setRecommendations(prev =>
      prev.map(rec =>
        rec.id === id ? { ...rec, isFollowed: !rec.isFollowed } : rec
      )
    );
    saveFeedbackData();
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const resolveConflict = (conflictId: string, resolution: 'doctor_priority' | 'app_priority') => {
    medicalSyncService.resolveConflict(conflictId, resolution);
    setConflicts(prev => prev.filter(c => c.id !== conflictId));
    Alert.alert('Conflicto resuelto', 'Se ha actualizado la recomendación según tu elección.');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ffebee';
      case 'medium': return '#fff3e0';
      case 'low': return '#f3e5f5';
      default: return '#f5f5f5';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
      default: return 'Normal';
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <Card style={styles.headerCard}>
          <Card.Content>
            <Title style={styles.headerTitle}>
              <MaterialCommunityIcons name="hospital-box" size={24} color={theme.colors.primary} />
              {' '}{t('medicalFeedbackTitle')}
            </Title>
            <Paragraph style={styles.headerSubtitle}>
              Registra las recomendaciones de tu médico para mantener la app sincronizada
            </Paragraph>
          </Card.Content>
        </Card>

        {/* Current Week Info */}
        {user && (
          <Card style={styles.weekCard}>
            <Card.Content>
              <Title style={styles.weekTitle}>{t('common.week')} {user.currentWeek}</Title>
              <Paragraph>Última actualización: {formatDate(new Date())}</Paragraph>
            </Card.Content>
          </Card>
        )}

        {/* Recent Feedback */}
        {feedbackList.length > 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>Últimas Consultas</Title>
              {feedbackList.slice(0, 3).map((feedback) => (
                <View key={feedback.id} style={styles.feedbackItem}>
                  <View style={styles.feedbackHeader}>
                    <Text style={styles.doctorName}>Dr. {feedback.doctorName}</Text>
                    <Text style={styles.feedbackDate}>{formatDate(feedback.date)}</Text>
                  </View>
                  <Text style={styles.feedbackWeek}>{t('common.week')} {feedback.week}</Text>
                  {feedback.recommendations.length > 0 && (
                    <View style={styles.recommendationsList}>
                      <Text style={styles.sectionTitle}>{t('medicalFeedback.recommendations')}:</Text>
                      {feedback.recommendations.slice(0, 2).map((rec, index) => (
                        <Text key={index} style={styles.recommendationText}>• {rec}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </Card.Content>
          </Card>
        )}

        {/* Medical Conflicts */}
        {conflicts.length > 0 && (
          <Card style={[styles.card, styles.conflictCard]}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <Title style={styles.cardTitle}>
                  <Ionicons name="warning" size={20} color="#ff6b35" />
                  {' '}Conflictos Detectados
                </Title>
                <Badge style={styles.conflictBadge}>{conflicts.length}</Badge>
              </View>
              <Paragraph style={styles.conflictDescription}>
                Se detectaron diferencias entre las recomendaciones de la app y las de tu médico.
              </Paragraph>
              {conflicts.slice(0, 3).map((conflict) => (
                <View key={conflict.id} style={styles.conflictItem}>
                  <View style={styles.conflictSection}>
                    <Text style={styles.conflictLabel}>App sugiere:</Text>
                    <Text style={styles.conflictText}>{conflict.appRecommendation}</Text>
                  </View>
                  <View style={styles.conflictSection}>
                    <Text style={styles.conflictLabel}>Médico dice:</Text>
                    <Text style={styles.conflictText}>{conflict.doctorRecommendation}</Text>
                  </View>
                  <View style={styles.conflictActions}>
                    <Button 
                      mode="outlined" 
                      onPress={() => resolveConflict(conflict.id, 'doctor_priority')}
                      style={styles.conflictButton}
                    >
                      Seguir médico
                    </Button>
                    <Button 
                      mode="outlined" 
                      onPress={() => resolveConflict(conflict.id, 'app_priority')}
                      style={styles.conflictButton}
                    >
                      Seguir app
                    </Button>
                  </View>
                </View>
              ))}
            </Card.Content>
          </Card>
        )}

        {/* Synced Recommendations */}
        {syncedRecommendations.length > 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                {' '}Recomendaciones Sincronizadas
              </Title>
              <Paragraph style={styles.syncDescription}>
                Estas recomendaciones están alineadas entre la app y tu médico.
              </Paragraph>
              {syncedRecommendations
                .filter(rec => !rec.isFollowed)
                .slice(0, 5)
                .map((recommendation) => (
                  <View key={recommendation.id} style={styles.recommendationItem}>
                    <Checkbox
                      status={recommendation.isFollowed ? 'checked' : 'unchecked'}
                      onPress={() => toggleRecommendationFollowed(recommendation.id)}
                    />
                    <View style={styles.recommendationContent}>
                      <Text style={styles.recommendationText}>{recommendation.recommendation}</Text>
                      <View style={styles.recommendationMeta}>
                        <Text style={styles.recommendationSource}>
                          {recommendation.source === 'doctor' ? 'Médico' : 'App'} - Semana {recommendation.week}
                        </Text>
                        <Chip 
                          mode="outlined" 
                          style={[
                            styles.priorityChip,
                            { backgroundColor: getPriorityColor(recommendation.priority) }
                          ]}
                        >
                          {getPriorityLabel(recommendation.priority)}
                        </Chip>
                      </View>
                    </View>
                  </View>
                ))}
            </Card.Content>
          </Card>
        )}

        {/* Active Recommendations */}
        {recommendations.length > 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>Todas las Recomendaciones</Title>
              {recommendations
                .filter(rec => !rec.isFollowed)
                .slice(0, 5)
                .map((recommendation) => (
                  <View key={recommendation.id} style={styles.recommendationItem}>
                    <Checkbox
                      status={recommendation.isFollowed ? 'checked' : 'unchecked'}
                      onPress={() => toggleRecommendationFollowed(recommendation.id)}
                    />
                    <View style={styles.recommendationContent}>
                      <Text style={styles.recommendationText}>{recommendation.recommendation}</Text>
                      <Text style={styles.recommendationSource}>
                        {recommendation.source === 'doctor' ? 'Médico' : 'App'} - Semana {recommendation.week}
                      </Text>
                    </View>
                  </View>
                ))}
            </Card.Content>
          </Card>
        )}

        {/* Quick Stats */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Resumen</Title>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{feedbackList.length}</Text>
                <Text style={styles.statLabel}>Consultas</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {recommendations.filter(r => r.isFollowed).length}
                </Text>
                <Text style={styles.statLabel}>Completadas</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {recommendations.filter(r => !r.isFollowed).length}
                </Text>
                <Text style={styles.statLabel}>Pendientes</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Add Feedback Modal */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <ScrollView style={styles.modalScroll}>
            <Title style={styles.modalTitle}>Nueva Consulta Médica</Title>
            
            <TextInput
              label="Nombre del Médico"
              value={newFeedback.doctorName}
              onChangeText={(text) => setNewFeedback(prev => ({ ...prev, doctorName: text }))}
              style={styles.input}
            />

            <TextInput
              label="Peso (kg)"
              value={newFeedback.weight?.toString() || ''}
              onChangeText={(text) => setNewFeedback(prev => ({ ...prev, weight: parseFloat(text) || 0 }))}
              keyboardType="numeric"
              style={styles.input}
            />

            <TextInput
              label="Presión Arterial"
              value={newFeedback.bloodPressure}
              onChangeText={(text) => setNewFeedback(prev => ({ ...prev, bloodPressure: text }))}
              placeholder="120/80"
              style={styles.input}
            />

            <TextInput
              label="Latidos del Bebé (bpm)"
              value={newFeedback.babyHeartbeat?.toString() || ''}
              onChangeText={(text) => setNewFeedback(prev => ({ ...prev, babyHeartbeat: parseInt(text) || 0 }))}
              keyboardType="numeric"
              style={styles.input}
            />

            {/* Recommendations */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recomendaciones del Médico</Text>
              <View style={styles.addItemContainer}>
                <TextInput
                  label="Nueva recomendación"
                  value={newRecommendation}
                  onChangeText={setNewRecommendation}
                  style={styles.addItemInput}
                />
                <Button mode="contained" onPress={addRecommendation} style={styles.addButton}>
                  Agregar
                </Button>
              </View>
              {newFeedback.recommendations?.map((rec, index) => (
                <Chip
                  key={index}
                  onClose={() => removeItem(newFeedback.recommendations || [], rec, 'recommendations')}
                  style={styles.chip}
                >
                  {rec}
                </Chip>
              ))}
            </View>

            {/* Concerns */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preocupaciones</Text>
              <View style={styles.addItemContainer}>
                <TextInput
                  label="Nueva preocupación"
                  value={newConcern}
                  onChangeText={setNewConcern}
                  style={styles.addItemInput}
                />
                <Button mode="contained" onPress={addConcern} style={styles.addButton}>
                  Agregar
                </Button>
              </View>
              {newFeedback.concerns?.map((concern, index) => (
                <Chip
                  key={index}
                  onClose={() => removeItem(newFeedback.concerns || [], concern, 'concerns')}
                  style={styles.chip}
                >
                  {concern}
                </Chip>
              ))}
            </View>

            {/* Supplements */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Suplementos Recetados</Text>
              <View style={styles.addItemContainer}>
                <TextInput
                  label="Nuevo suplemento"
                  value={newSupplement}
                  onChangeText={setNewSupplement}
                  style={styles.addItemInput}
                />
                <Button mode="contained" onPress={addSupplement} style={styles.addButton}>
                  Agregar
                </Button>
              </View>
              {newFeedback.supplementsPrescribed?.map((supp, index) => (
                <Chip
                  key={index}
                  onClose={() => removeItem(newFeedback.supplementsPrescribed || [], supp, 'supplementsPrescribed')}
                  style={styles.chip}
                >
                  {supp}
                </Chip>
              ))}
            </View>

            {/* Tests */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Exámenes Ordenados</Text>
              <View style={styles.addItemContainer}>
                <TextInput
                  label="Nuevo examen"
                  value={newTest}
                  onChangeText={setNewTest}
                  style={styles.addItemInput}
                />
                <Button mode="contained" onPress={addTest} style={styles.addButton}>
                  Agregar
                </Button>
              </View>
              {newFeedback.testsOrdered?.map((test, index) => (
                <Chip
                  key={index}
                  onClose={() => removeItem(newFeedback.testsOrdered || [], test, 'testsOrdered')}
                  style={styles.chip}
                >
                  {test}
                </Chip>
              ))}
            </View>

            <TextInput
              label="Notas adicionales"
              value={newFeedback.notes}
              onChangeText={(text) => setNewFeedback(prev => ({ ...prev, notes: text }))}
              multiline
              numberOfLines={3}
              style={styles.input}
            />

            <View style={styles.modalButtons}>
              <Button mode="outlined" onPress={() => setModalVisible(false)} style={styles.modalButton}>
                Cancelar
              </Button>
              <Button mode="contained" onPress={addFeedback} style={styles.modalButton}>
                Guardar
              </Button>
            </View>
          </ScrollView>
        </Modal>
      </Portal>

      {/* FAB */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setModalVisible(true)}
        label="Nueva Consulta"
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  headerCard: {
    marginBottom: 16,
    backgroundColor: customColors.babyBlue,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  headerSubtitle: {
    fontSize: 16,
    marginTop: 8,
  },
  weekCard: {
    marginBottom: 16,
    backgroundColor: customColors.pregnancyPink,
  },
  weekTitle: {
    fontSize: 20,
    fontWeight: 'bold',
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
  feedbackItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  feedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  doctorName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  feedbackDate: {
    fontSize: 12,
    color: '#666',
  },
  feedbackWeek: {
    fontSize: 14,
    color: theme.colors.primary,
    marginBottom: 8,
  },
  recommendationsList: {
    marginTop: 8,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recommendationText: {
    fontSize: 14,
    marginLeft: 8,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  recommendationContent: {
    flex: 1,
    marginLeft: 8,
  },
  recommendationSource: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  modal: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
    maxHeight: '90%',
  },
  modalScroll: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  addItemContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  addItemInput: {
    flex: 1,
    marginRight: 8,
  },
  addButton: {
    alignSelf: 'flex-end',
  },
  chip: {
    marginBottom: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
  conflictCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#ff6b35',
    backgroundColor: '#fff8f6',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  conflictBadge: {
    backgroundColor: '#ff6b35',
  },
  conflictDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  conflictItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffcdd2',
  },
  conflictSection: {
    marginBottom: 8,
  },
  conflictLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  conflictText: {
    fontSize: 14,
    color: '#333',
  },
  conflictActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  conflictButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  syncDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  recommendationMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  priorityChip: {
    height: 20,
  },
}); 