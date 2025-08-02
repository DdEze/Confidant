import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  FlatListProps,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Entry } from '../types';

type Props = {
  entries: Entry[];
  onDelete: (id: string) => void;
  onEdit: (entry: Entry) => void;
  ListHeaderComponent?: React.ReactElement | null;    // <-- Agregado
  contentContainerStyle?: FlatListProps<Entry>['contentContainerStyle']; // <-- Agregado
};

const router = useRouter();

export default function JournalEntryList({
  entries,
  onDelete,
  onEdit,
  ListHeaderComponent = null,
  contentContainerStyle,
}: Props) {
  if (entries.length === 0) {
    return <Text style={styles.empty}>Todavía no hay entradas. ¡Creá la primera!</Text>;
  }

  return (
    <FlatList
      data={entries}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={contentContainerStyle}
      renderItem={({ item }) => (
        <View style={styles.entry}>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/entry/[id]',
                params: { id: item.id },
              })
            }
          >
            <Text style={styles.title}>
              {item.emoji ? `${item.emoji} ` : ''}{item.title}
            </Text>
            <Text style={styles.text}>{item.text}</Text>
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

          <View style={styles.actions}>
            <Pressable style={styles.actionButton} onPress={() => onEdit(item)}>
              <Text style={styles.actionText}>Editar</Text>
            </Pressable>
            <Pressable
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => onDelete(item.id)}
            >
              <Text style={[styles.actionText, styles.deleteText]}>Eliminar</Text>
            </Pressable>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 12,
    paddingBottom: 40,
  },
  entry: {
    padding: 14,
    marginBottom: 16,
    backgroundColor: '#f8edf7ff',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    marginBottom: 8,
    color: '#444',
  },
  date: {
    color: '#888',
    fontSize: 12,
    marginTop: 8,
  },
  thumbnail: {
    width: '100%',
    height: 140,
    borderRadius: 10,
    marginTop: 10,
  },
  empty: {
    fontStyle: 'italic',
    color: '#42293fff',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#e4a3dcff',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  actionText: {
    color: 'white',
    fontWeight: '500',
  },
  deleteText: {
    color: '#fff',
  },
});