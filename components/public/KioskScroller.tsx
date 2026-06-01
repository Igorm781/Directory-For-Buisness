"use client";

import { useEffect, useRef } from "react";

export function KioskScroller({ children, enabled, speed = 30 }: { children: React.ReactNode; enabled: boolean; speed?: number }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    let scrollPos = 0;
    // pixel per frame based on speed setting, 30 means somewhat slow
    const pixelsPerFrame = speed / 60;

    const scroll = () => {
      if (el) {
        scrollPos += pixelsPerFrame;
        el.scrollTop = scrollPos;
        
        // If we hit the bottom, wait a bit and reset to top
        if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
          scrollPos = 0;
          el.scrollTop = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [enabled, speed]);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <div ref={scrollRef} className="h-[calc(100vh-140px)] overflow-hidden">
      <div className="pb-40">
        {children}
      </div>
    </div>
  );
}
