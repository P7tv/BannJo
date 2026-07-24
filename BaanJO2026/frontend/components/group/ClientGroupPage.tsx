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
      {/* Full Group Reveal Poster as Main Background */}
      <Image
        src={imagePath}
        alt={`${hormone} ${group}`}
        fill
        style={{ objectFit: "contain", objectPosition: "top" }}
        className="transition-smooth animate-severe-zoom-in z-0 pointer-events-none"
        priority
      />

      {/* Content Container overlaid seamlessly across Mobile, iPad/Tablet, and Desktop */}
      <div className="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-xl flex flex-col items-center px-4 pt-[45vh] sm:pt-[48vh] md:pt-[52vh] lg:pt-[56vh] pb-12 space-y-4">
        {/* Student Welcome */}
        <div className="animate-slide-up animate-delay-300 text-center w-full">
          <StudentWelcome
            firstName={firstName}
            nickname={nickname}
            hormone={hormone}
          />
        </div>

        {/* LINE OpenChat QR Code */}
        <div className="animate-slide-up animate-delay-400 w-full max-w-xs sm:max-w-sm">
          <HouseOpenChatQR group={group} />
        </div>

        {/* Back to Home Button */}
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
