import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from './Container';
import { cn } from '../../lib/utils';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'What We Do', href: '/what-we-do' },
  { label: 'Events', href: '/events' },
  { label: 'Partners', href: '/partners' },
  { label: 'Contact', href: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Monitor scroll for navbar elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setIsMobileMenuOpen(false);
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle ESC key to close drawer & focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isMobileMenuOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        toggleButtonRef.current?.focus();
        return;
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Focus drawer close button when opened
  useEffect(() => {
    if (isMobileMenuOpen) {
      const closeButton = drawerRef.current?.querySelector<HTMLButtonElement>('button');
      closeButton?.focus();
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled
          ? 'bg-[#FCF9F8]/92 backdrop-blur-md shadow-[0_4px_20px_rgba(28,27,27,0.06)] py-3.5'
          : 'bg-transparent py-5'
      )}
    >
      <Container>
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#835500] rounded-lg p-1"
            aria-label="AfriHub Homepage"
          >
            <div className="w-9 h-9 rounded-full bg-[#1C1B1B] flex items-center justify-center text-[#F5A623] font-serif font-bold text-lg shadow-sm">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg leading-tight tracking-tight text-[#1C1B1B]">
                AfriHub
              </span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#835500] font-bold font-sans">
                Tech Community
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (>= 1024px) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === '/'}
                className={({ isActive }) =>
                  cn(
                    'relative px-3.5 py-2 text-sm font-medium rounded-full transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#835500]',
                    isActive
                      ? 'text-[#1C1B1B] font-semibold bg-[#F0EDEC]/80'
                      : 'text-[#524534] hover:text-[#1C1B1B] hover:bg-[#F0EDEC]/50'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    {isActive && (
                      <span
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#F5A623]"
                        aria-hidden="true"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              as="link"
              to="/join"
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Join AfriHub
            </Button>
          </div>

          {/* Mobile Hamburger Toggle (< 1024px) */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              as="link"
              to="/join"
              variant="primary"
              size="sm"
              className="text-xs px-3 py-1.5"
            >
              Join
            </Button>
            <button
              ref={toggleButtonRef}
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="p-2 rounded-xl text-[#1C1B1B] hover:bg-[#F0EDEC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#835500] cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Accessible Mobile Drawer (< 1024px) */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 top-0 z-50 lg:hidden"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-over Drawer Panel */}
          <div
            ref={drawerRef}
            className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-[#FCF9F8] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto"
          >
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-6 border-b border-[#D7C3AE]/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#1C1B1B] flex items-center justify-center text-[#F5A623] font-serif font-bold text-base">
                    A
                  </div>
                  <span className="font-serif font-bold text-base text-[#1C1B1B]">AfriHub</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close drawer"
                  className="p-1.5 rounded-lg text-[#1C1B1B] hover:bg-[#F0EDEC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#835500] cursor-pointer"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Navigation Links inside drawer */}
              <nav className="flex flex-col gap-1 py-6" aria-label="Mobile navigation links">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    end={item.href === '/'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center justify-between select-none',
                        isActive
                          ? 'bg-[#1C1B1B] text-white font-semibold'
                          : 'text-[#1C1B1B] hover:bg-[#F0EDEC]'
                      )
                    }
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-50" aria-hidden="true" />
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Bottom Actions inside drawer */}
            <div className="pt-6 border-t border-[#D7C3AE]/40 flex flex-col gap-3">
              <Button
                as="link"
                to="/join"
                variant="secondary"
                size="md"
                className="w-full justify-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Join the Community
              </Button>
              <p className="text-[11px] text-[#524534] text-center">
                Uniting Africa&apos;s Next Generation of Tech Leaders
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
