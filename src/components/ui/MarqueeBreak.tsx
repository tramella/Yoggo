import React from "react";
import Image from "next/image";

interface MarqueeBreakProps {
  text: string;
  repeatCount?: number;
}

export const MarqueeBreak: React.FC<MarqueeBreakProps> = ({
  text,
  repeatCount = 10,
}) => {
  const items = Array.from({ length: repeatCount });

  return (
    <section className="SectionBreak select-none">
      <div className="BreakLine">
        <div className="MarqueeContent">
          {/* First loop track */}
          <div className="EachBreak">
            {items.map((_, i) => (
              <React.Fragment key={`p1-${i}`}>
                <span>{text}</span>
                <Image
                  src="/images/star copy.png"
                  alt="*"
                  width={18}
                  height={18}
                  className="icon-break inline-block"
                />
              </React.Fragment>
            ))}
          </div>

          {/* Second loop track to create endless loop */}
          <div className="EachBreak" aria-hidden="true">
            {items.map((_, i) => (
              <React.Fragment key={`p2-${i}`}>
                <span>{text}</span>
                <Image
                  src="/images/star copy.png"
                  alt="*"
                  width={18}
                  height={18}
                  className="icon-break inline-block"
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
