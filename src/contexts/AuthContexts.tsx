import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../services/api';

interface iAuthProviderProps {
  children: ReactNode;
}

interface iUser {
  email: string;
  id: string;
  name: string;
}

interface iAuthState {
  accessToken: string;
  user: iUser;
}

interface iSignInCredentials {
  email: string;
  password: string;
}

interface iAuthContextData {
  user: iUser;
  accessToken: string;
  signIn: (credentials: iSignInCredentials) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<iAuthContextData>({} as iAuthContextData);

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

const AuthProvider = ({ children }: iAuthProviderProps) => {
  const [data, setData] = useState<iAuthState>(() => {
    const accessToken = localStorage.getItem('@Doit:accessToken');
    const user = localStorage.getItem('@Doit:user');

    if (accessToken && user) {
      return { accessToken, user: JSON.parse(user) };
    }
    return {} as iAuthState;
  });

  const signIn = useCallback(
    async ({ email, password }: iSignInCredentials) => {
      const response = await api.post('/login', { email, password });
      const { accessToken, user } = response.data;

      localStorage.setItem('@Doit:accessToken', accessToken);
      localStorage.setItem('@Doit:user', JSON.stringify(user));

      setData({ accessToken, user });
    },
    []
  );

  const history = useHistory();

  const signOut = useCallback(() => {
    localStorage.removeItem('@Doit:accessToken');
    localStorage.removeItem('@Doit:user');
    history.push('/');

    setData({} as iAuthState);
  }, []);

  const memoizedValue = React.useMemo(
    () => ({ accessToken: data.accessToken, user: data.user, signIn, signOut }),
    [data]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
