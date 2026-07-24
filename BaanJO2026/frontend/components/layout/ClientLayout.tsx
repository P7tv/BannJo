"use client";

import { StudentProvider } from "@/contexts/StudentContext";
import { Song } from "../audio/Song";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <StudentProvider>
      {children}
      <Song />
    </StudentProvider>
  );
}
