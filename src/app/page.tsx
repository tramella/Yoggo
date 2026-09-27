import React from "react";
import type { Metadata } from "next";
import { HomeClient } from "@/components/home/HomeClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { AccordionItemData } from "@/types";

export const metadata: Metadata = {
  title: "YOGGO — Modern Yoga Studio | Connect Body & Soul",
  description:
    "Connect your body to your soul at YOGGO Studio. Offering Hatha, Vinyasa Flow, Kundalini, and Ashtanga yoga classes with certified instructors in San Francisco. Book your free trial class today.",
  keywords: [
    "Yoga Studio",
    "Yoga Classes San Francisco",
    "Hatha Yoga",
    "Vinyasa Flow",
    "Kundalini Yoga",
    "Ashtanga Yoga",
    "Meditation & Mindfulness",
    "Certified Yoga Instructors",
    "Yoga Schedule",
    "Free Trial Yoga Class",
    "YOGGO",
  ],
  alternates: {
    canonical: "https://yoggo-psi.vercel.app",
  },
  openGraph: {
    title: "YOGGO — Modern Yoga Studio | Connect Body & Soul",
    description:
      "Connect your body to your soul. Experience transformative yoga classes, certified instructors, daily schedules, and free trial classes at YOGGO Studio.",
    url: "https://yoggo-psi.vercel.app",
    siteName: "YOGGO Modern Yoga Studio",
    images: [
      {
        url: "https://yoggo-psi.vercel.app/images/desktop.png",
        width: 1200,
        height: 630,
        alt: "YOGGO Modern Yoga Studio Experience",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YOGGO — Modern Yoga Studio | Connect Body & Soul",
    description:
      "Connect your body to your soul. Experience transformative yoga classes, certified instructors, daily schedules, and free trial classes at YOGGO Studio.",
    images: ["https://yoggo-psi.vercel.app/images/desktop.png"],
    creator: "@yoggostudio",
  },
};

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
  return (
    <>
      <JsonLd />
      <HomeClient whyUsData={WHY_US_DATA} yogaStylesData={YOGA_STYLES_DATA} />
    </>
  );
}
