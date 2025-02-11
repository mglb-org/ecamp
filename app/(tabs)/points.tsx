import { StyleSheet, FlatList } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';

interface PointTransaction {
  id: string;
  event: string;
  points: number;
  date: string;
  type: 'earned' | 'redeemed';
}

const MOCK_TRANSACTIONS: PointTransaction[] = [
  {
    id: '1',
    event: 'Campaign Rally',
    points: 100,
    date: '2024-03-28',
    type: 'earned',
  },
  {
    id: '2',
    event: 'Door-to-Door Campaign',
    points: 150,
    date: '2024-03-27',
    type: 'earned',
  },
  {
    id: '3',
    event: 'Reward Redemption',
    points: -50,
    date: '2024-03-26',
    type: 'redeemed',
  },
];

export default function PointsScreen() {
  const { user } = useAuth();

  const renderTransaction = ({ item }: { item: PointTransaction }) => (
    <ThemedView style={styles.transactionCard}>
      <ThemedText type="subtitle">{item.event}</ThemedText>
      <ThemedText>Date: {item.date}</ThemedText>
      <ThemedText style={{ 
        color: item.type === 'earned' ? '#4CAF50' : '#F44336' 
      }}>
        {item.type === 'earned' ? '+' : ''}{item.points} points
      </ThemedText>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Points Balance</ThemedText>
        <ThemedText type="title">{user?.points || 0}</ThemedText>
        <Button onPress={() => {/* TODO: Implement redeem points */}}>
          Redeem Points
        </Button>
      </ThemedView>
      <ThemedText type="subtitle">Transaction History</ThemedText>
      <FlatList
        data={MOCK_TRANSACTIONS}
        renderItem={renderTransaction}
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
  header: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  listContent: {
    gap: 16,
    paddingVertical: 16,
  },
  transactionCard: {
    padding: 16,
    borderRadius: 8,
    gap: 8,
    borderWidth: 1,
  },
}); 