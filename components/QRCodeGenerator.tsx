import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useAuth } from '@/hooks/useAuth';

interface QRCodeGeneratorProps {
  size?: number;
}

export function QRCodeGenerator({ size = 200 }: QRCodeGeneratorProps) {
  const { user } = useAuth();
  const [qrData, setQrData] = useState('');

  useEffect(() => {
    if (user) {
      // Generate QR code data
      const data = {
        userId: user.id,
        timestamp: Date.now(),
        type: 'registration',
      };
      setQrData(JSON.stringify(data));
    }
  }, [user]);

  if (!qrData) return null;

  return (
    <View style={styles.container}>
      <QRCode
        value={qrData}
        size={size}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
}); 