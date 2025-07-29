import { Entry } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'journal_entries';

export const saveEntries = async (entries: Entry[]) => {
  try {
    const json = JSON.stringify(entries);
    await AsyncStorage.setItem(STORAGE_KEY, json);
  } catch (error) {
    console.error('Error saving entries:', error);
  }
};

export const loadEntries = async (): Promise<Entry[]> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json != null ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Error loading entries:', error);
    return [];
  }
};