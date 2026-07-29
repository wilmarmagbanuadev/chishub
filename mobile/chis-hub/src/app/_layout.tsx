import "../global.css";
import { Stack } from 'expo-router';
import { useAuthState } from '@/utils/authState';
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function RootLayout() {
  const isLoggedIn = useAuthState((state) => state.isLoggedIn);

  return (
     <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="pages/onboarding/sign-in" />
        </Stack.Protected>

        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="pages/dashboard" />
        </Stack.Protected>
      </Stack>
    </SafeAreaProvider>
  );
}