import { useState } from 'react';

// Premium local fairytale illustrations
import ExcellenceHall from '../assets/ucan_excellence_hall_1778252558379.png';
import MusicalStage from '../assets/ucan_musical_stage_1778252614593.png';
import DisneyFlorals from '../assets/vintage_disney_florals_1778230091006.png';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

// Selects custom themed backdrop based on nominee category or name
const getThemedFallback = (altText: string): string => {
  const text = altText.toLowerCase();
  if (
    text.includes('club') ||
    text.includes('council') ||
    text.includes('society') ||
    text.includes('village') ||
    text.includes('educare') ||
    text.includes('ambassador') ||
    text.includes('president')
  ) {
    return ExcellenceHall;
  }
  if (
    text.includes('celine') ||
    text.includes('innovation') ||
    text.includes('app') ||
    text.includes('project') ||
    text.includes('elsa')
  ) {
    return MusicalStage;
  }
  return DisneyFlorals;
};

export function ImageWithFallback({ src, alt, style, className, ...rest }: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false);

  if (didError) {
    const fallbackSrc = getThemedFallback(alt);
    return (
      <img
        src={fallbackSrc}
        alt={`Fallback for ${alt}`}
        className={className}
        style={style}
        {...rest}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      {...rest}
      onError={() => setDidError(true)}
    />
  );
}

