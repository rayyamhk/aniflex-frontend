import React, { useContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid/non-secure';
import { Response, User } from '../types';
import useLocalStorage from './useLocalStorage';
import useTranslate from './useTranslate';
import { LOCAL_STORAGE_AGENT_IDENTIFIER, LOCAL_STORAGE_REFRESH_TOKEN, LOCAL_STORAGE_REMEMBER_ME } from '../constants';

type AuthUtils = {
  user: User | null,
  signIn: (email: string, password: string, rememberMe: boolean) => Promise<void>,
  signUp: (email: string, password: string) => Promise<void>,
  signOut: () => Promise<void>,
}

type Payload = {
  user: User,
  accessToken: string,
  refreshToken?: string,
};

const AuthContext = React.createContext<AuthUtils>({
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const translate = useTranslate();
  const [user, setUser] = useState<User|null>(null);
  const [accessToken, setAccessToken] = useState<string>('');
  const [rememberMe, setRememberMe] = useLocalStorage(LOCAL_STORAGE_REMEMBER_ME, false);
  const [refreshToken, setRefreshToken] = useLocalStorage(LOCAL_STORAGE_REFRESH_TOKEN, '');
  const [agentIdentifier] = useLocalStorage(LOCAL_STORAGE_AGENT_IDENTIFIER, nanoid());

  // initial authentication
  useEffect(() => {
    authenticate();
    async function authenticate() {
      if (!rememberMe || !refreshToken || !agentIdentifier) return;
      console.log('authenticating...');
      try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/auth/refresh`, {
          method: 'POST',
          headers: {
            'x-agent-identifier': agentIdentifier,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken: `Bearer ${refreshToken}` }),
        });
        const json = await resp.json() as Response;
        if (json.status !== 'success') throw new Error(json.message);
        const payload = json.data as Payload;
        setUser(payload.user);
        setAccessToken(payload.accessToken);
        setRefreshToken(payload.refreshToken || '');
      } catch (err) {
        console.log('unauthenticated.', err);
        setRefreshToken('');
        setAccessToken('');
      }
    }
  }, []);

  useEffect(() => {
    console.log('auth provider rerendered.', {
      user,
      rememberMe,
      accessToken,
      refreshToken,
      agentIdentifier,
    });
  });

  async function signUp(email: string, password: string) {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const json = await resp.json() as Response;
    if (json.status !== 'success') throw new Error(json.message);
  }

  async function signIn(email: string, password: string, rememberMe: boolean) {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-agent-identifier': agentIdentifier,
      },
      body: JSON.stringify({ email, password, keepSession: rememberMe }),
    });
    const json = await resp.json() as Response;
    if (json.status !== 'success') throw new Error(translate('authentication-failed'));
    const {
      user,
      accessToken,
      refreshToken,
    } = json.data as Payload;
    // when rememberMe is true, server will return a refresh token.
    if (rememberMe && refreshToken) setRefreshToken(refreshToken);
    setUser(user);
    setRememberMe(rememberMe);
    setAccessToken(accessToken);
  }

  async function signOut() {
    if (rememberMe && agentIdentifier && refreshToken) {
      try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/auth/signout`, {
          method: 'POST',
          headers: {
            'x-agent-identifier': agentIdentifier,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken: `Bearer ${refreshToken}` }),
        });
        const json = await resp.json() as Response;
        if (json.status !== 'success') return;
      } catch (err) {
        console.error(err);
      }
    }
    setRememberMe(false);
    setAccessToken('');
    setRefreshToken('');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      signUp,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext);
}