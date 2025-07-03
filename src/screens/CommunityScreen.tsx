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
  Avatar,
  List,
  FAB,
  Dialog,
  Portal,
  TextInput,
  Divider,
  Badge,
} from 'react-native-paper';
import { theme, customColors } from '../theme';
import { CommunityPost, Comment, User } from '../types';
import { mockCommunityPosts, mockUser } from '../data/mockData';

const { width } = Dimensions.get('window');

export default function CommunityScreen() {
  const [user, setUser] = useState<User>(mockUser);
  const [posts, setPosts] = useState<CommunityPost[]>(mockCommunityPosts);
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [newPostDialogVisible, setNewPostDialogVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('General');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const showPostDetails = (post: CommunityPost) => {
    setSelectedPost(post);
    setDialogVisible(true);
  };

  const createNewPost = () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      const newPost: CommunityPost = {
        id: Date.now().toString(),
        userId: user.id,
        userName: user.name,
        title: newPostTitle,
        content: newPostContent,
        category: newPostCategory,
        likes: 0,
        comments: [],
        createdAt: new Date(),
        isExpertVerified: false,
      };
      
      setPosts(prev => [newPost, ...prev]);
      setNewPostTitle('');
      setNewPostContent('');
      setNewPostCategory('General');
      setNewPostDialogVisible(false);
    }
  };

  const addComment = (postId: string, content: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      content,
      createdAt: new Date(),
      isExpert: false,
    };

    setPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  };

  const getFilteredPosts = () => {
    if (selectedCategory === 'all') return posts;
    return posts.filter(post => post.category === selectedCategory);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Desarrollo del bebé': return theme.colors.primary;
      case 'Nutrición': return theme.colors.secondary;
      case 'Salud': return customColors.success;
      case 'Emociones': return customColors.warning;
      default: return customColors.disabled;
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace unos minutos';
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    if (diffInHours < 48) return 'Ayer';
    return date.toLocaleDateString();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Header */}
          <Card style={styles.headerCard}>
            <Card.Content>
              <Title style={styles.headerTitle}>Comunidad de Embarazadas</Title>
              <Paragraph style={styles.headerSubtitle}>
                Conecta con otras mamás y expertos en un espacio seguro y moderado
              </Paragraph>
            </Card.Content>
          </Card>

          {/* Category Filter */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            <Chip
              mode={selectedCategory === 'all' ? 'flat' : 'outlined'}
              onPress={() => setSelectedCategory('all')}
              style={styles.categoryChip}
            >
              Todos
            </Chip>
            <Chip
              mode={selectedCategory === 'Desarrollo del bebé' ? 'flat' : 'outlined'}
              onPress={() => setSelectedCategory('Desarrollo del bebé')}
              style={styles.categoryChip}
            >
              Desarrollo
            </Chip>
            <Chip
              mode={selectedCategory === 'Nutrición' ? 'flat' : 'outlined'}
              onPress={() => setSelectedCategory('Nutrición')}
              style={styles.categoryChip}
            >
              Nutrición
            </Chip>
            <Chip
              mode={selectedCategory === 'Salud' ? 'flat' : 'outlined'}
              onPress={() => setSelectedCategory('Salud')}
              style={styles.categoryChip}
            >
              Salud
            </Chip>
            <Chip
              mode={selectedCategory === 'Emociones' ? 'flat' : 'outlined'}
              onPress={() => setSelectedCategory('Emociones')}
              style={styles.categoryChip}
            >
              Emociones
            </Chip>
          </ScrollView>

          {/* Community Stats */}
          <Card style={styles.statsCard}>
            <Card.Content>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Title style={styles.statNumber}>{posts.length}</Title>
                  <Paragraph style={styles.statLabel}>Discusiones</Paragraph>
                </View>
                <View style={styles.statItem}>
                  <Title style={styles.statNumber}>
                    {posts.reduce((total, post) => total + post.comments.length, 0)}
                  </Title>
                  <Paragraph style={styles.statLabel}>Respuestas</Paragraph>
                </View>
                <View style={styles.statItem}>
                  <Title style={styles.statNumber}>
                    {posts.filter(post => post.isExpertVerified).length}
                  </Title>
                  <Paragraph style={styles.statLabel}>Verificadas</Paragraph>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Posts List */}
          {getFilteredPosts().map((post) => (
            <Card key={post.id} style={styles.postCard}>
              <Card.Content>
                <View style={styles.postHeader}>
                  <View style={styles.postAuthor}>
                    <Avatar.Text size={40} label={post.userName.charAt(0)} />
                    <View style={styles.authorInfo}>
                      <Title style={styles.authorName}>{post.userName}</Title>
                      <Paragraph style={styles.postDate}>
                        {formatDate(post.createdAt)}
                      </Paragraph>
                    </View>
                  </View>
                  {post.isExpertVerified && (
                    <Badge style={styles.expertBadge}>Experto</Badge>
                  )}
                </View>

                <Chip 
                  mode="outlined" 
                  style={[styles.categoryTag, { borderColor: getCategoryColor(post.category) }]}
                  textStyle={{ color: getCategoryColor(post.category) }}
                >
                  {post.category}
                </Chip>

                <Title style={styles.postTitle}>{post.title}</Title>
                <Paragraph style={styles.postContent} numberOfLines={3}>
                  {post.content}
                </Paragraph>

                <View style={styles.postFooter}>
                  <View style={styles.postStats}>
                    <Button icon="heart" mode="text" compact>
                      {post.likes}
                    </Button>
                    <Button icon="comment" mode="text" compact>
                      {post.comments.length}
                    </Button>
                  </View>
                  <Button 
                    mode="outlined" 
                    onPress={() => showPostDetails(post)}
                    style={styles.readMoreButton}
                  >
                    Leer más
                  </Button>
                </View>
              </Card.Content>
            </Card>
          ))}

          {/* Empty State */}
          {getFilteredPosts().length === 0 && (
            <Card style={styles.emptyCard}>
              <Card.Content>
                <Title style={styles.emptyTitle}>No hay publicaciones</Title>
                <Paragraph style={styles.emptyText}>
                  Sé la primera en iniciar una conversación en esta categoría
                </Paragraph>
                <Button 
                  mode="contained" 
                  onPress={() => setNewPostDialogVisible(true)}
                  style={styles.emptyButton}
                >
                  Crear publicación
                </Button>
              </Card.Content>
            </Card>
          )}
        </Animated.View>
      </ScrollView>

      {/* FAB for new post */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setNewPostDialogVisible(true)}
      />

      {/* Post Details Dialog */}
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>Detalles de la publicación</Dialog.Title>
          <Dialog.Content>
            {selectedPost && (
              <ScrollView>
                <View style={styles.dialogHeader}>
                  <Avatar.Text size={50} label={selectedPost.userName.charAt(0)} />
                  <View style={styles.dialogAuthorInfo}>
                    <Title style={styles.dialogAuthorName}>{selectedPost.userName}</Title>
                    <Paragraph style={styles.dialogDate}>
                      {formatDate(selectedPost.createdAt)}
                    </Paragraph>
                  </View>
                  {selectedPost.isExpertVerified && (
                    <Badge style={styles.dialogExpertBadge}>Experto</Badge>
                  )}
                </View>

                <Chip 
                  mode="outlined" 
                  style={[styles.dialogCategoryTag, { borderColor: getCategoryColor(selectedPost.category) }]}
                  textStyle={{ color: getCategoryColor(selectedPost.category) }}
                >
                  {selectedPost.category}
                </Chip>

                <Title style={styles.dialogTitle}>{selectedPost.title}</Title>
                <Paragraph style={styles.dialogContent}>{selectedPost.content}</Paragraph>

                <Divider style={styles.divider} />

                <Title style={styles.commentsTitle}>
                  Comentarios ({selectedPost.comments.length})
                </Title>

                {selectedPost.comments.map((comment) => (
                  <Card key={comment.id} style={styles.commentCard}>
                    <Card.Content>
                      <View style={styles.commentHeader}>
                        <Avatar.Text size={30} label={comment.userName.charAt(0)} />
                        <View style={styles.commentInfo}>
                          <Title style={styles.commentAuthor}>{comment.userName}</Title>
                          <Paragraph style={styles.commentDate}>
                            {formatDate(comment.createdAt)}
                          </Paragraph>
                        </View>
                        {comment.isExpert && (
                          <Badge style={styles.commentExpertBadge}>Experto</Badge>
                        )}
                      </View>
                      <Paragraph style={styles.commentContent}>{comment.content}</Paragraph>
                    </Card.Content>
                  </Card>
                ))}

                <Button 
                  mode="contained" 
                  onPress={() => {
                    console.log('Adding comment to post:', selectedPost.title);
                  }}
                  style={styles.addCommentButton}
                >
                  Agregar comentario
                </Button>
              </ScrollView>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Cerrar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* New Post Dialog */}
      <Portal>
        <Dialog visible={newPostDialogVisible} onDismiss={() => setNewPostDialogVisible(false)}>
          <Dialog.Title>Nueva publicación</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Título"
              value={newPostTitle}
              onChangeText={setNewPostTitle}
              style={styles.input}
            />
            <TextInput
              label="Categoría"
              value={newPostCategory}
              onChangeText={setNewPostCategory}
              style={styles.input}
            />
            <TextInput
              label="Contenido"
              value={newPostContent}
              onChangeText={setNewPostContent}
              multiline
              numberOfLines={4}
              style={styles.input}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setNewPostDialogVisible(false)}>Cancelar</Button>
            <Button mode="contained" onPress={createNewPost}>Publicar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    padding: 16,
  },
  headerCard: {
    marginBottom: 16,
    backgroundColor: customColors.babyBlue,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  categoryScroll: {
    marginBottom: 16,
  },
  categoryChip: {
    marginRight: 8,
  },
  statsCard: {
    marginBottom: 16,
    backgroundColor: theme.colors.surfaceVariant,
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
    color: theme.colors.onSurfaceVariant,
  },
  postCard: {
    marginBottom: 16,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  postAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorInfo: {
    marginLeft: 12,
  },
  authorName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  postDate: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
  },
  expertBadge: {
    backgroundColor: customColors.success,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    marginBottom: 12,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postStats: {
    flexDirection: 'row',
  },
  readMoreButton: {
    height: 32,
  },
  emptyCard: {
    marginTop: 32,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyButton: {
    alignSelf: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
  dialogHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dialogAuthorInfo: {
    marginLeft: 12,
    flex: 1,
  },
  dialogAuthorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dialogDate: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
  },
  dialogExpertBadge: {
    backgroundColor: customColors.success,
  },
  dialogCategoryTag: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  dialogContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  commentCard: {
    marginBottom: 8,
    backgroundColor: theme.colors.surfaceVariant,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  commentInfo: {
    marginLeft: 8,
    flex: 1,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  commentDate: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
  },
  commentExpertBadge: {
    backgroundColor: customColors.success,
  },
  commentContent: {
    fontSize: 14,
  },
  addCommentButton: {
    marginTop: 16,
  },
  input: {
    marginBottom: 12,
  },
}); 