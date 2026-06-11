'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const shopLinks = [
  'All Products',
  'Herbal Supplements',
  'Skincare',
  'Hair Care',
  'Wellness Essentials',
  'Gift Cards',
];

const companyLinks = [
  'Our Story',
  'Ingredients',
  'Sustainability',
  'Blog',
  'Careers',
  'Press',
];

const supportLinks = [
  'Contact Us',
  'FAQs',
  'Shipping & Returns',
  'Track Order',
  'Privacy Policy',
  'Terms of Service',
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        columnsRef.current.filter(Boolean),
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="w-full pt-12 sm:pt-16 pb-6 sm:pb-8"
      style={{ backgroundColor: '#1E1E1E' }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          <div
            ref={(el) => { if (el) columnsRef.current[0] = el; }}
            className="col-span-2 sm:col-span-2 lg:col-span-1 opacity-0"
          >
            <a href="#home" className="flex items-center gap-2 mb-4 group">
              <Leaf className="w-5 h-5 text-[#8FB573] transition-transform duration-300 group-hover:rotate-12" />
              <span className="font-logo text-[18px] font-semibold text-white">
                Green Elixir
              </span>
            </a>
            <p className="text-[13px] sm:text-[14px] font-normal text-[#888] mb-5 sm:mb-6 leading-relaxed">
              Ancient wisdom for modern wellness. Authentic Ayurvedic products crafted with pure herbal ingredients.
            </p>

            <div className="space-y-3 mb-5 sm:mb-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#C5A55A] flex-shrink-0" />
                <span className="text-[12px] sm:text-[13px] text-[#888]">Sonipat, Haryana, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C5A55A] flex-shrink-0" />
                <span className="text-[12px] sm:text-[13px] text-[#888]">+91-9729814404</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C5A55A] flex-shrink-0" />
                <span className="text-[12px] sm:text-[13px] text-[#888]">hello@greenelixirayurveda.com</span>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/greenelixirayurveda/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-white/15"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <Instagram className="w-4 h-4 text-[#888] hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.facebook.com/people/GREEN-Elixir-Ayurveda/61552779224965/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-white/15"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <Facebook className="w-4 h-4 text-[#888] hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          <div
            ref={(el) => { if (el) columnsRef.current[1] = el; }}
            className="opacity-0"
          >
            <h4 className="text-[12px] sm:text-[13px] font-semibold text-white uppercase tracking-wider mb-4 sm:mb-5">
              Shop
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {shopLinks.map((link) => (
                <li key={link}>
                  <a href="#shop" className="text-[13px] sm:text-[14px] font-normal text-[#888] hover:text-white transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div
            ref={(el) => { if (el) columnsRef.current[2] = el; }}
            className="opacity-0"
          >
            <h4 className="text-[12px] sm:text-[13px] font-semibold text-white uppercase tracking-wider mb-4 sm:mb-5">
              Company
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a href="#about" className="text-[13px] sm:text-[14px] font-normal text-[#888] hover:text-white transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div
            ref={(el) => { if (el) columnsRef.current[3] = el; }}
            className="opacity-0"
          >
            <h4 className="text-[12px] sm:text-[13px] font-semibold text-white uppercase tracking-wider mb-4 sm:mb-5">
              Support
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {supportLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-[13px] sm:text-[14px] font-normal text-[#888] hover:text-white transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-[11px] sm:text-[12px] font-normal text-[#666]">
            &copy; {new Date().getFullYear()} Green Elixir Ayurveda. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {['Visa', 'Mastercard', 'Amex', 'UPI'].map((method) => (
              <span
                key={method}
                className="text-[10px] sm:text-[11px] font-medium text-[#666] uppercase tracking-wider px-2 sm:px-3 py-1 sm:py-1.5 rounded"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
