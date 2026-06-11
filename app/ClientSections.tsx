'use client';

import { useLenis } from '@/hooks/useLenis';
import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import BrandStatement from '@/sections/BrandStatement';
import Categories from '@/sections/Categories';
import BeautyEssentials from '@/sections/BeautyEssentials';
import HealthHacks from '@/sections/HealthHacks';
import MenVitality from '@/sections/MenVitality';
import PromoBanner from '@/sections/PromoBanner';
import Testimonials from '@/sections/Testimonials';
import VisitStore from '@/sections/VisitStore';
import InstagramSection from '@/sections/InstagramSection';
import Newsletter from '@/sections/Newsletter';
import Footer from '@/sections/Footer';

export default function ClientSections() {
  useLenis();

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <Navbar />
      <Hero />
      <BrandStatement />
      <Categories />
      <BeautyEssentials />
      <HealthHacks />
      <MenVitality />
      <PromoBanner />
      <Testimonials />
      <VisitStore />
      <InstagramSection />
      <Newsletter />
      <Footer />
    </div>
  );
}
