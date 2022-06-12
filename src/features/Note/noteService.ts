import { SupabaseRealtimePayload } from '@supabase/supabase-js';
import { Note } from 'models';
import supabaseClient, { GetParams } from 'services/supabase';

export default {
  getNotes: async (params: GetParams<Note>) => supabaseClient.get<Note>('note', params),
  getNoteById: async (id: string) => supabaseClient.getById<Note>('note', id),
  createNote: async (note: Note) => supabaseClient.create<Note>('note', note),
  updateNote: async (id: string, content: string) => supabaseClient.update<Note>('note', id, { data: content }),
  deleteNoteById: async (id: string) => supabaseClient.delete('note', id),
  syncUpdateNote: (callback: (payload: SupabaseRealtimePayload<Note>) => void) => supabaseClient.subscribe<Note>('note', callback, '*'),
};
