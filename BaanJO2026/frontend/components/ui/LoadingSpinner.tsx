import { memo } from 'react';

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

const LoadingSpinner = memo(function LoadingSpinner({ 
  message = "Loading...", 
  className = "" 
}: LoadingSpinnerProps) {
  return (
    <div className={`min-h-screen flex items-center justify-center bg-black ${className}`}>
      <div className="text-white text-xl animate-pulse">{message}</div>
    </div>
  );
});

export default LoadingSpinner;
