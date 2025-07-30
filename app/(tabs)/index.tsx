'use client';

import JournalEntryForm from '@/components/JournalEntryForm';
import JournalEntryList from '@/components/JournalEntryList';
import { useEntries } from '@/context/EntriesContext';
import { Entry } from '@/types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const { entries, addEntry, deleteEntry, editEntry } = useEntries();
  const [editingEntry, setEditingEntry] = React.useState<Entry | null>(null);

  const handleAddOrUpdateEntry = async (entry: Entry) => {
    if (editingEntry) {
      await editEntry(entry);
    } else {
      await addEntry(entry);
    }
    setEditingEntry(null);
  };

  const handleDeleteEntry = async (id: string) => {
    await deleteEntry(id);
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