import * as LocalAuthentication from 'expo-local-authentication';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { EntriesProvider } from '../context/EntriesContext'; // ajusta ruta según dónde esté

export default function RootLayout() {
  const [checkedAuth, setCheckedAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        setCheckedAuth(true);
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autenticarse para usar Confidant',
        fallbackLabel: 'Usar código PIN',
      });

      if (!result.success) {
        router.replace('/auth');
      }

      setCheckedAuth(true);
    };

    checkAuth();
  }, []);

  if (!checkedAuth) return null;

  return (
    <EntriesProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </EntriesProvider>
  );
}