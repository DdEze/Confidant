import { getLocalDateISO } from '@/utils/date';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Entry } from '../types';

const emojis = ['😀', '😢', '😡', '😴', '😍'];

type Props = {
  onSubmit: (entry: Entry) => void;
  editingEntry?: Entry | null;
  onCancelEdit?: () => void;
};

type FormErrors = {
  title?: string;
  text?: string;
  emoji?: string;
};

export default function JournalEntryForm({ onSubmit, editingEntry, onCancelEdit }: Props) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [emoji, setEmoji] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (editingEntry) {
      setTitle(editingEntry.title);
      setText(editingEntry.text);
      setEmoji(editingEntry.emoji || '');
      setErrors({});
    } else {
      setTitle('');
      setText('');
      setEmoji('');
      setErrors({});
    }
  }, [editingEntry]);

  const handleSubmit = () => {
    const newErrors: FormErrors = {};
    if (!title.trim()) newErrors.title = 'El título es obligatorio';
    if (!text.trim()) newErrors.text = 'La entrada no puede estar vacía';
    if (!emoji) newErrors.emoji = 'Seleccioná un emoji';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const entry: Entry = {
      id: editingEntry?.id || Date.now().toString(),
      title: title.trim(),
      text: text.trim(),
      emoji,
      date: editingEntry?.date || getLocalDateISO(),
    };

    onSubmit(entry);
    setTitle('');
    setText('');
    setEmoji('');
    setErrors({});
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      {errors.title && <Text style={styles.error}>{errors.title}</Text>}

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Escribí tu entrada..."
        value={text}
        onChangeText={setText}
        multiline
      />
      {errors.text && <Text style={styles.error}>{errors.text}</Text>}

      <View style={styles.emojiContainer}>
        {emojis.map((e) => (
          <TouchableOpacity key={e} onPress={() => setEmoji(e)}>
            <Text style={[styles.emoji, emoji === e && styles.emojiSelected]}>{e}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.emoji && <Text style={styles.error}>{errors.emoji}</Text>}

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
  error: {
    color: 'red',
    marginBottom: 8,
  },
});