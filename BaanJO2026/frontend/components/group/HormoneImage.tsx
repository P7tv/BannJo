import { memo, useState, useEffect } from 'react';
import Image from "next/image";

interface HormoneImageProps {
  imagePath?: string;
  hormone: string;
  group?: string;
  className?: string;
}

const HormoneImage = memo(function HormoneImage({ 
  imagePath, 
  hormone, 
  group,
  className = "" 
}: HormoneImageProps) {
  const initialPath = imagePath || `/images/${hormone}/${group}.png`;
  const [currentSrc, setCurrentSrc] = useState(initialPath);

  useEffect(() => {
    if (imagePath) {
      setCurrentSrc(imagePath);
    }
  }, [imagePath]);

  const handleImageError = () => {
    if (currentSrc === `/images/${hormone}/${group}.png`) {
      setCurrentSrc(`/images/${group}/${hormone}.png`);
    } else if (currentSrc === `/images/${group}/${hormone}.png`) {
      setCurrentSrc(`/images/${group}/${hormone}.jpg`);
    } else if (currentSrc === `/images/${group}/${hormone}.jpg`) {
      setCurrentSrc(`/images/${hormone?.toLowerCase()}/${group?.toLowerCase()}.png`);
    }
  };

  return (
    <div className={`flex justify-center animate-severe-zoom-in ${className}`}>
      <Image
        src={currentSrc}
        alt={`${hormone} ${group}`}
        width={1000}
        height={500}
        style={{ objectFit: "contain" }}
        priority
        onError={handleImageError}
        className="transition-smooth hover:scale-105 drop-shadow-2xl"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
});

export default HormoneImage;
