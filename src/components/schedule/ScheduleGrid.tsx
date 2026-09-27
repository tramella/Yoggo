import React from "react";
import { DayInfo, ScheduleItem } from "@/types";
import { TIME_SLOTS } from "@/lib/schedule";

interface ScheduleGridProps {
  days: DayInfo[];
  scheduleData: ScheduleItem[];
  selectedStyle: string;
  selectedClassType: string;
  onBookClass: (style: string, time: string) => void;
}

export const ScheduleGrid: React.FC<ScheduleGridProps> = ({
  days,
  scheduleData,
  selectedStyle,
  selectedClassType,
  onBookClass,
}) => {
  return (
    <div className="w-full border border-neutral-400 rounded-3xl overflow-x-auto no-scrollbar bg-white shadow-sm">
      {/* Table Header with Days */}
      <div className="grid grid-cols-6 min-w-[660px] bg-black text-white rounded-t-3xl border-b border-neutral-700">
        {days.map((day, idx) => (
          <div
            key={day.name}
            className={`py-3 px-2 text-center flex flex-col items-center justify-center ${
              idx < days.length - 1 ? "border-r border-neutral-800" : ""
            }`}
          >
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-400">
              {day.name}
            </span>
            <span className="text-xl sm:text-2xl font-bold mt-0.5">
              {day.date}
            </span>
          </div>
        ))}
      </div>

      {/* Table Body with Time Slots */}
      <div className="min-w-[660px] divide-y divide-neutral-200">
        {TIME_SLOTS.map((slot) => (
          <div key={slot} className="grid grid-cols-6 divide-x divide-neutral-200">
            {days.map((day) => {
              const item = scheduleData.find(
                (c) =>
                  c.date === day.dateStr &&
                  c.time === slot &&
                  c.subject === selectedStyle &&
                  c.classType === selectedClassType
              );

              if (item) {
                return (
                  <div
                    key={`${day.dateStr}-${slot}`}
                    className="p-3 min-h-[140px] flex flex-col items-center justify-center text-center bg-[#fdfcfa] hover:bg-neutral-50 transition-all group"
                  >
                    <span className="text-[10px] font-semibold text-neutral-500">
                      {item.time}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-black my-1 tracking-wide">
                      {item.subject}
                    </h4>
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-[#eee8df] text-neutral-800 px-2 py-0.5 rounded-full mb-2">
                      {item.classType}
                    </span>
                    <button
                      type="button"
                      onClick={() => onBookClass(`${item.subject} Yoga`, item.time)}
                      className="w-4/5 max-w-[100px] h-8 rounded-full border border-black text-xs font-semibold tracking-wider flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                    >
                      BOOK
                    </button>
                  </div>
                );
              }

              return (
                <div
                  key={`${day.dateStr}-${slot}`}
                  className="p-3 min-h-[140px] flex flex-col items-center justify-center text-center bg-[#faf8f5]/60"
                >
                  <span className="text-[9px] text-neutral-400 font-medium">
                    {slot}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
