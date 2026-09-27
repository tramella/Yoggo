"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Dropdown } from "@/components/ui/Dropdown";
import { TIME_SLOTS, YOGA_STYLES } from "@/lib/schedule";
import gsap from "gsap";

interface BookClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStyle?: string;
  defaultTime?: string;
}

export const BookClassModal: React.FC<BookClassModalProps> = ({
  isOpen,
  onClose,
  defaultStyle = "Hatha Yoga",
  defaultTime = "09:00 AM - 10:00 AM",
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [style, setStyle] = useState(defaultStyle);
  const [time, setTime] = useState(defaultTime);
  const [agree, setAgree] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  const styleOptions = YOGA_STYLES.map((s) => `${s.charAt(0) + s.slice(1).toLowerCase()} Yoga`);

  useEffect(() => {
    if (defaultStyle) setStyle(defaultStyle);
    if (defaultTime) setTime(defaultTime);
  }, [defaultStyle, defaultTime]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (modalRef.current) {
        gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      }
      if (formCardRef.current) {
        gsap.fromTo(
          formCardRef.current,
          { scale: 0.88, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.4)" }
        );
      }
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      alert("Please agree to the processing of personal data to proceed.");
      return;
    }
    if (!fullName || !email) {
      alert("Please fill in your name and email.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFullName("");
        setEmail("");
        setPhone("");
        onClose();
      }, 1500);
    }, 600);
  };

  return (
    <div
      ref={modalRef}
      onClick={(e) => {
        if (e.target === modalRef.current) onClose();
      }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10000] flex items-center justify-center p-4"
    >
      <div
        ref={formCardRef}
        className="w-full max-w-md bg-[#f5f2ec] border border-[#2e2e2e] rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-400 pb-3 mb-6">
          <h3 className="text-2xl sm:text-3xl font-normal text-black tracking-tight">
            BOOK A CLASS
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:opacity-75 transition-opacity"
            aria-label="Close"
          >
            <Image src="/images/Cancel.png" alt="Close" width={24} height={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="relative border border-[#2e2e2e] rounded-full px-4 pt-3 pb-2 bg-transparent focus-within:border-black">
            <label className="absolute -top-2 left-4 bg-[#f5f2ec] px-1 text-[11px] font-bold text-neutral-800">
              Full name
            </label>
            <input
              type="text"
              placeholder="John Smith"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold focus:outline-none placeholder:italic placeholder:text-neutral-400"
              required
            />
          </div>

          {/* Email */}
          <div className="relative border border-[#2e2e2e] rounded-full px-4 pt-3 pb-2 bg-transparent focus-within:border-black">
            <label className="absolute -top-2 left-4 bg-[#f5f2ec] px-1 text-[11px] font-bold text-neutral-800">
              Email
            </label>
            <input
              type="email"
              placeholder="john@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold focus:outline-none placeholder:italic placeholder:text-neutral-400"
              required
            />
          </div>

          {/* Phone */}
          <div className="relative border border-[#2e2e2e] rounded-full px-4 pt-3 pb-2 bg-transparent focus-within:border-black">
            <label className="absolute -top-2 left-4 bg-[#f5f2ec] px-1 text-[11px] font-bold text-neutral-800">
              Phone
            </label>
            <input
              type="tel"
              placeholder="+84030030"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold focus:outline-none placeholder:italic placeholder:text-neutral-400"
            />
          </div>

          {/* Yoga Style Select */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-neutral-800 pl-4">YOGA STYLE</label>
            <Dropdown
              value={style}
              options={styleOptions}
              onChange={setStyle}
              hasArrow
              className="w-full"
            />
          </div>

          {/* Date & Time Select */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-neutral-800 pl-4">DATE &amp; TIME</label>
            <Dropdown
              value={time}
              options={TIME_SLOTS as unknown as string[]}
              onChange={setTime}
              hasArrow
              className="w-full"
            />
          </div>

          {/* Agree Checkbox */}
          <div className="border-t border-neutral-400 pt-4 flex items-center space-x-2">
            <input
              type="checkbox"
              id="modalAgree"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="w-4 h-4 rounded text-black focus:ring-0 cursor-pointer"
            />
            <label htmlFor="modalAgree" className="text-xs font-medium text-neutral-800 cursor-pointer">
              I agree to the processing of personal data
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className={`w-full h-11 rounded-full border border-black font-bold text-sm tracking-wider transition-all mt-2 ${
              isSuccess
                ? "bg-black text-white"
                : "bg-transparent text-black hover:bg-black hover:text-white"
            }`}
          >
            {isSuccess ? "BOOKED SUCCESSFULLY ✓" : isSubmitting ? "PROCESSING..." : "BOOK NOW"}
          </button>
        </form>
      </div>
    </div>
  );
};
