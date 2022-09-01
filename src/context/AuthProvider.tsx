import React, { createContext, useState } from 'react';
import { UserRole } from 'types';

export const AuthContext = createContext<{ auth: null | Auth, setAuth: React.Dispatch<React.SetStateAction<Auth | null>> }>({
  auth: null,
  setAuth: () => {},
});

interface Props {
  children?: React.ReactNode;
}

//@todo zmienić tak, żeby zaciągać z backendu
interface Auth {
  user: {
    id: string;
    username: string;
    email: string;
    avatarURL?: string;
    role: UserRole;
    favouriteAuthors: string[];
  },
  accessToken: string;
}

export const AuthProvider = ({ children }: Props) => {

  const [auth, setAuth] = useState<null | Auth>(null);

  return (
    <AuthContext.Provider value={ { auth, setAuth } }>
      { children }
    </AuthContext.Provider>
  );
};
