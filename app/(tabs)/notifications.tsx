import { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'New Event Added',
    message: 'A new campaign rally has been scheduled for next week.',
    date: '2024-03-28',
    read: false,
  },
  {
    id: '2',
    title: 'Points Awarded',
    message: 'You earned 100 points for attending the campaign rally.',
    date: '2024-03-27',
    read: true,
  },
];

export default function NotificationsScreen() {
  const [notifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const renderNotification = ({ item }: { item: Notification }) => (
    <ThemedView 
      style={[
        styles.notificationCard,
        !item.read && styles.unreadCard
      ]}
    >
      <ThemedText type="subtitle">{item.title}</ThemedText>
      <ThemedText>{item.message}</ThemedText>
      <ThemedText style={styles.date}>{item.date}</ThemedText>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Notifications</ThemedText>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
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
  notificationCard: {
    padding: 16,
    borderRadius: 8,
    gap: 8,
    borderWidth: 1,
  },
  unreadCard: {
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
  },
  date: {
    fontSize: 12,
    opacity: 0.7,
  },
}); 