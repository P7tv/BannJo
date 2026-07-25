import { memo } from 'react';
import hormone from '../../constants/hormone.json';

interface StudentWelcomeProps {
  firstName: string;
  nickname: string;
  hormone: string;
  group?: string;
  className?: string;
}

const StudentWelcome = memo(function StudentWelcome({
  firstName,
  nickname,
  hormone,
  group = "",
  className = ""
}: StudentWelcomeProps) {
  // Handle case where nickname is missing - show only firstName
  const displayNickname = nickname && nickname.trim() !== "" ? nickname.trim() : null;
  const displayFirstName = firstName && firstName.trim() !== "" ? firstName.trim() : null;

  return (
    <div className={`flex flex-col items-center text-center space-y-2 animate-slide-up animate-delay-300 ${className}`}>
      {/* Line 1: ยินดีกับน้อง (using stylish Mitr Google Font) */}
      <p
        className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-100 tracking-wider drop-shadow-[0_4px_10px_rgba(0,0,0,1)] whitespace-nowrap"
        style={{ fontFamily: "'Mitr', 'Prompt', 'Kanit', sans-serif" }}
      >
        ยินดีกับน้อง
      </p>

      {/* Line 2: ชื่อเล่น (ชื่อจริง) - on its own line */}
      <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-300 drop-shadow-[0_2px_6px_rgba(0,0,0,1)] leading-tight break-words px-2">
        {displayNickname
          ? displayFirstName
            ? `${displayNickname} (${displayFirstName})`
            : displayNickname
          : displayFirstName ?? ""}
      </p>

      {/* Big Bold Detective Announcement */}
      <div className="pt-2 drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">
        <p className="text-base sm:text-lg font-bold text-slate-100 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
          นิกสืบของคุณคือ
        </p>
        <p className="text-3xl sm:text-4xl md:text-5xl font-black text-cyan-300 tracking-wider pt-1 animate-severe-hormone drop-shadow-[0_4px_16px_rgba(0,0,0,1)] break-words px-2">
          {hormone} {group ? `(${group})` : ""}
        </p>
      </div>
    </div>
  );
});

export default StudentWelcome;
