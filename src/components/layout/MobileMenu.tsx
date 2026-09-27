"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavClick: (target: string) => void;
  onOpenBooking: () => void;
  lang: "EN" | "VN";
  onToggleLang: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onNavClick,
  onOpenBooking,
  lang,
  onToggleLang,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (menuRef.current) {
        gsap.fromTo(
          menuRef.current,
          { y: "-100%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.45, ease: "power3.out" }
        );
      }
      if (linksRef.current) {
        gsap.fromTo(
          linksRef.current.children,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, stagger: 0.08, delay: 0.15, ease: "power2.out" }
        );
      }
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] flex flex-col justify-between p-8 text-white md:hidden"
    >
      {/* Header with Logo & Close */}
      <div className="flex items-center justify-between">
        <div className="w-32">
          <Image
            src="/images/YOGGO-RBG.png"
            alt="YOGGO"
            width={140}
            height={40}
            className="w-full h-auto"
          />
        </div>
        <button onClick={onClose} className="p-2" aria-label="Close menu">
          <Image src="/images/Closew.png" alt="Close" width={28} height={28} />
        </button>
      </div>

      {/* Nav Links */}
      <div ref={linksRef} className="flex flex-col items-center space-y-6 my-auto text-center">
        <button
          onClick={() => {
            onClose();
            onNavClick("#classes");
          }}
          className="text-2xl font-medium tracking-wider hover:opacity-75 transition-opacity"
        >
          CLASSES
        </button>
        <button
          onClick={() => {
            onClose();
            onNavClick("#instructors");
          }}
          className="text-2xl font-medium tracking-wider hover:opacity-75 transition-opacity"
        >
          INSTRUCTORS
        </button>
        <button
          onClick={() => {
            onClose();
            onNavClick("#schedule");
          }}
          className="text-2xl font-medium tracking-wider hover:opacity-75 transition-opacity"
        >
          SCHEDULE
        </button>

        {/* Language switch */}
        <button
          onClick={onToggleLang}
          className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-lg font-semibold my-4"
        >
          {lang}
        </button>

        {/* Online consultation button */}
        <button
          onClick={() => {
            onClose();
            onOpenBooking();
          }}
          className="border border-white rounded-full px-6 py-3 text-sm font-semibold tracking-wider hover:bg-white hover:text-black transition-colors"
        >
          ONLINE CONSULTATION
        </button>
      </div>

      <div className="text-center text-xs text-neutral-400">
        © 2026 YOGGO Studio. All rights reserved.
      </div>
    </div>
  );
};
