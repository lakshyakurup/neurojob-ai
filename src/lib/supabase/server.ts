import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/** Re-export official server client */
export { createClient } from '../../../utils/supabase/server'

/**
 * Service-role client for trusted server-side writes (bypasses RLS).
 * Never import this into client components.
 */
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('Missing Supabase service role configuration')
  }

  return createSupabaseClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
