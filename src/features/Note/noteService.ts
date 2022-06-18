import { SupabaseRealtimePayload } from '@supabase/supabase-js';
import { Note } from 'models';
import { supabaseAPI, GetParams } from 'services/supabase';

export default {
  getNotes: (params: GetParams<Note>) => supabaseAPI.get<Note>('note', params),
  getNoteById: async (id: string) => supabaseAPI.getById<Note>('note', id),
  createNote: async (note: Note) => supabaseAPI.create<Note>('note', note),
  updateNote: async (id: string, content: string) => supabaseAPI.update<Note>('note', id, { data: content }),
  deleteNoteById: async (id: string) => supabaseAPI.delete('note', id),
  syncUpdateNote: (callback: (payload: SupabaseRealtimePayload<Note>) => void) => supabaseAPI.subscribe<Note>('note', callback, '*'),
};
