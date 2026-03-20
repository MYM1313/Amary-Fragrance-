/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://oxamnldykrcymniemsty.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_eG_0ZWmi9j3vCOEJr3QnXw_uX5cv_Pb';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
