import { Stack } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { Redirect } from 'expo-router';

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signin" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="mpin" />
    </Stack>
  );
} 