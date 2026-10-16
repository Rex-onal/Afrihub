export interface StatItem {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description?: string;
  icon?: string;
}

/**
 * Single source of truth for AfriHub community metrics.
 * All counters and metric displays across the site reference this data.
 */
export const STATS = {
  nations: {
    id: 'nations',
    value: 54,
    suffix: '',
    label: 'African Nations',
    description: 'Tech builders representing all 54 African countries',
  },
  members: {
    id: 'members',
    value: 10000,
    suffix: '+',
    label: 'Community Members',
    description: 'Active software engineers, researchers, and tech founders',
  },
  scholarships: {
    id: 'scholarships',
    value: 2.5,
    prefix: '$',
    suffix: 'M+',
    label: 'Scholarships Awarded',
    description: 'Direct funding disbursed for cloud certifications and tuition',
  },
  placementRate: {
    id: 'placement',
    value: 98,
    suffix: '%',
    label: 'Placement Rate',
    description: 'Graduates placed into verified engineering roles or internships',
  },
  eventsHosted: {
    id: 'events',
    value: 40,
    suffix: '+',
    label: 'Events Hosted',
    description: 'Hackathons, bootcamps, and technical summits organized',
  },
  regionalHubs: {
    id: 'hubs',
    value: 6,
    suffix: ' Hubs',
    label: 'Regional Innovation Nodes',
    description: 'Lagos, Nairobi, Kigali, Accra, Cairo, and Johannesburg',
  },
} as const;

export const HERO_STATS = [
  { label: '54 Nations', detail: 'Continental Coverage' },
  { label: '10,000+ Builders', detail: 'Active Talent Pool' },
  { label: '$2.5M+ Funded', detail: 'Zero Tuition Barrier' },
];

export const IMPACT_STAT_CARDS: StatItem[] = [
  {
    id: 'members',
    value: 10000,
    suffix: '+',
    label: 'Community Members',
    icon: 'groups',
  },
  {
    id: 'events',
    value: 40,
    suffix: '+',
    label: 'Events Hosted',
    icon: 'celebration',
  },
  {
    id: 'scholarships',
    value: 300,
    suffix: '+',
    label: 'Scholarships Awarded',
    icon: 'workspace_premium',
  },
  {
    id: 'nations',
    value: 54,
    suffix: '',
    label: 'Countries Reached',
    icon: 'public',
  },
];
