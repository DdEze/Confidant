'use client';

import { useEntries } from '@/context/EntriesContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function EntryDetail() {
  const { id } = useLocalSearchParams();
  const { entries } = useEntries();
  const navigation = useNavigation();

  const entryId = Array.isArray(id) ? id[0] : id;
  const entry = entries.find((e) => e.id === entryId);

  useLayoutEffect(() => {
    if (entry) {
      navigation.setOptions({
        title: entry.title,
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()} style={{ paddingHorizontal: 12 }}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
        ),
      });
    }
  }, [navigation, entry]);

  if (!entry) {
    return (
      <View style={styles.container}>
        <Text>Entrada no encontrada</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{entry.emoji}</Text>
      <Text style={styles.title}>{entry.title}</Text>
      <Text style={styles.text}>{entry.text}</Text>
      {entry.image && (
        <Image
          source={{ uri: entry.image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <Text style={styles.date}>{entry.date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  emoji: { fontSize: 48, textAlign: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 8 },
  date: { color: 'gray', marginBottom: 16 },
  text: { fontSize: 16 },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
});