export interface ProgrammeItem {
  id: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  iconName: 'calendar' | 'code' | 'graduation-cap' | 'briefcase';
  accentColor: string;
  hoverBg: string;
}

export const PROGRAMMES: ProgrammeItem[] = [
  {
    id: 'events',
    title: 'Tech Events',
    description:
      'Pan-African conferences, community meetups, and founder fireside chats designed to inspire, connect, and expand technical networks.',
    linkText: 'Explore events',
    linkHref: '/events',
    iconName: 'calendar',
    accentColor: '#835500',
    hoverBg: 'group-hover:bg-[#F5A623]/20 group-hover:text-[#835500]',
  },
  {
    id: 'hackathons',
    title: 'Hackathons & Challenges',
    description:
      'High-stakes 48-hour sprints solving pressing continental challenges in fintech, healthtech, and climate with real cash prizes.',
    linkText: 'Join challenges',
    linkHref: '/what-we-do#hackathons',
    iconName: 'code',
    accentColor: '#E8572A',
    hoverBg: 'group-hover:bg-[#E8572A]/10 group-hover:text-[#E8572A]',
  },
  {
    id: 'scholarships',
    title: 'Scholarships',
    description:
      'Full and partial funding for cloud certifications, technical bootcamps, and global university degree completion tracks.',
    linkText: 'Apply now',
    linkHref: '/what-we-do#scholarships',
    iconName: 'graduation-cap',
    accentColor: '#006C4C',
    hoverBg: 'group-hover:bg-[#006C4C]/10 group-hover:text-[#006C4C]',
  },
  {
    id: 'careers',
    title: 'Career Opportunities',
    description:
      'Direct member pipelines connecting top-tier African engineering talent to high-growth global tech startups and engineering teams.',
    linkText: 'Find pathways',
    linkHref: '/join',
    iconName: 'briefcase',
    accentColor: '#006492',
    hoverBg: 'group-hover:bg-[#006492]/10 group-hover:text-[#006492]',
  },
];

export interface ProgrammeDetail {
  id: string;
  title: string;
  eyebrow: string;
  tagline: string;
  description: string;
  stats: { label: string; value: string }[];
  highlights: string[];
  accentColor: string;
  badgeBg: string;
}

export const DETAILED_PROGRAMMES: ProgrammeDetail[] = [
  {
    id: 'hackathons',
    title: 'Hackathons & Challenges',
    eyebrow: 'CONTINENTAL PROTOTYPING',
    tagline: 'High-stakes 48-hour sprints solving pressing African challenges.',
    description:
      'Our sprint challenges bring together software architects, ML engineers, and product designers to build production-grade prototypes. We provide compute credits, cloud infrastructure, and access to venture mentors.',
    stats: [
      { label: 'Prototypes Shipped', value: '180+' },
      { label: 'Venture Backing Rate', value: '34%' },
      { label: 'Cash & Cloud Grants', value: '$450k+' },
    ],
    highlights: [
      'Real-world problem briefs co-designed with pan-African fintechs and health systems',
      'Jury panels comprising engineering directors and early-stage capital allocators',
      'Pre-seed mentorship and compute stipends for winning cohorts',
    ],
    accentColor: '#E8572A',
    badgeBg: 'bg-[#E8572A]/15 text-[#E8572A]',
  },
  {
    id: 'scholarships',
    title: 'Funded Scholarships & Certifications',
    eyebrow: 'CAPACITY BUILDING',
    tagline: 'Full and partial funding for industry-recognized cloud and AI credentials.',
    description:
      'We remove economic hurdles by funding examination vouchers, cloud training licenses, and technical degree completion tracks for verified members across 54 nations.',
    stats: [
      { label: 'Scholarships Awarded', value: '$2.5M+' },
      { label: 'Certification Pass Rate', value: '94%' },
      { label: 'Participating Nations', value: '54' },
    ],
    highlights: [
      'Official AWS, Google Cloud, and Kubernetes certification exam vouchers',
      'Intensive 12-week study cohorts led by certified technical mentors',
      'Hardware stipends and internet connectivity support for rural developers',
    ],
    accentColor: '#006C4C',
    badgeBg: 'bg-[#006C4C]/15 text-[#006C4C]',
  },
  {
    id: 'events',
    title: 'Technical Events & Summits',
    eyebrow: 'KNOWLEDGE EXCHANGE',
    tagline: 'Pan-African conferences, engineering meetups, and founder fireside sessions.',
    description:
      'From major regional summits in Nairobi, Lagos, and Cairo to monthly local meetups, our events showcase frontier technology and connect builders directly with global innovators.',
    stats: [
      { label: 'Events Hosted', value: '40+' },
      { label: 'Physical Attendees', value: '8,500+' },
      { label: 'Virtual Stream Reach', value: '25,000+' },
    ],
    highlights: [
      'In-depth architectural teardowns of high-scale African technology platforms',
      'Hands-on masterclasses covering distributed systems, compilers, and ML safety',
      'Equal access virtual streams with community-run watch parties in 12 cities',
    ],
    accentColor: '#835500',
    badgeBg: 'bg-[#F5A623]/15 text-[#835500]',
  },
  {
    id: 'career-network',
    title: 'Career & Internship Network',
    eyebrow: 'MEMBER BENEFIT',
    tagline: 'Direct engineering introductions and technical portfolio reviews.',
    description:
      'AfriHub members gain access to exclusive portfolio review clinics, interview preparation circles, and direct referrals to engineering teams expanding across Africa and internationally.',
    stats: [
      { label: 'Placement Rate', value: '98%' },
      { label: 'Median Salary Uplift', value: '2.8x' },
      { label: 'Global Hiring Partners', value: '60+' },
    ],
    highlights: [
      '1-on-1 resume and GitHub portfolio audits from staff-level engineers',
      'System design mock interviews and live algorithmic problem-solving clinics',
      'Exclusive member referral pipelines to vetted remote and hybrid technology companies',
    ],
    accentColor: '#006492',
    badgeBg: 'bg-[#006492]/15 text-[#006492]',
  },
];
