"use client";

import React, { useState, useRef } from "react";
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

  const toggleItem = (index: number, event?: React.MouseEvent<HTMLDivElement>) => {
    const isOpening = openIndex !== index;
    setOpenIndex(isOpening ? index : -1);

    if (isOpening && typeof window !== "undefined") {
      const clickedRow = event?.currentTarget?.closest(".accordion-row") as HTMLElement | null;
      if (clickedRow) {
        // Wait briefly for content expansion calculation to settle
        setTimeout(() => {
          const rect = clickedRow.getBoundingClientRect();
          const itemHeight = rect.height;
          const windowHeight = window.innerHeight;
          const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;

          // Header clearance offset (85px navbar)
          const headerOffset = 42; // half of header height for balanced optical centering

          // Calculate vertical center of the expanded section aligned with viewport center
          const targetY = currentScrollY + rect.top - (windowHeight / 2) + (itemHeight / 2) + (headerOffset / 2);

          gsap.to(window, {
            duration: 0.8,
            scrollTo: { y: Math.max(0, targetY), autoKill: true },
            ease: "power2.inOut",
            overwrite: "auto",
          });
        }, 120);
      }
    }
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
              onClick={(e) => toggleItem(idx, e)}
              className="border-b-[1.5px] border-[#2e2e2e] pb-2 flex items-center justify-between cursor-pointer group"
            >
              <h2 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] font-normal text-black tracking-tight leading-none uppercase group-hover:opacity-75 transition-opacity">
                {item.title}
              </h2>

              <div className="w-10 h-10 md:w-12 md:h-12 relative flex items-center justify-center shrink-0">
                {/* Smooth morphing plus/minus button */}
                <div
                  className={`w-9 h-9 md:w-11 md:h-11 rounded-full border border-black/80 flex items-center justify-center transition-all duration-300 ${
                    isOpen
                      ? "bg-black text-white rotate-180 scale-105"
                      : "bg-transparent text-black hover:bg-black/5"
                  }`}
                >
                  <span className="text-xl md:text-2xl font-light leading-none -mt-0.5">
                    {isOpen ? "−" : "+"}
                  </span>
                </div>
              </div>
            </div>

            {/* Expandable Content Body with buttery CSS grid transition */}
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0 pointer-events-none"
              }`}
            >
              <div className="overflow-hidden">
                <div className="min-h-0 pl-0 sm:pl-4 md:pl-[38%] lg:pl-[45%] space-y-4 pt-6 pb-4">
                  <h3
                    className={`text-lg sm:text-xl md:text-2xl font-bold text-[#2e2e2e] transition-all duration-400 ${
                      isOpen ? "translate-y-0 opacity-100 delay-100" : "translate-y-2 opacity-0"
                    }`}
                  >
                    {item.heading}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm md:text-base text-neutral-700 leading-relaxed font-medium transition-all duration-400 ${
                      isOpen ? "translate-y-0 opacity-100 delay-150" : "translate-y-2 opacity-0"
                    }`}
                  >
                    {item.description}
                  </p>

                  {/* Sliced 3-Part Image Collage */}
                  <div className="flex items-center gap-2 sm:gap-3 pt-2 max-w-full overflow-hidden">
                    {[0, 1, 2].map((partIdx) => {
                      const delays = ["delay-200", "delay-[260ms]", "delay-[320ms]"];

                      return (
                        <div
                          key={partIdx}
                          className={`group/img relative h-32 sm:h-44 md:h-52 w-[28vw] sm:w-28 md:w-32 max-w-[130px] rounded-xl sm:rounded-2xl overflow-hidden shrink-0 shadow-md transition-all duration-500 ease-out hover:scale-[1.05] hover:shadow-xl cursor-pointer ${
                            delays[partIdx]
                          } ${
                            isOpen
                              ? "translate-y-0 opacity-100 scale-100"
                              : "translate-y-3 opacity-0 scale-95"
                          }`}
                        >
                          <div
                            className="w-full h-full bg-no-repeat bg-cover enhanced-img transition-transform duration-700 group-hover/img:scale-105"
                            style={{
                              backgroundImage: `url(${item.image})`,
                              backgroundSize: "300% 100%",
                              backgroundPosition: `${partIdx * 50}% 0%`,
                            }}
                          />
                          {/* Subtle elegant gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
                        </div>
                      );
                    })}
                  </div>

                  {item.linkText && (
                    <button
                      type="button"
                      onClick={() => scrollToTarget(item.linkHref || "#schedule")}
                      className={`inline-block text-xs sm:text-sm font-bold text-neutral-800 underline hover:text-black hover:opacity-75 transition-all duration-400 pt-2 cursor-pointer ${
                        isOpen ? "translate-y-0 opacity-100 delay-[350ms]" : "translate-y-2 opacity-0"
                      }`}
                    >
                      {item.linkText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};
