import { PerspectiveCamera, OrbitControls, useGLTF, Html } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { LoadingIndicator } from 'components';

const angleToRadians = (angleInDegree: number) => {
  return (Math.PI / 180) * angleInDegree;
};

const Lootbox = () => {
  const { scene } = useGLTF('/lootbox/scene.gltf');
  return <primitive object={scene} scale={3.8} dispose={null}></primitive>;
};

useGLTF.preload('/lootbox/scene.gltf');

export const LootboxCanvas = () => {
  return (
    <Canvas>
      <Suspense fallback={<Html position={[-0.4, 0.7, 0]}>{<LoadingIndicator />}</Html>}>
        <PerspectiveCamera makeDefault position={[4, 5, 10]} />
        <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={true} />
        <ambientLight args={['#ffffff', 0.25]} />
        <spotLight
          args={['#ffffff', 3, 50, angleToRadians(80), 0.4]}
          position={[-4, 2, 5]}
          castShadow
        />
        <Lootbox />
      </Suspense>
    </Canvas>
  );
};
