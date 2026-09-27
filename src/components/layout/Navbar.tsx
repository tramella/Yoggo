"use client";

import React, { useState } from "react";
import Image from "next/image";
import { scrollToTarget } from "@/lib/gsap-utils";
import { MobileMenu } from "./MobileMenu";

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<"EN" | "VN">("EN");
  const [isHoveredLang, setIsHoveredLang] = useState(false);

  const handleNavClick = (target: string) => {
    scrollToTarget(target, 40);
  };

  const toggleLanguage = () => {
    setSelectedLang((prev) => (prev === "EN" ? "VN" : "EN"));
  };

  // Determine which language is displayed on top / bottom based on hover and selection
  const isVNActive = (selectedLang === "VN" && !isHoveredLang) || (selectedLang === "EN" && isHoveredLang);

  return (
    <>
      <header className="w-[88%] max-w-7xl mx-auto py-5 flex items-center justify-between">
        {/* Logo */}
        <div
          className="w-36 md:w-48 cursor-pointer"
          onClick={() => {
            if (typeof window !== "undefined") {
              scrollToTarget("body", 0);
            }
          }}
        >
          <Image
            src="/images/YOGGO.png"
            alt="YOGGO"
            width={190}
            height={50}
            priority
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {/* Tag: CLASSES with animated underline */}
          <button
            onClick={() => handleNavClick("#classes")}
            className="relative text-sm lg:text-base font-semibold text-black py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all after:duration-300"
          >
            CLASSES
          </button>

          {/* Tag: INSTRUCTORS with animated underline */}
          <button
            onClick={() => handleNavClick("#instructors")}
            className="relative text-sm lg:text-base font-semibold text-black py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all after:duration-300"
          >
            INSTRUCTORS
          </button>

          {/* Tag: SCHEDULE with animated underline */}
          <button
            onClick={() => handleNavClick("#schedule")}
            className="relative text-sm lg:text-base font-semibold text-black py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all after:duration-300"
          >
            SCHEDULE
          </button>

          {/* Language Switcher with vertical slide animation */}
          <button
            onClick={toggleLanguage}
            onMouseEnter={() => setIsHoveredLang(true)}
            onMouseLeave={() => setIsHoveredLang(false)}
            className={`relative w-10 h-10 rounded-full border border-black overflow-hidden flex items-center justify-center font-bold text-xs transition-colors duration-300 ${
              isHoveredLang || selectedLang === "VN"
                ? "bg-black text-white"
                : "bg-transparent text-black"
            }`}
            title="Toggle Language"
            aria-label="Toggle Language"
          >
            <span
              className={`absolute w-full text-center transition-all duration-300 ${
                isVNActive ? "top-10 opacity-0" : "top-2.5 opacity-100"
              }`}
            >
              EN
            </span>
            <span
              className={`absolute w-full text-center transition-all duration-300 ${
                isVNActive ? "top-2.5 opacity-100" : "-top-10 opacity-0"
              }`}
            >
              VN
            </span>
          </button>

          {/* Online Consultation Button with left-to-right fill animation */}
          <button
            onClick={onOpenBooking}
            className="relative group overflow-hidden border border-black rounded-full h-10 px-6 text-xs lg:text-sm font-semibold tracking-wide text-black hover:text-white transition-colors duration-400 flex items-center justify-center"
          >
            <span className="relative z-10 transition-colors duration-300">
              ONLINE CONSULTATION
            </span>
            <div className="absolute top-0 left-0 h-full w-0 group-hover:w-full bg-black transition-all duration-400 ease-in-out -z-0 rounded-full" />
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden p-2 text-black hover:opacity-75 focus:outline-none"
          aria-label="Open menu"
        >
          <Image src="/images/Menu.png" alt="Menu" width={28} height={28} />
        </button>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavClick={handleNavClick}
        onOpenBooking={onOpenBooking}
        lang={selectedLang}
        onToggleLang={toggleLanguage}
      />
    </>
  );
};
