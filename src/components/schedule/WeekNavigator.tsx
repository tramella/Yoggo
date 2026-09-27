import React from "react";
import { DayInfo } from "@/types";

interface WeekNavigatorProps {
  weekOffset: number;
  weekDates: DayInfo[];
  onPrevWeek: () => void;
  onNextWeek: () => void;
}

export const WeekNavigator: React.FC<WeekNavigatorProps> = ({
  weekOffset,
  weekDates,
  onPrevWeek,
  onNextWeek,
}) => {
  if (!weekDates || weekDates.length === 0) return null;

  const startStr = weekDates[0].full
    .toLocaleDateString("en-US", { day: "numeric", month: "short" })
    .toUpperCase();
  const endStr = weekDates[weekDates.length - 1].full
    .toLocaleDateString("en-US", { day: "numeric", month: "short" })
    .toUpperCase();

  const isCurrentWeek = weekOffset === 0;
  const isNextWeek = weekOffset === 1;

  return (
    <div className="flex items-center gap-3">
      {/* Prev Button */}
      <button
        type="button"
        onClick={onPrevWeek}
        disabled={isCurrentWeek}
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-300 flex items-center justify-center text-lg font-bold transition-all ${
          isCurrentWeek
            ? "opacity-30 cursor-not-allowed bg-neutral-100"
            : "bg-[#eae5dc] hover:bg-black hover:text-white hover:border-black active:scale-95"
        }`}
        aria-label="Previous week"
      >
        ‹
      </button>

      {/* Week Title & Dates */}
      <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm font-semibold text-neutral-800">
        <span className="bg-black text-white text-[11px] font-bold px-2.5 py-1 rounded-full tracking-wider">
          {isCurrentWeek ? "CURRENT WEEK" : "NEXT WEEK"}
        </span>
        <span className="font-semibold text-neutral-700">
          ({startStr} - {endStr})
        </span>
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={onNextWeek}
        disabled={isNextWeek}
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-300 flex items-center justify-center text-lg font-bold transition-all ${
          isNextWeek
            ? "opacity-30 cursor-not-allowed bg-neutral-100"
            : "bg-[#eae5dc] hover:bg-black hover:text-white hover:border-black active:scale-95"
        }`}
        aria-label="Next week"
      >
        ›
      </button>
    </div>
  );
};
