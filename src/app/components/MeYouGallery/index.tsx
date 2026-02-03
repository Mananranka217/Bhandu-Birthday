import React, { useState, useEffect } from "react";
import { Heart, Sparkles } from "lucide-react";
import celebrateGif from "../../../images/celebrate.gif";

// This component auto-loads all images from a `me-and-you` folder inside `src/images`
const getMeYouImages = () => {
  const modules = (import.meta as any).glob("../../../images/me-and-you/*.{png,jpg,jpeg,gif}", {
    eager: true,
  }) as Record<string, { default: string }>;

  return Object.values(modules)
    .map((mod) => mod?.default ?? mod)
    .filter(Boolean) as string[];
};

export function MeYouGallery() {
  const images = getMeYouImages();
  const [visibleImages, setVisibleImages] = useState<boolean[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);
    // Stagger image animations
    const timers = images.map((_, idx) => 
      setTimeout(() => {
        setVisibleImages(prev => {
          const newArr = [...prev];
          newArr[idx] = true;
          return newArr;
        });
      }, idx * 100 + 200)
    );
    return () => timers.forEach(timer => clearTimeout(timer));
  }, [images.length]);

  if (!images.length) {
    return (
      <div className="flex flex-col items-center gap-3 bg-white/70 rounded-2xl px-4 py-6 shadow-sm border border-purple-100 animate-fade-in">
        <img
          src={celebrateGif}
          alt="celebrate"
          className="w-24 h-24 object-contain rounded-full border-2 border-purple-200 shadow-sm"
          draggable={false}
        />
        <p className="text-sm sm:text-base text-[#9B7FB8] text-center max-w-md">
          Add your photos to{" "}
          <code className="px-1 py-0.5 rounded bg-purple-50 border border-purple-100 text-xs">
            src/images/me-and-you
          </code>{" "}
          to see them here, all filled with <strong>me &amp; you</strong>.
        </p>
      </div>
    );
  }

  return (
    <div 
      className={`w-full max-w-4xl mx-auto flex flex-col items-center gap-6 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex flex-col items-center gap-3 animate-fade-in">
        <div className="flex items-center gap-2">
          <Heart className="text-purple-500 size-6 fill-purple-400 animate-pulse" />
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            Me &amp; You 💕
          </h2>
          <Sparkles className="text-purple-400 size-5 animate-pulse" />
        </div>
        <p className="text-base sm:text-lg text-[#B19CD9] text-center max-w-xl font-medium">
          Our beautiful memories together. Every picture is just{" "}
          <span className="font-bold text-purple-600">me &amp; you</span>.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 w-full">
        {images.map((src, idx) => (
          <div
            key={src + idx}
            className={`relative group rounded-3xl overflow-hidden shadow-lg bg-purple-50 border-2 border-purple-200/50 cursor-pointer transform transition-all duration-500 ${
              visibleImages[idx] 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-90 translate-y-4'
            } hover:scale-105 hover:shadow-2xl hover:border-purple-300 hover:z-10`}
            style={{ transitionDelay: `${idx * 50}ms` }}
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={src}
                alt={`Me and You ${idx + 1}`}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                draggable={false}
                loading="lazy"
              />
              {/* Animated overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Floating hearts animation on hover */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Heart className="absolute top-2 left-2 text-white/80 size-4 fill-white/60 animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }} />
                <Heart className="absolute top-4 right-3 text-white/80 size-3 fill-white/60 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }} />
                <Sparkles className="absolute bottom-3 left-3 text-white/70 size-3 animate-pulse" style={{ animationDelay: '1s' }} />
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 via-black/30 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center justify-between text-xs sm:text-sm text-white">
                  <span className="font-bold flex items-center gap-1">
                    <Heart className="size-3 fill-white" />
                    Me &amp; You
                  </span>
                  <span className="px-2 py-1 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 font-semibold">
                    #{idx + 1}
                  </span>
                </div>
              </div>
            </div>

            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
}


