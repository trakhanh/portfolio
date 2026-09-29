"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

/** Image that sits on a shimmering placeholder, then resolves from blur once loaded. */
export function FadeImage({ className, wrapperClassName, onLoad, ...props }: ImageProps & { wrapperClassName?: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-kelp", wrapperClassName)}>
      {!loaded && (
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          <div className="animate-shimmer absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(232,246,255,0.06),transparent)]" />
        </div>
      )}
      <Image
        {...props}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
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
