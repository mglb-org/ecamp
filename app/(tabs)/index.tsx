import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { Camera } from 'expo-camera';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { CameraView, BarcodeScanningResult } from 'expo-camera';

export default function HomeScreen() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    if (!isAuthenticated) {
      getBarCodeScannerPermissions();
    }
  }, [isAuthenticated]);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    router.push({
      pathname: "/(auth)/mpin" as const,
      params: { qrData: data }
    });
  };

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/signin" />;
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Welcome, {user?.name}</ThemedText>
      <ThemedView style={styles.statsContainer}>
        <ThemedText type="subtitle">Your Points: {user?.points}</ThemedText>
        {/* Add more dashboard stats */}
      </ThemedView>
      <Button onPress={() => router.push('/(tabs)/scan')}>
        Scan QR Code
      </Button>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  scanner: {
    width: 300,
    height: 300,
    marginVertical: 20,
  },
  statsContainer: {
    marginBottom: 20,
  },
});
