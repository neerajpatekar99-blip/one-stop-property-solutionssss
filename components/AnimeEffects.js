"use client";

import { useEffect, useRef } from "react";

/**
 * AnimeNumberCounter
 * Uses anime.js to count up numbers smoothly when in view
 */
export function AnimeNumberCounter({ endValue, prefix = "", suffix = "", duration = 1800, decimals = 0 }) {
  const numRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let observer;
    let animInstance;

    const startAnimation = async (targetElement) => {
      try {
        const animeModule = await import("animejs");
        const anime = animeModule.default || animeModule;

        const numericEnd = parseFloat(endValue);
        const obj = { val: 0 };

        animInstance = anime({
          targets: obj,
          val: numericEnd,
          round: decimals > 0 ? Math.pow(10, decimals) : 1,
          easing: "easeOutExpo",
          duration: duration,
          update: () => {
            if (numRef.current) {
              const formatted = decimals > 0 
                ? obj.val.toFixed(decimals) 
                : Math.round(obj.val).toString();
              numRef.current.textContent = `${prefix}${formatted}${suffix}`;
            }
          },
        });
      } catch (err) {
        // Fallback if anime fails to load
        if (numRef.current) {
          numRef.current.textContent = `${prefix}${endValue}${suffix}`;
        }
      }
    };

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
      if (animInstance && animInstance.pause) animInstance.pause();
    };
  }, [endValue, prefix, suffix, duration, decimals]);

  return (
    <span ref={containerRef} className="inline-block font-bold">
      <span ref={numRef}>{prefix}0{suffix}</span>
    </span>
  );
}

/**
 * AnimeAura
 * Creates a breathing royal gold glow aura around important elements
 */
export function AnimeAura({ children, className = "" }) {
  const auraRef = useRef(null);

  useEffect(() => {
    let animInstance;
    const initAura = async () => {
      try {
        const animeModule = await import("animejs");
        const anime = animeModule.default || animeModule;
        if (!auraRef.current) return;

        animInstance = anime({
          targets: auraRef.current,
          opacity: [0.35, 0.75, 0.35],
          scale: [0.99, 1.02, 0.99],
          easing: "easeInOutSine",
          duration: 3200,
          loop: true,
        });
      } catch (err) {
        // Ignore fallback
      }
    };

    initAura();

    return () => {
      if (animInstance && animInstance.pause) animInstance.pause();
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={auraRef}
        className="absolute -inset-1.5 bg-gradient-to-r from-gold/30 via-brand/20 to-gold/30 rounded-[2.5rem] blur-xl pointer-events-none -z-10"
      />
      {children}
    </div>
  );
}
