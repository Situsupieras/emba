import React, { createContext, useState, useContext, useCallback } from 'react';
import SecureStoreCompat from '../security/secureStore';
import { User } from '../types';

interface UserContextType {
  user: User | null;
  reloadUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  reloadUser: async () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const reloadUser = useCallback(async () => {
    try {
      const userData = await SecureStoreCompat.getItemAsync('userProfile');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (e) {
      // Manejo de error opcional
    }
  }, []);

  React.useEffect(() => {
    reloadUser();
  }, [reloadUser]);

  return (
    <UserContext.Provider value={{ user, reloadUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext); 