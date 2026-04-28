import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { createClient, User, Session } from "@supabase/supabase-js";

/* -------------------------------------------------------
   SUPABASE CLIENT
------------------------------------------------------- */
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

/* -------------------------------------------------------
   TYPES
------------------------------------------------------- */
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isMember: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* -------------------------------------------------------
   PROVIDER
------------------------------------------------------- */
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* -------------------------------------------------------
     INITIAL SESSION + LISTENER
  ------------------------------------------------------- */
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  /* -------------------------------------------------------
     LOGIN (Google OAuth)
  ------------------------------------------------------- */
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/members",
      },
    });
  };

  /* -------------------------------------------------------
     LOGOUT
  ------------------------------------------------------- */
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  /* -------------------------------------------------------
     ROLE FLAGS (simple + safe)
  ------------------------------------------------------- */
  const isAdmin = user?.email === "shannon@oceantidedrop.com";
  const isMember = !!user; // Stripe handles membership — user logged in = member

  /* -------------------------------------------------------
     CONTEXT VALUE
  ------------------------------------------------------- */
  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isMember,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

/* -------------------------------------------------------
   HOOK
------------------------------------------------------- */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};

export default AuthProvider;
