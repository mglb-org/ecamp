import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Camera } from 'expo-camera';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { CameraView, BarcodeScanningResult } from 'expo-camera';
export default function HomeScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const { isAuthenticated, user } = useAuth();

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
    // Handle QR code data and navigate to MPIN entry
    router.push({
      pathname: '/auth/mpin',
      params: { qrData: data }
    });
  };

  if (!isAuthenticated) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">Welcome to Election Campaign</ThemedText>
        {hasPermission === null ? (
          <ThemedText>Requesting camera permission</ThemedText>
        ) : hasPermission === false ? (
          <ThemedText>No access to camera</ThemedText>
        ) : (
          <>
            <CameraView
              onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.scanner}
            />
            {scanned && (
              <Button onPress={() => setScanned(false)}>
                Tap to Scan Again
              </Button>
            )}
          </>
        )}
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Welcome {user?.name}</ThemedText>
      {/* Add dashboard content here */}
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
});
