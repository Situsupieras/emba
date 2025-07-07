import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface ChatMessageProps {
  text: string;
  isUser: boolean;
  timestamp: Date;
  isLoading?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  text,
  isUser,
  timestamp,
  isLoading = false,
}) => {
  const theme = useTheme();

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={[
      styles.messageContainer,
      isUser ? styles.userMessage : styles.botMessage
    ]}>
      <View style={[
        styles.messageBubble,
        isUser 
          ? [styles.userBubble, { backgroundColor: theme.colors.primary }]
          : [styles.botBubble, { backgroundColor: theme.colors.surface }]
      ]}>
        {!isUser && (
          <Avatar.Icon 
            size={24} 
            icon="robot" 
            style={[styles.botAvatar, { backgroundColor: theme.colors.primary }]}
          />
        )}
        <View style={styles.messageContent}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <View style={styles.typingIndicator}>
                <View style={[styles.dot, { backgroundColor: theme.colors.primary }]} />
                <View style={[styles.dot, { backgroundColor: theme.colors.primary }]} />
                <View style={[styles.dot, { backgroundColor: theme.colors.primary }]} />
              </View>
            </View>
          ) : (
            <Text style={[
              styles.messageText,
              isUser 
                ? { color: 'white' }
                : { color: theme.colors.onSurface }
            ]}>
              {text}
            </Text>
          )}
          <Text style={[
            styles.timestamp,
            { color: isUser ? 'rgba(255,255,255,0.7)' : theme.colors.onSurfaceVariant }
          ]}>
            {formatTime(timestamp)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  botMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  botBubble: {
    borderBottomLeftRadius: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  botAvatar: {
    marginRight: 8,
  },
  messageContent: {
    flex: 1,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 20,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 2,
    opacity: 0.6,
  },
});

export default ChatMessage; 