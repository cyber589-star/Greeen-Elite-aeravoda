'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    name: 'Herbal Supplements',
    image: '/images/category-herbal-supplements.jpg',
    link: '#shop',
  },
  {
    name: 'Skincare',
    image: '/images/category-skincare.jpg',
    link: '#shop',
  },
  {
    name: 'Hair Care',
    image: '/images/category-hair-care.jpg',
    link: '#shop',
  },
  {
    name: 'Wellness Essentials',
    image: '/images/category-wellness.jpg',
    link: '#shop',
  },
];

export default function Categories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cat-header',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );

      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F5F0E8] py-16 sm:py-20 md:py-[80px]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-10 sm:mb-12 cat-header">
          <span className="text-label block mb-3">SHOP BY CATEGORY</span>
          <h2 className="text-[clamp(26px,4vw,40px)] font-semibold tracking-[-0.01em] text-[#1E1E1E]">
            Curated Collections
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, i) => (
            <div
              key={cat.name}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="group cursor-pointer opacity-0"
            >
              <div
                className="relative overflow-hidden rounded-xl transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1"
                style={{ aspectRatio: '4/5' }}
              >
                <div className="absolute inset-0" style={{ height: '70%' }}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 bg-white px-4 sm:px-5 py-4 sm:py-5 flex flex-col justify-center transition-colors duration-300 group-hover:bg-[#F5F0E8]"
                  style={{ height: '30%' }}
                >
                  <h3 className="text-[15px] sm:text-[18px] font-medium text-[#1E1E1E] mb-1 sm:mb-2">
                    {cat.name}
                  </h3>
                  <a
                    href={cat.link}
                    className="text-[12px] sm:text-[13px] font-medium text-[#4A6741] uppercase tracking-[0.05em] hover:underline underline-offset-4 transition-colors duration-300"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
