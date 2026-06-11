'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-12 sm:py-16 md:py-[60px] opacity-0"
      style={{ backgroundColor: '#F2E6C5' }}
    >
      <div className="max-w-[600px] mx-auto px-6 text-center">
        <h3 className="text-[clamp(20px,3vw,28px)] font-semibold text-[#1E1E1E] mb-3">
          Join Our Wellness Community
        </h3>
        <p className="text-[14px] sm:text-[16px] font-normal text-[#6B6B6B] mb-6 sm:mb-8">
          Subscribe for Ayurvedic tips, exclusive offers, and new product announcements.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full sm:w-[360px] px-5 py-3 rounded-lg border border-black/15 bg-white text-[14px] text-[#1E1E1E] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#4A6741] focus:border-transparent transition-all duration-300"
          />
          <button
            type="submit"
            className="px-7 py-3 bg-[#4A6741] text-white text-[14px] font-medium rounded-lg hover:bg-[#3d5635] transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
