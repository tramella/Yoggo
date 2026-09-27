# 🧘‍♀️ YOGGO - Modern Yoga Studio Landing Page

Welcome to **YOGGO** — a high-performance, modern, and interactive **Yoga Studio Landing Page**. Built with **Next.js 14+ (App Router)**, **TypeScript**, **Tailwind CSS**, and **GSAP Animations**, this landing page delivers an elegant, calming, and seamless user experience designed to convert visitors into students through trial class bookings, interactive schedules, and engaging visual showcases.

🌐 **Live Preview:** [https://yoggo.onrender.com](https://yoggo.onrender.com)

---

## 🎯 Landing Page Highlights & Features

### 🌟 1. Auto-Playing Hero Carousel with Slide Counter
- **3-Slide Auto Carousel**: Smooth transition between high-resolution studio imagery with pause-on-hover capability.
- **Active Slide Indicator**: Real-time slide counter (`01 / 03`) with interactive dot pagination and navigation arrows.

### 🎬 2. GSAP & ScrollTrigger Animations
- **Silky Smooth Navigation**: Clicking any header menu item (`CLASSES`, `INSTRUCTORS`, `SCHEDULE`, `Why Us`) glides smoothly to the section using GSAP `ScrollToPlugin` without jitter.
- **Scroll-Triggered Reveals**: Staggered fade and slide-up animations across pricing cards, instructor mosaic profiles, and studio banners as the user scrolls down the landing page.
- **Interactive Accordions**: Clean `+` / `−` morph button with smooth 180° rotation and fluid grid expansion for **Why Us**, **Benefits**, **Programs**, **History**, and **Yoga Styles**.
- **Dual Continuous Tickers**: Smooth infinite marquee loops for `FREE TRIAL CLASS` and `FREE ONLINE CONSULTATION`.
- **Floating Scroll-To-Top**: Responsive floating button that appears on scroll and smoothly returns to top (`y: 0`).

### 📅 3. Dynamic 2-Week Schedule (Current & Next Week)
- **Always Up-to-Date**: Dynamically computes dates for **Current Week (Week 0)** and **Next Week (Week 1)** using the browser's live date.
- **Class Matrix & Filters**: Full timetable (Mon–Sat) filterable by **Yoga Style** (*Hatha*, *Vinyasa*, *Kundalini*, *Ashtanga*) and **Class Type** (*Group*, *Individual*, *Online*).
- **One-Click Booking Integration**: Clicking **"BOOK"** on any scheduled cell automatically launches the booking modal pre-populated with the chosen class style and time.

### 📝 4. Interactive Trial Class Booking Modal
- Pop-in modal with backdrop blur, custom styled dropdown selectors, and instant confirmation feedback.

### 📱 5. Fully Responsive & Mobile Optimized
- Designed mobile-first, adapting flawlessly from 4K desktop screens to smartphones.
- Mobile slide-out drawer menu with staggered GSAP link animations and language switch (`EN` / `VN`).
- Sliced 3-part image collage engineered with fluid responsive dimensions.

---

## 🚀 Technologies Used

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [GSAP (GreenSock)](https://gsap.com/) & [@gsap/react](https://www.npmjs.com/package/@gsap/react) (`ScrollTrigger`, `ScrollToPlugin`)
- **Typography**: [Montserrat](https://fonts.google.com/specimen/Montserrat) via Google Fonts
- **Icons & Assets**: Next.js Optimized Image Pipeline

---

## 📁 Project Structure

```
Yoggo/
├── public/
│   └── images/                     # Static studio imagery & icons
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root HTML layout & metadata
│   │   ├── page.tsx                # Main Landing Page composing all sections
│   │   └── globals.css             # Tailwind base & marquee keyframes
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Desktop navigation & language switcher
│   │   │   ├── MobileMenu.tsx      # GSAP-animated mobile drawer
│   │   │   └── Footer.tsx          # Footer navigation, newsletter & socials
│   │   ├── ui/
│   │   │   ├── SectionHeader.tsx   # Crisp baseline underline section header
│   │   │   ├── MarqueeBreak.tsx    # Dual-track infinite scrolling ticker
│   │   │   ├── Dropdown.tsx        # Accessible custom dropdown component
│   │   │   └── ScrollToTopButton.tsx # Smooth floating scroll-to-top button
│   │   ├── home/
│   │   │   ├── Hero.tsx            # Auto 3-picture hero carousel with counter
│   │   │   ├── AccordionSection.tsx# Accordion with fluid 3-part image collage
│   │   │   ├── ClassesSection.tsx  # Pricing and class tier mosaic cards
│   │   │   ├── StudioBanner.tsx    # Studio showcase banners with badges
│   │   │   └── InstructorsSection.tsx # Certified instructors showcase
│   │   ├── schedule/
│   │   │   ├── ScheduleSection.tsx # Schedule container & state management
│   │   │   ├── WeekNavigator.tsx   # Current / Next Week toggle
│   │   │   ├── ScheduleFilter.tsx  # Yoga style & Class type filters
│   │   │   └── ScheduleGrid.tsx    # Dynamic timetable grid with book buttons
│   │   └── booking/
│   │       └── BookClassModal.tsx  # Animated trial registration modal
│   ├── lib/
│   │   ├── schedule.ts             # Dynamic 2-week schedule generator
│   │   └── gsap-utils.ts           # GSAP plugin registration & scroll helpers
│   └── types/
│       └── index.ts                # TypeScript domain models & interfaces
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18 or newer)
- npm or yarn

### 1. Clone the repository:
```bash
git clone https://github.com/Tramella/Yoggo.git
cd Yoggo
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Start the development server:
```bash
npm run dev
```
Open [**http://localhost:3000**](http://localhost:3000) in your browser.

### 4. Build for production:
```bash
npm run build
npm start
```

---

## 📩 Contact

Feel free to reach out for feedback, suggestions, or collaboration:

- **Email**: trantramella@gmail.com
- **Project Repository**: [https://github.com/Tramella/Yoggo](https://github.com/Tramella/Yoggo)

---

🧘 *Made with ❤️, mindfulness, and modern web technologies.*
