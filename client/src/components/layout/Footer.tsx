import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Container } from './Container';
import { Button } from '../ui/Button';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#1C1B1B] text-white pt-16 pb-12 border-t border-[#262626]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand & Mission (cols 1-2) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5 w-fit" aria-label="AfriHub Homepage">
              <div className="w-9 h-9 rounded-full bg-[#F5A623] flex items-center justify-center text-[#1C1B1B] font-serif font-bold text-lg">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl leading-tight text-white tracking-tight">
                  AfriHub
                </span>
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#F5A623] font-bold font-sans">
                  Tech Community
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#F3F0EF]/75 leading-relaxed max-w-sm">
              AfriHub is a pan-African tech community uniting builders, developers, and tech talent across
              all 54 African nations through high-stakes hackathons, scholarships, and career pathways.
            </p>

            {/* Placeholder Contact Details from AGENTS.md Section 8 */}
            <div className="flex flex-col gap-2.5 mt-2 text-xs text-[#F3F0EF]/80">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F5A623] shrink-0" aria-hidden="true" />
                <a
                  href="mailto:hello@afrihub.example"
                  className="hover:text-white transition-colors"
                >
                  hello@afrihub.example
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F5A623] shrink-0" aria-hidden="true" />
                <a href="tel:+2340000000000" className="hover:text-white transition-colors">
                  +234 000 000 0000
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#F5A623] shrink-0" aria-hidden="true" />
                <span>Abuja, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-[0.16em] text-[#F5A623] font-bold">
              Explore
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#F3F0EF]/75">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About AfriHub
                </Link>
              </li>
              <li>
                <Link to="/what-we-do" className="hover:text-white transition-colors">
                  What We Do
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-white transition-colors">
                  Events & Hackathons
                </Link>
              </li>
            </ul>
          </div>

          {/* Engage */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-[0.16em] text-[#F5A623] font-bold">
              Community
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#F3F0EF]/75">
              <li>
                <Link to="/join" className="hover:text-white transition-colors">
                  Join the Community
                </Link>
              </li>
              <li>
                <Link to="/partners" className="hover:text-white transition-colors">
                  Partners & Investors
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box (visual only for now) */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-[0.16em] text-[#F5A623] font-bold">
              Stay Connected
            </h4>
            <p className="text-xs text-[#F3F0EF]/75 leading-relaxed">
              Receive updates on upcoming hackathons, regional scholarships, and opportunities.
            </p>

            {isSubscribed ? (
              <div className="p-3 rounded-xl bg-[#86F8C6]/15 border border-[#86F8C6]/30 flex items-center gap-2 text-xs text-[#86F8C6]">
                <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Thank you for staying connected with AfriHub.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2 mt-1">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    aria-label="Your email address for the newsletter"
                    className="w-full rounded-full bg-white/10 border border-white/20 px-3.5 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                  />
                </div>
                <Button
                  type="submit"
                  variant="secondary"
                  size="sm"
                  className="w-full justify-center text-xs py-2"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal/Credits & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F3F0EF]/60">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1">
            <p>© {new Date().getFullYear()} AfriHub Community. All rights reserved.</p>
            <span aria-hidden="true">•</span>
            <Link to="/credits" className="hover:text-white underline underline-offset-2 transition-colors">
              Photo credits
            </Link>
          </div>

          {/* Social placeholders with accessible aria-labels */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="AfriHub on Twitter / X"
              className="hover:text-white transition-colors p-1"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="AfriHub on GitHub"
              className="hover:text-white transition-colors p-1"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </a>
            <a
              href="#"
              aria-label="AfriHub on LinkedIn"
              className="hover:text-white transition-colors p-1"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="AfriHub on YouTube"
              className="hover:text-white transition-colors p-1"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
