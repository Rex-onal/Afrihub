export interface TeamMember {
  id: string;
  name: string;
  role: string;
  location: string;
  bio: string;
  initials: string;
}

/**
 * Fictional leadership and engineering council for AfriHub.
 * Strict project rule: all names, roles, and profiles are fictional.
 * Zero em dashes in copy.
 */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'amina-diallo',
    name: 'Dr. Amina Diallo',
    role: 'Executive Director & Co-Founder',
    location: 'Dakar, Senegal',
    bio: 'Distributed systems researcher with over a decade of experience scaling developer ecosystems and digital policy across West Africa.',
    initials: 'AD',
  },
  {
    id: 'kwesi-mensah',
    name: 'Kwesi Mensah',
    role: 'Head of Developer Ecosystems',
    location: 'Accra, Ghana',
    bio: 'Former principal cloud architect leading hackathon design, technical mentorship tracks, and regional community hub activations.',
    initials: 'KM',
  },
  {
    id: 'chidinma-eze',
    name: 'Chidinma Eze',
    role: 'Director of Talent & Scholarships',
    location: 'Lagos, Nigeria',
    bio: 'Specialist in workforce enablement and higher education pathways, overseeing scholarship grants and technical credential tracks.',
    initials: 'CE',
  },
  {
    id: 'samuel-kamau',
    name: 'Samuel Kamau',
    role: 'Chief Technology Officer',
    location: 'Nairobi, Kenya',
    bio: 'Open source advocate and high-throughput backend engineer driving AfriHub technical challenges and developer tooling infrastructure.',
    initials: 'SK',
  },
  {
    id: 'nadia-mansour',
    name: 'Nadia Mansour',
    role: 'Director of Strategic Partnerships',
    location: 'Cairo, Egypt',
    bio: 'Venture operator connecting multinational technology enterprises, development institutions, and capital allocators to AfriHub cohorts.',
    initials: 'NM',
  },
  {
    id: 'thabo-molefe',
    name: 'Thabo Molefe',
    role: 'Head of Regional Operations',
    location: 'Johannesburg, South Africa',
    bio: 'Community builder coordinating localized physical hubs, hackathon logistics, and university builder chapters across Southern Africa.',
    initials: 'TM',
  },
];
