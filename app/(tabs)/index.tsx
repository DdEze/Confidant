'use client';

import JournalEntryForm from '@/components/JournalEntryForm';
import JournalEntryList from '@/components/JournalEntryList';
import { Entry } from '@/types';
import { loadEntries, saveEntries } from '@/utils/storage';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);

  useEffect(() => {
    const fetchEntries = async () => {
      const stored = await loadEntries();
      setEntries(stored);
    };
    fetchEntries();
  }, []);

  const handleAddOrUpdateEntry = async (entry: Entry) => {
    let updated: Entry[];

    if (editingEntry) {
      updated = entries.map((e) => (e.id === entry.id ? entry : e));
    } else {
      updated = [entry, ...entries];
    }

    setEntries(updated);
    await saveEntries(updated);
    setEditingEntry(null);
  };

  const handleDeleteEntry = async (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    await saveEntries(updated);
  };

  const handleEditEntry = (entry: Entry) => {
    setEditingEntry(entry);
  };

  const handleCancelEdit = () => {
    setEditingEntry(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Diario</Text>

      <JournalEntryForm
        onSubmit={handleAddOrUpdateEntry}
        editingEntry={editingEntry}
        onCancelEdit={handleCancelEdit}
      />

      <JournalEntryList
        entries={entries}
        onDelete={handleDeleteEntry}
        onEdit={handleEditEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});