import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL=https://yzcugymxyldvlknmqjzx.supabase.co;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY=0ad95db23ca9c2eeb0c3a970f8bfc0de;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
