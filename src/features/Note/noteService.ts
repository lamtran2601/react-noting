import { RealtimeSubscription, SupabaseRealtimePayload } from '@supabase/supabase-js';
import { Note } from 'models';
import supabaseClient, { GetParams } from 'services/supabase';

export default {
  getNotes: async (params: GetParams): Promise<Note[]> => {
    const data = await supabaseClient.get('note', params);
    return data || [];
  },
  getNoteById: async (id: string): Promise<Note> => {
    const data = await supabaseClient.getById('note', id);
    return data || {};
  },
  createNote: async (note: Note): Promise<Note> => {
    const data = await supabaseClient.create<Note>('note', note);
    return data || {};
  },
  updateNote: async (
    id: string,
    content: string,
  ): Promise<Note> => {
    const data = await supabaseClient.update('note', id, { data: content });
    return data || {};
  },
  deleteNoteById: async (id: string): Promise<Note> => {
    const data = await supabaseClient.delete('note', id);
    return data || {};
  },
  syncUpdateNote: (callback: (payload: SupabaseRealtimePayload<Note>) => void) => supabaseClient.subscribe<Note>('note', callback, '*'),
  syncNoteById: async (id: string, callback: (e: Note) => void): Promise<RealtimeSubscription> => {
    return supabaseClient.subscribe<Note>(`note:id=eq.${id}`, (e) => callback(e.new), '*');
  },
};
