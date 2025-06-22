import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Chip,
  List,
  Searchbar,
  SegmentedButtons,
  Checkbox,
  Divider,
} from 'react-native-paper';
import { theme, customColors } from '../theme';
import { Article, ChecklistItem, User } from '../types';
import { mockArticles, mockUser } from '../data/mockData';

const { width } = Dimensions.get('window');

export default function GuideScreen() {
  const [user, setUser] = useState<User>(mockUser);
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(mockArticles);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTab, setSelectedTab] = useState('articles');
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Generate checklist items based on trimester
    const generateChecklist = () => {
      const items: ChecklistItem[] = [];
      
      switch (user.trimester) {
        case 1:
          items.push(
            { id: '1', title: 'Programar primera cita prenatal', description: 'Visita inicial con el médico', trimester: 1, completed: true },
            { id: '2', title: 'Tomar ácido fólico', description: '400 mcg diarios', trimester: 1, completed: true },
            { id: '3', title: 'Dejar alcohol y tabaco', description: 'Evitar sustancias nocivas', trimester: 1, completed: true },
            { id: '4', title: 'Informar al trabajo', description: 'Comunicar el embarazo', trimester: 1, completed: false },
            { id: '5', title: 'Investigar seguros médicos', description: 'Cobertura para el parto', trimester: 1, completed: false }
          );
          break;
        case 2:
          items.push(
            { id: '6', title: 'Ecografía morfológica', description: 'Entre las semanas 18-22', trimester: 2, completed: true },
            { id: '7', title: 'Ejercicios prenatales', description: 'Yoga o pilates prenatal', trimester: 2, completed: false },
            { id: '8', title: 'Preparar habitación del bebé', description: 'Planificar el espacio', trimester: 2, completed: false },
            { id: '9', title: 'Clases de preparación al parto', description: 'Inscribirse en curso', trimester: 2, completed: false },
            { id: '10', title: 'Plan de parto', description: 'Documentar preferencias', trimester: 2, completed: false }
          );
          break;
        case 3:
          items.push(
            { id: '11', title: 'Preparar bolsa para hospital', description: 'Ropa y artículos necesarios', trimester: 3, completed: false },
            { id: '12', title: 'Instalar silla de auto', description: 'Silla para recién nacido', trimester: 3, completed: false },
            { id: '13', title: 'Organizar ayuda postparto', description: 'Familia o doula', trimester: 3, completed: false },
            { id: '14', title: 'Última ecografía', description: 'Control final del bebé', trimester: 3, completed: false },
            { id: '15', title: 'Reconocer signos de parto', description: 'Síntomas importantes', trimester: 3, completed: false }
          );
          break;
      }
      
      return items;
    };

    setChecklistItems(generateChecklist());

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [user.trimester]);

  useEffect(() => {
    let filtered = articles;
    
    if (searchQuery) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }
    
    setFilteredArticles(filtered);
  }, [searchQuery, selectedCategory, articles]);

  const toggleChecklistItem = (id: string) => {
    setChecklistItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const getTrimesterColor = () => {
    switch (user.trimester) {
      case 1: return customColors.pregnancyPink;
      case 2: return customColors.babyBlue;
      case 3: return customColors.softYellow;
      default: return customColors.neutralGray;
    }
  };

  const getProgressPercentage = () => {
    const completed = checklistItems.filter(item => item.completed).length;
    return checklistItems.length > 0 ? completed / checklistItems.length : 0;
  };

  return (
    <ScrollView style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        {/* Header */}
        <Card style={[styles.headerCard, { backgroundColor: getTrimesterColor() }]}>
          <Card.Content>
            <Title style={styles.headerTitle}>Guía del {user.trimester}er Trimestre</Title>
            <Paragraph style={styles.headerSubtitle}>
              Información personalizada para tu etapa del embarazo
            </Paragraph>
          </Card.Content>
        </Card>

        {/* Tab Navigation */}
        <SegmentedButtons
          value={selectedTab}
          onValueChange={setSelectedTab}
          buttons={[
            { value: 'articles', label: 'Artículos' },
            { value: 'videos', label: 'Videos' },
            { value: 'checklist', label: 'Checklist' },
          ]}
          style={styles.tabButtons}
        />

        {selectedTab === 'articles' && (
          <>
            {/* Search and Filter */}
            <Searchbar
              placeholder="Buscar artículos..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchBar}
            />

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              <Chip
                mode={selectedCategory === 'all' ? 'flat' : 'outlined'}
                onPress={() => setSelectedCategory('all')}
                style={styles.categoryChip}
              >
                Todos
              </Chip>
              <Chip
                mode={selectedCategory === 'Nutrición' ? 'flat' : 'outlined'}
                onPress={() => setSelectedCategory('Nutrición')}
                style={styles.categoryChip}
              >
                Nutrición
              </Chip>
              <Chip
                mode={selectedCategory === 'Ejercicio' ? 'flat' : 'outlined'}
                onPress={() => setSelectedCategory('Ejercicio')}
                style={styles.categoryChip}
              >
                Ejercicio
              </Chip>
              <Chip
                mode={selectedCategory === 'Salud' ? 'flat' : 'outlined'}
                onPress={() => setSelectedCategory('Salud')}
                style={styles.categoryChip}
              >
                Salud
              </Chip>
            </ScrollView>

            {/* Articles List */}
            {filteredArticles.map((article) => (
              <Card key={article.id} style={styles.articleCard}>
                <Card.Cover source={{ uri: article.image }} />
                <Card.Content>
                  <View style={styles.articleHeader}>
                    <Title style={styles.articleTitle}>{article.title}</Title>
                    <Chip mode="outlined" style={styles.categoryTag}>
                      {article.category}
                    </Chip>
                  </View>
                  <Paragraph style={styles.articleContent} numberOfLines={3}>
                    {article.content}
                  </Paragraph>
                  <View style={styles.articleFooter}>
                    <Paragraph style={styles.articleMeta}>
                      Por {article.author} • {article.readTime} min de lectura
                    </Paragraph>
                    <Button mode="contained" onPress={() => {/* Navigate to article detail */}}>
                      Leer más
                    </Button>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </>
        )}

        {selectedTab === 'videos' && (
          <View style={styles.videosContainer}>
            <Card style={styles.videoCard}>
              <Card.Cover source={{ uri: 'https://via.placeholder.com/300x200' }} />
              <Card.Content>
                <Title style={styles.videoTitle}>Ejercicios seguros para el {user.trimester}er trimestre</Title>
                <Paragraph style={styles.videoDescription}>
                  Rutina de ejercicios adaptada a tu etapa del embarazo
                </Paragraph>
                <Button mode="contained" icon="play" style={styles.videoButton}>
                  Ver video
                </Button>
              </Card.Content>
            </Card>

            <Card style={styles.videoCard}>
              <Card.Cover source={{ uri: 'https://via.placeholder.com/300x200' }} />
              <Card.Content>
                <Title style={styles.videoTitle}>Nutrición en el {user.trimester}er trimestre</Title>
                <Paragraph style={styles.videoDescription}>
                  Consejos nutricionales específicos para esta etapa
                </Paragraph>
                <Button mode="contained" icon="play" style={styles.videoButton}>
                  Ver video
                </Button>
              </Card.Content>
            </Card>
          </View>
        )}

        {selectedTab === 'checklist' && (
          <View style={styles.checklistContainer}>
            {/* Progress */}
            <Card style={styles.progressCard}>
              <Card.Content>
                <Title style={styles.progressTitle}>Progreso del checklist</Title>
                <View style={styles.progressInfo}>
                  <Paragraph style={styles.progressText}>
                    {checklistItems.filter(item => item.completed).length} de {checklistItems.length} completado
                  </Paragraph>
                  <Paragraph style={styles.progressPercentage}>
                    {Math.round(getProgressPercentage() * 100)}%
                  </Paragraph>
                </View>
              </Card.Content>
            </Card>

            {/* Checklist Items */}
            {checklistItems.map((item) => (
              <Card key={item.id} style={styles.checklistCard}>
                <Card.Content>
                  <View style={styles.checklistItem}>
                    <Checkbox
                      status={item.completed ? 'checked' : 'unchecked'}
                      onPress={() => toggleChecklistItem(item.id)}
                      color={theme.colors.primary}
                    />
                    <View style={styles.checklistContent}>
                      <Title style={[
                        styles.checklistTitle,
                        item.completed && styles.completedText
                      ]}>
                        {item.title}
                      </Title>
                      <Paragraph style={styles.checklistDescription}>
                        {item.description}
                      </Paragraph>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </View>
        )}
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  tabButtons: {
    marginBottom: 16,
  },
  searchBar: {
    marginBottom: 12,
  },
  categoryScroll: {
    marginBottom: 16,
  },
  categoryChip: {
    marginRight: 8,
  },
  articleCard: {
    marginBottom: 16,
    elevation: 2,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  categoryTag: {
    height: 24,
  },
  articleContent: {
    fontSize: 14,
    marginBottom: 12,
  },
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  articleMeta: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
  },
  videosContainer: {
    gap: 16,
  },
  videoCard: {
    marginBottom: 16,
    elevation: 2,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  videoDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  videoButton: {
    alignSelf: 'flex-start',
  },
  checklistContainer: {
    gap: 12,
  },
  progressCard: {
    marginBottom: 16,
    backgroundColor: theme.colors.surfaceVariant,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    color: customColors.disabled,
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  checklistCard: {
    marginBottom: 8,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checklistContent: {
    flex: 1,
    marginLeft: 8,
  },
  checklistTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  checklistDescription: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: customColors.disabled,
  },
}); 