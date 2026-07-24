"use client";

import React, { useState, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import { useStudent } from "../../contexts/StudentContext";

import { hashPhone, decryptStudent } from "../../utils/cryptoHelper";

// Import data dynamically to reduce initial bundle size
const getStudentData = () => import("../../constants/students.json").then(m => m.default);

type HomeInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onValidation?: (isValid: boolean, studentData?: any) => void;
};

const HomeInput = memo(function HomeInput({ onValidation, ...props }: HomeInputProps) {
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const { setStudent } = useStudent();

  const handleInputChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    // Strictly restrict to numbers and max 10 digits
    const inputValue = rawVal.replace(/\D/g, "").slice(0, 10);
    setValue(inputValue);
    setIsError(false);

    if (inputValue.length === 10) {
      try {
        const studentsData = await getStudentData();
        const phoneHash = await hashPhone(inputValue);
        let payload = (studentsData as any)[phoneHash] || (studentsData as any)[inputValue];
        let student = null;

        if (payload) {
          if (payload.iv && payload.data) {
            student = await decryptStudent(inputValue, payload);
          } else {
            student = payload;
          }
        }

        if (student) {
          setIsError(false);
          setStudent(student);
          onValidation?.(true, student);
          setTimeout(() => {
            router.push("/group");
          }, 1200);
        } else {
          setIsError(true);
          onValidation?.(false);
          // Reset error color after 2.5s
          setTimeout(() => {
            setIsError(false);
          }, 2500);
        }
      } catch (error) {
        console.error('Failed to load student data:', error);
        setIsError(true);
        onValidation?.(false);
      }
    }
  }, [router, setStudent, onValidation]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease"
      }}
      className="transition-smooth"
    >
      {/* Clean centered label text above the input box */}
      <div
        style={{
          position: "absolute",
          top: "46.5%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 35,
          color: "#000000",
          fontWeight: "bold",
          fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
          letterSpacing: "0.05em",
          pointerEvents: "none",
          whiteSpace: "nowrap"
        }}
        className="animate-fade-in"
      >
        กรอกเบอร์โทรศัพท์
      </div>

      <input
        {...props}
        value={value}
        onChange={handleInputChange}
        maxLength={10}
        autoFocus
        style={{
          position: "absolute",
          border: "none",
          background: "transparent",
          outline: "none",
          font: "inherit",
          width: "40%",
          maxWidth: "320px",
          height: "48px",
          textAlign: "center",
          fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
          zIndex: 50,
          top: "52%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: isError ? "#dc2626" : "#000000",
          fontWeight: "bold",
          letterSpacing: "0.05em",
          pointerEvents: "auto",
          cursor: "text"
        }}
        className={`text-black placeholder:text-black placeholder:opacity-70 focus:outline-none transition-all ${
          isError ? "animate-shake-error text-red-600" : ""
        }`}
      />
    </div>
  );
});

export default HomeInput;