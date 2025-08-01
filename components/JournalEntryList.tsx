import { useRouter } from 'expo-router';
import React from 'react';
import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Entry } from '../types';

type Props = {
  entries: Entry[];
  onDelete: (id: string) => void;
  onEdit: (entry: Entry) => void;
};

const router = useRouter();

export default function JournalEntryList({ entries, onDelete, onEdit }: Props) {
  if (entries.length === 0) {
    return <Text style={styles.empty}>Todavía no hay entradas. ¡Creá la primera!</Text>;
  }

  return (
    <FlatList
      data={entries}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.entry}>
          <TouchableOpacity
            onPress={() => router.push({
              pathname: '/entry/[id]',
              params: { id: item.id },
            })}
          >
            <Text style={styles.title}>
              {item.emoji ? `${item.emoji} ` : ''}{item.title}
            </Text>
            <Text>{item.text}</Text>
            {item.image && (
              <Image
                source={{ uri: item.image }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
            )}
            <Text style={styles.date}>
              {new Date(item.date + 'T12:00:00').toLocaleDateString('es-AR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </TouchableOpacity>
          <Button title="Editar" onPress={() => onEdit(item)} />
          <Button title="Eliminar" onPress={() => onDelete(item.id)} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  entry: {
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    color: 'gray',
    fontSize: 12,
  },
  empty: {
    fontStyle: 'italic',
    color: 'gray',
    marginTop: 20,
    textAlign: 'center',
  },

  thumbnail: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginVertical: 8,
  },
});