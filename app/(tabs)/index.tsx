import JournalEntryForm from '@/components/JournalEntryForm';
import JournalEntryList from '@/components/JournalEntryList';
import { useEntries } from '@/context/EntriesContext';
import { Entry } from '@/types';
import { ensureNotificationSetup } from '@/utils/notificationService';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const { entries, addEntry, deleteEntry, editEntry } = useEntries();
  const [editingEntry, setEditingEntry] = React.useState<Entry | null>(null);

  useEffect(() => {
    ensureNotificationSetup();
  }, []);

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

  if (entries.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', flex: 1 }]}>
        <Text style={styles.title}>Mi Diario 🖋</Text>
        <View style={styles.card}>
          <JournalEntryForm
            onSubmit={handleAddOrUpdateEntry}
            editingEntry={editingEntry}
            onCancelEdit={handleCancelEdit}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Diario 🖋</Text>

      <JournalEntryList
        entries={entries}
        onDelete={handleDeleteEntry}
        onEdit={handleEditEntry}
        ListHeaderComponent={
          <View style={styles.card}>
            <JournalEntryForm
              onSubmit={handleAddOrUpdateEntry}
              editingEntry={editingEntry}
              onCancelEdit={handleCancelEdit}
            />
          </View>
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 16,
    backgroundColor: '#a389a0ff',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    color: '#42293fff',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: '#f8edf7ff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  formNoCard: {
    padding: 16,
    marginBottom: 20,
  },
  listContentContainer: {
    paddingBottom: 40,
    flexGrow: 1,
  },
});