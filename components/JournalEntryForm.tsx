import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Entry } from '../types';

const emojis = ['😀', '😢', '😡', '😴', '😍'];

type Props = {
  onSubmit: (entry: Entry) => void;
  editingEntry?: Entry | null;
  onCancelEdit?: () => void;
};

export default function JournalEntryForm({ onSubmit, editingEntry, onCancelEdit }: Props) {
  const [title, setTitle] = useState(editingEntry?.title || '');
  const [text, setText] = useState(editingEntry?.text || '');
  const [emoji, setEmoji] = useState(editingEntry?.emoji || '');

  useEffect(() => {
    if (editingEntry) {
      setTitle(editingEntry.title);
      setText(editingEntry.text);
      setEmoji(editingEntry.emoji || '');
    }
  }, [editingEntry]);

  const handleSubmit = () => {
    if (!text.trim() || !title.trim()) return;

    const entry: Entry = {
      id: editingEntry?.id || Date.now().toString(),
      title,
      text,
      emoji,
      date: editingEntry?.date || new Date().toLocaleDateString('en-CA'),
    };

    onSubmit(entry);
    setTitle('');
    setText('');
    setEmoji('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Escribí tu entrada..."
        value={text}
        onChangeText={setText}
        multiline
      />

      <View style={styles.emojiContainer}>
        {emojis.map((e) => (
          <TouchableOpacity key={e} onPress={() => setEmoji(e)}>
            <Text style={[styles.emoji, emoji === e && styles.emojiSelected]}>{e}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title={editingEntry ? 'Guardar cambios' : 'Agregar'} onPress={handleSubmit} />
      {editingEntry && (
        <Button title="Cancelar edición" onPress={onCancelEdit} color="gray" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  emojiContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  emoji: {
    fontSize: 24,
    marginRight: 12,
  },
  emojiSelected: {
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 6,
    padding: 2,
  },
});