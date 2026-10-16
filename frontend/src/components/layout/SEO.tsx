import { useEffect } from 'react';
import { SITE_CONFIG } from '../../lib/config';

export interface SEOProps {
  title: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noindex?: boolean;
}

export function SEO({
  title,
  description = SITE_CONFIG.defaultDescription,
  path = '',
  ogImage = SITE_CONFIG.defaultOgImage,
  noindex = false,
}: SEOProps) {
  const fullTitle = title.includes(SITE_CONFIG.name)
    ? title
    : `${title} ${SITE_CONFIG.titleSuffix}`;

  const canonicalUrl = `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${path ? (path.startsWith('/') ? path : `/${path}`) : ''}`;
  const fullOgImage = ogImage.startsWith('http')
    ? ogImage
    : `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;

  useEffect(() => {
    document.title = fullTitle;

    // Helper to set or create meta tag
    const setMeta = (attr: 'name' | 'property', key: string, value: string) => {
      let meta = document.querySelector(`meta[${attr}="${key}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, key);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', value);
    };

    setMeta('name', 'description', description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', SITE_CONFIG.name);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', fullOgImage);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', fullOgImage);

    if (noindex) {
      setMeta('name', 'robots', 'noindex, nofollow');
    } else {
      const robots = document.querySelector('meta[name="robots"]');
      if (robots) {
        robots.setAttribute('content', 'index, follow');
      }
    }

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
  }, [fullTitle, description, canonicalUrl, fullOgImage, noindex]);

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_CONFIG.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={fullOgImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
    </>
  );
}
