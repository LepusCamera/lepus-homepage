"use client";

import React, { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';

// This component will attempt to load a GLB model.
// Replace '/models/lepus_vc.glb' with the actual path to your 3D model.
// If the model doesn't exist at this path, it will still trigger the loading state
// and eventually error, but the loader should show up.
// For a real implementation, ensure the path is correct.
function Model() {
  // useGLTF will suspend while loading, triggering Suspense fallback
  // and updating useProgress.
  const { scene } = useGLTF('/models/lepus_vc.glb'); // Using the specified model path
  return <primitive object={scene} scale={0.5} />;
}

// It's good practice to preload assets if you know you'll need them.
useGLTF.preload('/models/lepus_vc.glb');

export const DummyModel: React.FC = () => {
  return (
    <Suspense fallback={null}> {/* Fallback here can be null as AppLoader handles global loading UI */}
      <Model />
    </Suspense>
  );
};