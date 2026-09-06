'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { getCurrentUser, requireAdmin, isAdminUser } from '@/lib/auth'

export type AdminRow = {
  id: string
  email: string
  createdAt: string
  isSelf: boolean
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/** All accounts flagged as admins, newest first. */
export async function listAdmins(): Promise<AdminRow[]> {
  await requireAdmin()
  const current = await getCurrentUser()
  const admin = createAdminClient()
  const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 })
  if (error) return []

  return data.users
    .filter((u) => isAdminUser(u))
    .sort((a, b) => (b.created_at ?? '').localeCompare(a.created_at ?? ''))
    .map((u) => ({
      id: u.id,
      email: u.email ?? '(no email)',
      createdAt: u.created_at ?? '',
      isSelf: u.id === current?.id,
    }))
}

export type AdminActionState = { error?: string; success?: string } | undefined

/** Creates a new admin account (email confirmed, admin flag set). */
export async function addAdmin(_prev: AdminActionState, formData: FormData): Promise<AdminActionState> {
  await requireAdmin()

  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')

  if (!isValidEmail(email)) return { error: 'Please enter a valid email address.' }
  if (password.length < 8) return { error: 'Password must be at least 8 characters.' }

  const admin = createAdminClient()
  const { error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { is_admin: true },
  })
  if (error) {
    if (/already/i.test(error.message)) return { error: 'An account with that email already exists.' }
    return { error: error.message }
  }

  revalidatePath('/admin/admins')
  return { success: `Admin access granted to ${email}.` }
}

/** Removes an admin account. Guards against removing your own account. */
export async function removeAdmin(formData: FormData): Promise<void> {
  await requireAdmin()

  const id = String(formData.get('id') ?? '')
  if (!id) return

  const current = await getCurrentUser()
  if (current?.id === id) return // never let an admin delete themselves

  const admin = createAdminClient()
  await admin.auth.admin.deleteUser(id)
  revalidatePath('/admin/admins')
}
