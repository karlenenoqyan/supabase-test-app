import axios from 'axios';
import {createContext, useEffect, useState} from 'react';

import supabase from '~/lib/supabase';

import {IAuthContext} from './types';

export const AuthContext = createContext<IAuthContext>({
  user: null,
  session: null,
});

export const AuthContextProvider: React.FC = ({children}) => {
  const [session, setSession] = useState<IAuthContext['session']>(null);
  const [user, setUser] = useState<IAuthContext['user']>(null);

  useEffect(() => {
    const activeSession = supabase.auth.session();
    setSession(activeSession);
    setUser(activeSession?.user ?? null);

    const {data: authListener} = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        axios.post('/api/auth', {
          event,
          session: currentSession,
        });
      },
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
