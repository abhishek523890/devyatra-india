import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './env'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      // Secure cookies in production; not in dev, so localhost still works.
      cookieOptions: { secure: process.env.NODE_ENV === 'production' },
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // Do not run code between createServerClient and supabase.auth.getUser().
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Protect the admin area. /admin/login and /admin/setup stay public so an
  // admin can sign in or bootstrap the first account.
  const isAdminArea = pathname.startsWith('/admin')
  const isAdminPublic =
    pathname === '/admin/login' || pathname === '/admin/setup'
  // Only accounts explicitly flagged as admins may reach the dashboard. A
  // signed-in account without the flag is treated like a logged-out visitor.
  const isAdmin = user?.user_metadata?.is_admin === true

  if (isAdminArea && !isAdminPublic && !isAdmin) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  // IMPORTANT: return the supabaseResponse object as-is.
  return supabaseResponse
}
