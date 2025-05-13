"use client"; // Required for R3F components and hooks

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'; // Optional: for camera controls
import { DummyModel } from '@/components/DummyModel'; // Adjusted path
import AppLoader from '@/components/AppLoader'; // Import AppLoader

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <AppLoader>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }} // Basic camera setup
          style={{ background: '#000' }} // A light background for the canvas
        >
          <ambientLight intensity={1.0} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <DummyModel />
          <OrbitControls /> {/* Optional: allows you to orbit the camera */}
        </Canvas>
      </AppLoader>
    </div>
  );
}
