import { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  points: number;
}

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Campaign Rally',
    date: '2024-04-01',
    location: 'City Hall',
    points: 100,
  },
  {
    id: '2',
    title: 'Door-to-Door Campaign',
    date: '2024-04-05',
    location: 'District 5',
    points: 150,
  },
];

export default function EventsScreen() {
  const [events] = useState<Event[]>(MOCK_EVENTS);

  const renderEvent = ({ item }: { item: Event }) => (
    <ThemedView style={styles.eventCard}>
      <ThemedText type="subtitle">{item.title}</ThemedText>
      <ThemedText>Date: {item.date}</ThemedText>
      <ThemedText>Location: {item.location}</ThemedText>
      <ThemedText>Points: {item.points}</ThemedText>
      <Button 
        onPress={() => router.push({
          pathname: '/events/[id]',
          params: { id: item.id }
        })}
      >
        View Details
      </Button>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Events</ThemedText>
      <FlatList
        data={events}
        renderItem={renderEvent}
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
  eventCard: {
    padding: 16,
    borderRadius: 8,
    gap: 8,
    borderWidth: 1,
  },
}); 