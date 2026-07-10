'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, UserPlus, LogIn, X, PlusCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

// These listing pages are browse-only surfaces reached from post/content
// links, not from a standalone nav button — keep them out of the primary nav.
const HIDDEN_NAV_TASKS = new Set(['profile', 'image'])

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navItems = useMemo(
    () =>
      SITE_CONFIG.tasks
        .filter((task) => task.enabled && !HIDDEN_NAV_TASKS.has(task.key))
        .map((task) => ({ label: task.label, href: task.route })),
    []
  )
  const primaryNav = useMemo(
    () => [{ label: 'Home', href: '/' }, ...navItems, { label: 'Search', href: '/search' }, { label: 'About', href: '/about' }],
    [navItems]
  )

  return (
    <header className="sticky top-0 z-50 bg-[var(--editable-nav-bg)]/97 text-[var(--editable-nav-text)] backdrop-blur-md">
      <nav className="mx-auto flex min-h-[84px] w-full max-w-[var(--editable-container)] items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-9 w-9 object-contain" />
          <span className="hidden min-w-0 truncate text-xl font-semibold leading-none tracking-[-0.01em] editable-display md:block">{SITE_CONFIG.name}</span>
        </Link>

        <div className="mx-auto hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-[13px] font-medium tracking-[0.01em] transition duration-300 ${
                  active ? 'bg-white/10 text-[var(--slot4-accent)]' : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          {session ? (
            <>
              <Link
                href="/create"
                className="hidden items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-4 py-2.5 text-[13px] font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:brightness-95 sm:inline-flex"
              >
                <PlusCircle className="h-3.5 w-3.5" /> Create
              </Link>
              <button
                type="button"
                onClick={logout}
                className="hidden items-center gap-2 rounded-full px-3 py-2.5 text-[13px] font-medium text-white/60 transition duration-300 hover:text-white sm:inline-flex"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-[13px] font-medium text-white/70 transition duration-300 hover:border-white/30 hover:text-white sm:inline-flex"
              >
                <LogIn className="h-3.5 w-3.5" /> Login
              </Link>
              <Link
                href="/signup"
                className="hidden items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-4 py-2.5 text-[13px] font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:brightness-95 sm:inline-flex"
              >
                <UserPlus className="h-3.5 w-3.5" /> Sign up
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-full border border-white/15 bg-white/5 p-2.5 text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div className="h-px bg-white/10" />

      {open ? (
        <div className="border-t border-white/10 bg-[var(--editable-nav-bg)] px-4 py-5 lg:hidden">
          <div className="grid gap-1">
            {[...primaryNav, { label: 'Contact', href: '/contact' }, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition duration-300 ${
                    active
                      ? 'bg-white/10 text-[var(--slot4-accent)]'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      ) : null}
    </header>
  )
}
