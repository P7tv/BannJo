"use client";

import { useStudent } from "../../contexts/StudentContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, Suspense, lazy } from "react";
import Image from "next/image";

// Lazy load components for better performance
import HormoneImage from "./HormoneImage";
import StudentWelcome from "./StudentWelcome";
import HouseOpenChatQR from "./HouseOpenChatQR";
import NavigationButton from "../ui/NavigationButton";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function ClientGroupPage() {
  const { student, clearStudent } = useStudent();
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  // Redirect to home if no student data
  useEffect(() => {
    if (!student) {
      router.push("/");
    }
  }, [student, router]);

  const handleBackToHome = useCallback(() => {
    setIsExiting(true);
    // Clear student data and wait for exit animation
    setTimeout(() => {
      clearStudent();
      router.push("/");
    }, 600);
  }, [clearStudent, router]);

  if (!student) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LoadingSpinner message="Loading..." />
      </Suspense>
    );
  }

  const { group, hormone, firstName, nickname } = student;

  // Construct the 2026 image path: /images/[hormone]/[group].webp
  const imagePath = `/images/${hormone}/${group}.webp`;

  return (
    <div
      className={`relative min-h-screen w-full flex flex-col items-center bg-black transition-all duration-700 ease-out ${
        isExiting ? "animate-page-exit" : "animate-page-enter"
      }`}
    >
      {/* Container for Poster Image + Centered Welcome Overlay */}
      <div className="relative w-full max-w-lg mx-auto shadow-2xl aspect-[1080/1920] bg-zinc-900 flex-shrink-0">
        <Image
          src={imagePath}
          alt={`${hormone} ${group}`}
          fill
          className="object-cover transition-smooth animate-severe-zoom-in pointer-events-none"
          priority
        />
        
        {/* Absolute Overlay for Text - Centered over the Poster */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-sm sm:max-w-md">
            <StudentWelcome
              firstName={firstName}
              nickname={nickname}
              hormone={hormone}
              group={group}
            />
          </div>
        </div>

        {/* Scroll Down Indicator at the bottom of the Poster */}
        <div className="absolute bottom-6 left-0 w-full flex flex-col items-center space-y-1 animate-bounce text-amber-300 text-xs sm:text-sm font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
          <span>เลื่อนลงเพื่อสแกน QR Code</span>
          <span className="text-xl">👇</span>
        </div>
      </div>

      {/* SECTION 2: QR Code & Navigation Button - Placed exactly below the poster! */}
      <div className="w-full flex flex-col items-center px-4 pt-10 pb-20 bg-black space-y-8 z-10">
        <div className="animate-slide-up animate-delay-400 w-full max-w-xs sm:max-w-sm">
          <HouseOpenChatQR group={group} />
        </div>

        <div className="animate-slide-up animate-delay-500 w-full max-w-xs pt-4">
          <NavigationButton 
            onClick={handleBackToHome} 
            isExiting={isExiting}
            className="w-full py-3.5 px-8 sm:py-4 sm:px-10 text-base sm:text-lg font-bold transform transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
          >
            {"← หน้าแรก"}
          </NavigationButton>
        </div>
      </div>
    </div>
  );
}
