import { createClient, User } from '@supabase/supabase-js';
import { SupabaseEventTypes, SupabaseRealtimePayload } from '@supabase/supabase-js/dist/module/lib/types';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'anon-key';
export const supabase = createClient(supabaseUrl, supabaseKey);

export interface GetParams {
  select?: string,
  from?: number,
  to?: number,
  order?: {
    column?: string,
    order_options?: {
      ascending?: boolean,
    },
  },
}

const supabaseClientAPI = {
  get: async <T = any>(table: string, options: GetParams = {}) => {
    const {
      select = '*', from = 0, to = 20, order = { column: 'created_at', order_options: { ascending: false } },
    } = options;
    const { data, error } = await supabase
      .from<T>(table)
      .select(select)
      .order(order.column as any, order.order_options)
      .range(from, to);
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

const supabaseAuth = {
  signUp: async (email: string, password: string) => {
    const { user, session, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      throw new Error(error.message);
    }
    return { user, session };
  },
  signIn: async (email: string, password: string) => {
    const { user, session, error } = await supabase.auth.signIn({ email, password });
    if (error) {
      throw new Error(error.message);
    }
    return { user, session };
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  },
  getUser: async () => {
    return supabase.auth.user();
  },
  onUserChange: async (callback: (user: User | null | undefined) => void) => {
    return supabase.auth.onAuthStateChange((_, session) => callback(session?.user));
  },
};

export default { ...supabaseClientAPI, ...supabaseAuth };
