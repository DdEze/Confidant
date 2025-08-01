import { getLocalDateISO } from '@/utils/date';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (editingEntry) {
      setTitle(editingEntry.title);
      setText(editingEntry.text);
      setEmoji(editingEntry.emoji || '');
      setImage(editingEntry.image || null);
      setErrors({});
    } else {
      setTitle('');
      setText('');
      setEmoji('');
      setImage(null);
      setErrors({});
    }
  }, [editingEntry]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

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
      image: image || undefined,
    };

    onSubmit(entry);
    setTitle('');
    setText('');
    setEmoji('');
    setImage(null);
    setErrors({});
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      {errors.title && <Text style={styles.error}>{errors.title}</Text>}

      <TextInput
        placeholder="¿Cómo estuvo tu día?"
        value={text}
        onChangeText={setText}
        multiline
        style={[styles.input, { height: 100 }]}
      />
      {errors.text && <Text style={styles.error}>{errors.text}</Text>}

      <View style={styles.emojiContainer}>
        {emojis.map((e) => (
          <TouchableOpacity key={e} onPress={() => setEmoji(e)}>
            <Text style={[styles.emoji, emoji === e && styles.selectedEmoji]}>{e}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.emoji && <Text style={styles.error}>{errors.emoji}</Text>}

      <Button title="Seleccionar imagen" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, marginVertical: 10, borderRadius: 8 }}
        />
      )}

      <Button title={editingEntry ? 'Actualizar entrada' : 'Guardar entrada'} onPress={handleSubmit} />

      {editingEntry && onCancelEdit && (
        <TouchableOpacity onPress={onCancelEdit} style={{ marginTop: 10 }}>
          <Text style={{ color: 'red' }}>Cancelar edición</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    padding: 10,
    marginVertical: 8,
  },
  emojiContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  emoji: { fontSize: 30 },
  selectedEmoji: { backgroundColor: '#d0e8ff', borderRadius: 5 },
  error: { color: 'red', marginBottom: 5 },
});