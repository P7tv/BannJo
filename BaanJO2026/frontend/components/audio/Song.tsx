"use client";

import React, { useRef, useEffect, useState } from "react";

export const Song = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [interactionTriggered, setInteractionTriggered] = useState(false);

  // Enhanced user interaction detection for mobile and desktop
  useEffect(() => {
    if (interactionTriggered) return;

    const handleUserInteraction = async (event: Event) => {
      if (interactionTriggered || !audioRef.current) return;

      try {
        const audio = audioRef.current;
        audio.volume = 0;
        
        // Attempt play safely
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
        }

        setInteractionTriggered(true);

        // Fast fade-in with lower comfortable volume
        const targetVolume = 0.3; // Lower volume (30%)
        const duration = 500; // Fast fade-in (0.5s)
        const steps = 20;
        const increment = targetVolume / steps;
        const interval = duration / steps;

        let currentStep = 0;
        const fade = setInterval(() => {
          if (audio.paused || currentStep >= steps) {
            clearInterval(fade);
            audio.volume = targetVolume;
          } else {
            audio.volume = Math.min(increment * currentStep, targetVolume);
            currentStep++;
          }
        }, interval);

        removeListeners(); // ✅ remove listeners after success
      } catch (err) {
        // Silently ignore Autoplay policy restrictions until user performs next click/tap
      }
    };

    const removeListeners = () => {
      // User gesture events (click, touch, keydown, pointerdown)
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("pointerdown", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };

    // Add event listeners for valid user gesture activations only
    document.addEventListener("click", handleUserInteraction, { once: false });
    document.addEventListener("pointerdown", handleUserInteraction, { once: false });
    document.addEventListener("touchstart", handleUserInteraction, { once: false });
    document.addEventListener("keydown", handleUserInteraction, { once: false });

    return removeListeners;
  }, [interactionTriggered, audioRef]);

  console.log("Audio component mounted");

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/conan.mp3"
        loop
        preload="auto"
        onError={(e) => {
          console.warn("conan.mp3 not found, falling back to main.mp3", e);
          if (audioRef.current && audioRef.current.src.includes("conan.mp3")) {
            audioRef.current.src = "/audio/main.mp3";
            audioRef.current.play().catch(() => {});
          }
        }}
        className="w-full h-full absolute top-0 left-0"
      />
    </>
  );
};
