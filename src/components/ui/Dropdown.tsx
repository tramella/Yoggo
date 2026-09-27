"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface DropdownProps<T extends string> {
  value: T;
  options: T[];
  onChange: (val: T) => void;
  className?: string;
  hasArrow?: boolean;
}

export function Dropdown<T extends string>({
  value,
  options,
  onChange,
  className = "",
  hasArrow = false,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative select-none ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-[#f5f2ec] border border-[#ccc] hover:border-[#2e2e2e] rounded-full text-sm font-semibold tracking-wide transition-all duration-200"
      >
        <span className="truncate">{value}</span>
        {hasArrow && (
          <Image
            src="/images/Expand Arrow.png"
            alt="arrow"
            width={14}
            height={14}
            className={`transition-transform duration-200 ml-2 ${isOpen ? "rotate-180" : ""}`}
          />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-[110%] left-0 w-full bg-white border border-[#ccc] rounded-2xl shadow-xl py-1 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-xs md:text-sm font-semibold hover:bg-[#f0ebe1] transition-colors ${
                option === value ? "bg-[#f5f0e6] text-black font-bold" : "text-[#444]"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
