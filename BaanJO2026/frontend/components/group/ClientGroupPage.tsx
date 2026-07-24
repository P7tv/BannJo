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

  // Construct the 2026 image path: /images/[hormone]/[group].png
  const imagePath = `/images/${hormone}/${group}.png`;

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

      {/* Content Container overlaid higher up */}
      <div className="relative z-10 w-full flex flex-col items-center px-4 pt-[45vh] sm:pt-[48vh] pb-10 space-y-4">
        {/* Student Welcome */}
        <div className="animate-slide-up animate-delay-300 text-center">
          <StudentWelcome
            firstName={firstName}
            nickname={nickname}
            hormone={hormone}
          />
        </div>

        {/* LINE OpenChat QR Code */}
        <div className="animate-slide-up animate-delay-400 w-full max-w-sm">
          <HouseOpenChatQR group={group} />
        </div>

        {/* Back to Home Button */}
        <div className="animate-slide-up animate-delay-500 w-full max-w-xs pt-2">
          <NavigationButton 
            onClick={handleBackToHome} 
            isExiting={isExiting}
            className="w-full py-3 px-8 text-base font-bold transform transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {"← หน้าแรก"}
          </NavigationButton>
        </div>
      </div>
    </div>
  );
}
