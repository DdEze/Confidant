'use client';

import { useEntries } from '@/context/EntriesContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
        ),
      });
    }
  }, [navigation, entry]);

  if (!entry) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Entrada no encontrada</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a389a0ff',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  backButton: {
    paddingHorizontal: 12,
  },
  card: {
    backgroundColor: '#f8edf7ff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  emoji: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 6,
    color: '#42293fff',
  },
  date: {
    color: '#42293fff',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  text: {
    fontSize: 17,
    lineHeight: 24,
    color: '#42293fff',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
});