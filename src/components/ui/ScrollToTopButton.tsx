"use client";

import React, { useState, useEffect } from "react";
import { registerGSAP } from "@/lib/gsap-utils";
import gsap from "gsap";

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTop = () => {
    if (typeof window !== "undefined") {
      registerGSAP();
      try {
        gsap.to(window, {
          duration: 1.0,
          scrollTo: { y: 0, autoKill: true },
          ease: "power3.inOut",
          overwrite: "auto",
        });
      } catch {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={handleScrollTop}
      className="fixed bottom-6 right-6 z-[999] w-12 h-12 rounded-full bg-black text-white border border-neutral-700 shadow-2xl flex items-center justify-center hover:bg-neutral-800 hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <svg
        className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
};
