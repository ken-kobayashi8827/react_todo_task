import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

type Props = {
  children: ReactNode;
};

type AuthContextType = {
  user: User | null;
};

const AuthContext = createContext<AuthContextType>({ user: null });

export const useAuthContext = () => useContext(AuthContext);
export const AuthProvider = ({ children }: Props) => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
