'use client';

import { useEffect, useState } from 'react';
import { Search, ShoppingBag, Leaf, Menu, X } from 'lucide-react';
import { useCart } from '@/components/ProductModal';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Beauty', href: '#beauty' },
  { label: 'Health', href: '#health' },
  { label: 'Men', href: '#men' },
  { label: 'Store', href: '#store' },
  { label: 'Contact', href: '#footer' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          transition: 'background 400ms, border-bottom 400ms',
          background: scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
          height: '56px',
        }}
      >
        <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between px-4 sm:px-5 md:px-6">
          <a href="#home" className="flex items-center gap-1.5 sm:gap-2 group shrink-0">
            <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A6741] transition-transform duration-300 group-hover:rotate-12" />
            <span className="font-logo text-[15px] sm:text-[17px] md:text-[19px] font-semibold text-[#4A6741] whitespace-nowrap">
              Green Elixir
            </span>
          </a>

          <div className="hidden md:flex items-center gap-5 lg:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-[12px] lg:text-[13px] font-medium tracking-[0.02em] text-[#1E1E1E] hover:text-[#4A6741] transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-[#4A6741] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button className="hover:text-[#4A6741] transition-all duration-300 hidden sm:flex hover:scale-110 active:scale-95 min-h-[44px] min-w-[44px] items-center justify-center">
              <Search className="w-[18px] h-[18px]" />
            </button>
            <button className="hover:text-[#4A6741] transition-all duration-300 relative hover:scale-110 active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center">
              <ShoppingBag className="w-[18px] h-[18px]" />
              <span className="absolute top-2 right-2 w-4 h-4 bg-[#4A6741] text-white text-[9px] font-semibold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </button>
            <a
              href="#shop"
              className="hidden sm:inline-flex items-center text-[11px] sm:text-[12px] font-medium text-white bg-[#4A6741] rounded-md px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-[#3d5635] transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 min-h-[36px]"
            >
              Shop Now
            </a>
            <button
              className="md:hidden flex items-center justify-center min-h-[44px] min-w-[44px] hover:bg-gray-100 rounded-md transition-colors duration-200"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-300"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className="absolute top-[56px] left-0 right-0 bg-white shadow-xl transition-all duration-300 max-h-[calc(100dvh-56px)] overflow-y-auto"
          style={{
            transform: mobileOpen ? 'translateY(0)' : 'translateY(-10px)',
          }}
        >
          <div className="px-5 py-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center py-3.5 text-[14px] font-medium text-[#1E1E1E] hover:text-[#4A6741] border-b border-gray-100 transition-colors duration-200 active:bg-gray-50 min-h-[48px]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#shop"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center mt-4 w-full text-[13px] font-medium text-white bg-[#4A6741] rounded-lg py-3 hover:bg-[#3d5635] transition-all duration-300 min-h-[48px]"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
