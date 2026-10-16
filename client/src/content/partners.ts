export interface PartnerItem {
  id: string;
  name: string;
  role: string;
  logo: string;
}

import savannaCapital from '../assets/partners/savanna-capital.svg';
import kigaliTech from '../assets/partners/kigali-tech-ventures.svg';
import atlasInnovation from '../assets/partners/atlas-innovation.svg';
import zambeziCloud from '../assets/partners/zambezi-cloud.svg';
import saharaAcademy from '../assets/partners/sahara-academy.svg';
import bantuGuild from '../assets/partners/bantu-guild.svg';

/**
 * Fictional partner organizations supporting AfriHub hackathons and scholarships.
 * Strict project rule: no real company logos or brands.
 */
export const PARTNERS: PartnerItem[] = [
  {
    id: 'savanna-capital',
    name: 'Savanna Capital',
    role: 'Venture & Seed Funding',
    logo: savannaCapital,
  },
  {
    id: 'kigali-tech-ventures',
    name: 'Kigali Tech Ventures',
    role: 'Continental Accelerator',
    logo: kigaliTech,
  },
  {
    id: 'atlas-innovation',
    name: 'Atlas Innovation Lab',
    role: 'Systems & AI Research',
    logo: atlasInnovation,
  },
  {
    id: 'zambezi-cloud',
    name: 'Zambezi Cloud Systems',
    role: 'Cloud Infrastructure',
    logo: zambeziCloud,
  },
  {
    id: 'sahara-academy',
    name: 'Sahara Open Academy',
    role: 'Open Source Curriculum',
    logo: saharaAcademy,
  },
  {
    id: 'bantu-guild',
    name: 'Bantu Engineering Guild',
    role: 'Engineering Fellowship',
    logo: bantuGuild,
  },
];
