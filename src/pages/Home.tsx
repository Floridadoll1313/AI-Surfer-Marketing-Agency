import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user?.email === "your-admin-email@example.com") {
        setIsAdmin(true);
      }
    };

    loadUser();
  }, []);
