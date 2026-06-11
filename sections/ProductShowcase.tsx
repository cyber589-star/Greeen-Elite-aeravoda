import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: 'Ashwagandha Complex',
    description: 'Stress relief & vitality support',
    price: '₹1,299',
    image: '/images/product-herbal-supplement.jpg',
  },
  {
    name: 'Kumkumadi Face Serum',
    description: 'Radiant glow elixir',
    price: '₹1,899',
    image: '/images/product-face-serum.jpg',
  },
  {
    name: 'Amla Hair Oil',
    description: 'Nourishing scalp treatment',
    price: '₹749',
    image: '/images/product-hair-oil.jpg',
  },
  {
    name: 'Jasmine Body Oil',
    description: 'Luxurious moisturizing blend',
    price: '₹999',
    image: '/images/product-body-oil.jpg',
  },
  {
    name: 'Premium Chyawanprash',
    description: 'Immunity & energy booster',
    price: '₹649',
    image: '/images/product-chyawanprash.jpg',
  },
  {
    name: 'Herbal Face Mask',
    description: 'Deep cleansing treatment',
    price: '₹549',
    image: '/images/product-face-mask.jpg',
  },
  {
    name: 'Wellness Tea Blend',
    description: 'Calming herbal infusion',
    price: '₹449',
    image: '/images/product-tea.jpg',
  },
  {
    name: 'Healing Balm',
    description: 'Multi-purpose herbal remedy',
    price: '₹349',
    image: '/images/product-balm.jpg',
  },
];

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rowRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="shop"
      className="w-full bg-white py-20 md:py-[80px]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-label block mb-4">BESTSELLERS</span>
            <h2 className="text-[clamp(28px,4vw,40px)] font-semibold tracking-[-0.01em] text-[#1E1E1E]">
              Customer Favorites
            </h2>
          </div>
          <button
            onClick={scrollRight}
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-[#ddd] hover:border-[#4A6741] hover:text-[#4A6741] transition-colors duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div
          ref={scrollContainerRef}
          className="overflow-x-auto pb-4 scrollbar-hide"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#C5A55A transparent',
          }}
        >
          <div
            ref={rowRef}
            className="flex gap-6 opacity-0"
            style={{ width: 'max-content' }}
          >
            {products.map((product) => (
              <div
                key={product.name}
                className="group w-[280px] flex-shrink-0 bg-white rounded-xl overflow-hidden"
                style={{
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}
              >
                <div className="relative overflow-hidden" style={{ height: '65%' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-[16px] font-medium text-[#1E1E1E] mb-1">
                    {product.name}
                  </h3>
                  <p className="text-[13px] font-normal text-[#6B6B6B] mb-3">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[18px] font-semibold text-[#4A6741]">
                      {product.price}
                    </span>
                    <button className="text-[13px] font-medium text-white bg-[#C5A55A] rounded-md px-4 py-2 hover:bg-[#b3954a] transition-colors duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
