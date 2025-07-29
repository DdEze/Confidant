import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Inicio' }} />
      <Tabs.Screen name="calendar" options={{ title: 'Calendario' }} />
      <Tabs.Screen name="stats" options={{ title: 'Estadísticas' }} />
      <Tabs.Screen name="config" options={{ title: 'Ajustes' }} />
    </Tabs>
  );
}