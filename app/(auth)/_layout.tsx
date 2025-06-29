
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown:false }}>
            <Stack.Screen name='(tab)'  />
     <Stack.Screen name="login"  />
      <Stack.Screen name="(auth)"  />
      <Stack.Screen name="Signup"  />
      <Stack.Screen name="ForgotPassword"  />
      <Stack.Screen name="GetLocation"  />

    </Stack>
  );
}
