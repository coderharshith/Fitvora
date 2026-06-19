import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// TODO: Replace these with your actual Supabase Project URL and Anon Key
const supabaseUrl = 'https://wcxnhiibyvzydmcicjio.supabase.co';
const supabaseAnonKey = 'sb_publishable_S7XRJ5xrNdU2eIggAYuEgw_7F6Rm7hi';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
