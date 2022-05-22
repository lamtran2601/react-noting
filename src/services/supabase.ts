import { createClient } from '@supabase/supabase-js';
import { SupabaseEventTypes, SupabaseRealtimePayload } from '@supabase/supabase-js/dist/module/lib/types';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

const supabaseClient = {
  get: async <T = any>(table: string, range = { from: 0, to: 9 }) => {
    const { data, error } = await supabase
      .from<T>(table)
      .select('*')
      .range(range.from, range.to);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
  getById: async <T = any>(table: string, id: T[keyof T]) => {
    const { data, error } = await supabase
      .from<T>(table)
      .select('*')
      .eq('id' as keyof T, id)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
  create: async <T = any>(table: string, payload: T) => {
    const { data, error } = await supabase
      .from<T>(table)
      .insert(payload)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
  createMany: async <T = any>(table: string, payload: any[]) => {
    const { data, error } = await supabase.from<T>(table).insert(payload);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
  update: async <T = any>(table: string, id: T[keyof T], payload: any) => {
    const { data, error } = await supabase
      .from<T>(table)
      .update(payload)
      .eq('id' as keyof T, id)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
  delete: async <T = any>(table: string, id: T[keyof T]) => {
    const { data, error } = await supabase
      .from<T>(table)
      .delete()
      .eq('id' as keyof T, id)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
  subscribe: async <T = any>(
    table: string,
    callback: (payload: SupabaseRealtimePayload<T>) => void,
    on: SupabaseEventTypes = '*',
  ) => supabase.from<T>(table).on(on, callback).subscribe(),
};
export default supabaseClient;
