"use client";

import React, { useState } from "react";
import Image from "next/image";
import { scrollToTarget } from "@/lib/gsap-utils";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="w-[88%] max-w-7xl mx-auto mt-20 pt-10">
      {/* Top Footer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
        {/* Logo */}
        <div className="flex flex-col justify-start">
          <Image
            src="/images/YOGGO.png"
            alt="YOGGO"
            width={180}
            height={50}
            className="w-40 h-auto"
          />
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-3">
          <h4 className="font-extrabold text-lg text-black">Quick Link</h4>
          <button
            onClick={() => scrollToTarget("#classes")}
            className="text-left text-sm font-semibold text-neutral-700 hover:text-black transition-colors"
          >
            Classes
          </button>
          <button
            onClick={() => scrollToTarget("#instructors")}
            className="text-left text-sm font-semibold text-neutral-700 hover:text-black transition-colors"
          >
            Instructors
          </button>
          <button
            onClick={() => scrollToTarget("#schedule")}
            className="text-left text-sm font-semibold text-neutral-700 hover:text-black transition-colors"
          >
            Schedule
          </button>
        </div>

        {/* Company Links */}
        <div className="flex flex-col space-y-3">
          <h4 className="font-extrabold text-lg text-black">Company</h4>
          <button
            onClick={() => scrollToTarget("#why-us")}
            className="text-left text-sm font-semibold text-neutral-700 hover:text-black transition-colors"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToTarget("#styles")}
            className="text-left text-sm font-semibold text-neutral-700 hover:text-black transition-colors"
          >
            Yoga Styles
          </button>
          <button
            onClick={() => scrollToTarget("#book-trial")}
            className="text-left text-sm font-semibold text-neutral-700 hover:text-black transition-colors"
          >
            Contacts & Booking
          </button>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col space-y-3">
          <h4 className="font-extrabold text-lg text-black">Newsletter</h4>
          <p className="text-sm text-neutral-600">
            Subscribe to be aware of our regular promotions & exclusive offers.
          </p>
          <form onSubmit={handleSubscribe} className="relative flex items-center mt-2">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 pl-4 pr-12 rounded-full border border-neutral-400 bg-transparent text-sm focus:outline-none focus:border-black"
              required
            />
            <button
              type="submit"
              className="absolute right-3 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Subscribe"
            >
              →
            </button>
          </form>
          {subscribed && (
            <p className="text-xs font-semibold text-green-700">Thank you for subscribing!</p>
          )}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-neutral-400 py-6 flex flex-col md:flex-row items-center justify-between text-xs font-semibold text-neutral-700 space-y-4 md:space-y-0">
        <div className="flex space-x-6">
          <a href="#" className="hover:text-black transition-colors">Instagram</a>
          <a href="#" className="hover:text-black transition-colors">TikTok</a>
          <a href="#" className="hover:text-black transition-colors">YouTube</a>
        </div>
        <div>Copyright &copy; {new Date().getFullYear()} YOGGO Studio. All rights reserved.</div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-black transition-colors">Terms & Conditions</a>
          <a href="#" className="hover:text-black transition-colors">Support</a>
        </div>
      </div>
    </footer>
  );
};
