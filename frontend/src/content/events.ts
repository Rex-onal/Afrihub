export interface EventItem {
  id: string;
  title: string;
  category: 'Hackathon' | 'Summit' | 'Bootcamp' | 'Workshop';
  categoryColor: string;
  dateBadge: string;
  dateDetail: string;
  location: string;
  locationType: 'Hybrid' | 'In-Person' | 'Virtual Hub';
  capacityOrStatus: string;
  capacityLabel: string;
  description: string;
  image: string;
  imageAlt: string;
  ctaText: 'Learn More' | 'Get in Touch';
  ctaHref: '/join' | '/contact';
  isFeatured?: boolean;
}

export interface PastEventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  participants: string;
  outcome: string;
}

import hero1 from '../assets/hero/hero-1.webp';
import hero2 from '../assets/hero/hero-2.webp';
import hero3 from '../assets/hero/hero-3.webp';
import hero4 from '../assets/hero/hero-4.webp';

/**
 * Fictional upcoming AfriHub technical events.
 * Strict project rule: all dates are after October 2026.
 * Action buttons strictly link to /join or /contact only (showcase-only, no RSVP/registration/ticketing).
 */
export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: 'lagos-hackathon-2026',
    title: 'AfriHub Continental Hackathon 2026',
    category: 'Hackathon',
    categoryColor: 'bg-on-surface/80 text-white',
    dateBadge: 'NOV 14-16, 2026',
    dateDetail: 'Date',
    location: 'Lagos, NG',
    locationType: 'Hybrid',
    capacityOrStatus: '45 Seats Left',
    capacityLabel: 'Capacity',
    description:
      '48-hour prototype challenge uniting software engineers, cloud architects, and venture builders solving digital payment rails across West Africa.',
    image: hero2,
    imageAlt: 'African tech developers collaborating and reviewing code on a laptop screen at a hackathon',
    ctaText: 'Learn More',
    ctaHref: '/join',
    isFeatured: true,
  },
  {
    id: 'nairobi-women-in-tech-2026',
    title: 'Women in Tech Leadership Summit Nairobi',
    category: 'Summit',
    categoryColor: 'bg-[#006C4C]/90 text-white',
    dateBadge: 'DEC 05, 2026',
    dateDetail: 'Date',
    location: 'Nairobi, KE',
    locationType: 'In-Person',
    capacityOrStatus: 'Member Access',
    capacityLabel: 'Access',
    description:
      'Celebrating pan-African women leading breakthrough initiatives in ML, climate tech startups, and high-performance backend systems.',
    image: hero3,
    imageAlt: 'Young African tech builders collaborating with laptops in an innovation workshop room',
    ctaText: 'Learn More',
    ctaHref: '/join',
  },
  {
    id: 'accra-ai-bootcamp-2027',
    title: 'AI Builders Bootcamp Accra',
    category: 'Bootcamp',
    categoryColor: 'bg-[#006492]/90 text-white',
    dateBadge: 'JAN 22-24, 2027',
    dateDetail: 'Date',
    location: 'Accra, GH',
    locationType: 'Virtual Hub',
    capacityOrStatus: 'Open Now',
    capacityLabel: 'Status',
    description:
      'Deep-dive practical labs fine-tuning open source foundational language models for African indigenous languages and agricultural forecasting.',
    image: hero1,
    imageAlt: 'Young African tech builders collaborating around laptops in an innovation hub with architecture diagrams',
    ctaText: 'Learn More',
    ctaHref: '/join',
  },
  {
    id: 'kigali-distributed-systems-2027',
    title: 'Distributed Systems & Cloud Architecture Workshop',
    category: 'Workshop',
    categoryColor: 'bg-[#835500]/90 text-white',
    dateBadge: 'FEB 12-14, 2027',
    dateDetail: 'Date',
    location: 'Kigali, RW',
    locationType: 'Hybrid',
    capacityOrStatus: 'Open Access',
    capacityLabel: 'Format',
    description:
      'Hands-on architecture intensive on building resilient, offline-first distributed platforms across pan-African mobile bandwidth constraints.',
    image: hero4,
    imageAlt: 'African software engineers working on laptops at a tech workshop',
    ctaText: 'Learn More',
    ctaHref: '/join',
  },
  {
    id: 'cairo-open-source-sprint-2027',
    title: 'Cairo Open Source AI Sprint',
    category: 'Hackathon',
    categoryColor: 'bg-on-surface/80 text-white',
    dateBadge: 'MAR 08-10, 2027',
    dateDetail: 'Date',
    location: 'Cairo, EG',
    locationType: 'Hybrid',
    capacityOrStatus: 'Community Access',
    capacityLabel: 'Format',
    description:
      'Sprint focused on building open data pipelines and Arabic-language NLP datasets for healthcare and public research applications.',
    image: hero2,
    imageAlt: 'Developers coding and discussing architectural solutions',
    ctaText: 'Get in Touch',
    ctaHref: '/contact',
  },
  {
    id: 'joburg-fintech-summit-2027',
    title: 'Southern Africa Cross-Border Fintech Summit',
    category: 'Summit',
    categoryColor: 'bg-[#006C4C]/90 text-white',
    dateBadge: 'APR 16-18, 2027',
    dateDetail: 'Date',
    location: 'Johannesburg, ZA',
    locationType: 'In-Person',
    capacityOrStatus: 'Community Access',
    capacityLabel: 'Format',
    description:
      'Convening central bank sandbox pioneers, cryptography specialists, and settlement engineers to rethink cross-border remittance efficiency.',
    image: hero3,
    imageAlt: 'African tech leaders and engineers in a conference auditorium',
    ctaText: 'Learn More',
    ctaHref: '/join',
  },
];

/**
 * Fictional past events archive showcasing community impact and historical tracks.
 */
export const PAST_EVENTS: PastEventItem[] = [
  {
    id: 'past-lagos-hackathon-2026',
    title: 'Pan-African Web3 & Infrastructure Sprint',
    category: 'Hackathon',
    date: 'August 2026',
    location: 'Lagos, Nigeria',
    participants: '420 participants',
    outcome: '18 open-source decentralized finance prototypes shipped',
  },
  {
    id: 'past-nairobi-ai-summit-2026',
    title: 'East Africa Foundation Models Symposium',
    category: 'Summit',
    date: 'June 2026',
    location: 'Nairobi, Kenya',
    participants: '350 participants',
    outcome: '4 research papers accepted into global ML workshops',
  },
  {
    id: 'past-kigali-cloud-camp-2026',
    title: 'Great Lakes Cloud Native Bootcamp',
    category: 'Bootcamp',
    date: 'March 2026',
    location: 'Kigali, Rwanda',
    participants: '280 participants',
    outcome: '92% completed cloud architecture certifications',
  },
  {
    id: 'past-accra-dev-fest-2025',
    title: 'West Africa Developer Festival 2025',
    category: 'Summit',
    date: 'November 2025',
    location: 'Accra, Ghana',
    participants: '600 participants',
    outcome: '50+ mentor-student pairings established across 8 countries',
  },
];
