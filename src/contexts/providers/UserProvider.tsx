import { UserContext } from 'contexts';
import { User } from 'models';
import {
  ReactNode, useEffect, useMemo, useState,
} from 'react';
import supabase from 'services/supabase';

const UserProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.onUserChange((user) => {
      setCurrentUser((state) => {
        if (user && state?.id === user.id) return state;
        return ({ id: user?.id ?? '', email: user?.email ?? '' });
      });
    });
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
