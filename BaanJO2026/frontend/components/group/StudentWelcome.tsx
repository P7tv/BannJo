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
  return (
    <div className={`flex flex-col items-center text-center space-y-3 animate-slide-up animate-delay-300 ${className}`}>
      {/* Student Name */}
      <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-wide drop-shadow-[0_4px_10px_rgba(0,0,0,1)]">
        ยินดีต้อนรับ <span className="text-amber-300 drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">{firstName} ({nickname})</span>
      </div>



      {/* Big Bold Detective Announcement */}
      <div className="pt-2 drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">
        <p className="text-xl sm:text-2xl font-bold text-slate-100 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
          นิกสืบของคุณคือ
        </p>
        <p className="text-4xl sm:text-5xl md:text-6xl font-black text-cyan-300 tracking-wider pt-1 animate-severe-hormone drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">
          {hormone} {group ? `(${group})` : ""}
        </p>
      </div>
    </div>
  );
});

export default StudentWelcome;
