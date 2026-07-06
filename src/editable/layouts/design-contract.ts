import type { CSSProperties } from 'react'

export const editableRootStyle = {
  // Luxury editorial system: warm off-white paper, deep charcoal ink, a
  // confident orange accent for action, and a deep teal for secondary
  // emphasis. Dark charcoal nav/footer for contrast, flat surfaces, hairline
  // borders — generous and premium, never loud.
  '--slot4-page-bg': '#F4F2F2',
  '--slot4-page-text': '#1D2128',
  '--slot4-panel-bg': '#EDEAE8',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#5B6570',
  '--slot4-soft-muted-text': '#8A9099',
  '--slot4-accent': '#FF9E20',
  '--slot4-accent-fill': '#FF9E20',
  '--slot4-accent-soft': '#FFF1DC',
  '--slot4-on-accent': '#1D2128',
  '--slot4-secondary': '#215E61',
  '--slot4-secondary-soft': '#E4EFEE',
  '--slot4-dark-bg': '#1D2128',
  '--slot4-dark-text': '#F4F2F2',
  '--slot4-media-bg': '#EDEAE8',
  '--slot4-cream': '#F4F2F2',
  '--slot4-warm': '#EDEAE8',
  '--slot4-lavender': '#E4EFEE',
  '--slot4-gray': '#EDEAE8',
  // Faint amber + teal wash over the paper so the page reads as a considered
  // surface rather than a flat off-white fill.
  '--slot4-body-gradient':
    'radial-gradient(1100px 620px at 12% -8%, rgba(255,158,32,0.07), transparent 58%), radial-gradient(900px 560px at 102% 4%, rgba(33,94,97,0.07), transparent 55%), radial-gradient(1400px 800px at 50% 115%, rgba(29,33,40,0.035), transparent 60%)',
  '--editable-page-bg': '#F4F2F2',
  '--editable-page-text': '#1D2128',
  '--editable-container': '1500px',
  '--editable-border': '#E1DDD9',
  '--editable-nav-bg': '#1D2128',
  '--editable-nav-text': '#F4F2F2',
  '--editable-nav-active': '#FF9E20',
  '--editable-nav-active-text': '#1D2128',
  '--editable-cta-bg': '#FF9E20',
  '--editable-cta-text': '#1D2128',
  '--editable-search-bg': '#ffffff',
  '--editable-footer-bg': '#1D2128',
  '--editable-footer-text': '#F4F2F2',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  onAccentText: 'text-[var(--slot4-on-accent)]',
  secondaryText: 'text-[var(--slot4-secondary)]',
  secondarySoftBg: 'bg-[var(--slot4-secondary-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_1px_3px_rgba(29,33,40,0.06)]',
  shadowStrong: 'shadow-[0_18px_48px_rgba(29,33,40,0.12)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(29,33,40,0.02),rgba(29,33,40,0.82))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-16 lg:py-20',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[140px] shrink-0 snap-start sm:w-[160px]',
  },
  type: {
    eyebrow: 'text-xs font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]',
    heroTitle: 'text-4xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-[3.25rem]',
    sectionTitle: 'text-3xl font-semibold tracking-[-0.02em] sm:text-4xl',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded-2xl border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-2xl border ${editablePalette.border} ${editablePalette.panelBg}`,
    dark: `rounded-2xl ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-semibold tracking-[0.01em] text-[var(--slot4-on-accent)] transition duration-300 hover:brightness-95 active:scale-[0.98]`,
    secondary: `inline-flex items-center justify-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-6 py-3 text-sm font-semibold tracking-[0.01em] text-[var(--slot4-page-text)] transition duration-300 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] active:scale-[0.98]`,
    accent: `inline-flex items-center justify-center gap-2 rounded-full ${editablePalette.accentBg} px-6 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:brightness-95 active:scale-[0.98]`,
  },
  media: {
    frame: `relative overflow-hidden rounded-2xl ${editablePalette.mediaBg}`,
    ratio: 'aspect-[2/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(29,33,40,0.14)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Change the full site color palette in editableRootStyle first; all homepage sections consume those CSS variables.',
  'Keep page structure in src/editable/sections/HomeSections.tsx so AI can redesign the whole home experience in one file.',
  'Use wide readable grids; never create skinny columns for paragraphs or cards.',
  'Use horizontal rails for dense post browsing, like the MysteryCoder reference layout.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
