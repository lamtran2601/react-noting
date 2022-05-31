import { User } from 'models';
import { createContext } from 'react';

interface UserContextProps {
  user: User | null;
}

const initState: UserContextProps = {
  user: {
    id: '',
    email: '',
  },
};
const UserContext = createContext<UserContextProps>(initState);

export default UserContext;
