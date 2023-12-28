import { createClient } from '@supabase/supabase-js'

const config = useRuntimeConfig();
const supabaseUrl = config.SUPABASE_URL as unknown as string
const supabaseKey = config.SUPABASE_KEY as unknown as string

export default function useSupabase() {
    const supabase = createClient(supabaseUrl,supabaseKey )
    
    return {
      //data
      supabase,
      //methods
    };
  }