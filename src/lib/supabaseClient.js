import { createClient } from '@supabase/supabase-js'

const _session = { value: null }

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      detectSessionInUrl: true,
      persistSession: true,
      flowType: 'implicit'
    }
  }
)
