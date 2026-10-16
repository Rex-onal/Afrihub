export const SITE_CONFIG = {
  name: 'AfriHub',
  titleSuffix: '| AfriHub',
  baseUrl: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL) || 'https://afrihub.example',
  defaultOgImage: '/og-image.png',
  defaultDescription:
    "Where Africa's tech talent rises together. Hackathons, scholarships, and opportunities connecting African talent to the world.",
  contact: {
    email: 'hello@afrihub.example',
    phone: '+234 000 000 0000',
    location: 'Abuja, Nigeria',
  },
};
