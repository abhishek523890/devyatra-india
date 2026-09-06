import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { PackageForm } from '@/components/admin/package-form'
import { getPackageByIdAdmin } from '@/lib/packages'
import { updatePackage } from '../../actions'

export const metadata = { title: 'Edit package' }

export default async function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const pkg = await getPackageByIdAdmin(id)
  if (!pkg) notFound()

  const action = updatePackage.bind(null, id)

  return (
    <div>
      <Link href="/admin/packages" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-secondary">
        <ArrowLeft className="size-4" aria-hidden />
        Back to packages
      </Link>
      <h1 className="mb-6 font-serif text-2xl font-semibold text-secondary">Edit package</h1>
      <PackageForm action={action} initial={pkg} />
    </div>
  )
}
