import React from "react";
import { ClassType, YogaStyle } from "@/types";
import { Dropdown } from "@/components/ui/Dropdown";
import { CLASS_TYPES, YOGA_STYLES } from "@/lib/schedule";

interface ScheduleFilterProps {
  selectedClassType: ClassType;
  selectedStyle: YogaStyle;
  onClassTypeChange: (type: ClassType) => void;
  onStyleChange: (style: YogaStyle) => void;
}

export const ScheduleFilter: React.FC<ScheduleFilterProps> = ({
  selectedClassType,
  selectedStyle,
  onClassTypeChange,
  onStyleChange,
}) => {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Class Type Filter */}
      <Dropdown<ClassType>
        value={selectedClassType}
        options={CLASS_TYPES as unknown as ClassType[]}
        onChange={onClassTypeChange}
        className="w-36 sm:w-40"
      />

      {/* Yoga Style Filter */}
      <Dropdown<YogaStyle>
        value={selectedStyle}
        options={YOGA_STYLES as unknown as YogaStyle[]}
        onChange={onStyleChange}
        className="w-36 sm:w-40"
      />
    </div>
  );
};
