'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

const slides = [
  {
    image: '/images/ChatGPT Image Jun 10, 2026, 03_01_19 PM.png',
    heading: 'Nature\'s Healing Touch',
    subheading: 'Discover ancient Ayurvedic wisdom, crafted for your modern wellness journey.',
    cta: { label: 'Explore Products', href: '#beauty' },
  },
  {
    image: '/images/promo-summer-wellness.jpg',
    heading: 'Summer Wellness Collection',
    subheading: 'Up to 30% off select herbal supplements and skincare essentials.',
    cta: { label: 'Shop the Sale', href: '#shop' },
  },
  {
    image: '/images/product-immunity-kadha.jpg',
    heading: 'Boost Your Immunity',
    subheading: 'Traditional tulsi-ginger-cinnamon blend for daily immune support.',
    cta: { label: 'Shop Now', href: '#health' },
  },
];

const INTERVAL = 4000;
const TRANSITION_DURATION = 1.2;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const animatingRef = useRef(false);
  const touchStartRef = useRef<number | null>(null);

  const goTo = useCallback((next: number) => {
    if (animatingRef.current) return;
    if (next === current) return;
    animatingRef.current = true;

    const track = trackRef.current;
    if (!track) return;

    const w = containerRef.current?.offsetWidth || window.innerWidth;
    const textOut = textRefs.current[current];
    const textIn = textRefs.current[next];

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(track, { x: 0 });
        animatingRef.current = false;
        setCurrent(next);
      },
    });

    gsap.set(track, { x: 0 });
    tl.to(track, { x: -w, duration: TRANSITION_DURATION, ease: 'power3.inOut' });

    if (textOut) {
      tl.to(textOut, { opacity: 0, y: -20, duration: 0.35, ease: 'power2.in' }, 0);
    }
    if (textIn) {
      gsap.set(textIn, { opacity: 0, y: 30 });
      tl.to(textIn, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, TRANSITION_DURATION * 0.4);
    }
  }, [current]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, INTERVAL);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [current, goTo]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goTo((current + 1) % slides.length);
      } else {
        goTo((current - 1 + slides.length) % slides.length);
      }
    }
    touchStartRef.current = null;
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full h-[100dvh] overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a3a1a 0%, #2D4A2D 40%, #1a3a1a 100%)' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={trackRef}
        className="absolute inset-0 flex will-change-transform"
        style={{ width: `${slides.length * 100}%` }}
      >
        {slides.map((s, i) => (
          <div
            key={i}
            className="relative h-[100dvh] flex-shrink-0"
            style={{ width: `${100 / slides.length}%` }}
          >
            <img
              src={s.image}
              alt={s.heading}
              className="absolute inset-0 w-full h-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
              draggable={false}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(26,58,26,0.7) 0%, rgba(45,74,45,0.5) 50%, rgba(26,58,26,0.7) 100%)' }} />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(26,58,26,0.3) 0%, rgba(26,58,26,0.15) 40%, rgba(26,58,26,0.6) 100%)' }} />
      </div>

      <div className="absolute inset-0 z-20 flex flex-col justify-center safe-area-top">
        {slides.map((s, i) => (
          <div
            key={i}
            ref={(el) => { textRefs.current[i] = el; }}
            className="absolute inset-0 flex flex-col justify-center px-5 pt-16 pb-20 sm:px-8 sm:pt-20 sm:pb-24 md:px-12 lg:px-20"
            style={{
              opacity: i === current ? 1 : 0,
              pointerEvents: i === current ? 'auto' : 'none',
            }}
          >
            <div className="max-w-[600px]">
              <span
                className="inline-block text-[9px] sm:text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.15em] sm:tracking-[0.25em] mb-2 sm:mb-3 md:mb-4"
                style={{ fontFamily: "'Orbitron', sans-serif", color: 'rgba(255,255,255,0.6)' }}
              >
                Green Elixir Ayurveda
              </span>
              <h1
                className="text-white mb-2 sm:mb-3 md:mb-4 leading-[1.08]"
                style={{
                  fontFamily: "'Flamenco', serif",
                  fontSize: 'clamp(26px, 8vw, 72px)',
                  fontWeight: 400,
                }}
              >
                {s.heading}
              </h1>
              <p
                className="text-white/65 mb-4 sm:mb-5 md:mb-7 max-w-md leading-relaxed"
                style={{
                  fontFamily: "'Big Shoulders Display', sans-serif",
                  fontSize: 'clamp(13px, 3.5vw, 19px)',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                }}
              >
                {s.subheading}
              </p>
              <a
                href={s.cta.href}
                className="inline-block text-white rounded-lg px-5 sm:px-7 md:px-9 py-2.5 sm:py-3 md:py-3.5 transition-all duration-300 active:scale-95 pointer-events-auto min-h-[44px] flex items-center"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 'clamp(11px, 2.5vw, 14px)',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  background: 'linear-gradient(135deg, #4A6741 0%, #5a7d4f 100%)',
                  boxShadow: '0 8px 30px rgba(74,103,65,0.4)',
                }}
              >
                {s.cta.label}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2 sm:gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative h-[3px] sm:h-[4px] rounded-full overflow-hidden transition-all duration-500 min-w-[20px] min-h-[20px] flex items-center justify-center"
            style={{ padding: 0 }}
            aria-label={`Go to slide ${i + 1}`}
          >
            <div
              className="rounded-full transition-all duration-500"
              style={{
                width: i === current ? '36px' : '18px',
                height: '3px',
                background: i === current ? 'white' : 'rgba(255,255,255,0.3)',
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
