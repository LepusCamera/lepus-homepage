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
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    // Timer for minimum display duration
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Determine if the loader should still be shown
    if ((active || progress < 100) || !minTimeElapsed) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [active, progress, minTimeElapsed]);

  if (showLoader) {
    // If loading is truly complete (progress is 100 and active is false)
    // but minTime has not elapsed, we still show 100% progress.
    const displayProgress = (progress === 100 && !active) ? 100 : progress;
    return <StandaloneLoadingIndicator progress={displayProgress} />;
  }

  return <>{children}</>;
};

export default AppLoader;