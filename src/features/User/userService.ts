import supabase from 'services/supabase';

export default {
  signUpByEmail: async (email: string, password: string) => {
    const { user, session, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      throw new Error(error.message);
    }
    return { user, session };
  },
  signInByEmail: async (email: string, password: string) => {
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
};
