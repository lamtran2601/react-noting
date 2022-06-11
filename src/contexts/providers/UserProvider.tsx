import { UserContext } from 'contexts';
import { User } from 'models';
import {
  ReactNode, useEffect, useMemo, useState,
} from 'react';
import supabase from 'services/supabase';

const UserProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleUpdateUser = (user: any) => {
    setCurrentUser((state) => {
      if (user && state?.id === user.id) return state;
      return (user ? { id: user.id ?? '', email: user.email ?? '' } : null);
    });
  };

  useEffect(() => {
    handleUpdateUser(supabase.auth.user());
    const subscribe = supabase.auth.onAuthStateChange((_, session) => {
      handleUpdateUser(session?.user);
    });

    return subscribe?.data?.unsubscribe;
  }, []);

  const value = useMemo(() => ({
    user: currentUser,
  }), [currentUser]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
