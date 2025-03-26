import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function MPINScreen() {
  const { qrData } = useLocalSearchParams();
  return (
    <View>
      <Text>MPIN</Text>
      <Text>{qrData}</Text>
    </View>
  );
} 