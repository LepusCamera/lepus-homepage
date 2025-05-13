import React, { useEffect, useRef } from 'react';
import { animate } from 'motion';

interface StandaloneLoadingIndicatorProps {
  progress: number;
}

export const StandaloneLoadingIndicator: React.FC<StandaloneLoadingIndicatorProps> = ({ progress }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current) {
      animate(
        imgRef.current,
        { scale: [1, 1.05, 1] },
        { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
      );
    }
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      zIndex: 9999,
    }}>
      <img
        ref={imgRef}
        src="/logo.png"
        alt="Loading..."
        style={{ maxWidth: '200px', marginBottom: '30px' }}
      />
      <div style={{
        width: '200px', // Same as logo max width for alignment
        height: '4px',
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Lighter background for the bar
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: 'white',
            transition: 'width 0.3s ease-out', // Smooth progress transition
          }}
        />
      </div>
    </div>
  );
};