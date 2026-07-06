import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'A visual directory of business owners and their work',
      description: 'Discover business owner profiles and image galleries in one refined, easy-to-browse directory.',
      openGraphTitle: 'A visual directory of business owners and their work',
      openGraphDescription: 'Discover business owner profiles and image galleries through a calmer, more considered browsing experience.',
      keywords: ['business directory', 'profile discovery', 'visual gallery', 'business owners'],
    },
    hero: {
      badge: 'A visual directory',
      title: ['Discover the people', 'behind the businesses.'],
      description: 'Browse profiles and galleries from business owners building something worth noticing — a calmer, more considered way to find and be found.',
      primaryCta: { label: 'Browse profiles', href: '/profile' },
      secondaryCta: { label: 'Explore galleries', href: '/image' },
      searchPlaceholder: 'Search business owners, galleries, topics…',
      focusLabel: 'Focus',
      featureCardBadge: 'latest cover rotation',
      featureCardTitle: 'Latest profiles and galleries shape the homepage.',
      featureCardDescription: 'Recent additions stay at the center of the experience without changing any core platform behavior.',
    },
    intro: {
      badge: 'About the directory',
      title: 'Built for discovering people, businesses, and the work they showcase.',
      paragraphs: [
        'This site brings together profiles and visual galleries so visitors can move naturally between the people behind a business and the work they showcase.',
        'Instead of separating identity from imagery, the platform keeps them connected in one place with consistent navigation and easier exploration.',
        'Whether someone starts with a profile or a gallery, they can keep discovering related content without friction.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'A directory-first homepage with stronger emphasis on people and imagery.',
        'Connected sections for profiles, galleries, and supporting resources.',
        'Cleaner browsing rhythm designed to make discovery feel easier.',
        'Lightweight interactions that keep the experience fast and refined.',
      ],
      primaryLink: { label: 'Browse profiles', href: '/profile' },
      secondaryLink: { label: 'See galleries', href: '/image' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Discover business owners and their galleries through one connected experience.',
      description: 'Move between profiles and galleries through one clearer and more considered visual system.',
      primaryCta: { label: 'Browse Profiles', href: '/profile' },
      secondaryCta: { label: 'Contact Us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest additions in this section.',
    },
  },
  about: {
    badge: 'Our Story',
    title: 'A refined way to discover business owners and their work.',
    description: `${slot4BrandConfig.siteName} is built to make discovering business profiles and visual galleries feel like one unified, considered experience.`,
    paragraphs: [
      'Instead of splitting identity from imagery, the platform keeps profiles and galleries easy to move through and easy to understand.',
      'Whether someone starts with a profile or a gallery, they can continue exploring without losing context.',
    ],
    values: [
      {
        title: 'Discovery-first experience',
        description: 'We prioritize clarity, pacing, and structure so people can browse and discover without noise.',
      },
      {
        title: 'Connected profiles and galleries',
        description: 'Profiles and visual content stay connected so discovery feels natural across the site.',
      },
      {
        title: 'Simple and trustworthy',
        description: 'We focus on clean navigation and clear page structure to help visitors find what they need faster.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Reach us about your profile, your listing, or anything else.',
    description: 'Tell us what you are trying to publish, update, or ask about. We will route it through the right lane instead of forcing every request into the same support bucket.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search posts, topics, categories, and content across the site.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Find stories, listings, visuals, and resources faster.',
      description: 'Use keywords, categories, and content types to discover posts from every active section of the site.',
      placeholder: 'Search by keyword, topic, category, or title',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create new content.',
      description: 'Use your account to open the publishing workspace and create posts for the active sections of this site.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create content for every active section.',
      description: 'Choose the content type, add details, and prepare a clean post with images, links, summary, and body content.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to your publishing space.',
      description: 'Login to continue browsing, managing submissions, and creating new content from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start publishing.',
      description: 'Create an account to access the publishing workspace, save details, and submit content through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'More profiles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Website',
    },
  },
} as const
