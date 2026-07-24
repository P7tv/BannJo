"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

// Lazy load components for better performance
import HomeInput from "../input/HomeInput";

export default function ClientHomePage() {
  const [showText, setShowText] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [showInput, setShowInput] = useState(true);

  const handleValidation = useCallback((valid: boolean, studentData?: any) => {
    setIsValid(valid);
    
    if (valid) {
      setValidationMessage("ยินดีต้อนรับ!");
      setShowText(true);
    } else {
      setValidationMessage("ไม่พบข้อมูล");
      setShowText(true);
      // Hide error message after 3 seconds
      setTimeout(() => {
        setShowText(false);
        setIsValid(null);
      }, 3000);
    }
  }, []);

  return (
    <>
      {/* Input container with enhanced drop animation */}
      {showInput && (
        <div className="absolute inset-0 w-full h-full z-50 pointer-events-auto">
          <div className="w-full h-full animate-drop-bounce animate-delay-200">
            <HomeInput
              placeholder="0xxxxxxxxx"
              type="text"
              inputMode="numeric"
              maxLength={10}
              className="transition-smooth text-black"
              onValidation={handleValidation}
            />
          </div>
        </div>
      )}

      {/* Validation message with improved animations */}
      {isValid ? (
        <Image
          src="/images/loading-text.webp"
          alt="main"
          fill
          style={{ objectFit: "contain" }}
          className="transition-smooth animate-fade-in"
          priority
        />
      ) : (
        showText && (
          <div className="absolute left-0 right-0 top-1/2 flex items-center justify-center z-40 pointer-events-none" style={{ transform: "translateY(110px)" }}>
            <div className="px-5 py-2 rounded-full bg-slate-900/90 text-red-400 border border-red-500/40 text-sm font-bold shadow-xl backdrop-blur-md animate-fade-in flex items-center space-x-2">
              <span>⚠️</span>
              <span>ไม่พบข้อมูลเบอร์โทรศัพท์นี้ในระบบ</span>
            </div>
          </div>
        )
      )}
    </>
  );
}
