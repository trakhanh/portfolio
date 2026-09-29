"use client";

import * as React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  /** Max tilt in degrees; 0 disables the 3D tilt. */
  tilt?: number;
  variant?: "raised" | "deep" | "solid";
}

/**
 * Liquid glass pane: frosted surface plus a specular highlight and rim light
 * that follow the pointer, with an optional spring-driven 3D tilt.
 */
export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(function GlassCard(
  { className, tilt = 0, variant = "raised", style, onPointerMove, onPointerLeave, onPointerEnter, children, ...props },
  forwardedRef,
) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(forwardedRef, () => ref.current as HTMLDivElement);
  const reduce = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 180, damping: 22 });
  const sy = useSpring(py, { stiffness: 180, damping: 22 });
  const rotateY = useTransform(sx, [0, 1], [-tilt, tilt]);
  const rotateX = useTransform(sy, [0, 1], [tilt, -tilt]);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (el && e.pointerType === "mouse") {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty("--mx", `${x * 100}%`);
      el.style.setProperty("--my", `${y * 100}%`);
      if (!reduce) {
        px.set(x);
        py.set(y);
      }
    }
    onPointerMove?.(e);
  };

  const handleEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") ref.current?.style.setProperty("--spot", "1");
    onPointerEnter?.(e);
  };

  const handleLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    ref.current?.style.setProperty("--spot", "0");
    px.set(0.5);
    py.set(0.5);
    onPointerLeave?.(e);
  };

  // Tilt is bound whenever requested and simply never moves under reduced motion:
  // useReducedMotion() differs between server and client, so gating the style on
  // it broke hydration.
  const useTilt = tilt > 0;

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      style={useTilt ? { rotateX, rotateY, transformPerspective: 1000, ...style } : style}
      className={cn(variant === "deep" ? "glass-deep" : variant === "solid" ? "glass-solid" : "glass", "glass-spotlight", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
});
