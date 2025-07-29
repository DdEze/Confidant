import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';

export default function AuthScreen() {
  const [authSuccess, setAuthSuccess] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        setChecking(false);
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autenticarse para acceder a Confidant',
        fallbackLabel: 'Usar código PIN',
      });

      if (result.success) {
        setAuthSuccess(true);
        router.replace('/');
      } else {
        setChecking(false);
      }
    };

    authenticate();
  }, []);

  if (checking) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Verificando autenticación...</Text>
      </View>
    );
  }

  return (
    <View style={styles.center}>
      <Text style={{ marginBottom: 10 }}>Autenticación fallida o cancelada</Text>
      <Button title="Reintentar" onPress={() => router.replace('/auth')} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});