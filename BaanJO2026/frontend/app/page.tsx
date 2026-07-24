import Image from "next/image";
import ClientHomePage from "../components/home/ClientHomePage";

// 2026 Conan Theme Page Component (SSR)
export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Base Background */}
      <Image
        src="/images/2026/separated/Background.png"
        alt="Background"
        fill
        style={{ objectFit: "contain" }}
        className="transition-smooth animate-fade-in z-0 pointer-events-none"
        priority
      />

      {/* Layer 2: Tape & Background effects */}
      <Image
        src="/images/2026/separated/2.png"
        alt="Background Effects"
        fill
        style={{ objectFit: "contain" }}
        className="transition-smooth animate-fade-in animate-delay-200 z-5 pointer-events-none"
        priority
      />

      {/* Layer 1: Header Logo ("Baan JO ยอดนัก...") - Drop Slam Effect */}
      <Image
        src="/images/2026/separated/1.png"
        alt="Header Title"
        fill
        style={{ objectFit: "contain" }}
        className="transition-smooth animate-drop-slam animate-delay-200 z-20 pointer-events-none"
        priority
      />

      {/* Layer 4: Lower Coffee Cup & Paper Frame - Synchronized Drop Bounce Effect */}
      <Image
        src="/images/2026/separated/4.png"
        alt="Input Frame"
        fill
        style={{ objectFit: "contain" }}
        className="transition-smooth animate-drop-bounce animate-delay-200 z-10 pointer-events-none"
        priority
      />

      {/* Client-side interactive input component */}
      <ClientHomePage />
    </div>
  );
}

