import { Stack } from 'expo-router';

export default function EntryLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#f8edf7ff' },
        contentStyle: { backgroundColor: '#f8edf7ff' },
      }}
    />
  );
}