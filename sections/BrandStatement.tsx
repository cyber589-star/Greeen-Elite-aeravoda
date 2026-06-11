'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.brand-label',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );
      gsap.fromTo(
        '.brand-heading',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );
      gsap.fromTo(
        '.brand-body',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );
      gsap.fromTo(
        '.brand-cta',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.35,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full bg-white py-16 sm:py-20 md:py-[80px]"
    >
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <span className="text-label block mb-4 brand-label opacity-0">
          OUR PHILOSOPHY
        </span>
        <h2 className="text-[clamp(26px,4vw,40px)] font-semibold tracking-[-0.01em] text-[#1E1E1E] mb-6 brand-heading opacity-0">
          Pure Ayurveda for Modern Life
        </h2>
        <p className="text-[15px] sm:text-[16px] font-normal leading-[1.7] text-[#6B6B6B] mb-8 brand-body opacity-0">
          We blend ancient Ayurvedic wisdom with contemporary science to create products
          that nurture your body, mind, and spirit. Every formulation is rooted in tradition
          yet refined for today&apos;s wellness needs.
        </p>
        <a
          href="#"
          className="inline-block text-[14px] font-medium text-[#4A6741] underline underline-offset-4 hover:no-underline brand-cta opacity-0 transition-colors duration-300 hover:text-[#3d5635]"
        >
          Learn Our Story
        </a>
      </div>
    </section>
  );
}
