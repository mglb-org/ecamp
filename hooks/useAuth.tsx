import { router } from 'expo-router';
import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User { 
  id: string;
  name: string;
  points: number;
  isLeader?: boolean;
}

interface AuthError {
  email?: string;
  password?: string;
  general?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  logout: () => void;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signUp: (credentials: { email: string; password: string }) => Promise<void>;
  error: string | null;
  loading: boolean;
  clearError: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<AuthError>({});
  const [error, setError] = useState<string | null>(null);

  const validateForm = (email: string, password: string): boolean => {
    const newErrors: AuthError = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('user');

      setUser(null);
      setToken(null);
      router.replace("/");
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Signout failed');
    }
  }, []);

  const signIn = useCallback(async (credentials: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!validateForm(credentials.email, credentials.password)) {
        return;
      }

      const response = await fetch(`https://70e5-49-147-157-181.ngrok-free.app/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      
      const userData = await response.json();

      if (userData) {
        setUser(userData.user);
        setToken(userData.token);
        await AsyncStorage.setItem('user', JSON.stringify(userData));

        router.replace("/dashboard");
      } else {
        throw new Error('Failed to get user session');
      }
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

      const response = await fetch(`https://70e5-49-147-157-181.ngrok-free.app/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const userData: { user: User, token: string } = await response.json();
      setUser(userData.user);
      setToken(userData.token);
      await AsyncStorage.setItem('user', JSON.stringify(userData));

      router.replace("/dashboard");
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

  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        router.replace("/dashboard");
      } else {
        router.replace("/auth");
      }
    };
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading: isLoading,
        error,
        logout,
        signIn,
        signUp,
        clearError,
        token,
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