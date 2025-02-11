import { useState } from 'react';
import { StyleSheet, FlatList, TextInput } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isFromLeader: boolean;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'Campaign Leader',
    content: 'Welcome to the campaign! Let me know if you have any questions.',
    timestamp: '2024-03-28 10:00',
    isFromLeader: true,
  },
  {
    id: '2',
    sender: 'You',
    content: 'Thank you! When is the next campaign event?',
    timestamp: '2024-03-28 10:05',
    isFromLeader: false,
  },
];

export default function MessagesScreen() {
  const [messages] = useState<Message[]>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();

  const renderMessage = ({ item }: { item: Message }) => (
    <ThemedView 
      style={[
        styles.messageCard,
        item.isFromLeader ? styles.leaderMessage : styles.userMessage,
      ]}
    >
      <ThemedText type="subtitle">{item.sender}</ThemedText>
      <ThemedText>{item.content}</ThemedText>
      <ThemedText style={styles.timestamp}>{item.timestamp}</ThemedText>
    </ThemedView>
  );

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // TODO: Implement actual message sending
    setNewMessage('');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Messages</ThemedText>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message..."
          multiline
        />
        <Button 
          onPress={handleSendMessage}
          disabled={!newMessage.trim()}
        >
          Send
        </Button>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  listContent: {
    gap: 16,
    paddingVertical: 16,
  },
  messageCard: {
    padding: 16,
    borderRadius: 8,
    gap: 8,
    borderWidth: 1,
    maxWidth: '80%',
  },
  leaderMessage: {
    alignSelf: 'flex-start',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  timestamp: {
    fontSize: 12,
    opacity: 0.7,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    maxHeight: 100,
  },
}); 