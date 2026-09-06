import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PackageForm } from '@/components/admin/package-form'
import { createPackage } from '../actions'

export const metadata = { title: 'Add package' }

export default function NewPackagePage() {
  return (
    <div>
      <Link href="/admin/packages" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-secondary">
        <ArrowLeft className="size-4" aria-hidden />
        Back to packages
      </Link>
      <h1 className="mb-6 font-serif text-2xl font-semibold text-secondary">Add package</h1>
      <PackageForm action={createPackage} />
    </div>
  )
}
