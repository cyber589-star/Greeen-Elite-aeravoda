'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, Star, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const healthProducts = [
  {
    name: 'Swarna Bhasma',
    subtitle: 'Sharv Ayurveda',
    price: 2499,
    originalPrice: 2999,
    rating: 4.9,
    image: '/images/product-swarna-bhasma.png',
    badge: 'Premium',
    description: 'Ancient gold ash formulation with 51 herbs.',
  },
  {
    name: 'Immunity Kadha',
    subtitle: 'Herbal Wellness',
    price: 349,
    originalPrice: 449,
    rating: 4.7,
    image: '/images/product-immunity-kadha.jpg',
    badge: null,
    description: 'Traditional tulsi-ginger-cinnamon immune blend.',
  },
  {
    name: 'Triphala Churna',
    subtitle: 'Digestive Care',
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    image: '/images/product-triphala.jpg',
    badge: 'Popular',
    description: 'Ancient digestive wellness formula.',
  },
  {
    name: 'Joint Relief Oil',
    subtitle: 'Pain Care',
    price: 549,
    originalPrice: 699,
    rating: 4.6,
    image: '/images/product-joint-oil.jpg',
    badge: null,
    description: 'Eucalyptus & camphor therapeutic blend.',
  },
  {
    name: 'Chyawanprash',
    subtitle: 'Immunity Boost',
    price: 549,
    originalPrice: 699,
    rating: 4.8,
    image: '/images/product-chyawanprash.jpg',
    badge: 'Family Pack',
    description: 'Traditional amla-based rejuvenative.',
  },
  {
    name: 'Herbal Tea Blend',
    subtitle: 'Daily Wellness',
    price: 399,
    originalPrice: 499,
    rating: 4.5,
    image: '/images/product-tea.jpg',
    badge: null,
    description: 'Calming ginger-cardamom-green tea blend.',
  },
];

export default function HealthHacks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );

      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { y: 80, opacity: 0, scale: 0.92 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="health"
      className="w-full py-16 sm:py-20 md:py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F5F0E8 0%, #EDE8DC 100%)' }}
    >
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(197,165,90,0.2) 0%, transparent 70%)', filter: 'blur(50px)' }}
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div ref={headerRef} className="text-center sm:text-left sm:flex sm:flex-row sm:items-end sm:justify-between mb-10 sm:mb-12 gap-4 opacity-0">
          <div>
            <div className="flex items-center gap-2 mb-3 justify-center sm:justify-start">
              <Heart className="w-4 h-4 text-[#4A6741]" />
              <span className="text-label">WELLNESS ESSENTIALS</span>
            </div>
            <h2 className="text-[clamp(26px,4vw,42px)] font-semibold tracking-[-0.01em] text-[#1E1E1E]">
              Health Hacks
            </h2>
            <p className="text-[15px] text-[#6B6B6B] mt-3 max-w-lg">
              Ancient remedies for immunity, digestion, and holistic health.
            </p>
          </div>
          <a
            href="#shop"
            className="text-[14px] font-medium text-[#4A6741] underline underline-offset-4 hover:no-underline self-start sm:self-auto transition-colors duration-300 hover:text-[#3d5635]"
          >
            Explore All
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          {healthProducts.map((product, i) => (
            <div
              key={product.name}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="group relative bg-white rounded-2xl overflow-hidden opacity-0 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}
            >
              {product.badge && (
                <div
                  className="absolute top-3 left-3 z-10 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider px-2 sm:px-3 py-1 rounded-full"
                  style={{
                    background: product.badge === 'Premium'
                      ? 'linear-gradient(135deg, #1E1E1E, #3a3a3a)'
                      : 'linear-gradient(135deg, #4A6741, #5a7d4f)',
                    color: 'white',
                  }}
                >
                  {product.badge}
                </div>
              )}

              <div className="relative h-40 sm:h-52 md:h-64 overflow-hidden" style={{ background: 'linear-gradient(135deg, #E8E5DC 0%, #DDD9CE 100%)' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 sm:p-5 transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              <div className="p-3 sm:p-4 md:p-5">
                <div className="flex items-center gap-1 mb-1 sm:mb-2">
                  <Star className="w-3 h-3 fill-[#C5A55A] text-[#C5A55A]" />
                  <span className="text-[11px] sm:text-[13px] font-medium text-[#1E1E1E]">{product.rating}</span>
                </div>

                <p className="text-[10px] sm:text-[11px] text-[#8FB573] font-medium uppercase tracking-wider mb-0.5 sm:mb-1">
                  {product.subtitle}
                </p>
                <h3 className="text-[13px] sm:text-[15px] md:text-[17px] font-semibold text-[#1E1E1E] mb-1 sm:mb-2 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-[11px] sm:text-[12px] md:text-[13px] text-[#6B6B6B] mb-3 sm:mb-4 line-clamp-2 hidden sm:block">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1 sm:gap-2">
                    <span className="text-[15px] sm:text-[18px] md:text-[20px] font-bold text-[#4A6741]">₹{product.price}</span>
                    <span className="text-[11px] sm:text-[13px] text-[#999] line-through">₹{product.originalPrice}</span>
                  </div>
                  <button className="flex items-center gap-1.5 text-[11px] sm:text-[12px] md:text-[13px] font-medium text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #4A6741, #5a7d4f)',
                      boxShadow: '0 4px 15px rgba(74,103,65,0.3)',
                    }}
                  >
                    <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
