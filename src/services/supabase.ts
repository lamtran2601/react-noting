import { createClient } from '@supabase/supabase-js';
import { SupabaseEventTypes, SupabaseRealtimePayload } from '@supabase/supabase-js/dist/module/lib/types';
import { Model } from 'models/Model';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'anon-key';
export const supabase = createClient(supabaseUrl, supabaseKey, { autoRefreshToken: true, persistSession: true });

export interface GetParams<T> {
  select?: string,
  from?: number,
  to?: number,
  order?: {
    column: keyof T,
    order_options?: {
      ascending?: boolean,
    },
  },
}

export const supabaseAPI = {
  get: async <T = Model>(table: string, options: GetParams<T>) => {
    const {
      select = '*', from = 0, to = 20, order = { column: 'created_at' as keyof T, order_options: { ascending: false } },
    } = options;
    const { data, error } = await supabase
      .from<T>(table)
      .select(select)
      .order(order.column ?? 'created_at' as keyof T, order.order_options ?? { ascending: false })
      .range(from, to);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
  getById: async <T = Model>(table: string, id: T[keyof T]) => {
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
  create: async <T = Model>(table: string, payload: T) => {
    const { data, error } = await supabase
      .from<T>(table)
      .insert(payload)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
  createMany: async <T = Model>(table: string, payload: Partial<T>[]) => {
    const { data, error } = await supabase.from<T>(table).insert(payload);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
  update: async <T = Model>(table: string, id: T[keyof T], payload: Partial<T>) => {
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
  delete: async <T = Model>(table: string, id: T[keyof T]) => {
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
  subscribe: async <T = Model>(
    table: string,
    callback: (payload: SupabaseRealtimePayload<T>) => void,
    on: SupabaseEventTypes = '*',
  ) => supabase.from<T>(table).on(on, callback).subscribe(),
};

export const generateSupabaseAPI = <T = Model>(table: string) => ({
  get: (options: GetParams<T>) => supabaseAPI.get<T>(table, options),
  getById: (id: T[keyof T]) => supabaseAPI.getById<T>(table, id),
  create: (payload: T) => supabaseAPI.create<T>(table, payload),
  createMany: (payload: Partial<T>[]) => supabaseAPI.createMany<T>(table, payload),
  update: (id: T[keyof T], payload: Partial<T>) => supabaseAPI.update<T>(table, id, payload),
  delete: (id: T[keyof T]) => supabaseAPI.delete<T>(table, id),
  subscribe: (callback: (payload: SupabaseRealtimePayload<T>) => void, on: SupabaseEventTypes = '*') => supabaseAPI.subscribe<T>(table, callback, on),
});

export default supabase;
