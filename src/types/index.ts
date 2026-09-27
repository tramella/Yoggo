export type YogaStyle = "HATHA" | "VINYASA" | "YIN" | "KUNDALINI" | "ASHTANGA";
export type ClassType = "GROUP" | "INDIVIDUAL" | "ONLINE";

export interface ScheduleItem {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // "09:00 AM - 10:00 AM"
  subject: YogaStyle;
  classType: ClassType;
}

export interface DayInfo {
  name: string;
  date: number;
  full: Date;
  dateStr: string;
}

export interface AccordionItemData {
  id: string;
  title: string;
  heading: string;
  description: string;
  image: string;
  linkText?: string;
  linkHref?: string;
}

export interface Instructor {
  id: string;
  name: string;
  style: YogaStyle;
  image: string;
  gridClass?: string;
}

export interface ClassTier {
  id: string;
  title: string;
  price: string;
  image?: string;
}
