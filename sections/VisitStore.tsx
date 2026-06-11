'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function VisitStore() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { x: 60, opacity: 0, scale: 0.95 },
        {
          x: 0, opacity: 1, scale: 1, duration: 0.8, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="store"
      className="w-full py-16 sm:py-20 md:py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #2D4A2D 0%, #1E3A1E 100%)' }}
    >
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(197,165,90,0.4) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div ref={contentRef} className="opacity-0">
            <span className="text-[12px] font-medium uppercase tracking-[0.15em] mb-4 block" style={{ color: '#C5A55A' }}>
              Experience In Person
            </span>
            <h2 className="font-display text-[clamp(28px,4.5vw,52px)] font-medium text-white mb-5 sm:mb-6 leading-tight">
              Visit Our Store
            </h2>
            <p className="text-[14px] sm:text-[16px] text-white/65 mb-6 sm:mb-8 max-w-md leading-relaxed">
              Step into the world of authentic Ayurveda. Explore our complete range, get personalized consultations, and experience natural wellness.
            </p>

            <div className="space-y-4 mb-6 sm:mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(197,165,90,0.15)' }}>
                  <MapPin className="w-5 h-5 text-[#C5A55A]" />
                </div>
                <div>
                  <p className="text-[14px] font-medium text-white mb-1">Store Address</p>
                  <p className="text-[13px] sm:text-[14px] text-white/55 leading-relaxed">
                    VK Tower, 1st Floor, Pragati Nagar, Near Chhotu Ram Chowk, Gohana Road, Sonipat, Haryana
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(197,165,90,0.15)' }}>
                  <Phone className="w-5 h-5 text-[#C5A55A]" />
                </div>
                <div>
                  <p className="text-[14px] font-medium text-white mb-1">Contact</p>
                  <p className="text-[13px] sm:text-[14px] text-white/55">+91-9729814404</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(197,165,90,0.15)' }}>
                  <Clock className="w-5 h-5 text-[#C5A55A]" />
                </div>
                <div>
                  <p className="text-[14px] font-medium text-white mb-1">Opening Hours</p>
                  <p className="text-[13px] sm:text-[14px] text-white/55">Mon - Sat: 10:00 AM - 8:00 PM</p>
                  <p className="text-[13px] sm:text-[14px] text-white/55">Sunday: 11:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            <a
              href="https://maps.app.goo.gl/H1H3GFJQjbMR29rP7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[13px] sm:text-[14px] font-medium rounded-lg px-6 sm:px-7 py-3 sm:py-3.5 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #C5A55A, #D4B76A)',
                color: '#1E1E1E',
                boxShadow: '0 8px 30px rgba(197,165,90,0.3)',
              }}
            >
              <ExternalLink className="w-4 h-4" />
              Get Directions on Google Maps
            </a>
          </div>

          <div ref={imageRef} className="opacity-0">
            <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.4)' }}>
              <img
                src="/images/store-exterior.jpg"
                alt="Green Elixir Ayurveda Store"
                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                style={{ aspectRatio: '16/10' }}
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(45,74,45,0.6) 100%)' }}
              />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
                <div
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}
                >
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[12px] sm:text-[13px] font-medium text-white">Open Now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
