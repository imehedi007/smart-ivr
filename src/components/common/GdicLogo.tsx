'use client';

import React from 'react';
import Image from 'next/image';

interface GdicLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  whiteText?: boolean;
}

export const GdicLogo: React.FC<GdicLogoProps> = ({
  className = '',
  size = 'md',
  whiteText = true
}) => {
  // Exact dimensions calculated from official 1960x550 PNG asset (3.56:1 aspect ratio)
  const dimensions = {
    sm: { width: 107, height: 30 },
    md: { width: 125, height: 35 },
    lg: { width: 178, height: 50 }
  };

  const { width, height } = dimensions[size];
  const logoSrc = whiteText ? '/brand/gdic-logo-white.png' : '/brand/gdic-logo-color.png';

  return (
    <div className={`relative inline-flex items-center select-none flex-shrink-0 ${className}`}>
      <Image
        src={logoSrc}
        alt="Green Delta Insurance"
        width={width}
        height={height}
        priority
        className="w-auto object-contain"
        style={{ height: `${height}px`, maxHeight: `${height}px` }}
      />
    </div>
  );
};
