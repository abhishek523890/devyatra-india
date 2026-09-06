import { redirect } from 'next/navigation'
import Link from 'next/link'
import { adminExists } from '@/lib/auth'
import { AuthShell } from '@/components/admin/auth-shell'
import { SetupForm } from '@/components/admin/setup-form'

export const metadata = { title: 'Admin Setup' }

export default async function AdminSetupPage() {
  // Once an admin exists, this bootstrap page is closed.
  if (await adminExists()) redirect('/admin/login')

  return (
    <AuthShell
      title="Create your admin account"
      subtitle="This one-time setup creates the first administrator for your website."
      footer={
        <>
          Already have an account?{' '}
          <Link href="/admin/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <SetupForm />
    </AuthShell>
  )
}
