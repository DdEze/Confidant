import { getLocalDateISO } from '@/utils/date';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Entry } from '../types';

const emojis = ['😀', '😢', '😡', '😴', '😍', '😑',
                '😔', '🤢', '😨', '🤩', '😇', '🤓'];

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

export default function JournalEntryForm({
  onSubmit,
  editingEntry,
  onCancelEdit,
}: Props) {
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
        placeholderTextColor="#888"
      />
      {errors.title && <Text style={styles.error}>{errors.title}</Text>}

      <TextInput
        placeholder="¿Cómo estuvo tu día?"
        value={text}
        onChangeText={setText}
        multiline
        style={[styles.input, styles.textArea]}
        placeholderTextColor="#888"
      />
      {errors.text && <Text style={styles.error}>{errors.text}</Text>}

      <Text style={styles.label}>Estado emocional</Text>
      <View style={styles.emojiContainer}>
        {emojis.map((e) => (
          <TouchableOpacity key={e} onPress={() => setEmoji(e)}>
            <Text style={[styles.emoji, emoji === e && styles.selectedEmoji]}>{e}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.emoji && <Text style={styles.error}>{errors.emoji}</Text>}

      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>📸 Seleccionar imagen</Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image }}
          style={styles.imagePreview}
        />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>
          {editingEntry ? 'Actualizar entrada' : 'Guardar entrada'}
        </Text>
      </TouchableOpacity>

      {editingEntry && onCancelEdit && (
        <TouchableOpacity onPress={onCancelEdit} style={styles.cancelEdit}>
          <Text style={styles.cancelEditText}>Cancelar edición</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fdfdfd',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 8,
    color: '#444',
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
    flexWrap: 'wrap',
  },
  emoji: {
    fontSize: 32,
    padding: 6,
  },
  selectedEmoji: {
    backgroundColor: '#dceeff',
    borderRadius: 8,
  },
  imageButton: {
    backgroundColor: '#e4a3dcff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  imageButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#42293fff',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: '#42293fff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelEdit: {
    marginTop: 10,
    alignItems: 'center',
  },
  cancelEditText: {
    color: '#c0392b',
    fontWeight: '500',
  },
  error: {
    color: 'red',
    fontSize: 13,
  },
});