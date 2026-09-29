"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowLeft, ArrowRight, Hand } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "./Reveal";
import { useLite } from "@/lib/perf";

interface CarouselDeckProps<T> {
  items: readonly T[];
  getKey: (item: T) => string;
  renderSlide: (item: T, index: number) => React.ReactNode;
  /** Tailwind basis classes for each slide. */
  slideClassName?: string;
  autoplay?: boolean;
  label: string;
  /** Scale / opacity of slides furthest from centre. */
  minScale?: number;
  minOpacity?: number;
}

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

/**
 * Embla (shadcn Carousel) with motion layered on top:
 * - slides scale and dim with distance from the centre while you drag,
 * - images inside `[data-parallax]` drift against the drag direction,
 * - cards compress slightly while the pointer is down,
 * - a spring-driven progress rail, counter and dot index.
 */
export function CarouselDeck<T>({
  items,
  getKey,
  renderSlide,
  slideClassName,
  autoplay = false,
  label,
  minScale = 0.86,
  minOpacity = 0.4,
}: CarouselDeckProps<T>) {
  const { ui } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [dragging, setDragging] = useState(false);
  const progress = useMotionValue(0);
  const progressSpring = useSpring(progress, { stiffness: 200, damping: 30 });
  const tweenFactor = useRef(0);
  const lite = useLite();

  const plugins = useMemo(
    () => (autoplay ? [Autoplay({ delay: 4200, stopOnInteraction: false, stopOnMouseEnter: true })] : []),
    [autoplay],
  );

  const tween = useCallback((emblaApi: NonNullable<CarouselApi>, eventName?: string) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const inView = emblaApi.slidesInView();
    const isScroll = eventName === "scroll";
    const nodes = emblaApi.slideNodes();

    emblaApi.scrollSnapList().forEach((snap, snapIndex) => {
      let diff = snap - scrollProgress;
      engine.slideRegistry[snapIndex].forEach((slideIndex) => {
        if (isScroll && !inView.includes(slideIndex)) return;
        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();
            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);
              if (sign === -1) diff = snap - (1 + scrollProgress);
              if (sign === 1) diff = snap + (1 - scrollProgress);
            }
          });
        }
        const distance = Math.abs(diff * tweenFactor.current);
        const t = clamp(1 - distance, 0, 1);
        const node = nodes[slideIndex];
        const layer = node.querySelector<HTMLElement>("[data-tween]");
        if (layer) {
          layer.style.transform = `scale(${minScale + t * (1 - minScale)})`;
          layer.style.opacity = String(minOpacity + t * (1 - minOpacity));
        }
        const img = node.querySelector<HTMLElement>("[data-parallax]");
        if (img) img.style.transform = `translateX(${clamp(diff * tweenFactor.current * -8, -4.5, 4.5)}%)`;
      });
    });
  }, [minScale, minOpacity]);

  useEffect(() => {
    if (!api) return;
    const setFactor = () => {
      tweenFactor.current = 0.42 * api.scrollSnapList().length;
    };
    const onSelect = () => setSelected(api.selectedScrollSnap());
    const onScroll = () => {
      progress.set(clamp(api.scrollProgress(), 0, 1));
      tween(api, "scroll");
    };
    const onInit = () => {
      setSnaps(api.scrollSnapList());
      setFactor();
      onSelect();
      tween(api);
    };
    const down = () => setDragging(true);
    const up = () => setDragging(false);

    onInit();
    api.on("reInit", onInit).on("select", onSelect).on("scroll", onScroll).on("slideFocus", () => tween(api));
    api.on("pointerDown", down).on("pointerUp", up).on("settle", up);
    return () => {
      api.off("reInit", onInit).off("select", onSelect).off("scroll", onScroll);
      api.off("pointerDown", down).off("pointerUp", up).off("settle", up);
    };
  }, [api, tween, progress]);

  const count = items.length;

  return (
    <div className="group/deck" data-dragging={dragging}>
      <Carousel
        setApi={setApi}
        plugins={plugins}
        opts={{ align: "center", loop: count > 2, duration: 34 }}
        aria-label={label}
        className="relative"
      >
        <CarouselContent className={cn("-ml-5 py-4", dragging ? "cursor-grabbing" : "cursor-grab")}>
          {items.map((item, i) => (
            <CarouselItem key={getKey(item)} className={cn("pl-5", slideClassName)}>
              <motion.div
                initial={{ opacity: 0, x: 80, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.9, delay: Math.min(i, 4) * 0.08, ease: EASE_OUT, filter: lite ? { duration: 0 } : undefined }}
                className="h-full"
              >
                <div data-tween className="h-full origin-center will-change-transform">
                  <div className="h-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[dragging=true]/deck:scale-[0.97]">
                    {renderSlide(item, i)}
                  </div>
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Controls */}
      <div className="container-auros mt-8 flex items-center gap-5 sm:pr-24">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            aria-label={ui.prev}
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-mist/15 bg-deep/70 text-mist transition-all hover:-translate-x-0.5 hover:border-signal/60 hover:text-signal"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => api?.scrollNext()}
            aria-label={ui.next}
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-mist/15 bg-deep/70 text-mist transition-all hover:translate-x-0.5 hover:border-signal/60 hover:text-signal"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>

        <p className="w-16 font-mono text-sm text-silver tabular-nums">
          <span className="text-white">{String(selected + 1).padStart(2, "0")}</span> / {String(count).padStart(2, "0")}
        </p>

        <div className="relative h-px flex-1 bg-mist/12">
          <motion.div style={{ scaleX: progressSpring }} className="absolute inset-0 origin-left bg-signal" />
        </div>

        <div className="hidden items-center gap-1.5 sm:flex">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className="relative h-2 cursor-pointer rounded-full bg-mist/20 transition-[width,background] duration-500"
              style={{ width: i === selected ? 24 : 8 }}
            >
              {i === selected && <motion.span layoutId={`dot-${label}`} className="absolute inset-0 rounded-full bg-signal" />}
            </button>
          ))}
        </div>

        <p className="hidden items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-slate uppercase lg:flex">
          <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
            <Hand className="size-3.5" />
          </motion.span>
          {ui.dragHint}
        </p>
      </div>
    </div>
  );
}
