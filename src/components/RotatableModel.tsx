"use client";

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';

type RotatableModelProps = ThreeElements['group'] & {
    modelPath: string;
    initialRotation?: [number, number, number];
};

export function RotatableModel({ modelPath, initialRotation = [0, 0, 0], ...props }: RotatableModelProps) {
    const { scene } = useGLTF(modelPath);
    const modelRef = useRef<THREE.Group>(null!);
    const [isDragging, setIsDragging] = useState(false);
    const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Apply shadow properties to all meshes in the scene
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }, [scene]);

    const centeredScene = useMemo(() => {
        const cloned = scene.clone();
        const box = new THREE.Box3().setFromObject(cloned);
        const center = box.getCenter(new THREE.Vector3());

        // Offset the model's geometry so its center is at the origin of this group
        cloned.position.sub(center);

        // Create a pivot group that will be rotated
        const pivot = new THREE.Group();
        pivot.add(cloned);

        // Add an invisible plane to expand the interaction area
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        // Make the plane slightly larger than the model's max dimension
        const planeGeometry = new THREE.PlaneGeometry(maxDim * 5, maxDim * 5);
        const planeMaterial = new THREE.MeshBasicMaterial({ visible: false, depthWrite: false }); // transparent: true, opacity: 0 also works
        const interactionPlane = new THREE.Mesh(planeGeometry, planeMaterial);
        // Position it at the center of the pivot, it will rotate with the model
        // It doesn't need to be visually behind, just part of the group for hit detection.
        pivot.add(interactionPlane);

        return pivot;
    }, [scene]);


    // Store pointerId to release capture correctly
    const pointerIdRef = useRef<number | null>(null);

    // Effect for managing global event listeners for dragging
    useEffect(() => {
        const handleDragMove = (event: PointerEvent) => {
            if (isDragging && modelRef.current) {
                const deltaX = event.clientX - previousMousePosition.x;
                const deltaY = event.clientY - previousMousePosition.y;

                modelRef.current.rotation.y += deltaX * 0.01;
                modelRef.current.rotation.x += deltaY * 0.01;

                setPreviousMousePosition({ x: event.clientX, y: event.clientY });
            }
        };

        const handleDragEnd = (event: PointerEvent) => {
            if (isDragging) {
                setIsDragging(false);
                if (pointerIdRef.current !== null) {
                    // Attempt to release capture on the element that captured it.
                    // It's safer to release from the element that set the capture.
                    // However, the target might not be easily accessible here.
                    // For simplicity, we'll rely on the browser's implicit release
                    // or ensure the element that captured is the one releasing.
                    // The original code used event.target for release, which is fine if
                    // the event is on the element. Here, it's a window event.
                    // We'll assume the capture is released correctly when isDragging is false.
                    // A more robust way would be to pass the target element or use a ref to it.
                    // For now, we'll rely on the setPointerCapture behavior.
                    // (document.documentElement as HTMLElement).releasePointerCapture(pointerIdRef.current);
                    // The above line might cause issues if the capture was set on a specific element.
                    // It's generally better to call releasePointerCapture on the element that called setPointerCapture.
                    // Since modelRef.current.parent is the canvas, we can try:
                    // modelRef.current?.parent?.getRenderer().domElement.releasePointerCapture(pointerIdRef.current)
                    // This is getting complex. Let's stick to the original release logic within handlePointerUp on the element.
                    // The setPointerCapture should handle this.
                    // The main change is moving move/up listeners to window.
                }
                pointerIdRef.current = null;
            }
        };

        if (isDragging) {
            window.addEventListener('pointermove', handleDragMove);
            window.addEventListener('pointerup', handleDragEnd);
            // Also listen for pointerleave on the document to catch cases where the mouse leaves the window entirely
            document.addEventListener('pointerleave', handleDragEnd);
        }

        return () => {
            window.removeEventListener('pointermove', handleDragMove);
            window.removeEventListener('pointerup', handleDragEnd);
            document.removeEventListener('pointerleave', handleDragEnd);
        };
    }, [isDragging, previousMousePosition.x, previousMousePosition.y]);


    const handlePointerDown = (event: React.PointerEvent<THREE.Object3D>) => {
        event.stopPropagation();
        setIsDragging(true);
        setPreviousMousePosition({ x: event.clientX, y: event.clientY });
        pointerIdRef.current = event.pointerId;
        (event.target as HTMLElement).setPointerCapture(event.pointerId);
    };

    // This specific handler for the element is now less critical for 'up' if window listener works,
    // but good for explicit release on the element.
    const handleElementPointerUp = (event: React.PointerEvent<THREE.Object3D>) => {
        event.stopPropagation();
        if (isDragging) { // Only if this element was being dragged
            setIsDragging(false); // This will trigger the useEffect cleanup
             if (pointerIdRef.current !== null) {
                (event.target as HTMLElement).releasePointerCapture(pointerIdRef.current);
                pointerIdRef.current = null;
            }
        }
    };


    return (
        <group
            ref={modelRef}
            {...props} // Spread other props like position, scale
            onPointerDown={handlePointerDown}
            onPointerUp={handleElementPointerUp} // Handles release if pointer is still over element
            // onPointerOut is removed to allow dragging outside
            rotation={initialRotation}
        >
            <primitive object={centeredScene} dispose={null} />
        </group>
    );
}

// Preload models for faster initial display.
// Paths are relative to the `public` directory.
useGLTF.preload('/models/lepus_hex.glb');
useGLTF.preload('/models/lepus_IV.glb');
useGLTF.preload('/models/lepus_vc.glb');