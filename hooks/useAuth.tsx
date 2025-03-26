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

  const logout = useCallback(async () => {
    try {
      // Get CSRF token for signout
      const csrfResponse = await fetch('/api/auth/csrf');
      const { csrfToken } = await csrfResponse.json();

      // Perform signout
      await fetch('/api/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ csrfToken }),
      });

      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Signout failed');
    }
  }, []);

  const signIn = useCallback(async (credentials: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // First get CSRF token
      const csrfResponse = await fetch('http://localhost:3000/api/auth/csrf');
      const { csrfToken } = await csrfResponse.json();
      
      // Sign in with credentials
      const response = await fetch('http://localhost:3000/api/auth/signin/credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...credentials,
          csrfToken,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Authentication failed');
      }

      // Get session after successful sign in
      const sessionResponse = await fetch('http://localhost:3000/api/auth/session');
      const userData: User = await sessionResponse.json();
      
      if (userData) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
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
      
      const response = await fetch('http://localhost:3000/api/auth/register', {
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

      const userData: User = await response.json();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
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