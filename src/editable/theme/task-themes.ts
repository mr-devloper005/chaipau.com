import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

/*
  Luxury editorial task surfaces.

  Every task (archive + detail) shares one cohesive premium identity: warm
  off-white paper, deep charcoal ink, a confident orange accent, and hairline
  borders — a magazine/directory hybrid built for a business-owner audience.
  Per-task copy (kicker / note) still varies so each section keeps a little
  voice, but the visual language is unified. Tokens are delivered via CSS
  variables (`--tk-*`).
*/

export type TaskTheme = {
  /** short flavour word shown as an eyebrow kicker */
  kicker: string
  /** one-line mood note for the page intro */
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const DISPLAY_FONT = "'Sora', 'Space Grotesk', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"
const BODY_FONT = "'Manrope', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"

// Shared luxury-editorial palette — every task inherits this; only kicker/note differ.
const base = {
  dark: false,
  fontDisplay: DISPLAY_FONT,
  fontBody: BODY_FONT,
  bg: '#F4F2F2',
  surface: '#ffffff',
  raised: '#EDEAE8',
  text: '#1D2128',
  muted: '#5B6570',
  line: '#E1DDD9',
  accent: '#FF9E20',
  accentSoft: '#FFF1DC',
  onAccent: '#1D2128',
  glow: 'rgba(255,158,32,0.10)',
  radius: '1rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...base, kicker: 'Articles', note: 'Perspectives and long-form stories for the modern business owner.' },
  listing: { ...base, kicker: 'Businesses', note: 'A refined directory for finding and comparing local businesses.' },
  classified: { ...base, kicker: 'Marketplace', note: 'Curated offers and opportunities, ready to act on.' },
  image: { ...base, kicker: 'Gallery', note: 'A visual showcase of standout work, spaces and moments.' },
  sbm: { ...base, kicker: 'Bookmarks', note: 'Resources and references worth returning to.' },
  pdf: { ...base, kicker: 'Documents', note: 'Guides, reports and references for growing a business.' },
  profile: { ...base, kicker: 'Profiles', note: 'Meet the business owners and creators shaping their industries.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

/** All `--tk-*` tokens + font overrides for a task surface, ready for `style`. */
export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    // Re-point the shared article-body accent vars so post HTML (headings,
    // links) inherits this task's accent instead of the global site accent.
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
