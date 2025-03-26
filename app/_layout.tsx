import { Stack } from "expo-router";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to auth screen by default
    // router.replace("/auth");
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen
        name="dashboard"
        options={{
          headerTitle: "Dashboard",
          headerBackVisible: false,
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, marginRight: 15 }}>
              <TouchableOpacity onPress={() => router.push("/qr-scanner")}>
                <Ionicons name="qr-code-outline" size={24} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/notifications")}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="notifications-outline" size={24} color="#333" />
                  <View style={{
                    backgroundColor: 'red',
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: -5,
                    right: -5,
                  }}>
                    <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>3</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          headerTitle: "Profile"
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerTitle: "Settings"
        }}
      />
      <Stack.Screen
        name="qr-scanner"
        options={{
          headerTitle: "Scan QR Code",
          presentation: 'modal'
        }}
      />
      <Stack.Screen
        name="events"
        options={{
          headerTitle: "Events",
        }}
      />
      <Stack.Screen
        name="event/[id]"
        options={{
          headerTitle: "Event Details",
        }}
      />
      <Stack.Screen
        name="points"
        options={{
          headerTitle: "Points History",
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          headerTitle: "Notifications",
        }}
      />
    </Stack>
  );
}
