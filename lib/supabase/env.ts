// Some environments store the Supabase values with stray text/quotes/backticks
// (e.g. pasting "Your project URL is: `https://xyz.supabase.co`"). These helpers
// extract the clean values so the clients never receive a malformed URL/key.

function cleanUrl(raw: string | undefined): string {
  const match = (raw ?? '').match(/https?:\/\/[^\s`'"]+/i)
  return (match ? match[0] : (raw ?? '')).trim().replace(/\/+$/, '')
}

function cleanToken(raw: string | undefined): string {
  // JWTs match this shape; fall back to a trimmed value if not found.
  const match = (raw ?? '').match(/ey[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/)
  return (match ? match[0] : (raw ?? '')).trim().replace(/^[`'"]+|[`'"]+$/g, '')
}

export const SUPABASE_URL = cleanUrl(process.env.NEXT_PUBLIC_SUPABASE_URL)
export const SUPABASE_ANON_KEY = cleanToken(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
export const SUPABASE_SERVICE_ROLE_KEY = cleanToken(process.env.SUPABASE_SERVICE_ROLE_KEY)
