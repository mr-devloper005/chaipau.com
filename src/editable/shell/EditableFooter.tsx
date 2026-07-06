'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

// These listing pages are browse-only surfaces reached from post/content
// links, not from a standalone nav button — keep them out of the footer too.
const HIDDEN_NAV_TASKS = new Set(['profile', 'image'])

export function EditableFooter() {
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled && !HIDDEN_NAV_TASKS.has(task.key))
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className={`mx-auto grid max-w-[var(--editable-container)] gap-12 px-4 py-16 sm:px-6 lg:px-8 ${taskLinks.length ? 'lg:grid-cols-[1.3fr_1fr_1fr]' : 'lg:grid-cols-[1.3fr_1fr]'}`}>
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-9 w-9 object-contain" />
            <span className="editable-display text-2xl font-semibold tracking-[-0.01em]">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/55">{globalContent.footer?.description || SITE_CONFIG.description}</p>
        </div>

        {taskLinks.length ? (
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">Explore</h3>
            <div className="mt-5 grid gap-3">
              {taskLinks.map((task) => (
                <Link key={task.key} href={task.route} className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-white/60 transition duration-300 hover:text-white">
                  {task.label} <ArrowUpRight className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">Site</h3>
          <div className="mt-5 grid gap-3">
            {[
              ['About', '/about'],
              ['Contact', '/contact'],
              ...(session ? [['Create', '/create']] : [['Login', '/login'], ['Sign up', '/signup']]),
            ].map(([label, href]) => (
              <Link key={href} href={href} className="w-fit text-sm font-medium text-white/60 transition duration-300 hover:text-white">{label}</Link>
            ))}
            {session ? <button type="button" onClick={logout} className="w-fit text-left text-sm font-medium text-white/60 transition duration-300 hover:text-white">Logout</button> : null}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-6 text-center text-xs font-medium tracking-[0.12em] text-white/45">
        © {year} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}
