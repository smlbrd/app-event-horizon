import { useState, useMemo, useEffect, type ReactNode } from 'react';
import type { User } from '../types/user.types';
import { fetchUserProfile } from '../api/api';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    if (token && user_id && !user) {
      fetchUserProfile(user_id, token)
        .then(setUser)
        .catch(() => {
          setUser(null);
          localStorage.removeItem('token');
          localStorage.removeItem('user_id');
        });
    }
  }, [user]);

  const login = (user: User) => setUser(user);
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
