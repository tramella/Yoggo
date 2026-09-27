import React from "react";

interface SectionHeaderProps {
  title: string;
  linkText?: string;
  onLinkClick?: () => void;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  linkText,
  onLinkClick,
  className = "",
}) => {
  return (
    <div className={`mb-10 select-none border-b-[1.5px] border-[#2e2e2e] pb-2 ${className}`}>
      <div className="flex items-baseline justify-between">
        <h2 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] font-normal text-black tracking-tight leading-none uppercase">
          {title}
        </h2>
        {linkText && (
          <button
            type="button"
            onClick={onLinkClick}
            className="text-sm sm:text-base md:text-[20px] font-medium text-black hover:opacity-60 transition-opacity cursor-pointer"
          >
            {linkText}
          </button>
        )}
      </div>
    </div>
  );
};
