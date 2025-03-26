import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  points: number;
  isLeader?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (qrData: string, mpin: string) => Promise<void>;
  logout: () => void;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signUp: (credentials: { email: string; password: string }) => Promise<void>;
  error: string | null;
  loading: boolean;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (qrData: string, mpin: string) => {
    try {
      // TODO: Implement actual API call to validate QR and MPIN
      // This is a mock implementation
      const response = await new Promise<User>((resolve) => {
        setTimeout(() => {
          resolve({
            id: '1',
            name: 'John Doe',
            points: 100,
          });
        }, 1000);
      });

      setUser(response);
    } catch (error) {
      throw new Error('Invalid QR code or MPIN');
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const signIn = useCallback(async (credentials: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      // TODO: Implement actual API call
      const response = await new Promise<User>((resolve, reject) => {
        setTimeout(() => {
          if (credentials.email && credentials.password) {
            resolve({
              id: '1',
              name: 'John Doe',
              points: 100,
            });
          } else {
            reject(new Error('Invalid credentials'));
          }
        }, 1000);
      });

      setUser(response);
      localStorage.setItem('user', JSON.stringify(response));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Authentication failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signUp = useCallback(async (credentials: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      // TODO: Implement actual API call
      const response = await new Promise<User>((resolve, reject) => {
        setTimeout(() => {
          if (credentials.email && credentials.password) {
            resolve({
              id: '1',
              name: 'John Doe',
              points: 100,
            });
          } else {
            reject(new Error('Invalid credentials'));
          }
        }, 1000);
      });

      setUser(response);
      localStorage.setItem('user', JSON.stringify(response));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Authentication failed');
      throw error;  
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading: isLoading,
        error,
        login,
        logout,
        signIn,
        signUp,
        clearError,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 