import { ClassType, DayInfo, ScheduleItem, YogaStyle } from "@/types";

export const TIME_SLOTS = [
  "09:00 AM - 10:00 AM",
  "12:00 PM - 01:00 PM",
  "03:00 PM - 04:00 PM",
  "06:00 PM - 07:00 PM",
] as const;

export const YOGA_STYLES: YogaStyle[] = ["HATHA", "VINYASA", "YIN"];
export const CLASS_TYPES: ClassType[] = ["GROUP", "INDIVIDUAL", "ONLINE"];

/**
 * Calculates Monday of the current week (local time)
 */
export function getMonday(d: Date = new Date()): Date {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(date.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday;
}

/**
 * Formats a Date object to YYYY-MM-DD
 */
export function formatISODate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Returns the 6 week days (Monday - Saturday) for given week offset
 */
export function getWeekDates(weekOffset: number = 0): DayInfo[] {
  const baseMonday = getMonday(new Date());
  const weekStart = new Date(baseMonday);
  weekStart.setDate(baseMonday.getDate() + weekOffset * 7);

  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return dayNames.map((name, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return {
      name,
      date: d.getDate(),
      full: d,
      dateStr: formatISODate(d),
    };
  });
}

/**
 * Generates dynamic 2-week schedule data (Week 0 = Current, Week 1 = Next)
 */
export function generateTwoWeekSchedule(): ScheduleItem[] {
  const schedule: ScheduleItem[] = [];
  const baseMonday = getMonday(new Date());

  const matrixPatterns: Array<Array<Array<{ subject: YogaStyle; type: ClassType }>>> = [
    // Week 0 pattern (Current week)
    [
      // Monday (day 0)
      [
        { subject: "VINYASA", type: "ONLINE" },
        { subject: "HATHA", type: "INDIVIDUAL" },
        { subject: "HATHA", type: "GROUP" },
        { subject: "YIN", type: "INDIVIDUAL" },
      ],
      // Tuesday (day 1)
      [
        { subject: "YIN", type: "GROUP" },
        { subject: "HATHA", type: "GROUP" },
        { subject: "VINYASA", type: "INDIVIDUAL" },
        { subject: "VINYASA", type: "ONLINE" },
      ],
      // Wednesday (day 2)
      [
        { subject: "VINYASA", type: "INDIVIDUAL" },
        { subject: "YIN", type: "ONLINE" },
        { subject: "HATHA", type: "ONLINE" },
        { subject: "HATHA", type: "GROUP" },
      ],
      // Thursday (day 3)
      [
        { subject: "YIN", type: "GROUP" },
        { subject: "HATHA", type: "INDIVIDUAL" },
        { subject: "VINYASA", type: "ONLINE" },
        { subject: "HATHA", type: "INDIVIDUAL" },
      ],
      // Friday (day 4)
      [
        { subject: "HATHA", type: "ONLINE" },
        { subject: "VINYASA", type: "GROUP" },
        { subject: "YIN", type: "GROUP" },
        { subject: "YIN", type: "INDIVIDUAL" },
      ],
      // Saturday (day 5)
      [
        { subject: "YIN", type: "GROUP" },
        { subject: "HATHA", type: "INDIVIDUAL" },
        { subject: "VINYASA", type: "ONLINE" },
        { subject: "HATHA", type: "GROUP" },
      ],
    ],
    // Week 1 pattern (Next week)
    [
      // Monday (day 0)
      [
        { subject: "HATHA", type: "GROUP" },
        { subject: "VINYASA", type: "INDIVIDUAL" },
        { subject: "YIN", type: "ONLINE" },
        { subject: "VINYASA", type: "GROUP" },
      ],
      // Tuesday (day 1)
      [
        { subject: "VINYASA", type: "ONLINE" },
        { subject: "YIN", type: "INDIVIDUAL" },
        { subject: "HATHA", type: "ONLINE" },
        { subject: "HATHA", type: "GROUP" },
      ],
      // Wednesday (day 2)
      [
        { subject: "YIN", type: "GROUP" },
        { subject: "HATHA", type: "INDIVIDUAL" },
        { subject: "VINYASA", type: "GROUP" },
        { subject: "VINYASA", type: "ONLINE" },
      ],
      // Thursday (day 3)
      [
        { subject: "HATHA", type: "ONLINE" },
        { subject: "VINYASA", type: "INDIVIDUAL" },
        { subject: "YIN", type: "GROUP" },
        { subject: "HATHA", type: "GROUP" },
      ],
      // Friday (day 4)
      [
        { subject: "VINYASA", type: "GROUP" },
        { subject: "HATHA", type: "ONLINE" },
        { subject: "YIN", type: "ONLINE" },
        { subject: "VINYASA", type: "INDIVIDUAL" },
      ],
      // Saturday (day 5)
      [
        { subject: "HATHA", type: "GROUP" },
        { subject: "VINYASA", type: "ONLINE" },
        { subject: "YIN", type: "INDIVIDUAL" },
        { subject: "YIN", type: "GROUP" },
      ],
    ],
  ];

  for (let w = 0; w < 2; w++) {
    const weekMon = new Date(baseMonday);
    weekMon.setDate(baseMonday.getDate() + w * 7);

    for (let d = 0; d < 6; d++) {
      const currentDay = new Date(weekMon);
      currentDay.setDate(weekMon.getDate() + d);
      const dateStr = formatISODate(currentDay);
      const dayPattern = matrixPatterns[w][d];

      for (let t = 0; t < TIME_SLOTS.length; t++) {
        const item = dayPattern[t];
        if (item) {
          schedule.push({
            id: `w${w}-d${d}-t${t}`,
            date: dateStr,
            time: TIME_SLOTS[t],
            subject: item.subject,
            classType: item.type,
          });
        }
      }
    }
  }

  return schedule;
}
