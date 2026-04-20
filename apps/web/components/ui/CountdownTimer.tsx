"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative bg-navy/80 backdrop-blur-sm rounded-xl px-4 py-3 sm:px-6 sm:py-4 min-w-[60px] sm:min-w-[80px] border border-white/10">
        <span className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
        {/* Flip line */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
      </div>
      <span className="mt-2 text-xs sm:text-sm font-medium text-white/50 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft(targetDate));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="flex items-center gap-3 sm:gap-4">
        {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
          <Digit key={label} value={0} label={label} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <Digit value={timeLeft.days} label="Days" />
      <span className="text-2xl sm:text-4xl font-bold text-gold mt-[-1.5rem]">
        :
      </span>
      <Digit value={timeLeft.hours} label="Hours" />
      <span className="text-2xl sm:text-4xl font-bold text-gold mt-[-1.5rem]">
        :
      </span>
      <Digit value={timeLeft.minutes} label="Minutes" />
      <span className="text-2xl sm:text-4xl font-bold text-gold mt-[-1.5rem]">
        :
      </span>
      <Digit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}
