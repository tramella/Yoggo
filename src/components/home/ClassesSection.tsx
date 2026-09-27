"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { scrollToTarget } from "@/lib/gsap-utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const ClassesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
        gsap.from(".class-card", {
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
    <section id="classes" ref={containerRef} className="w-[88%] max-w-7xl mx-auto my-20">
      {/* Exact Section Header */}
      <SectionHeader
        title="CLASSES"
        linkText="View pricing"
        onLinkClick={() => scrollToTarget("#schedule")}
      />

      {/* Grid Layout matching original */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[280px_280px] gap-4">
        {/* Card 1: Individual (Row 1, Col 1) */}
        <div className="class-card bg-black text-white rounded-3xl p-6 flex flex-col items-center justify-center min-h-[240px] lg:min-h-0 lg:col-start-1 lg:row-start-1">
          <h3 className="text-xl md:text-2xl font-bold tracking-wider">INDIVIDUAL</h3>
          <p className="text-xs md:text-sm text-neutral-300 mt-2 font-medium">from $69 / month</p>
        </div>

        {/* Card 2: ImgClass1 (Row 1, Col 2-3, wide 2 cols) */}
        <div className="class-card relative rounded-3xl overflow-hidden min-h-[240px] lg:min-h-0 lg:col-start-2 lg:col-span-2 lg:row-start-1">
          <Image
            src="/images/5729bf05948c04e15a5811679fd90a80.jpg"
            alt="Yoga Practice"
            fill
            className="object-cover rounded-3xl"
          />
        </div>

        {/* Card 3: Online (Row 1, Col 4) */}
        <div className="class-card bg-black text-white rounded-3xl p-6 flex flex-col items-center justify-center min-h-[240px] lg:min-h-0 lg:col-start-4 lg:row-start-1">
          <h3 className="text-xl md:text-2xl font-bold tracking-wider">ONLINE</h3>
          <p className="text-xs md:text-sm text-neutral-300 mt-2 font-medium">from $19 / month</p>
        </div>

        {/* Card 4: Info Box with stars (Row 2, Col 1) */}
        <div className="class-card border border-black rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-2.5 min-h-[240px] lg:min-h-0 lg:col-start-1 lg:row-start-2">
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

        {/* Card 5: Group (Row 2, Col 2) */}
        <div className="class-card bg-black text-white rounded-3xl p-6 flex flex-col items-center justify-center min-h-[240px] lg:min-h-0 lg:col-start-2 lg:row-start-2">
          <h3 className="text-xl md:text-2xl font-bold tracking-wider">GROUP</h3>
          <p className="text-xs md:text-sm text-neutral-300 mt-2 font-medium">from $49 / month</p>
        </div>

        {/* Card 6: ImgClass2 (Row 2, Col 3-4, wide 2 cols) */}
        <div className="class-card relative rounded-3xl overflow-hidden min-h-[240px] lg:min-h-0 lg:col-start-3 lg:col-span-2 lg:row-start-2">
          <Image
            src="/images/pexels-john-tekeridis-21837-14843543.jpg"
            alt="Group yoga"
            fill
            className="object-cover rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
};
