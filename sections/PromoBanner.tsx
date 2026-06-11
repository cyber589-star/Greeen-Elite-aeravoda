'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PromoBanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { x: -80, opacity: 0, scale: 1.05 },
        {
          x: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
        }
      );

      gsap.fromTo(
        textRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, delay: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full"
    >
      <div className="flex h-auto min-h-[300px] sm:min-h-[350px] md:h-[400px] flex-col md:flex-row">
        <div
          ref={imageRef}
          className="w-full md:w-1/2 h-[200px] sm:h-[250px] md:h-full opacity-0 overflow-hidden"
        >
          <img
            src="/images/promo-summer-wellness.jpg"
            alt="Summer wellness collection"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
        </div>

        <div
          ref={textRef}
          className="w-full md:w-1/2 h-auto md:h-full flex flex-col items-center justify-center px-6 sm:px-8 md:px-16 py-10 sm:py-12 md:py-0 opacity-0"
          style={{ backgroundColor: '#2D4A2D' }}
        >
          <span className="text-label block mb-3 sm:mb-4" style={{ color: '#C5A55A' }}>
            LIMITED TIME
          </span>
          <h3
            className="font-display text-[clamp(24px,4vw,48px)] font-medium text-white mb-3 sm:mb-4 text-center"
            style={{ lineHeight: 1.2 }}
          >
            Summer Wellness Collection
          </h3>
          <p className="text-[14px] sm:text-[16px] font-normal text-white/75 mb-6 sm:mb-8 text-center max-w-md">
            Up to 30% off select herbal supplements and skincare essentials.
          </p>
          <a
            href="#shop"
            className="inline-block text-[13px] sm:text-[14px] font-medium rounded-lg px-6 sm:px-7 py-2.5 sm:py-3 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-xl"
            style={{
              border: '1px solid #C5A55A',
              color: '#C5A55A',
            }}
          >
            Shop the Sale
          </a>
        </div>
      </div>
    </section>
  );
}
