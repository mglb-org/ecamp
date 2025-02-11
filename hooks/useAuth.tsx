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
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

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

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
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