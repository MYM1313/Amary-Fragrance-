import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://haxdkdiwdsjsdaleasvu.supabase.co';
const supabaseAnonKey = 'sb_publishable_hos3OpcxobV0J0F6NIoToQ_uaB5CWGP';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
