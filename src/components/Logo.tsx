import React from 'react';
import Image from 'next/image';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ width, height, className }) => {
  const defaultWidth = 200; // Default width if not provided
  const defaultHeight = 30; // Default height if not provided

  return (
    <div className={className} style={{ display: 'inline-block' }}>
      <Image
        src="/logo.png" // Path relative to the 'public' directory
        alt="Lepus Logo"
        width={width || defaultWidth}
        height={height || defaultHeight}
        priority // Optional: if the logo is critical for LCP
      />
    </div>
  );
};

export default Logo;