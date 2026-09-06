import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

/** Returns the signed-in user or null. */
export async function getCurrentUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

/** Redirects to the login page when there is no signed-in admin. */
export async function requireAdmin() {
  const user = await getCurrentUser()
  if (!user) redirect('/admin/login')
  return user
}

/**
 * Whether any admin account already exists. Used to gate the first-run
 * setup page so it can only be used to bootstrap the very first admin.
 */
export async function adminExists() {
  try {
    const admin = createAdminClient()
    const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 1 })
    if (error) return false
    return data.users.length > 0
  } catch {
    return false
  }
}
