import { RealtimeSubscription } from '@supabase/supabase-js';
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
  createNote: async (content = ''): Promise<Note> => {
    const user = await supabaseClient.getUser();
    const data = await supabaseClient.create<Note>('note', { data: content, owner_id: user?.id } as Note);
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
  syncUpdateNote: async (callback: (e: Note) => void): Promise<RealtimeSubscription> => {
    return supabaseClient.subscribe<Note>('note', (e) => callback(e.new), 'UPDATE');
  },
  syncNoteById: async (id: string, callback: (e: Note) => void): Promise<RealtimeSubscription> => {
    return supabaseClient.subscribe<Note>(`note:id=eq.${id}`, (e) => callback(e.new), 'UPDATE');
  },
};
