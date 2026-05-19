import { cn } from "../../lib/utils";
import { useMemo } from "react";

interface MeteorsProps {
  number?: number;
  className?: string;
}

export const Meteors = ({ number = 20, className }: MeteorsProps) => {
  const meteorStyles = useMemo(() => {
    return Array.from({ length: number }).map(() => ({
      left: Math.floor(Math.random() * 120) - 20 + "%",
      animationDelay: Math.random() * 0.6 + 0.2 + "s",
      animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
    }));
  }, [number]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {meteorStyles.map((style, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor absolute top-0 h-0.5 w-0.5 rounded-[9999px] bg-slate-300 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-slate-400 before:to-transparent",
            className
          )}
          style={style}
        ></span>
      ))}
    </div>
  );
};

