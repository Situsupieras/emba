import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  ScrollView,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Card, Avatar, Chip, FAB } from 'react-native-paper';
import { t } from '../config/i18n';
import chatService, { ChatResponse } from '../data/chatService';
import ChatMessage from '../components/ChatMessage';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isLoading?: boolean;
}

const ChatScreen: React.FC = () => {
  const theme = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: t('chatWelcome'),
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const quickQuestions = [
    t('chatQuestionNutrition'),
    t('chatQuestionExercise'),
    t('chatQuestionSymptoms'),
    t('chatQuestionMedication'),
    t('chatQuestionAppointments'),
  ];

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    Keyboard.dismiss(); // Oculta el teclado al enviar

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: '',
      isUser: false,
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const data = await chatService.sendMessage(text.trim());
      
      // Actualizar el mensaje del bot con la respuesta
      setMessages(prev => 
        prev.map(msg => 
          msg.id === botMessage.id 
            ? { ...msg, text: data.response, isLoading: false }
            : msg
        )
      );

      // Agregar sugerencias si las hay
      if (data.suggestions && data.suggestions.length > 0) {
        const suggestionsMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: t('chat.suggestions'),
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, suggestionsMessage]);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === botMessage.id 
            ? { 
                ...msg, 
                text: t('chat.error'), 
                isLoading: false 
              }
            : msg
        )
      );
      Alert.alert(t('chat.errorTitle'), t('chat.errorMessage'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  const testConnection = async () => {
    console.log('Testing connection to webhook...');
    const isConnected = await chatService.testConnection();
    console.log('Connection test result:', isConnected);
    
    if (isConnected) {
      Alert.alert('Conexión Exitosa', 'El webhook está funcionando correctamente');
    } else {
      Alert.alert('Error de Conexión', 'No se pudo conectar al webhook');
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <ChatMessage
      text={item.text}
      isUser={item.isUser}
      timestamp={item.timestamp}
      isLoading={item.isLoading}
    />
  );

  const renderQuickQuestions = () => (
    <View style={styles.quickQuestionsContainer}>
      <Text style={[styles.quickQuestionsTitle, { color: theme.colors.onSurface }]}>
        {t('chatQuickQuestions')}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {quickQuestions.map((question, index) => (
          <Chip
            key={index}
            mode="outlined"
            onPress={() => handleQuickQuestion(question)}
            style={[styles.quickQuestionChip, { borderColor: theme.colors.primary }]}
            textStyle={{ color: theme.colors.primary }}
            disabled={isLoading}
          >
            {question}
          </Chip>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Avatar.Icon 
              size={40} 
              icon="robot" 
              style={[styles.headerAvatar, { backgroundColor: theme.colors.primary }]}
            />
            <View style={styles.headerText}>
              <Text style={[styles.headerTitle, { color: theme.colors.onSurface }]}>
                {t('chatTitle')}
              </Text>
              <Text style={[styles.headerSubtitle, { color: theme.colors.onSurfaceVariant }]}>
                {t('chatSubtitle')}
              </Text>
            </View>
          </View>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={[styles.messagesContainer, { paddingBottom: 100 }]}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}
        />

        {messages.length === 1 && renderQuickQuestions()}

        {/* FAB for clearing chat */}
        {messages.length > 1 && (
          <FAB
            icon="delete"
            style={styles.fab}
            onPress={() => {
              setMessages([messages[0]]); // Keep only welcome message
            }}
            small
          />
        )}

        {/* Test connection FAB */}
        <FAB
          icon="wifi"
          style={[styles.fab, { bottom: 140 }]}
          onPress={testConnection}
          small
          label="Test"
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: theme.colors.surface,
                color: theme.colors.onSurface,
                borderColor: theme.colors.outline,
              },
            ]}
            value={inputText}
            onChangeText={setInputText}
            placeholder={t('chatPlaceholder')}
            placeholderTextColor={theme.colors.onSurfaceVariant}
            multiline
            maxLength={500}
            editable={!isLoading}
            onSubmitEditing={() => sendMessage(inputText)}
            blurOnSubmit={false}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                backgroundColor:
                  inputText.trim() && !isLoading
                    ? theme.colors.primary
                    : theme.colors.outline,
              },
            ]}
            onPress={() => sendMessage(inputText)}
            disabled={!inputText.trim() || isLoading}
          >
            <Ionicons
              name="send"
              size={20}
              color={inputText.trim() && !isLoading ? 'white' : theme.colors.onSurfaceVariant}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    padding: 16,
  },
  quickQuestionsContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  quickQuestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  quickQuestionChip: {
    marginRight: 8,
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 80,
  },
});

export default ChatScreen; 