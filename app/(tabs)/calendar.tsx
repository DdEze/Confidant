import { Entry } from '@/types';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CalendarView from '../../components/CalendarView';
import JournalEntryList from '../../components/JournalEntryList';
import { useEntries } from '../../context/EntriesContext';

export default function CalendarScreen() {
  const { entries, deleteEntry, editEntry } = useEntries();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filteredEntries, setFilteredEntries] = useState<Entry[]>([]);

  const updateFiltered = useCallback(() => {
    const newEntries = entries.filter((e) => {
      const d = new Date(e.date);
      const formattedDate = d.toISOString().split('T')[0];
      return formattedDate === selectedDate;
    });
    setFilteredEntries(newEntries);
  }, [entries, selectedDate]);

  useFocusEffect(
    useCallback(() => {
      updateFiltered();
    }, [entries, selectedDate])
  );

  return (
    <View style={styles.container}>
      <CalendarView selectedDate={selectedDate} onDateSelect={setSelectedDate} />
      {filteredEntries.length === 0 ? (
        <Text style={styles.noEntriesText}>No hay entradas para {selectedDate}</Text>
      ) : (
        <JournalEntryList
          entries={filteredEntries}
          onDelete={deleteEntry}
          onEdit={editEntry}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  noEntriesText: {
    fontStyle: 'italic',
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});