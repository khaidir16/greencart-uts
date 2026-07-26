import { Float, OrbitControls, Sparkles } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import type { Group, Mesh } from 'three';
import { MathUtils } from 'three';

type LeafProps = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  phase: number;
  reducedMotion: boolean;
};

function Leaf({ position, rotation, scale = 1, phase, reducedMotion }: LeafProps) {
  const leafRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!leafRef.current || reducedMotion) return;
    leafRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.85 + phase) * 0.045;
    leafRef.current.rotation.x = Math.cos(clock.elapsedTime * 0.65 + phase) * 0.025;
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh ref={leafRef} scale={[1.15, 0.58, 0.16]} castShadow>
        <sphereGeometry args={[1, 32, 20]} />
        <meshStandardMaterial color="#3b9a50" roughness={0.68} metalness={0.02} />
      </mesh>
      <mesh scale={[0.035, 0.9, 0.035]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.5, 0.5, 2, 10]} />
        <meshStandardMaterial color="#b0d883" roughness={0.8} />
      </mesh>
    </group>
  );
}

function BotanicalPlant({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const targetX = reducedMotion ? 0 : state.pointer.y * 0.12;
    const targetY = reducedMotion ? 0 : state.pointer.x * 0.2;
    groupRef.current.rotation.x = MathUtils.damp(groupRef.current.rotation.x, targetX, 3, delta);
    groupRef.current.rotation.y = MathUtils.damp(groupRef.current.rotation.y, targetY, 3, delta);
  });

  return (
    <Float speed={reducedMotion ? 0 : 1.1} rotationIntensity={reducedMotion ? 0 : 0.08} floatIntensity={reducedMotion ? 0 : 0.32}>
      <group ref={groupRef} position={[0, -1.35, 0]} rotation={[0.03, -0.18, 0]}>
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.12, 0.78, 1.75, 48]} />
          <meshStandardMaterial color="#bd6849" roughness={0.72} />
        </mesh>
        <mesh position={[0, 1.37, 0]} castShadow>
          <cylinderGeometry args={[1.18, 1.18, 0.22, 48]} />
          <meshStandardMaterial color="#d98562" roughness={0.65} />
        </mesh>
        <mesh position={[0, 1.5, 0]} receiveShadow>
          <cylinderGeometry args={[1.05, 1.05, 0.08, 48]} />
          <meshStandardMaterial color="#3b2d22" roughness={1} />
        </mesh>

        <mesh position={[0, 3.25, 0]} castShadow>
          <cylinderGeometry args={[0.09, 0.14, 3.55, 14]} />
          <meshStandardMaterial color="#39794a" roughness={0.9} />
        </mesh>
        <mesh position={[-0.35, 3.45, 0]} rotation={[0, 0, -0.35]} castShadow>
          <cylinderGeometry args={[0.055, 0.08, 2.2, 12]} />
          <meshStandardMaterial color="#39794a" roughness={0.9} />
        </mesh>
        <mesh position={[0.4, 4.05, 0]} rotation={[0, 0, 0.38]} castShadow>
          <cylinderGeometry args={[0.05, 0.075, 2, 12]} />
          <meshStandardMaterial color="#39794a" roughness={0.9} />
        </mesh>

        <Leaf position={[-1.05, 2.9, 0.12]} rotation={[0.05, 0.18, -0.42]} scale={0.95} phase={0.2} reducedMotion={reducedMotion} />
        <Leaf position={[1.08, 3.25, -0.05]} rotation={[0.04, -0.12, 0.45]} scale={1.02} phase={1.1} reducedMotion={reducedMotion} />
        <Leaf position={[-1.32, 4.02, -0.12]} rotation={[0.1, 0.28, -0.35]} scale={1.15} phase={2} reducedMotion={reducedMotion} />
        <Leaf position={[1.28, 4.5, 0.1]} rotation={[-0.05, -0.24, 0.38]} scale={1.08} phase={2.8} reducedMotion={reducedMotion} />
        <Leaf position={[-0.75, 5.18, 0.06]} rotation={[0.08, 0.15, -0.18]} scale={0.92} phase={3.6} reducedMotion={reducedMotion} />
        <Leaf position={[0.58, 5.7, -0.08]} rotation={[-0.08, -0.1, 0.2]} scale={0.85} phase={4.4} reducedMotion={reducedMotion} />
      </group>
    </Float>
  );
}

function Scene({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <color attach="background" args={['#102d22']} />
      <fog attach="fog" args={['#102d22', 8, 16]} />
      <ambientLight intensity={1.6} />
      <directionalLight position={[5, 8, 5]} intensity={3.2} color="#fff5d6" castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-4, 2, 2]} intensity={16} color="#62c955" distance={8} />
      <BotanicalPlant reducedMotion={reducedMotion} />
      <Sparkles count={reducedMotion ? 18 : 48} scale={[7, 7, 4]} size={1.8} speed={reducedMotion ? 0 : 0.22} color="#b8e986" opacity={0.55} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.25, 0]} receiveShadow>
        <circleGeometry args={[3.2, 64]} />
        <shadowMaterial transparent opacity={0.24} />
      </mesh>
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.6} maxPolarAngle={Math.PI / 1.8} minAzimuthAngle={-0.45} maxAzimuthAngle={0.45} />
    </>
  );
}

export default function PlantScene({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <Canvas camera={{ position: [0, 2.2, 9], fov: 38 }} dpr={[1, 1.6]} shadows gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}>
      <Suspense fallback={null}>
        <Scene reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}
