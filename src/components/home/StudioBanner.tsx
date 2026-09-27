"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface StudioBannerProps {
  image: string;
  title: React.ReactNode;
  subtitle: string;
  badges?: string[];
}

export const StudioBanner: React.FC<StudioBannerProps> = ({
  image,
  title,
  subtitle,
  badges,
}) => {
  const bannerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (typeof window !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
        gsap.from(".banner-content", {
          scrollTrigger: {
            trigger: bannerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 40,
          scale: 0.96,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    },
    { scope: bannerRef }
  );

  return (
    <section ref={bannerRef} className="w-[88%] max-w-7xl mx-auto my-16">
      <div className="banner-content relative w-full h-[450px] sm:h-[500px] md:h-[580px] rounded-3xl overflow-hidden flex items-center justify-center text-center p-6 sm:p-12 shadow-xl">
        {/* Background Image */}
        <Image
          src={image}
          alt="Studio Banner"
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55 rounded-3xl" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl space-y-4 text-white">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal leading-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-lg font-medium opacity-95">
            {subtitle}
          </p>

          {badges && badges.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              {badges.map((badge, idx) => (
                <div
                  key={idx}
                  className="bg-white text-black text-xs sm:text-sm font-bold px-4 py-2 rounded-full border-2 border-dashed border-black shadow-sm transition-transform duration-300 hover:scale-105"
                >
                  {badge}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
