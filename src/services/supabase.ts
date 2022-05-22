import { createClient } from '@supabase/supabase-js';
import { SupabaseEventTypes } from '@supabase/supabase-js/dist/module/lib/types';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

const supabaseClient = {
  get: async (table: string, range = { from: 0, to: 9 }) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .range(range.from, range.to);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
  getById: async (table: string, id: string) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
  create: async (table: string, payload: any) => {
    const { data, error } = await supabase.from(table).insert(payload).single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
  createMany: async (table: string, payload: any[]) => {
    const { data, error } = await supabase.from(table).insert(payload);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
  update: async (table: string, id: string, payload: any) => {
    const { data, error } = await supabase
      .from(table)
      .update(payload)
      .eq('id', id)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
  delete: async (table: string, id: string) => {
    const { data, error } = await supabase.from(table).delete().eq('id', id);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
  subscribe: async (
    table: string,
    callback: (payload: any) => void,
    on: SupabaseEventTypes = '*',
  ) => supabase.from(table).on(on, callback).subscribe(),
};
export default supabaseClient;
