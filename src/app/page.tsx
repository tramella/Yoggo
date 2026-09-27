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

// Data for "Why Us"
const WHY_US_DATA: AccordionItemData[] = [
  {
    id: "why-us-1",
    title: "WHY US",
    heading: "Connect your body to your soul.",
    description:
      "Through our carefully selected strategies we create a harmony between your mind and your body thus reducing stress, enhancing mental well-being & increasing emotional stability.",
    image: "/images/cfdc21df9da775bf8e681c586f37ddf6.webp",
    linkText: "Learn more",
    linkHref: "#why-us",
  },
  {
    id: "why-us-2",
    title: "BENEFITS",
    heading: "Unlock the true benefits of inner balance.",
    description:
      "Our approach goes beyond physical wellness. By nurturing your mind and emotions, you'll experience deeper sleep, better focus, and a resilient mindset. The benefits ripple into every part of your life.",
    image: "/images/view-pregnant-woman-doing-sport-home.webp",
    linkText: "Learn more",
    linkHref: "#why-us",
  },
  {
    id: "why-us-3",
    title: "PROGRAMS",
    heading: "Personalized paths to well-being.",
    description:
      "Whether you're starting your journey or deepening your practice, our programs are tailored to meet you where you are. From guided meditations to movement therapies, each step is designed to bring clarity, calm, and connection.",
    image: "/images/yoga-group-classes-inside-gym.webp",
    linkText: "Learn more",
    linkHref: "#why-us",
  },
  {
    id: "why-us-4",
    title: "HISTORY",
    heading: "Rooted in tradition, refined for today.",
    description:
      "Our foundation is built on timeless principles of mindfulness, movement, and healing. Over the years, we've combined ancient wisdom with modern science to create a holistic experience that evolves with you.",
    image: "/images/young-woman-practicing-yoga-home.webp",
    linkText: "Learn more",
    linkHref: "#why-us",
  },
];

// Data for "Yoga Styles"
const YOGA_STYLES_DATA: AccordionItemData[] = [
  {
    id: "style-1",
    title: "VINYASA",
    heading: "Flow with breath and dynamic movement.",
    description:
      "Vinyasa links breath with movement in a continuous, flowing sequence. Experience increased cardiovascular stamina, flexibility, and physical focus as you seamlessly transition from posture to posture.",
    image: "/images/cfdc21df9da775bf8e681c586f37ddf6.webp",
    linkText: "View Schedule",
    linkHref: "#schedule",
  },
  {
    id: "style-2",
    title: "HATHA",
    heading: "Cultivate strength and alignment with foundational postures.",
    description:
      "A classical approach emphasizing deliberate, static postures and pranayama breathing techniques. Perfect for building core strength, muscle endurance, and mental grounding.",
    image: "/images/view-pregnant-woman-doing-sport-home.webp",
    linkText: "View Schedule",
    linkHref: "#schedule",
  },
  {
    id: "style-3",
    title: "KUNDALINI",
    heading: "Awaken energy through chanting, breathwork, and kriyas.",
    description:
      "A transformative practice incorporating repetitive physical exercises, powerful breath techniques, mantra chanting, and meditation to unlock inner vitality and spiritual awareness.",
    image: "/images/yoga-group-classes-inside-gym.webp",
    linkText: "View Schedule",
    linkHref: "#schedule",
  },
  {
    id: "style-4",
    title: "ASHTANGA",
    heading: "Structured athletic sequences for endurance and discipline.",
    description:
      "A synchronized system of vigorous postures and focused breathing that produces intense internal heat and purifying sweat to detoxify muscles and internal organs.",
    image: "/images/young-woman-practicing-yoga-home.webp",
    linkText: "View Schedule",
    linkHref: "#schedule",
  },
];

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStyle, setBookingStyle] = useState("Hatha Yoga");
  const [bookingTime, setBookingTime] = useState("09:00 AM - 10:00 AM");

  const handleOpenBooking = (style = "Hatha Yoga", time = "09:00 AM - 10:00 AM") => {
    setBookingStyle(style);
    setBookingTime(time);
    setIsBookingOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col justify-between">
      {/* Navbar */}
      <Navbar onOpenBooking={() => handleOpenBooking("Online Consultation", "09:00 AM - 10:00 AM")} />

      {/* Hero */}
      <Hero />

      {/* Why Us Accordion */}
      <AccordionSection id="why-us" items={WHY_US_DATA} />

      {/* Marquee Ticker 1 */}
      <MarqueeBreak text="FREE TRIAL CLASS" />

      {/* Classes */}
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
      <AccordionSection id="styles" items={YOGA_STYLES_DATA} />

      {/* Marquee Ticker 2 */}
      <MarqueeBreak text="FREE ONLINE CONSULTATION" />

      {/* Instructors */}
      <InstructorsSection />

      {/* Schedule with 2-Week dynamic data */}
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
          className="relative group overflow-hidden border border-[#858585] rounded-full w-[300px] h-[50px] flex items-center justify-center transition-colors duration-300"
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
}
