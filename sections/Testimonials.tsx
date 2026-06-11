'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "I've been using their Ashwagandha supplement for three months now and my energy levels have completely transformed. This is the real deal.",
    name: 'Priya Sharma',
    location: 'Mumbai, India',
    rating: 5,
  },
  {
    quote: "The Kumkumadi serum is absolutely magical. My skin has never looked this radiant. I love that it's all-natural with no harsh chemicals.",
    name: 'Ananya Patel',
    location: 'Bangalore, India',
    rating: 5,
  },
  {
    quote: "Finally found hair oil that actually works. My hair fall reduced significantly within weeks. Highly recommend their Amla Hair Oil!",
    name: 'Rohan Gupta',
    location: 'Delhi, India',
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );

      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
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
      <div className="max-w-[1000px] mx-auto px-6">
        <div ref={headerRef} className="text-center mb-10 sm:mb-12 opacity-0">
          <span className="text-label block mb-3">TESTIMONIALS</span>
          <h2 className="text-[clamp(26px,4vw,40px)] font-semibold tracking-[-0.01em] text-[#1E1E1E]">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="bg-white rounded-2xl p-6 sm:p-8 opacity-0 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
              style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#C5A55A] text-[#C5A55A]" />
                ))}
              </div>

              <p className="text-[15px] sm:text-[16px] italic text-[#1E1E1E] mb-6 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div>
                <p className="text-[14px] font-semibold text-[#1E1E1E]">{t.name}</p>
                <p className="text-[13px] font-normal text-[#6B6B6B]">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
