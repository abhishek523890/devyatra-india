import { redirect } from 'next/navigation'
import Link from 'next/link'
import { adminExists, getCurrentUser } from '@/lib/auth'
import { AuthShell } from '@/components/admin/auth-shell'
import { LoginForm } from '@/components/admin/login-form'

export const metadata = { title: 'Admin Login' }

export default async function AdminLoginPage() {
  const user = await getCurrentUser()
  if (user) redirect('/admin')

  // If no admin has been created yet, guide the user to setup.
  const exists = await adminExists()

  return (
    <AuthShell
      title="Admin sign in"
      subtitle="Sign in to manage packages, bookings and site details."
      footer={
        !exists ? (
          <>
            No admin account yet?{' '}
            <Link href="/admin/setup" className="font-medium text-primary hover:underline">
              Create the first admin
            </Link>
          </>
        ) : null
      }
    >
      <LoginForm />
    </AuthShell>
  )
}
