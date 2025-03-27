import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useState } from "react";

export default function Points() {

  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [pointsHistory, setPointsHistory] = useState<any[]>([]);
  const { token, user } = useAuth();

  useEffect(() => {
    const fetchPoints = async () => {
      const response = await fetch(`https://70e5-49-147-157-181.ngrok-free.app/api/points/${user?.id}/my-points`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const { data } = await response.json();
      setTotalPoints(data.reduce((acc: number, curr: any) => acc + curr.points, 0));
      setPointsHistory(data);
    };
    fetchPoints();
  }, [user]);

  const renderTransaction = ({ item }: { item: any }) => (
    <View style={styles.transactionCard}>
      <View style={styles.transactionIcon}>
        <Ionicons
          name={item.category === 'achievement' ? 'trophy-outline' : item.category === 'participation' ? 'checkmark-circle-outline' : item.category === 'bonus' ? 'gift-outline' : 'close-circle-outline'}
          size={24}
          color={item.category === 'penalty' ? '#FF5252' : '#4CAF50'}
        />
      </View>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionDescription}>{item.description}</Text>
        <Text style={styles.transactionDate}>{item.createdAt}</Text>
      </View>
      <Text style={[
        styles.transactionAmount,
        { color: item.category === 'penalty' ? '#FF5252' : '#4CAF50' }
      ]}>
        {item.category === 'penalty' ? '-' : '+'}{item.points}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Points</Text>
        <Text style={styles.balanceAmount}>{totalPoints.toLocaleString() || 0}</Text>
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
          data={pointsHistory}
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