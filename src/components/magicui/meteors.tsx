import { cn } from "../../lib/utils";
import { useMemo } from "react";

interface MeteorsProps {
  number?: number;
  className?: string;
}

export const Meteors = ({ number = 20, className }: MeteorsProps) => {
  const meteorStyles = useMemo(() => {
    return Array.from({ length: number }).map(() => ({
      left: Math.floor(Math.random() * 140) - 20 + "%",
      animationDelay: (Math.random() * 2 + 0.2).toFixed(2) + "s",
      animationDuration: (Math.random() * 3 + 1.5).toFixed(2) + "s",
    }));
  }, [number]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {meteorStyles.map((style, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor absolute top-0 h-0.5 w-0.5 rounded-[9999px] bg-amber-100 shadow-[0_0_8px_rgba(245,158,11,0.8),0_0_2px_rgba(255,255,255,1)] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:left-0 before:transform before:-translate-y-[50%] before:w-[60px] before:h-[1px] before:bg-gradient-to-r before:from-amber-300/80 before:to-transparent",
            className
          )}
          style={style}
        ></span>
      ))}
    </div>
  );
};

