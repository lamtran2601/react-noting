import { Note } from 'models';
import { generateSupabaseAPI } from 'services/supabase';

export default generateSupabaseAPI<Note>('note');
