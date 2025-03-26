import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

const DUMMY_NOTIFICATIONS = [
  {
    id: '1',
    type: 'event',
    title: 'New Event Available',
    message: 'Summer Camp 2024 registration is now open!',
    time: '2 hours ago',
    read: false,
    eventId: '1',
  },
  {
    id: '2',
    type: 'points',
    title: 'Points Earned',
    message: 'You earned 500 points for completing Weekend Hiking',
    time: '1 day ago',
    read: true,
  },
  {
    id: '3',
    type: 'reminder',
    title: 'Event Reminder',
    message: 'Your registered event starts tomorrow',
    time: '2 days ago',
    read: true,
  },
  {
    id: '4',
    type: 'achievement',
    title: 'New Achievement',
    message: 'Congratulations! You\'ve completed 5 events',
    time: '3 days ago',
    read: true,
  },
];

export default function Notifications() {
  const router = useRouter();

  const getIconForType = (type: string) => {
    switch (type) {
      case 'event':
        return 'calendar-outline';
      case 'points':
        return 'wallet-outline';
      case 'reminder':
        return 'alarm-outline';
      case 'achievement':
        return 'trophy-outline';
      default:
        return 'notifications-outline';
    }
  };

  const handleNotificationPress = (notification: any) => {
    switch (notification.type) {
      case 'event':
        router.push(`/event/${notification.eventId}` as any);
        break;
      case 'points':
        router.push('/points');
        break;
      // Add more navigation cases as needed
    }
  };

  const renderNotification = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={[
        styles.notificationCard,
        !item.read && styles.unreadCard
      ]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={[
        styles.iconContainer,
        { backgroundColor: item.read ? '#f5f5f5' : '#e8f5e9' }
      ]}>
        <Ionicons 
          name={getIconForType(item.type)} 
          size={24} 
          color={item.read ? '#666' : '#4CAF50'} 
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={[
            styles.title,
            !item.read && styles.unreadText
          ]}>
            {item.title}
          </Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_NOTIFICATIONS}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Notifications</Text>
            <TouchableOpacity style={styles.markAllButton}>
              <Text style={styles.markAllText}>Mark all as read</Text>
            </TouchableOpacity>
          </View>
        )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  markAllButton: {
    padding: 8,
  },
  markAllText: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  unreadCard: {
    backgroundColor: '#fff',
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flex: 1,
    marginRight: 8,
  },
  unreadText: {
    fontWeight: '600',
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
  message: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
}); 