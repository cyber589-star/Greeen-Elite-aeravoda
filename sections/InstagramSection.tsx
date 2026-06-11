'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const instagramPosts = [
  { image: '/images/instagram-1.jpg', likes: 2341, comments: 89 },
  { image: '/images/instagram-2.jpg', likes: 1876, comments: 64 },
  { image: '/images/instagram-3.jpg', likes: 3102, comments: 112 },
  { image: '/images/instagram-4.jpg', likes: 1567, comments: 45 },
];

export default function InstagramSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);

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
        { y: 50, opacity: 0, scale: 0.9 },
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
      className="w-full py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div ref={headerRef} className="text-center mb-10 sm:mb-12 opacity-0">
          <a
            href="https://www.instagram.com/greenelixirayurveda/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mb-3 group"
          >
            <Instagram className="w-5 h-5 text-[#C5A55A] transition-transform duration-300 group-hover:scale-110" />
            <span className="text-label">@greenelixirayurveda</span>
          </a>
          <h2 className="text-[clamp(26px,4vw,42px)] font-semibold tracking-[-0.01em] text-[#1E1E1E] mb-3">
            Follow Us on Instagram
          </h2>
          <p className="text-[14px] sm:text-[16px] text-[#6B6B6B] max-w-md mx-auto">
            Join our community of 50K+ wellness enthusiasts.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {instagramPosts.map((post, i) => (
            <a
              key={i}
              href="https://www.instagram.com/greenelixirayurveda/"
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="group relative aspect-square rounded-xl overflow-hidden opacity-0"
            >
              <img
                src={post.image}
                alt={`Instagram post ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                <div className="flex items-center gap-4 sm:gap-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
                    <span className="text-[12px] sm:text-[14px] font-medium text-white">{post.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
                    <span className="text-[12px] sm:text-[14px] font-medium text-white">{post.comments}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://www.instagram.com/greenelixirayurveda/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] sm:text-[14px] font-medium rounded-lg px-6 sm:px-7 py-3 sm:py-3.5 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #4A6741, #5a7d4f)',
              color: 'white',
              boxShadow: '0 8px 30px rgba(74,103,65,0.3)',
            }}
          >
            <Instagram className="w-4 h-4" />
            Follow @greenelixirayurveda
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
