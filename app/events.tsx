import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

const DUMMY_EVENTS = [
  {
    id: '1',
    title: 'Summer Camp 2024',
    date: 'June 15-20, 2024',
    location: 'Mountain View Camp',
    image: 'https://via.placeholder.com/300x200',
    points: 500,
  },
  {
    id: '2',
    title: 'Weekend Hiking',
    date: 'May 5, 2024',
    location: 'Pine Trail Park',
    image: 'https://via.placeholder.com/300x200',
    points: 200,
  },
  // Add more dummy events as needed
];

export default function Events() {
  const router = useRouter();

  const renderEvent = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.eventCard}
      onPress={() => router.push(`/event/${item.id}` as any)}
    >
      <Image 
        source={{ uri: item.image }}
        style={styles.eventImage}
      />
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <View style={styles.eventDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.date}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.location}</Text>
          </View>
        </View>
        <View style={styles.pointsContainer}>
          <Ionicons name="wallet-outline" size={16} color="#4CAF50" />
          <Text style={styles.pointsText}>{item.points} points</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_EVENTS}
        renderItem={renderEvent}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  eventImage: {
    width: '100%',
    height: 150,
  },
  eventInfo: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  eventDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    color: '#666',
    fontSize: 14,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 12,
  },
  pointsText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
}); 