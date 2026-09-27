import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YOGGO - Modern Yoga Studio",
  description: "Connect your body to your soul. Explore yoga classes, professional instructors, and weekly schedules.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden max-w-full">
      <body className="antialiased bg-[#f5f2ec] text-black selection:bg-black selection:text-white min-h-screen overflow-x-hidden max-w-full">
        {children}
      </body>
    </html>
  );
}
