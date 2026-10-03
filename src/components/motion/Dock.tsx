"use client";

import { createContext, useContext, useRef, type ComponentProps, type PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

const FAR = 1e6;
const DockContext = createContext<MotionValue<number> | null>(null);

/**
 * A row whose items swell toward the pointer, dock-style. Wrap each item's
 * icon in <DockScale>; the row itself only tracks the pointer's x. Adapted from
 * React Bits' Dock, minus its fixed panel so it can sit in any layout.
 */
export function Dock({ className, children, ...props }: ComponentProps<"ul">) {
  const x = useMotionValue(FAR);
  const onMove = (e: PointerEvent<HTMLUListElement>) => {
    if (e.pointerType === "mouse") x.set(e.clientX);
  };
  return (
    <DockContext.Provider value={x}>
      <ul className={className} onPointerMove={onMove} onPointerLeave={() => x.set(FAR)} {...props}>
        {children}
      </ul>
    </DockContext.Provider>
  );
}

export function DockScale({ className, max = 1.3, range = 150, children }: { className?: string; max?: number; range?: number; children: React.ReactNode }) {
  const x = useContext(DockContext);
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const fallback = useMotionValue(FAR);
  const pointer = x ?? fallback;
  const distance = useTransform(pointer, (v) => {
    const r = ref.current?.getBoundingClientRect();
    return r ? v - (r.left + r.width / 2) : FAR;
  });
  const target = useTransform(distance, [-range, 0, range], [1, reduce ? 1 : max, 1]);
  const scale = useSpring(target, { mass: 0.1, stiffness: 170, damping: 14 });
  return (
    <motion.span ref={ref} style={{ scale }} className={cn("inline-grid", className)}>
      {children}
    </motion.span>
  );
}
