import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://via.placeholder.com/150' }}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.bio}>Wise Member | Volunteer</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>15</Text>
          <Text style={styles.statLabel}>Events Attended</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>45</Text>
          <Text style={styles.statLabel}>Points Earned</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.infoItem}>
          <Ionicons name="mail-outline" size={24} color="#666" />
          <Text style={styles.infoText}>john.doe@example.com</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="call-outline" size={24} color="#666" />
          <Text style={styles.infoText}>+1 234 567 890</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="location-outline" size={24} color="#666" />
          <Text style={styles.infoText}>San Francisco, CA</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4CAF50',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 4,
    borderColor: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  bio: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'white',
    marginTop: -20,
    borderRadius: 20,
    marginHorizontal: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#666',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    margin: 20,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 