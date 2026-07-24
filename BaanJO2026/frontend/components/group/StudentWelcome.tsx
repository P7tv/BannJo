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

      {/* House Name */}
      {group && (
        <div className="inline-block px-5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-lg sm:text-xl shadow-2xl border-2 border-amber-300 transform -rotate-1">
          🏠 บ้าน {group}
        </div>
      )}

      {/* Big Bold Detective Announcement */}
      <div className="pt-2 drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">
        <p className="text-xl sm:text-2xl font-bold text-slate-100 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
          นิกสืบของคุณคือ
        </p>
        <p className="text-4xl sm:text-5xl md:text-6xl font-black text-cyan-300 tracking-wider pt-1 animate-severe-hormone drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">
          {hormone}
        </p>
      </div>
    </div>
  );
});

export default StudentWelcome;
