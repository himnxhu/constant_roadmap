// Supabase Client Connection Config
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Detect placeholder values
const isConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project') && 
  !supabaseAnonKey.includes('placeholder') &&
  supabaseUrl !== 'https://your-supabase-project-id.supabase.co';

console.log("⚡ [THE CODING GRIND] Supabase Config Diagnostic:", {
  urlLength: supabaseUrl ? supabaseUrl.length : 0,
  hasKey: !!supabaseAnonKey,
  keyLength: supabaseAnonKey ? supabaseAnonKey.length : 0,
  isConfigured
});

export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export const isSupabaseConfigured = isConfigured;
