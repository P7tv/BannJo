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
  className = "" 
}: StudentWelcomeProps) {
  return (
    <div className={`animate-slide-up animate-delay-300 bg-black/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-amber-400/30 shadow-2xl ${className}`}>
      <p className="text-xl sm:text-2xl mb-1 animate-fade-in animate-delay-400 font-bold text-white tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
        ยินดีต้อนรับ <span className="font-extrabold text-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">{firstName} ({nickname})</span>
      </p>
      <p className="text-lg sm:text-xl animate-fade-in animate-delay-200 font-semibold text-slate-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
        ฮอร์โมนของคุณคือ <span className="font-extrabold text-cyan-300 animate-severe-hormone text-xl sm:text-2xl drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">{hormone}</span>
      </p>
    </div>
  );
});

export default StudentWelcome;
