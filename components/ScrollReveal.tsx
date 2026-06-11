'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeUp' | 'fadeIn' | 'zoomIn' | 'slideLeft' | 'slideRight' | 'textReveal';
  delay?: number;
  duration?: number;
  stagger?: number;
  start?: string;
}

export function ScrollReveal({
  children,
  className = '',
  animation = 'fadeUp',
  delay = 0,
  duration = 0.8,
  stagger = 0,
  start = 'top 85%',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const from: gsap.TweenVars = {
      opacity: 0,
    };
    const to: gsap.TweenVars = {
      opacity: 1,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    };

    switch (animation) {
      case 'fadeUp':
        from.y = 60;
        to.y = 0;
        break;
      case 'fadeIn':
        break;
      case 'zoomIn':
        from.scale = 0.85;
        to.scale = 1;
        break;
      case 'slideLeft':
        from.x = -80;
        to.x = 0;
        break;
      case 'slideRight':
        from.x = 80;
        to.x = 0;
        break;
      case 'textReveal':
        from.y = 40;
        from.clipPath = 'inset(100% 0 0 0)';
        to.y = 0;
        to.clipPath = 'inset(0% 0 0 0)';
        break;
    }

    const children = el.children;
    if (stagger > 0 && children.length > 1) {
      gsap.fromTo(children, from, { ...to, stagger });
    } else {
      gsap.fromTo(el, from, to);
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [animation, delay, duration, stagger, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function ScrollParallax({
  children,
  className = '',
  y = -50,
  start = 'top bottom',
  end = 'bottom top',
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  start?: string;
  end?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: 0 },
      {
        y,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: 0.5,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [y, start, end]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
