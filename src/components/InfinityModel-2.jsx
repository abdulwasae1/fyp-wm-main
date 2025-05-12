"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

// Separate component for mouse tracking
function MouseTracker({ onMouseMove }) {
  const { camera, gl } = useThree();
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Convert mouse position to normalized device coordinates (-1 to +1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      // Create a ray from the camera through the mouse position
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      
      // Calculate the point on the z=0 plane
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const target = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, target);
      
      // Update position via callback
      onMouseMove(target);
    };
    
    const canvas = gl.domElement;
    canvas.addEventListener('mousemove', handleMouseMove);
    
    // Clean up
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [camera, gl, onMouseMove]);
  
  return null;
}

function MovingHexagons() {
  const hexagons = useRef([]);
  const hexCount = 50;
  const mousePosition = useRef(new THREE.Vector3(999, 999, 0));
  const hoverRadius = 3.0; // Radius of influence around mouse
  const repelStrength = 0.5; // How strongly hexagons move away from mouse
  
  // Define light direction for sparkle effect (top-left corner)
  const lightDirection = new THREE.Vector3(-1, 1, 1).normalize();
  
  // Define our two color values for the gradient - use useMemo to prevent recreations
  const color1 = useMemo(() => new THREE.Color("#646AA3"), []); // Purple
  const color2 = useMemo(() => new THREE.Color("#6A99BF"), []); // Blue
  
  // Create offsets for positions around the infinity loop
  const offsets = useMemo(() => 
    new Array(hexCount).fill(0).map((_, i) => (i / hexCount) * Math.PI * 2),
  [hexCount]);
  
  // Generate a shuffled array of indices to randomly select filled hexagons
  const shuffledIndices = useMemo(() => {
    const indices = Array.from({ length: hexCount }, (_, i) => i);
    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }, [hexCount]);
  
  // The first half of shuffled indices will be filled hexagons
  const filledHexagonIndices = useMemo(() => 
    new Set(shuffledIndices.slice(0, hexCount / 2)),
  [shuffledIndices]);
  
  // Create random scaling factors, frequencies, and wireframe switching properties
  const hexagonProperties = useMemo(() => 
    new Array(hexCount).fill(0).map((_, i) => {
      // Create a starting color blend between the two colors
      const blendFactor = Math.random(); // Random value between 0-1 for initial color blend
      const initialColor = new THREE.Color().copy(color1).lerp(color2, blendFactor);
      
      // Check if this hexagon should be filled (based on shuffled indices)
      const isFilled = filledHexagonIndices.has(i);
      
      return {
        baseSize: 0.1 + Math.random() * 0.1,              // Base size between 0.1 and 0.2
        variance: 0.05 + Math.random() * 0.1,             // Size variance between 0.05 and 0.15
        frequency: 0.5 + Math.random() * 2,               // Different frequency for each
        colorBlendSpeed: 0.05 + Math.random() * 0.2,      // Speed of color transition
        colorPhase: Math.random() * Math.PI * 2,          // Random starting phase for color
        hoverInfluence: 0,                                // Current influence of mouse hover (0-1)
        returnSpeed: 0.05 + Math.random() * 0.05,         // How quickly it returns to the path
        repelAngle: Math.random() * Math.PI * 2,          // Random angle to move away from mouse
        lastBaseX: 0,                                     // Track the last base position
        lastBaseY: 0,
        currentT: 0,                                      // Track current parameter on the curve
        isFilled: isFilled,                               // Flag to determine if hexagon is filled or wireframe
        color: initialColor,                              // Initial blend of the two colors
        sparklePhase: Math.random() * Math.PI * 2,        // Random starting phase for sparkle
        sparkleSpeed: 0.5 + Math.random() * 1.5,          // Speed of sparkle animation
        sparkleIntensity: 0.2 + Math.random() * 0.6       // Max intensity of sparkle effect
      };
    }),
  [hexCount, filledHexagonIndices, color1, color2]);

  // Create material refs for each hexagon - fixed to avoid using useRef in a callback
  const materialRefs = useRef(Array(hexCount).fill(null).map(() => createRef()));


  // Callback for mouse move updates - memoized to prevent unnecessary recreation
  const handleMouseMove = useMemo(() => (position) => {
    mousePosition.current.copy(position);
  }, []);

  // Calculate position on infinity loop
  const calculateInfinityPosition = (t) => {
    const a = 3.7; // loop size
    const denom = 1 + Math.pow(Math.cos(t), 2);
    
    return {
      x: a * Math.sin(t) / denom,
      y: a * Math.sin(t) * Math.cos(t) / denom
    };
  };

  useFrame((state, delta) => {
    hexagons.current.forEach((mesh, idx) => {
      if (!mesh) return;
      
      const prop = hexagonProperties[idx];
      const materialRef = materialRefs.current[idx];
      
      // Update the position parameter continuously
      prop.currentT = (state.clock.elapsedTime * 0.2 + offsets[idx]) % (Math.PI * 2);
      
      // Calculate base position on infinity loop
      const basePos = calculateInfinityPosition(prop.currentT);
      const baseX = basePos.x;
      const baseY = basePos.y;
      
      // Store the base position for reference
      prop.lastBaseX = baseX;
      prop.lastBaseY = baseY;
      
      // Check if mouse is near the curve
      // First calculate distance from mouse to current base position
      const distToMouse = new THREE.Vector2(
        baseX - mousePosition.current.x,
        baseY - mousePosition.current.y
      ).length();
      
      // Update the color blend factor for each hexagon - smooth transition between the two colors
      const colorBlendFactor = (Math.sin(state.clock.elapsedTime * prop.colorBlendSpeed + prop.colorPhase) + 1) / 2; // 0-1 range
      prop.color.copy(color1).lerp(color2, colorBlendFactor);
      
      // Update hover influence based on whether the mouse is near the curve
      if (distToMouse < hoverRadius) {
        // Within hover radius - increase influence
        prop.hoverInfluence = Math.min(prop.hoverInfluence + delta * 3, 1);
        
        // Highlight color when hovered
        if (materialRef.current) {
          // Make the color brighter when hovered
          const baseColor = prop.color.clone();
          const brighterColor = baseColor.clone().lerp(new THREE.Color(1, 1, 1), 0.3);
          materialRef.current.color.copy(brighterColor);
        }
      } else {
        // Outside hover radius - decrease influence
        prop.hoverInfluence = Math.max(prop.hoverInfluence - delta * prop.returnSpeed * 3, 0);
        
        // Return color to normal
        if (materialRef.current) {
          materialRef.current.color.copy(prop.color);
        }
      }
      
      // Apply position calculation with hover effect
      if (prop.hoverInfluence > 0) {
        // Calculate vector from base position to mouse
        const vecToMouse = new THREE.Vector2(
          mousePosition.current.x - baseX,
          mousePosition.current.y - baseY
        );
        
        // Get perpendicular vector (rotate 90 degrees)
        const perpVec = new THREE.Vector2(-vecToMouse.y, vecToMouse.x).normalize();
        
        // Add some variation based on the repel angle
        const angle = Math.atan2(perpVec.y, perpVec.x) + prop.repelAngle * 0.2;
        const repelDist = repelStrength * prop.hoverInfluence;
        
        // Calculate final position as a blend between base position and deflected position
        mesh.position.x = baseX + Math.cos(angle) * repelDist;
        mesh.position.y = baseY + Math.sin(angle) * repelDist;
      } else {
        // When not influenced, just use base position
        mesh.position.x = baseX;
        mesh.position.y = baseY;
      }
      
      mesh.position.z = 0;

      // Calculate sparkle effect based on rotation and light direction
      // We'll use rotation to simulate different facets of the polyhedron catching light
      mesh.rotation.x += delta * 0.5;
      mesh.rotation.y += delta * 0.5;
      
      // Calculate a "sparkle factor" based on how aligned the object's rotation is with the light direction
      // This simulates the reflection of light off different facets as the object rotates
      const objectDirection = new THREE.Vector3(0, 0, 1).applyQuaternion(mesh.quaternion);
      const alignmentFactor = Math.max(0, objectDirection.dot(lightDirection));
      
      // Add time-based pulsing for the sparkle
      const pulseFactor = Math.pow(Math.sin(state.clock.elapsedTime * prop.sparkleSpeed + prop.sparklePhase) * 0.5 + 0.5, 2);
      const sparkleAmount = alignmentFactor * pulseFactor * prop.sparkleIntensity;
      
      // Apply sparkle effect by adding emissive glow to the material based on its color
      if (materialRef.current) {
        // Set emissive color to the hexagon's color
        materialRef.current.emissive = prop.color.clone();
        
        // Set emissive intensity based on sparkle calculation
        materialRef.current.emissiveIntensity = sparkleAmount * 2;
        
        // Add some shininess to the material
        if (!prop.isFilled && materialRef.current.wireframe) {
          // For wireframe hexagons
          materialRef.current.opacity = 0.8 + sparkleAmount * 0.2;
        } else {
          // For solid hexagons, adjust shininess
          materialRef.current.roughness = Math.max(0.1, 0.4 - sparkleAmount * 0.3);
          materialRef.current.metalness = Math.min(1, 0.8 + sparkleAmount * 0.2);
        }
      }
      
      // Pulsing size effect
      const baseScale = prop.baseSize + prop.variance * Math.sin(state.clock.elapsedTime * prop.frequency);
      const scale = baseScale * (1 + prop.hoverInfluence * 0.3); // Grow slightly when hovered
      mesh.scale.set(scale, scale, scale);
    });
  });

  return (
    <>
      <MouseTracker onMouseMove={handleMouseMove} />
      <group>
        {Array(hexCount).fill(0).map((_, i) => {
          const prop = hexagonProperties[i];
          return (
            <mesh
              key={i}
              ref={(el) => (hexagons.current[i] = el)}
              position={[0, 0, 0]}
            >
              <dodecahedronGeometry args={[1, 0]} />
              {prop.isFilled ? (
                // For filled hexagons, use MeshPhysicalMaterial for better reflections
                <meshPhysicalMaterial 
                  ref={materialRefs.current[i]}
                  color={prop.color}
                  roughness={0.3}
                  metalness={0.8}
                  transparent={false}
                  emissive={prop.color}
                  emissiveIntensity={0}
                />
              ) : (
                // For non-filled hexagons, use MeshBasicMaterial with wireframe but add emissive
                <meshPhongMaterial 
                  ref={materialRefs.current[i]}
                  color={prop.color}
                  wireframe={true}
                  transparent={true}
                  opacity={0.8}
                  emissive={prop.color}
                  emissiveIntensity={0}
                  shininess={100}
                />
              )}
            </mesh>
          );
        })}
      </group>
    </>
  );
}

function createRef() {
  return { current: null };
}

export default function SidebarModelCanvas2() {
  return (
    <div className="w-full h-screen">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ width: "140%", height: "140%" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[-2, 2, 2]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-3, 3, 3]} intensity={2.0} color="#ffffff" />
        <MovingHexagons />
      </Canvas>
    </div>
  );
}