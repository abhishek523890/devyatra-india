/**
 * Seeds the `packages` table with the bundled sample catalogue so the admin
 * starts with an editable set of packages instead of an empty list.
 *
 * Run AFTER applying scripts/001_admin_schema.sql:
 *   set -a && source /vercel/share/.env.project && set +a && npx tsx scripts/seed-packages.ts
 *
 * Safe to re-run: upserts on the unique `slug`.
 */
import { createClient } from '@supabase/supabase-js'
import { packages } from '../lib/data'

function cleanUrl(raw?: string) {
  const m = (raw ?? '').match(/https?:\/\/[^\s`'"]+/i)
  return (m ? m[0] : (raw ?? '')).trim().replace(/\/+$/, '')
}
function cleanToken(raw?: string) {
  const m = (raw ?? '').match(/ey[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/)
  return (m ? m[0] : (raw ?? '')).trim().replace(/^[`'"]+|[`'"]+$/g, '')
}

async function main() {
  const url = cleanUrl(process.env.NEXT_PUBLIC_SUPABASE_URL)
  const key = cleanToken(process.env.SUPABASE_SERVICE_ROLE_KEY)
  if (!url || !key) throw new Error('Missing Supabase URL or service role key in the environment.')

  const supabase = createClient(url, key, { auth: { persistSession: false } })

  let ok = 0
  for (const [i, p] of packages.entries()) {
    const { error } = await supabase.from('packages').upsert(
      {
        slug: p.slug,
        name: p.name,
        category: p.category,
        base_price: p.basePrice,
        status: p.status,
        featured: p.featured,
        sort_order: i,
        data: p,
      },
      { onConflict: 'slug' },
    )
    if (error) console.error(`✗ ${p.slug}: ${error.message}`)
    else {
      ok++
      console.log(`✓ ${p.slug}`)
    }
  }
  console.log(`\nSeeded ${ok}/${packages.length} packages.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
