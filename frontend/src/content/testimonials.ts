export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  initials: string;
  avatarBg?: string;
}

/**
 * Fictional testimonials for AfriHub member builders and partners.
 * Zero em dashes in copy.
 */
export const MEMBER_TESTIMONIALS: Testimonial[] = [
  {
    id: 'eunice-oladipo',
    quote:
      'Through the AfriHub cloud scholarship, I completed the AWS Solutions Architect track and secured a hybrid backend role at a leading enterprise.',
    author: 'Eunice Oladipo',
    role: 'Cloud Engineer',
    location: 'Lagos, Nigeria',
    initials: 'EO',
    avatarBg: 'bg-[#F5A623]/20 text-[#835500]',
  },
  {
    id: 'emmanuel-nkurunziza',
    quote:
      'AfriHub 48-hour sprint challenge in Kigali helped our team build an open healthcare data API that eventually won our first angel pre-seed grant.',
    author: 'Emmanuel Nkurunziza',
    role: 'Founder, MedPulse',
    location: 'Kigali, Rwanda',
    initials: 'EN',
    avatarBg: 'bg-[#006C4C]/20 text-[#006C4C]',
  },
  {
    id: 'zainab-kamara',
    quote:
      'The 1-on-1 mentorship with engineering directors transformed how I build scalable mobile systems. The community support is genuinely unmatched.',
    author: 'Zainab Kamara',
    role: 'Mobile Systems Developer',
    location: 'Nairobi, Kenya',
    initials: 'ZK',
    avatarBg: 'bg-[#006492]/20 text-[#006492]',
  },
];

export const HIGHLIGHT_QUOTE = {
  quote:
    'AfriHub bridged the gap between our raw passion in Nairobi and international venture engineering teams.',
  author: 'Kofi Mensah',
  role: 'Lead Backend Software Architect',
  location: 'Nairobi, Kenya',
};
