import React, { useEffect, useState, createContext, useContext } from "react";

type AuthState = {
  loading: boolean;
  isMember: boolean;
  tier: string | null;
};

// 1. Create a Context to hold the auth state
const AuthContext = createContext<AuthState>({
  loading: true,
  isMember: false,
  tier: null,
});

// 2. The AuthProvider that your App.jsx is looking for
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    loading: true,
    isMember: false,
    tier: null,
  });

  useEffect(() => {
    async function fetchMe() {
      try {
        // TEMP: fake non‑member logic
        setState({ loading: false, isMember: false, tier: null });
      } catch {
        setState({ loading: false, isMember: false, tier: null });
      }
    }
    fetchMe();
  }, []);

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. The useAuth hook that your pages use
export function useAuth(): AuthState {
  return useContext(AuthContext);
}
