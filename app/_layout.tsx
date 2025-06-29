import { ThemeProvider, DefaultTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import useAuthStore from './Store/authStore';

const BACKGROUND_LIGHT = '#FFF8E1';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: BACKGROUND_LIGHT,
  },
};

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Italic': require('../assets/fonts/Poppins-Italic.ttf'),
  });

  const hydrate = useAuthStore((state) => state.hydrate);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    hydrate(); // Load persisted auth state on startup
  }, []);

  if (!loaded) return null;

  return (
    <ThemeProvider value={MyTheme}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          {!isLoggedIn ? (
            <Stack.Screen name="(auth)" />
          ) : (
            <>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="GetLocation" />
              <Stack.Screen name="orders" />
            </>
          )}
        
        </Stack>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
