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
      className={`relative min-h-screen w-full flex flex-col items-center overflow-y-auto bg-black transition-all duration-700 ease-out ${
        isExiting ? "animate-page-exit" : "animate-page-enter"
      }`}
    >
      {/* Full Group Reveal Poster as Main Background for First View */}
      <div className="absolute top-0 left-0 w-full h-[100dvh] z-0 pointer-events-none">
        <Image
          src={imagePath}
          alt={`${hormone} ${group}`}
          fill
          style={{ objectFit: "contain", objectPosition: "top" }}
          className="transition-smooth animate-severe-zoom-in"
          priority
        />
      </div>

      {/* SECTION 1: Centered Welcome Greeting over Poster (First View 100vh) */}
      <div className="relative z-10 w-full min-h-screen h-[100dvh] flex flex-col items-center justify-between px-4 pt-16 pb-8">
        <div className="flex-1 flex flex-col items-center justify-center text-center w-full max-w-md sm:max-w-lg">
          <div className="animate-slide-up animate-delay-300">
            <StudentWelcome
              firstName={firstName}
              nickname={nickname}
              hormone={hormone}
              group={group}
            />
          </div>
        </div>

        {/* Scroll Down Indicator at bottom of first view */}
        <div className="animate-bounce text-amber-300 text-xs sm:text-sm font-bold flex flex-col items-center space-y-1 drop-shadow-[0_2px_6px_rgba(0,0,0,1)] pb-4">
          <span>เลื่อนลงเพื่อสแกน QR Code</span>
          <span className="text-xl">👇</span>
        </div>
      </div>

      {/* SECTION 2: QR Code & Navigation Button placed strictly below poster view */}
      <div className="relative z-10 w-full flex flex-col items-center px-4 py-16 space-y-8 bg-black">
        <div className="animate-slide-up animate-delay-400 w-full max-w-xs sm:max-w-sm">
          <HouseOpenChatQR group={group} />
        </div>

        <div className="animate-slide-up animate-delay-500 w-full max-w-xs pt-2">
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
