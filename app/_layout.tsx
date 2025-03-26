import { Stack } from "expo-router";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to auth screen by default
    router.replace("/auth");
  }, []);

  return (
    <Stack>
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen 
        name="dashboard" 
        options={{ 
          headerTitle: "Dashboard",
          headerBackVisible: false 
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
    </Stack>
  );
}
