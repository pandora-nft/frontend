import {
  PerspectiveCamera,
  OrbitControls,
  useGLTF,
  Html,
  ContactShadows,
  SpotLight,
} from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { LoadingIndicator } from "components"

const angleToRadians = (angleInDegree: number) => {
  return (Math.PI / 180) * angleInDegree
}

// ref: https://sketchfab.com/3d-models/loot-box-24d1d9be93954d3eb7807f8b528d6d98
// ref2:https://sketchfab.com/3d-models/sci-fi-box-2-55ba1c5bdf254a2c9cceeb4e6dd5af79
const Lootbox = () => {
  const { scene } = useGLTF("/lootbox2/scene.gltf")

  return <primitive position={[0, 1, 0]} object={scene} scale={4} dispose={null}></primitive>
}

useGLTF.preload("/lootbox2/scene.gltf")

export const LootboxCanvas = () => {
  return (
    <Canvas>
      <Suspense fallback={<Html position={[-0.4, 0.7, 0]}>{<LoadingIndicator />}</Html>}>
        <PerspectiveCamera makeDefault position={[10, 5, 0]} />
        <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={false} />
        <ambientLight args={["#ffffff", 0.25]} />
        <spotLight
          args={["#ffffff", 10, 50, angleToRadians(80), 0.4]}
          position={[-5, 10, -5]}
          castShadow={true}
        />
        <SpotLight
          position={[0, 6, 0]}
          distance={10}
          angle={1}
          color="#ffa2fd"
          attenuation={5}
          anglePower={1} // Diffuse-cone anglePower (default: 5)
        />
        <Lootbox />
        <ContactShadows
          position={[0, -3, 0]}
          opacity={0.5}
          scale={10}
          blur={1}
          far={10}
          resolution={50}
          color="#000000"
        />
      </Suspense>
    </Canvas>
  )
}
