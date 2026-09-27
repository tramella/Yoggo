"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { AccordionItemData } from "@/types";
import { scrollToTarget } from "@/lib/gsap-utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface AccordionSectionProps {
  id: string;
  items: AccordionItemData[];
}

export const AccordionSection: React.FC<AccordionSectionProps> = ({ id, items }) => {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  useGSAP(
    () => {
      if (typeof window !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
        gsap.from(".accordion-row", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 25,
          stagger: 0.12,
          duration: 0.7,
          ease: "power2.out",
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section id={id} ref={sectionRef} className="w-[88%] max-w-7xl mx-auto my-20 space-y-6">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;

        return (
          <div
            key={item.id}
            className="accordion-row select-none"
          >
            {/* Header row with regular uppercase typography & bottom border line */}
            <div
              onClick={() => toggleItem(idx)}
              className="border-b-[1.5px] border-[#2e2e2e] pb-2 flex items-center justify-between cursor-pointer group"
            >
              <h2 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] font-normal text-black tracking-tight leading-none uppercase group-hover:opacity-75 transition-opacity">
                {item.title}
              </h2>

              <div className="w-10 h-10 md:w-12 md:h-12 relative flex items-center justify-center shrink-0">
                {/* Clean morphing plus/minus icon with smooth GSAP-like rotation */}
                <div
                  className={`w-9 h-9 md:w-11 md:h-11 rounded-full border border-black/80 flex items-center justify-center transition-all duration-300 ${
                    isOpen ? "bg-black text-white rotate-180" : "bg-transparent text-black hover:bg-black/5"
                  }`}
                >
                  <span className="text-xl md:text-2xl font-light leading-none -mt-0.5">
                    {isOpen ? "−" : "+"}
                  </span>
                </div>
              </div>
            </div>

            {/* Expandable Content Body with smooth grid and slide reveal */}
            <div
              className={`grid transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden relative z-[2] ${
                isOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0"
              }`}
            >
              <div className="overflow-hidden md:pl-[45%] space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-[#2e2e2e]">
                  {item.heading}
                </h3>
                <p className="text-sm md:text-base text-neutral-700 leading-relaxed font-medium">
                  {item.description}
                </p>

                {/* Sliced 3-Part Image Collage with fluid sizing and hover shine */}
                <div className="flex items-center gap-2 pt-2 max-w-full">
                  {[0, 1, 2].map((partIdx) => (
                    <div
                      key={partIdx}
                      className="h-36 sm:h-44 md:h-52 w-24 sm:w-28 md:w-32 rounded-2xl bg-no-repeat overflow-hidden shrink-0 transition-transform duration-300 hover:scale-105"
                      style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: "300% 100%",
                        backgroundPosition: `${partIdx * 50}% 0%`,
                      }}
                    />
                  ))}
                </div>

                {item.linkText && (
                  <button
                    type="button"
                    onClick={() => scrollToTarget(item.linkHref || "#schedule")}
                    className="inline-block text-sm font-bold text-neutral-800 underline hover:text-black transition-colors pt-2 cursor-pointer"
                  >
                    {item.linkText}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};
