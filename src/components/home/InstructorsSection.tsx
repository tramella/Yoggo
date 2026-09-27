"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { scrollToTarget } from "@/lib/gsap-utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const InstructorsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
        gsap.from(".instructor-card", {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section id="instructors" ref={containerRef} className="w-[88%] max-w-7xl mx-auto my-20">
      {/* Exact Section Header */}
      <SectionHeader
        title="INSTRUCTORS"
        linkText="All Instructors"
        onLinkClick={() => scrollToTarget("#schedule")}
      />

      {/* Mosaic Grid Layout matching original design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[280px_280px] gap-4">
        {/* Item 1 (Row 1, Col 1) */}
        <div className="instructor-card group relative rounded-3xl overflow-hidden min-h-[260px] lg:min-h-0 lg:col-start-1 lg:row-start-1 shadow-md hover:shadow-xl transition-shadow duration-300">
          <Image
            src="/images/pexels-polina-tankilevitch-6739057.webp"
            alt="Instructor"
            fill
            className="object-cover rounded-3xl enhanced-img group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Item 2: ImgIns1 (Row 1, Col 2-3, wide 2 cols) */}
        <div className="instructor-card relative rounded-3xl overflow-hidden min-h-[260px] lg:min-h-0 lg:col-start-2 lg:col-span-2 lg:row-start-1 group shadow-md hover:shadow-xl transition-shadow duration-300">
          <Image
            src="/images/pexels-elly-fairytale-3822194.webp"
            alt="Agata Kowalsa"
            fill
            className="object-cover rounded-3xl enhanced-img group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/25 flex items-start">
            <div className="w-full bg-black text-white text-sm sm:text-base font-semibold py-3 px-5 rounded-t-3xl flex items-center justify-center space-x-2.5">
              <span>AGATA KOWALSA</span>
              <Image src="/images/Full Stop.png" alt="•" width={14} height={14} className="inline-block" />
              <span>HATHA</span>
            </div>
          </div>
        </div>

        {/* Item 3: ImgIns3 (Col 4, Row 1-2, tall spanning both rows) */}
        <div className="instructor-card group relative rounded-3xl overflow-hidden min-h-[300px] lg:min-h-0 lg:col-start-4 lg:row-start-1 lg:row-span-2 shadow-md hover:shadow-xl transition-shadow duration-300">
          <Image
            src="/images/pexels-cottonbro-4323296.webp"
            alt="Instructor Portrait"
            fill
            className="object-cover rounded-3xl enhanced-img group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Item 4: ImgIns2 (Row 2, Col 1-2, wide 2 cols) */}
        <div className="instructor-card relative rounded-3xl overflow-hidden min-h-[260px] lg:min-h-0 lg:col-start-1 lg:col-span-2 lg:row-start-2 group shadow-md hover:shadow-xl transition-shadow duration-300">
          <Image
            src="/images/pexels-cottonbro-4324059.webp"
            alt="Katarzyna Petrakova"
            fill
            className="object-cover rounded-3xl enhanced-img group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/25 flex items-start">
            <div className="w-full bg-black text-white text-sm sm:text-base font-semibold py-3 px-5 rounded-t-3xl flex items-center justify-center space-x-2.5">
              <span>KATARZYNA PETRAKOVA</span>
              <Image src="/images/Full Stop.png" alt="•" width={14} height={14} className="inline-block" />
              <span>VINYASA</span>
            </div>
          </div>
        </div>

        {/* Item 5: EachClass1 (Row 2, Col 3, info box with stars) */}
        <div className="instructor-card border border-black rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-2.5 min-h-[260px] lg:min-h-0 lg:col-start-3 lg:row-start-2">
          <p className="text-xs sm:text-sm font-semibold text-neutral-800">
            Carefully selected classes for groups and individuals.
          </p>
          <Image src="/images/star (1).png" alt="*" width={14} height={14} />
          <p className="text-xs sm:text-sm font-semibold text-neutral-800">
            Online classes with a program from the market&apos;s top instructors.
          </p>
          <Image src="/images/star (1).png" alt="*" width={14} height={14} />
          <p className="text-xs sm:text-sm font-semibold text-neutral-800">
            Promotions &amp; discounts for our regular customers.
          </p>
        </div>
      </div>
    </section>
  );
};
