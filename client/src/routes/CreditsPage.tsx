import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';

interface AssetCredit {
  assetName: string;
  title: string;
  author: string;
  authorUrl?: string;
  sourceUrl: string;
  sourceName: string;
  licenceName: string;
  licenceUrl: string;
  modifications: string;
  usageLocation: string;
}

const ASSET_CREDITS: AssetCredit[] = [
  {
    assetName: 'hero-1.webp',
    title: 'AfriHub Collaboration Banner',
    author: 'Generated in Google Stitch for this project',
    sourceUrl: '#',
    sourceName: 'Google Stitch',
    licenceName: 'Generated in Google Stitch for this project',
    licenceUrl: '#',
    modifications: 'Cropped and converted to WebP',
    usageLocation: 'Hero section banners, About page, and Hackathon showcase cards.',
  },
  {
    assetName: 'hero-2.webp',
    title: 'Arewa Hackathon 17',
    author: 'JosefAnthony',
    authorUrl: 'https://commons.wikimedia.org/wiki/User:JosefAnthony',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Arewa_Hackathon17.jpg',
    sourceName: 'Wikimedia Commons',
    licenceName: 'Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)',
    licenceUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    modifications: 'cropped and converted to WebP',
    usageLocation: 'Hero rotation, Hackathon showcase cards, and event banners.',
  },
  {
    assetName: 'hero-3.webp',
    title: 'Wiki Mentor Africa Tamale Hackathon 2025 14',
    author: 'Ruky Wunpini',
    authorUrl: 'https://commons.wikimedia.org/wiki/User:Ruky_Wunpini',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Wiki_Mentor_Africa_Tamale_Hackathon_2025_14.jpg',
    sourceName: 'Wikimedia Commons',
    licenceName: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
    licenceUrl: 'https://creativecommons.org/licenses/by/4.0/',
    modifications: 'cropped and converted to WebP',
    usageLocation: 'Hero rotation, Summit event cards, and community workshops.',
  },
  {
    assetName: 'hero-4.webp',
    title: 'Wikimentor Africa Hackathon 2024 at Rebase',
    author: 'Kongnyu Roger',
    authorUrl: 'https://commons.wikimedia.org/w/index.php?title=User:Kongnyu_Roger',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Wikimentor_Africa_Hackathon_2024_at_Rebase.jpg',
    sourceName: 'Wikimedia Commons',
    licenceName: 'Creative Commons CC0 1.0 Universal Public Domain Dedication (CC0)',
    licenceUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    modifications: 'cropped and converted to WebP',
    usageLocation: 'Hero rotation and workshop showcase cards.',
  },
  {
    assetName: 'africa-map.svg',
    title: 'BlankMap-Africa.svg',
    author: 'Lokal_Profil',
    authorUrl: 'https://commons.wikimedia.org/wiki/User:Lokal_Profil',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:BlankMap-Africa.svg',
    sourceName: 'Wikimedia Commons',
    licenceName: 'Public Domain (Worldwide Dedication)',
    licenceUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    modifications: 'adapted into 2D SVG map with regional coordinates',
    usageLocation: 'Impact Section continental node visualizer and About map.',
  },
];

export const CreditsPage: React.FC = () => {
  return (
    <PageWrapper>
      {/* Per-page SEO & Meta tags */}
      <title>Asset & Photo Credits | AfriHub Tech Community</title>
      <meta
        name="description"
        content="Legal attribution, source links, and open license terms for photography and map assets utilized across the AfriHub website."
      />
      <meta property="og:title" content="Asset & Photo Credits | AfriHub Tech Community" />
      <meta
        property="og:description"
        content="Attributions and licensing details for photography and map assets on AfriHub."
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Back button */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#835500] hover:text-[#1C1B1B] mb-8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#835500] rounded p-1"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Back to Home</span>
            </Link>

            <span className="text-xs uppercase tracking-[0.18em] font-bold font-sans text-[#835500] mb-3 inline-block">
              OPEN SOURCE ATTRIBUTIONS
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1B1B] tracking-tight mb-4">
              Asset & Photo Credits
            </h1>

            <p className="font-sans text-sm sm:text-base text-[#524534] leading-relaxed mb-12 max-w-2xl">
              AfriHub is dedicated to open collaboration and proper licensing. In accordance with
              Creative Commons licences and open attribution guidelines, this page documents the authors,
              licences, and source repositories for imagery and map assets featured on this site.
            </p>

            <div className="space-y-6">
              {ASSET_CREDITS.map((item) => (
                <Card key={item.assetName} className="p-6 sm:p-8 border-[#D7C3AE]/40 hoverLift">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#D7C3AE]/25">
                    <div>
                      <span className="inline-block text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#F0EDEC] text-[#524534] mb-2">
                        {item.assetName}
                      </span>
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1B1B]">
                        {item.title}
                      </h2>
                    </div>

                    {item.sourceUrl !== '#' && (
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#835500] hover:underline shrink-0"
                      >
                        <span>View Source</span>
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>

                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 text-xs sm:text-sm">
                    <div>
                      <dt className="text-[#857462] uppercase tracking-wider text-[11px] font-bold mb-1">
                        Author / Photographer
                      </dt>
                      <dd className="font-medium text-[#1C1B1B]">
                        {item.authorUrl ? (
                          <a
                            href={item.authorUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline text-[#835500]"
                          >
                            {item.author}
                          </a>
                        ) : (
                          item.author
                        )}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-[#857462] uppercase tracking-wider text-[11px] font-bold mb-1">
                        Source Repository
                      </dt>
                      <dd className="font-medium text-[#1C1B1B]">{item.sourceName}</dd>
                    </div>

                    <div>
                      <dt className="text-[#857462] uppercase tracking-wider text-[11px] font-bold mb-1">
                        Licence
                      </dt>
                      <dd className="font-medium text-[#1C1B1B]">
                        {item.licenceUrl !== '#' ? (
                          <a
                            href={item.licenceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline text-[#835500]"
                          >
                            {item.licenceName}
                          </a>
                        ) : (
                          item.licenceName
                        )}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-[#857462] uppercase tracking-wider text-[11px] font-bold mb-1">
                        Modifications Made
                      </dt>
                      <dd className="text-[#524534]">{item.modifications}</dd>
                    </div>

                    <div className="sm:col-span-2">
                      <dt className="text-[#857462] uppercase tracking-wider text-[11px] font-bold mb-1">
                        Usage on AfriHub
                      </dt>
                      <dd className="text-[#524534]">{item.usageLocation}</dd>
                    </div>
                  </dl>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </PageWrapper>
  );
};

export default CreditsPage;
