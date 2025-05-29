import { createContext } from 'react';
import type { User } from '../types/user.types';

interface UserContextValue {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextValue | undefined>(
  undefined
);
export type { UserContextValue };
