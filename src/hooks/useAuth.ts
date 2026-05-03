
`ts
import { useEffect, useState } from "react";

type AuthState = {
  loading: boolean;
  isMember: boolean;
  tier: string | null;
};

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    loading: true,
    isMember: false,
    tier: null,
  });

  useEffect(() => {
    // TODO: replace with real /api/me call
    async function fetchMe() {
      try {
        // const res = await fetch("/api/me");
        // const data = await res.json();
        // setState({ loading: false, isMember: data.isMember, tier: data.tier });

        // TEMP: fake non‑member
        setState({ loading: false, isMember: false, tier: null });
      } catch {
        setState({ loading: false, isMember: false, tier: null });
      }
    }

    fetchMe();
  }, []);

  return state;
}
`