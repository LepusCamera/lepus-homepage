"use client"; // Required for hooks like useProgress

import React, { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';
import { StandaloneLoadingIndicator } from './LoadingIndicator';

interface AppLoaderProps {
  children: React.ReactNode;
}

const AppLoader: React.FC<AppLoaderProps> = ({ children }) => {
  const { active, progress } = useProgress();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Determine if the loader should still be shown
    // Show loader if assets are actively loading or progress is not yet 100%
    if (active || progress < 100) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [active, progress]);

  if (showLoader) {
    // Display the actual progress
    return <StandaloneLoadingIndicator progress={progress} />;
  }

  return <>{children}</>;
};

export default AppLoader;