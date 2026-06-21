"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  backgroundVideos,
  type BackgroundVideoKey,
} from "@/data/videos";

interface VideoBackgroundProps {
  video?: BackgroundVideoKey;
  src?: string;
  poster?: string;
  opacity?: number;
  overlay?: "hero" | "section" | "cta";
  className?: string;
}

const overlays = {
  hero: "linear-gradient(to bottom, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0.55) 40%, rgba(5,5,5,0.92) 100%)",
  section:
    "linear-gradient(135deg, rgba(5,5,5,0.92) 0%, rgba(8,17,31,0.82) 50%, rgba(5,5,5,0.94) 100%)",
  cta: "linear-gradient(to top, rgba(5,5,5,0.94) 0%, rgba(8,17,31,0.78) 50%, rgba(5,5,5,0.92) 100%)",
};

export function VideoBackground({
  video = "hero",
  src,
  poster,
  opacity,
  overlay = "hero",
  className,
}: VideoBackgroundProps) {
  const config = backgroundVideos[video];
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const slowConnection =
      "connection" in navigator &&
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

    const shouldPlay = !reducedMotion.matches && !slowConnection;
    setEnabled(shouldPlay);

    const onChange = () => {
      setEnabled(!reducedMotion.matches && !slowConnection);
    };

    reducedMotion.addEventListener("change", onChange);
    return () => reducedMotion.removeEventListener("change", onChange);
  }, []);

  const videoSrc = src ?? config.src;
  const videoPoster = poster ?? config.poster;
  const videoOpacity = opacity ?? config.opacity;

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {enabled ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: videoOpacity }}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster={videoPoster}
          aria-hidden
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${videoPoster})` }}
          aria-hidden
        />
      )}
      <div
        className="absolute inset-0"
        style={{ background: overlays[overlay] }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.45)_100%)]"
        aria-hidden
      />
    </div>
  );
}

interface VideoSectionProps {
  children: React.ReactNode;
  video?: BackgroundVideoKey;
  overlay?: VideoBackgroundProps["overlay"];
  className?: string;
  minHeight?: string;
}

export function VideoSection({
  children,
  video = "hero",
  overlay = "hero",
  className,
  minHeight,
}: VideoSectionProps) {
  return (
    <section
      className={cn("relative overflow-hidden", className)}
      style={minHeight ? { minHeight } : undefined}
    >
      <VideoBackground video={video} overlay={overlay} />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
