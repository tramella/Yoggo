"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const SLIDES = [
  {
    id: 1,
    image: "/images/active-woman-practicing-yoga-home.jpg",
    title: "Connect your body to your soul",
    subtitle: "Harmony • Mindfulness • Balance",
  },
  {
    id: 2,
    image: "/images/pexels-cottonbro-4323292.jpg",
    title: "The studio you'll ever need",
    subtitle: "Over 20 years of experience in holistic health",
  },
  {
    id: 3,
    image: "/images/pexels-mart-production-7319706.jpg",
    title: "Find your ultimate inner peace",
    subtitle: "Daily classes for all levels and styles",
  },
];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  useEffect(() => {
    if (slideRef.current) {
      gsap.fromTo(
        slideRef.current,
        { opacity: 0.4, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    startAutoPlay();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    startAutoPlay();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    startAutoPlay();
  };

  const activeNumStr = String(currentSlide + 1).padStart(2, "0");
  const totalNumStr = String(SLIDES.length).padStart(2, "0");

  return (
    <section
      className="w-[88%] max-w-7xl mx-auto my-4 overflow-hidden rounded-3xl relative select-none group"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      <div className="relative w-full h-[380px] sm:h-[480px] md:h-[600px] lg:h-[650px] overflow-hidden rounded-3xl">
        {/* Active Slide Image */}
        <div ref={slideRef} className="relative w-full h-full">
          <Image
            src={SLIDES[currentSlide].image}
            alt={SLIDES[currentSlide].title}
            fill
            priority
            className="object-cover rounded-3xl enhanced-img"
          />
          {/* Subtle bottom gradient overlay for readability and depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/10 rounded-3xl" />
        </div>

        {/* Slide Caption Overlay (Responsive Positioning) */}
        <div className="absolute bottom-16 left-5 right-5 sm:bottom-10 sm:left-10 sm:right-auto z-10 text-white max-w-lg space-y-1.5 sm:space-y-2 pointer-events-none">
          <p className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-widest uppercase opacity-90 drop-shadow-md">
            {SLIDES[currentSlide].subtitle}
          </p>
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-tight drop-shadow-md max-w-[85%] sm:max-w-none">
            {SLIDES[currentSlide].title}
          </h1>
        </div>

        {/* Active Number Indicator & Navigation Controls (Top-right on small screens, bottom-right on desktop) */}
        <div className="absolute top-4 right-4 sm:top-auto sm:bottom-10 sm:right-10 z-20 flex items-center space-x-2 sm:space-x-3 bg-black/65 backdrop-blur-md px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-white border border-white/20 shadow-lg scale-90 sm:scale-100 origin-top-right sm:origin-bottom-right">
          {/* Prev button */}
          <button
            type="button"
            onClick={prevSlide}
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors active:scale-95"
            aria-label="Previous slide"
          >
            ‹
          </button>

          {/* Active Number Numbers Display */}
          <div className="flex items-center space-x-1 font-mono text-[11px] sm:text-sm font-semibold tracking-wider">
            <span className="text-white font-bold">{activeNumStr}</span>
            <span className="text-white/40">/</span>
            <span className="text-white/60">{totalNumStr}</span>
          </div>

          {/* Direct Slide Dots / Numbers */}
          <div className="flex items-center space-x-1.5 pl-2 border-l border-white/20">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx
                    ? "bg-white w-4 sm:w-6"
                    : "bg-white/40 hover:bg-white/70 w-2"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next button */}
          <button
            type="button"
            onClick={nextSlide}
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors active:scale-95"
            aria-label="Next slide"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};
