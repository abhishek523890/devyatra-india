import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } from './env'

/**
 * Service-role client. SERVER-ONLY — never import this into client components.
 * Bypasses RLS, so use it only for trusted admin operations (first-run setup,
 * counting users) that cannot be done with the anon client.
 */
export function createAdminClient() {
  return createClient(
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  )
}
