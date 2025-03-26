import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

const DUMMY_EVENTS = {
  '1': {
    id: '1',
    title: 'Summer Camp 2024',
    date: 'June 15-20, 2024',
    location: 'Mountain View Camp',
    image: 'https://via.placeholder.com/300x200',
    points: 500,
    description: 'Join us for an exciting week of outdoor activities, team building, and adventure! Activities include hiking, swimming, campfire stories, and more.',
    activities: [
      'Morning Hikes',
      'Swimming',
      'Campfire Activities',
      'Team Building Games',
      'Nature Workshops'
    ],
    duration: '5 days',
    capacity: '50 participants',
  },
  // Add more events as needed
};

export default function EventDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const event = DUMMY_EVENTS[id as keyof typeof DUMMY_EVENTS];

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Event not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: event.image }}
        style={styles.eventImage}
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>
        
        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Ionicons name="calendar-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{event.date}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{event.location}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{event.duration}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="people-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{event.capacity}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{event.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activities</Text>
          {event.activities.map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <Ionicons name="checkmark-circle-outline" size={20} color="#4CAF50" />
              <Text style={styles.activityText}>{activity}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Register Now</Text>
        <View style={styles.pointsBadge}>
          <Ionicons name="wallet-outline" size={16} color="white" />
          <Text style={styles.pointsText}>{event.points} points</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  eventImage: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  infoSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  infoText: {
    color: '#666',
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    color: '#666',
    lineHeight: 24,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  activityText: {
    color: '#666',
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    margin: 16,
    padding: 16,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
    marginLeft: 12,
    gap: 4,
  },
  pointsText: {
    color: 'white',
    fontWeight: '600',
  },
}); 