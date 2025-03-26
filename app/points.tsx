import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const DUMMY_TRANSACTIONS = [
  {
    id: '1',
    type: 'earned',
    amount: 500,
    description: 'Completed Summer Camp 2024',
    date: '2024-06-20',
    icon: 'trophy-outline',
  },
  {
    id: '2',
    type: 'spent',
    amount: 200,
    description: 'Registered for Weekend Hiking',
    date: '2024-05-01',
    icon: 'calendar-outline',
  },
  {
    id: '3',
    type: 'earned',
    amount: 100,
    description: 'Daily Check-in Bonus',
    date: '2024-04-30',
    icon: 'checkmark-circle-outline',
  },
  // Add more transactions as needed
];

export default function Points() {
  const totalPoints = DUMMY_TRANSACTIONS.reduce((acc, curr) => {
    return acc + (curr.type === 'earned' ? curr.amount : -curr.amount);
  }, 0);

  const renderTransaction = ({ item }: { item: any }) => (
    <View style={styles.transactionCard}>
      <View style={styles.transactionIcon}>
        <Ionicons 
          name={item.icon} 
          size={24} 
          color={item.type === 'earned' ? '#4CAF50' : '#FF5252'} 
        />
      </View>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionDescription}>{item.description}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <Text style={[
        styles.transactionAmount,
        { color: item.type === 'earned' ? '#4CAF50' : '#FF5252' }
      ]}>
        {item.type === 'earned' ? '+' : '-'}{item.amount}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Points</Text>
        <Text style={styles.balanceAmount}>{totalPoints}</Text>
        <View style={styles.balanceActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="gift-outline" size={20} color="#4CAF50" />
            <Text style={styles.actionButtonText}>Redeem</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-social-outline" size={20} color="#4CAF50" />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.transactionsContainer}>
        <Text style={styles.sectionTitle}>History</Text>
        <FlatList
          data={DUMMY_TRANSACTIONS}
          renderItem={renderTransaction}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  balanceCard: {
    backgroundColor: 'white',
    margin: 16,
    padding: 20,
    borderRadius: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  balanceActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButtonText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  transactionsContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  listContainer: {
    padding: 16,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 