import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { theme } from '../styles/theme';
import { AuthProvider } from './AuthContexts';
import { TasksProvider } from './TasksContexts';

interface iAppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: iAppProviderProps) => (
  <AuthProvider>
    <TasksProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </TasksProvider>
  </AuthProvider>
);
