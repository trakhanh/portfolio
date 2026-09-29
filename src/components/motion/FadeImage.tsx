"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

/**
 * Image that sits on a shimmering placeholder, then resolves from blur once loaded.
 * It must never stay invisible: a picture that finished loading before React
 * attached its handler (cache, back navigation) or whose request was cut off
 * mid-navigation would otherwise wait for a load event that never comes.
 */
export function FadeImage({ className, wrapperClassName, onLoad, onError, ...props }: ImageProps & { wrapperClassName?: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const img = ref.current;
    if (!img) return;
    const ready = () => img.complete && img.naturalWidth > 0;
    if (ready()) {
      setLoaded(true);
      return;
    }
    // Safety net for a missed load event; lazy images simply load later and fire onLoad.
    const timer = window.setInterval(() => {
      if (ready()) {
        setLoaded(true);
        window.clearInterval(timer);
      }
    }, 1500);
    return () => window.clearInterval(timer);
  }, [props.src, attempt]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-kelp", wrapperClassName)}>
      {!loaded && (
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          <div className="animate-shimmer absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(232,246,255,0.06),transparent)]" />
        </div>
      )}
      <Image
        key={attempt}
        ref={ref}
        {...props}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          // One fresh request (e.g. after a request aborted by a page switch).
          if (attempt === 0) setAttempt(1);
          onError?.(e);
        }}
        className={cn(
          "transition-[opacity,filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          loaded ? "blur-0 scale-100 opacity-100" : "scale-[1.04] opacity-0 blur-md",
          className,
        )}
      />
    </div>
  );
}
