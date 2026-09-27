"use client";

import React, { useState, useMemo, useRef } from "react";
import { ClassType, YogaStyle } from "@/types";
import { generateTwoWeekSchedule, getWeekDates } from "@/lib/schedule";
import { WeekNavigator } from "./WeekNavigator";
import { ScheduleFilter } from "./ScheduleFilter";
import { ScheduleGrid } from "./ScheduleGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { scrollToTarget } from "@/lib/gsap-utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScheduleSectionProps {
  onBookClass: (style?: string, time?: string) => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ onBookClass }) => {
  const [weekOffset, setWeekOffset] = useState<number>(0); // 0 = Current Week, 1 = Next Week
  const [selectedStyle, setSelectedStyle] = useState<YogaStyle>("HATHA");
  const [selectedClassType, setSelectedClassType] = useState<ClassType>("GROUP");
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic 2-week schedule data
  const scheduleData = useMemo(() => generateTwoWeekSchedule(), []);

  // Days for the active week (Monday to Saturday)
  const currentDays = useMemo(() => getWeekDates(weekOffset), [weekOffset]);

  useGSAP(
    () => {
      if (typeof window !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
        
        // Entrance scroll animation for schedule section
        gsap.from(containerRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 35,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    },
    { scope: containerRef }
  );

  useGSAP(
    () => {
      // Cell animation when switching filters or weeks
      gsap.fromTo(
        ".schedule-grid-container",
        { opacity: 0.6, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    },
    { dependencies: [weekOffset, selectedStyle, selectedClassType], scope: containerRef }
  );

  return (
    <section id="schedule" ref={containerRef} className="w-[88%] max-w-7xl mx-auto my-20">
      {/* Section Header */}
      <SectionHeader
        title="SCHEDULE"
        linkText="Book Class"
        onLinkClick={() => scrollToTarget("#book-trial")}
      />

      {/* Filter Toolbar (Week Navigator + Style/Type Dropdowns) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <WeekNavigator
          weekOffset={weekOffset}
          weekDates={currentDays}
          onPrevWeek={() => setWeekOffset(0)}
          onNextWeek={() => setWeekOffset(1)}
        />

        <ScheduleFilter
          selectedClassType={selectedClassType}
          selectedStyle={selectedStyle}
          onClassTypeChange={setSelectedClassType}
          onStyleChange={setSelectedStyle}
        />
      </div>

      {/* Timetable Grid */}
      <div className="schedule-grid-container">
        <ScheduleGrid
          days={currentDays}
          scheduleData={scheduleData}
          selectedStyle={selectedStyle}
          selectedClassType={selectedClassType}
          onBookClass={(style, time) => onBookClass(style, time)}
        />
      </div>
    </section>
  );
};
