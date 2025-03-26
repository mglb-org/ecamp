import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { CameraView, BarcodeScanningResult, Camera } from 'expo-camera';
import { useRouter } from "expo-router";

export default function QRScanner() {
    // const { isAuthenticated, user } = useAuth(); 
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        // if (!isAuthenticated) {
        getBarCodeScannerPermissions();
        // }
    }, []);

    const handleBarCodeScanned = ({ data }: { data: string }) => {
        setScanned(true);
        // router.push({
        //   pathname: "/(auth)/mpin" as const,
        //   params: { qrData: data }
        // });
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.scanner}
                facing="back"
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            />
            <View style={styles.overlay}>
                <View style={styles.scanFrame} />
                <Text style={styles.instructions}>
                    Position the QR code within the frame
                </Text>
            </View>

            {scanned && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setScanned(false)}
                >
                    <Text style={styles.buttonText}>Tap to Scan Again</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    scanner: {
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanFrame: {
        width: 250,
        height: 250,
        borderWidth: 2,
        borderColor: '#4CAF50',
        borderRadius: 15,
        backgroundColor: 'transparent',
    },
    instructions: {
        color: 'white',
        fontSize: 16,
        marginTop: 20,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    text: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
    },
    button: {
        position: 'absolute',
        bottom: 50,
        left: 50,
        right: 50,
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
}); 