"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[80, 80]} />
      <meshStandardMaterial color="#7da27d" />
    </mesh>
  );
}

function FerrariBody() {
  return (
    <group>
      <mesh castShadow position={[0, 0.7, 0]}>
        <boxGeometry args={[4, 0.8, 2]} />
        <meshStandardMaterial color="#d60000" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh castShadow position={[1.4, 1, 0]}>
        <boxGeometry args={[1.2, 0.6, 1.8]} />
        <meshStandardMaterial color="#d60000" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh castShadow position={[-1.4, 1, 0]}>
        <boxGeometry args={[1.2, 0.6, 1.8]} />
        <meshStandardMaterial color="#d60000" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh castShadow position={[0, 1.2, 0]}>
        <boxGeometry args={[2, 0.5, 1.8]} />
        <meshStandardMaterial color="#aa0000" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh castShadow position={[0, 1, -1.05]}>
        <boxGeometry args={[1.2, 0.3, 0.8]} />
        <meshStandardMaterial color="#222" metalness={0.4} roughness={0.5} />
      </mesh>
      <mesh castShadow position={[0, 1.2, 0.6]}>
        <boxGeometry args={[0.6, 0.2, 1.2]} />
        <meshStandardMaterial color="#fbe000" emissive="#f5c400" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

function FerrariWheels() {
  const wheelPositions: [number, number, number][] = [
    [1.6, 0.4, 1.1],
    [-1.6, 0.4, 1.1],
    [1.6, 0.4, -1.1],
    [-1.6, 0.4, -1.1]
  ];

  return (
    <group>
      {wheelPositions.map((pos, idx) => (
        <group key={idx} position={pos}>
          <mesh castShadow>
            <cylinderGeometry args={[0.6, 0.6, 0.4, 24]} />
            <meshStandardMaterial color="#111" metalness={0.4} roughness={0.5} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 0.4, 12]} />
            <meshStandardMaterial color="#d8d8d8" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Ferrari() {
  return (
    <group position={[0, 0, 0]} rotation={[0, Math.PI / 6, 0]}>
      <FerrariBody />
      <FerrariWheels />
    </group>
  );
}

function House() {
  return (
    <group position={[-6, 0, -3]} rotation={[0, -Math.PI / 12, 0]}>
      <mesh castShadow position={[0, 2, 0]}>
        <boxGeometry args={[6, 4, 5]} />
        <meshStandardMaterial color="#eee0d6" roughness={0.7} />
      </mesh>
      <mesh castShadow position={[0, 4.4, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[4.5, 3, 4]} />
        <meshStandardMaterial color="#744c24" roughness={0.6} />
      </mesh>
      <mesh castShadow position={[0, 1.2, 2.5]}>
        <boxGeometry args={[1.8, 2.4, 0.2]} />
        <meshStandardMaterial color="#3c2c1e" />
      </mesh>
      <mesh castShadow position={[2, 2.2, 2.5]}>
        <boxGeometry args={[1.2, 1.2, 0.1]} />
        <meshStandardMaterial color="#68a0d8" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh castShadow position={[-2, 2.2, 2.5]}>
        <boxGeometry args={[1.2, 1.2, 0.1]} />
        <meshStandardMaterial color="#68a0d8" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh castShadow position={[3, 3.2, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 3]} />
        <meshStandardMaterial color="#6b6b6b" roughness={0.5} />
      </mesh>
      <mesh castShadow position={[3, 5.1, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 1]} />
        <meshStandardMaterial color="#444" metalness={0.3} roughness={0.4} />
      </mesh>
    </group>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight
        castShadow
        intensity={1.2}
        position={[8, 12, 6]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight
        castShadow
        position={[-10, 15, -5]}
        angle={0.35}
        penumbra={0.5}
        intensity={0.6}
      />
    </>
  );
}

export default function Scene() {
  return (
    <Canvas shadows camera={{ position: [12, 6, 12], fov: 40 }}>
      <color attach="background" args={["#1a1f2b"]} />
      <Suspense fallback={null}>
        <Lighting />
        <Ferrari />
        <House />
        <Ground />
      </Suspense>
    </Canvas>
  );
}
