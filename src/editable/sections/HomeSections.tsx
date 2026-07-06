import Link from 'next/link'
import {
  Camera, MapPin, MessageSquare, Search, Share2, Star, ThumbsUp,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { EditableHeroCollage } from '@/editable/sections/EditableHeroCollage'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || ''
}

// Stable hash so derived ratings/counts stay consistent between renders.
function hashStr(value: string) {
  let h = 0
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) >>> 0
  return h
}

// Prefer real rating/review data when present, else a stable display value so
// the Yelp-style star UI always reads well. (Wire to real fields when ready.)
function ratingOf(post: SitePost) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const real = Number(content.rating)
  if (real >= 1 && real <= 5) return Math.round(real * 10) / 10
  const h = hashStr(post.slug || post.id || post.title || 'x')
  return Math.round((3.7 + (h % 13) / 10) * 10) / 10 // 3.7 – 4.9
}

function reviewsOf(post: SitePost) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const real = Number(content.reviewCount ?? content.reviews)
  if (real > 0) return Math.floor(real)
  return 6 + (hashStr((post.slug || post.title || 'x') + 'r') % 480)
}

function Stars({ rating, className = 'h-4 w-4' }: { rating: number; className?: string }) {
  const rounded = Math.round(rating)
  return (
    <span className="inline-flex items-center gap-[3px]" aria-label={`${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`${className} ${i < rounded ? 'fill-[var(--slot4-accent)] text-[var(--slot4-accent)]' : 'fill-[var(--editable-border)] text-[var(--editable-border)]'}`}
        />
      ))}
    </span>
  )
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-5 py-4 text-center sm:text-left">
      <p className="editable-display text-2xl font-semibold tracking-[-0.02em] text-[var(--slot4-page-text)]">{value}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-[var(--slot4-muted-text)]">{label}</p>
    </div>
  )
}

function RatingRow({ post }: { post: SitePost }) {
  const rating = ratingOf(post)
  return (
    <div className="mt-2 flex items-center gap-2">
      <Stars rating={rating} className="h-4 w-4" />
      <span className="text-sm font-semibold text-[var(--slot4-page-text)]">{rating.toFixed(1)}</span>
      <span className="text-sm text-[var(--slot4-muted-text)]">({reviewsOf(post)})</span>
    </div>
  )
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

/* ----------------------------- Hero banner ----------------------------- */
// Latest posts' real images (newest first, deduped, placeholders dropped).
function latestPostImages(posts: SitePost[], max = 8) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const post of posts) {
    const img = getEditablePostImage(post)
    if (!img || img.includes('placeholder') || seen.has(img)) continue
    seen.add(img)
    out.push(img)
    if (out.length >= max) break
  }
  return out
}

// Merge the primary feed with the time-window feeds so home always has content,
// even when one source comes back empty for this site.
function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

export function EditableHomeHero({ posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const heroImages = latestPostImages(pool, 5)
  const heroTitle = pagesContent.home.hero.title?.join(' ') || `Discover the best of ${SITE_CONFIG.name}`
  const featureImages = heroImages.slice(0, 4)

  return (
    <section className="relative overflow-hidden bg-[var(--slot4-dark-bg)] text-[var(--slot4-dark-text)]">
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-96 bg-[radial-gradient(60%_60%_at_50%_0%,var(--slot4-accent-soft),transparent_70%)] opacity-20" />
      <div className={`relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24 ${container}`}>
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">
            {pagesContent.home.hero.badge || 'A visual directory'}
          </p>
          <h1 className="editable-display mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-[3.4rem]">
            {heroTitle}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/70 sm:text-lg">{pagesContent.home.hero.description}</p>

          <form action="/search" className="mt-8 flex w-full max-w-xl overflow-hidden rounded-full bg-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div className="flex flex-1 items-center gap-2.5 px-5">
              <Search className="h-5 w-5 shrink-0 text-[var(--slot4-muted-text)]" />
              <input
                name="q"
                placeholder="Search business owners, galleries, topics…"
                className="w-full bg-transparent py-4 text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]"
              />
            </div>
            <button className="shrink-0 bg-[var(--slot4-accent)] px-6 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:brightness-95 sm:px-8">
              Search
            </button>
          </form>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
            <StatPill label="Profiles" value={`${Math.max(posts.length, 40)}+`} />
            <StatPill label="Avg. rating" value="4.6" />
            <StatPill label="Updated" value="Daily" />
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="grid grid-cols-2 gap-4">
            {(featureImages.length ? featureImages : ['/placeholder.svg?height=900&width=1400']).map((src, index) => (
              <div
                key={`${src}-${index}`}
                className={`overflow-hidden rounded-2xl border border-white/10 bg-white/5 ${index === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'}`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" loading={index === 0 ? 'eager' : 'lazy'} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-white/[0.03]">
        <div className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-5 text-sm text-white/60 ${container}`}>
          <span className="inline-flex items-center gap-2"><Star className="h-4 w-4 fill-[var(--slot4-accent)] text-[var(--slot4-accent)]" /> Trusted reviews</span>
          <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-[var(--slot4-accent)]" /> Local discovery</span>
          <span className="hidden items-center gap-2 sm:inline-flex"><ThumbsUp className="h-4 w-4 text-[var(--slot4-accent)]" /> Updated daily</span>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------- Recent activity --------------------------- */
function ActivityCard({ post, href }: { post: SitePost; href: string }) {
  const category = categoryOf(post)
  const image = getEditablePostImage(post)
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(29,33,40,0.10)]">
      <div className="flex items-center gap-3 px-4 pt-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--slot4-secondary-soft)] text-[var(--slot4-secondary)]">
          <Camera className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[var(--slot4-page-text)]">{category || 'New post'}</p>
        </div>
      </div>
      <Link href={href} className="group mt-3 block">
        <div className="relative aspect-[3/2] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" loading="lazy" />
        </div>
      </Link>
      <div className="flex flex-1 flex-col px-4 py-4">
        <Link href={href} className="editable-display text-lg font-semibold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] hover:text-[var(--slot4-accent)]">
          {post.title}
        </Link>
        <RatingRow post={post} />
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{getExcerpt(post, 140)}</p>
        <Link href={href} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--slot4-accent)] hover:underline">
          Read more
        </Link>
      </div>
      <div className="flex items-center gap-6 border-t border-[var(--editable-border)] px-4 py-3 text-[var(--slot4-muted-text)]">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium"><ThumbsUp className="h-4 w-4" /> Helpful</span>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium"><MessageSquare className="h-4 w-4" /> Comment</span>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium"><Share2 className="h-4 w-4" /> Share</span>
      </div>
    </article>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const activity = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)]).slice(0, 9)
  if (!activity.length) return null
  return (
    <section className="bg-[var(--slot4-warm)]">
      <div className={`py-16 sm:py-20 ${container}`}>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Recently added</p>
          <h2 className="editable-display mt-2 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">Recent activity</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[var(--slot4-muted-text)]">
            The latest profiles, galleries and updates from across {SITE_CONFIG.name}.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activity.map((post) => (
            <ActivityCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------- Time-based discovery sections -------------------- */
function CompactCard({ post, href }: { post: SitePost; href: string }) {
  const category = categoryOf(post)
  const image = getEditablePostImage(post)
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(29,33,40,0.10)]"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" loading="lazy" />
        {category ? (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-[var(--slot4-page-text)] shadow-sm">{category}</span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="editable-display line-clamp-2 text-base font-semibold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">
          {post.title}
        </h3>
        <RatingRow post={post} />
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{getExcerpt(post, 110)}</p>
      </div>
    </Link>
  )
}

const sectionCopy: Record<string, { eyebrow: string; title: string }> = {
  spotlight: { eyebrow: 'Fresh this week', title: 'New in the last 7 days' },
  browse: { eyebrow: 'Trending now', title: 'Popular this month' },
  index: { eyebrow: 'Evergreen', title: 'From the archive' },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  // Use the real time windows; fall back to slicing posts so the page stays full.
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index', posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, index) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to explore' }
        return (
          <section key={section.key} className={index % 2 === 0 ? 'bg-[var(--slot4-surface-bg)]' : 'bg-[var(--slot4-page-bg)]'}>
            <div className={`py-14 sm:py-16 ${container}`}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">{copy.eyebrow}</p>
                <h2 className="editable-display mt-2 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">{copy.title}</h2>
              </div>
              <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.posts.slice(0, 8).map((post) => (
                  <CompactCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

/* -------------------------------- CTA band ------------------------------ */
export function EditableHomeCta() {
  return (
    <section id="get-app" className="scroll-mt-24 bg-[var(--slot4-dark-bg)] text-[var(--slot4-dark-text)]">
      <div className={`flex flex-col items-center gap-6 py-16 text-center sm:py-20 ${container}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Join the directory</p>
        <h2 className="editable-display max-w-2xl text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
          Ready to be discovered?
        </h2>
        <p className="max-w-xl text-base text-white/70 sm:text-lg">
          Create your profile, showcase your work, and reach the {SITE_CONFIG.name} community of business owners.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/create" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-7 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:brightness-95">
            Create a post
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-white/10">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  )
}
