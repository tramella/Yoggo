import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yoggo-psi.vercel.app"),
  title: {
    default: "YOGGO — Modern Yoga Studio | Connect Body & Soul",
    template: "%s | YOGGO Studio",
  },
  description:
    "Connect your body to your soul. Explore yoga classes, certified instructors, daily schedules, and free trial classes at YOGGO Studio.",
  applicationName: "YOGGO Studio",
  authors: [{ name: "YOGGO Studio", url: "https://yoggo-psi.vercel.app" }],
  generator: "Next.js",
  keywords: [
    "Yoga Studio",
    "Yoga Classes",
    "Hatha Yoga",
    "Vinyasa Flow",
    "Kundalini Yoga",
    "Ashtanga Yoga",
    "Meditation & Mindfulness",
    "Yoga Instructors",
    "Yoga Schedule",
    "Free Trial Class",
  ],
  creator: "YOGGO Studio",
  publisher: "YOGGO Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/images/YOGGO.png",
    apple: "/images/YOGGO.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f5f2ec",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} font-sans overflow-x-hidden max-w-full`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${montserrat.className} antialiased bg-[#f5f2ec] text-black selection:bg-black selection:text-white min-h-screen overflow-x-hidden max-w-full`}>
        {children}
      </body>
    </html>
  );
}
