"use client"; // Required for R3F components and hooks

import React from 'react';
import { Canvas } from '@react-three/fiber';
// Html import removed
import { RotatableModel } from '@/components/RotatableModel';
import AppLoader from '@/components/AppLoader';

export default function Home() {
  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <div
        className="absolute top-1/2 -translate-y-1/2 left-[5%] text-[#E0E0E0] text-[12vw] font-display font-bold select-none pointer-events-none z-10"
      >
        Lepus
      </div>
      <div
        className="absolute top-1/2 -translate-y-1/2 right-[5%] text-[#E0E0E0] text-[12vw] font-display font-bold select-none pointer-events-none text-right z-10"
      >
        CV
      </div>

      {/* Text labels as regular HTML elements */}
      <div className="absolute top-[20%] left-[15%] text-white text-2xl font-[var(--font-bruno-ace)] select-none pointer-events-none z-10 transform -translate-x-1/2 -translate-y-1/2">
        &#123;Lepus Hexahedron&#125;
      </div>
      <div className="absolute top-[20%] right-[15%] text-white text-2xl font-[var(--font-bruno-ace)] select-none pointer-events-none z-10 transform translate-x-1/2 -translate-y-1/2 text-right">
        &#123;Lepus Model V&#125;
      </div>
      <div className="absolute bottom-[20%] left-1/2 text-gray-400 text-lg font-[var(--font-bruno-ace)] select-none pointer-events-none z-10 transform -translate-x-1/2">
        &#123;Mouse Rotate&#125;
      </div>


      <AppLoader>
        <Canvas
          shadows // Enable shadows
          camera={{ position: [0, 1, 15], fov: 35 }} // Adjusted camera
          className="bg-[#1E1E1E]" // Dark gray background
        >
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[8, 12, 10]} // Adjusted for better shadow angles
            intensity={2.0} // Increased intensity
            castShadow
            shadow-mapSize-width={2048} // Higher resolution shadows
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />
          <pointLight position={[-10, -5, -10]} intensity={0.3} color="#555555" />


          {/* Center Model: lepus_vc.glb */}
          <RotatableModel
            modelPath="/models/lepus_vc.glb"
            position={[2, 1, 0]} // Adjusted y position
            scale={0.025} // Further reduced scale
            initialRotation={[-1.2, -0.0, -0.5]} // Subtle initial tilt
          >
            {/* Html component removed */}
          </RotatableModel>

          {/* Top-Left Model: lepus_hex.glb */}
          <RotatableModel
            modelPath="/models/lepus_hex.glb"
            position={[-5.5, 1.8, -1]} // Adjusted position
            scale={0.01} // Further reduced scale
            initialRotation={[2.9, 1.0, 1.00]}
          >
            {/* Html component removed */}
          </RotatableModel>

          {/* Top-Right Model: lepus_IV.glb (as Lepus Model V) */}
          <RotatableModel
            modelPath="/models/lepus_IV.glb"
            position={[6.0, 1.8, -1]} // Adjusted position
            scale={0.01} // Further reduced scale
            initialRotation={[-1.3, 0.0, -0.05]}
          >
            {/* Html component removed */}
          </RotatableModel>

        </Canvas>
      </AppLoader>
    </div>
  );
}
