import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Entry } from '../types';
import { loadEntries, saveEntries } from '../utils/storage';

type EntriesContextType = {
  entries: Entry[];
  addEntry: (entry: Entry) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  editEntry: (entry: Entry) => Promise<void>;
};

const EntriesContext = createContext<EntriesContextType | undefined>(undefined);

export function EntriesProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    (async () => {
      const stored = await loadEntries();
      setEntries(stored);
    })();
  }, []);

  const addEntry = async (entry: Entry) => {
    const updated = [entry, ...entries];
    setEntries(updated);
    await saveEntries(updated);
  };

  const deleteEntry = async (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    await saveEntries(updated);
  };

  const editEntry = async (editedEntry: Entry) => {
    const updated = entries.map((e) => (e.id === editedEntry.id ? editedEntry : e));
    setEntries(updated);
    await saveEntries(updated);
  };

  return (
    <EntriesContext.Provider value={{ entries, addEntry, deleteEntry, editEntry }}>
      {children}
    </EntriesContext.Provider>
  );
}

export function useEntries() {
  const context = useContext(EntriesContext);
  if (!context) {
    throw new Error('useEntries must be used within an EntriesProvider');
  }
  return context;
}