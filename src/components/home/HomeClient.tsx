"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { AccordionSection } from "@/components/home/AccordionSection";
import { ClassesSection } from "@/components/home/ClassesSection";
import { StudioBanner } from "@/components/home/StudioBanner";
import { InstructorsSection } from "@/components/home/InstructorsSection";
import { ScheduleSection } from "@/components/schedule/ScheduleSection";
import { MarqueeBreak } from "@/components/ui/MarqueeBreak";
import { BookClassModal } from "@/components/booking/BookClassModal";
import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton";
import { AccordionItemData } from "@/types";

interface HomeClientProps {
  whyUsData: AccordionItemData[];
  yogaStylesData: AccordionItemData[];
}

export const HomeClient: React.FC<HomeClientProps> = ({ whyUsData, yogaStylesData }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStyle, setBookingStyle] = useState("Hatha Yoga");
  const [bookingTime, setBookingTime] = useState("09:00 AM - 10:00 AM");

  const handleOpenBooking = (style = "Hatha Yoga", time = "09:00 AM - 10:00 AM") => {
    setBookingStyle(style);
    setBookingTime(time);
    setIsBookingOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col justify-between overflow-x-hidden max-w-full">
      {/* Semantic Navbar */}
      <Navbar onOpenBooking={() => handleOpenBooking("Online Consultation", "09:00 AM - 10:00 AM")} />

      {/* Hero Section */}
      <Hero />

      {/* Why Us Accordion */}
      <AccordionSection id="why-us" items={whyUsData} />

      {/* Continuous Marquee Ticker 1 */}
      <MarqueeBreak text="FREE TRIAL CLASS" />

      {/* Classes Section */}
      <ClassesSection />

      {/* Studio Banner 1 */}
      <StudioBanner
        image="/images/pexels-cottonbro-4323292.jpg"
        title={
          <>
            The one <span className="italic font-bold">yoga</span> studio you&apos;ll ever{" "}
            <span className="italic font-bold">need</span>
          </>
        }
        subtitle="Established in far 2004, we currently have 1K+ monthly customers."
        badges={["20 YEARS EXPERIENCE", "4 YOGA STYLES", "16 YOGA INSTRUCTORS"]}
      />

      {/* Yoga Styles Accordion */}
      <AccordionSection id="styles" items={yogaStylesData} />

      {/* Continuous Marquee Ticker 2 */}
      <MarqueeBreak text="FREE ONLINE CONSULTATION" />

      {/* Instructors Section */}
      <InstructorsSection />

      {/* Dynamic Schedule Section */}
      <ScheduleSection onBookClass={(style, time) => handleOpenBooking(style, time)} />

      {/* Studio Banner 2 */}
      <StudioBanner
        image="/images/pexels-mart-production-7319706.jpg"
        title={
          <>
            The <span className="italic font-bold">ultimate</span> place to find{" "}
            <span className="italic font-bold">harmony</span> of body, mind &amp; soul.
          </>
        }
        subtitle="Don't believe? Enroll to a trial class, it's completely free of charge."
      />

      {/* CTA Section */}
      <section id="book-trial" className="w-[88%] max-w-7xl mx-auto my-12 flex justify-center">
        <button
          type="button"
          onClick={() => handleOpenBooking("Hatha Yoga", "09:00 AM - 10:00 AM")}
          className="relative group overflow-hidden border border-[#858585] rounded-full w-[300px] h-[50px] flex items-center justify-center transition-colors duration-300 cursor-pointer"
        >
          <span className="relative z-10 text-xs sm:text-sm font-semibold tracking-wider text-black group-hover:text-white transition-colors duration-300 mr-4">
            TAKE A TRIAL CLASS
          </span>
          <Image
            src="/images/Right_Arrow.png"
            alt="arrow"
            width={20}
            height={20}
            className="relative z-10 group-hover:hidden transition-transform duration-300"
          />
          <Image
            src="/images/Right_Arrow_Hover.png"
            alt="arrow"
            width={20}
            height={20}
            className="relative z-10 hidden group-hover:inline-block transition-transform duration-300"
          />
          <div className="absolute top-0 left-0 h-full w-0 group-hover:w-full bg-black transition-all duration-400 ease-in-out -z-0 rounded-full" />
        </button>
      </section>

      {/* Footer */}
      <Footer />

      {/* Booking Modal */}
      <BookClassModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultStyle={bookingStyle}
        defaultTime={bookingTime}
      />

      {/* Floating Scroll To Top Button */}
      <ScrollToTopButton />
    </main>
  );
};
