import { RealtimeSubscription } from '@supabase/supabase-js';
import { Note } from 'models/Note';
import supabaseClient from 'services/supabase';

export const getNotes = async (range = { from: 0, to: 9 }): Promise<Note[]> => {
  const { from, to } = range;
  const data = await supabaseClient.get('note', { from, to });
  return data || [];
};

export const getNoteById = async (id: string): Promise<Note> => {
  const data = await supabaseClient.getById('note', id);
  return data || {};
};

export const createNote = async (note: Note): Promise<Note> => {
  const data = await supabaseClient.create('note', note);
  return data || {};
};

export const updateNote = async (
  id: string,
  content: string,
): Promise<Note> => {
  const data = await supabaseClient.update('note', id, { data: content });
  return data || {};
};

export const deleteNoteById = async (id: string): Promise<Note> => {
  const data = await supabaseClient.delete('note', id);
  return data || {};
};

export const syncNoteById = async (id: string, callback: (e: Note) => void): Promise<RealtimeSubscription> => supabaseClient.subscribe<Note>(`note:id=eq.${id}`, (e) => callback(e.new), 'UPDATE');
