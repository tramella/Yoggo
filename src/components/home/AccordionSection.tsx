"use client";

import React, { useState, useRef, useEffect } from "react";
import { AccordionItemData } from "@/types";
import { scrollToTarget } from "@/lib/gsap-utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

interface AccordionSectionProps {
  id: string;
  items: AccordionItemData[];
}

export const AccordionSection: React.FC<AccordionSectionProps> = ({ id, items }) => {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [contentVisibleIndex, setContentVisibleIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const contentTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (contentTimeoutRef.current) clearTimeout(contentTimeoutRef.current);
    };
  }, []);

  const scrollItemToCenter = (index: number) => {
    if (typeof window === "undefined") return;
    setTimeout(() => {
      const rowEl = itemRefs.current[index];
      if (!rowEl) return;

      const rect = rowEl.getBoundingClientRect();
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      const elementTop = currentScrollY + rect.top;
      const elementHeight = rowEl.offsetHeight;

      const windowHeight = window.innerHeight;
      const headerHeight = 85; // Fixed navbar height

      // Align the vertical center of the entire expanded section with the vertical center of the visible viewport
      const visibleCenter = headerHeight + (windowHeight - headerHeight) / 2;
      const targetY = elementTop + elementHeight / 2 - visibleCenter;

      gsap.to(window, {
        duration: 0.75,
        scrollTo: {
          y: Math.max(0, targetY),
          autoKill: true,
        },
        ease: "power2.out",
        overwrite: "auto",
      });
    }, 100);
  };

  const toggleItem = (index: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (contentTimeoutRef.current) {
      clearTimeout(contentTimeoutRef.current);
      contentTimeoutRef.current = null;
    }

    if (openIndex === index) {
      // User clicked the currently open section -> hide content and fold height shut immediately
      setContentVisibleIndex(-1);
      setOpenIndex(-1);
    } else if (openIndex === -1) {
      // Step 1: Open height first
      setContentVisibleIndex(-1);
      setOpenIndex(index);
      scrollItemToCenter(index);

      // Step 2: Content appears ONLY after height has fully opened (450ms)
      contentTimeoutRef.current = setTimeout(() => {
        setContentVisibleIndex(index);
      }, 450);
    } else {
      // Step 0: Close previous section first
      setContentVisibleIndex(-1);
      setOpenIndex(-1);

      timeoutRef.current = setTimeout(() => {
        // Step 1: Open height of clicked section
        setOpenIndex(index);
        scrollItemToCenter(index);

        // Step 2: Content appears ONLY after height has fully opened (450ms)
        contentTimeoutRef.current = setTimeout(() => {
          setContentVisibleIndex(index);
        }, 450);
      }, 350); // 350ms matches close transition
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
        const isContentVisible = contentVisibleIndex === idx;

        return (
          <div
            key={item.id}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
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

            {/* Stage 1: Expand height first (0ms - 450ms) */}
            <div
              className={`grid transition-[grid-template-rows] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOpen
                  ? "grid-rows-[1fr]"
                  : "grid-rows-[0fr] pointer-events-none"
              }`}
            >
              <div className="overflow-hidden">
                <div className="min-h-0 pl-0 sm:pl-4 md:pl-[38%] lg:pl-[45%] space-y-4 pt-6 pb-4">
                  {/* Stage 2: Content appears smoothly ONLY AFTER height finishes opening */}
                  {/* Heading */}
                  <h3
                    className={`text-lg sm:text-xl md:text-2xl font-bold text-[#2e2e2e] transition-all duration-500 ease-out ${
                      isContentVisible
                        ? "translate-y-0 opacity-100 delay-[50ms]"
                        : "-translate-y-3 opacity-0 duration-150 delay-0"
                    }`}
                  >
                    {item.heading}
                  </h3>

                  {/* Description paragraph */}
                  <p
                    className={`text-xs sm:text-sm md:text-base text-neutral-700 leading-relaxed font-medium transition-all duration-500 ease-out ${
                      isContentVisible
                        ? "translate-y-0 opacity-100 delay-[130ms]"
                        : "-translate-y-3 opacity-0 duration-150 delay-0"
                    }`}
                  >
                    {item.description}
                  </p>

                  {/* Sliced 3-Part Image Collage */}
                  <div className="flex items-center gap-2 sm:gap-3 pt-2 max-w-full overflow-hidden">
                    {[0, 1, 2].map((partIdx) => {
                      const delays = ["delay-[220ms]", "delay-[320ms]", "delay-[420ms]"];

                      return (
                        <div
                          key={partIdx}
                          className={`group/img relative h-32 sm:h-44 md:h-52 w-[28vw] sm:w-28 md:w-32 max-w-[130px] rounded-xl sm:rounded-2xl overflow-hidden shrink-0 shadow-md transition-all duration-600 ease-out hover:scale-[1.05] hover:shadow-xl cursor-pointer ${
                            isContentVisible
                              ? `translate-y-0 scale-100 opacity-100 ${delays[partIdx]}`
                              : "translate-y-4 scale-[0.96] opacity-0 duration-150 delay-0"
                          }`}
                        >
                          <div
                            className="w-full h-full bg-no-repeat bg-cover enhanced-img transition-transform duration-700 group-hover/img:scale-110"
                            style={{
                              backgroundImage: `url(${item.image})`,
                              backgroundSize: "300% 100%",
                              backgroundPosition: `${partIdx * 50}% 0%`,
                            }}
                          />
                          {/* Subtle elegant gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
                        </div>
                      );
                    })}
                  </div>

                  {/* Action link */}
                  {item.linkText && (
                    <div
                      className={`pt-2 transition-all duration-500 ease-out ${
                        isContentVisible
                          ? "translate-y-0 opacity-100 delay-[520ms]"
                          : "-translate-y-2 opacity-0 duration-150 delay-0"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => scrollToTarget(item.linkHref || "#schedule")}
                        className="nav-link group/link inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-neutral-800 underline hover:text-black hover:opacity-85 transition-colors cursor-pointer"
                      >
                        <span>{item.linkText}</span>
                        <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">
                          →
                        </span>
                      </button>
                    </div>
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
