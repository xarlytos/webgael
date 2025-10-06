import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Group, Mesh } from 'three';
import { RotateCcw, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

interface ModelViewer3DProps {
  fileUrl: string | null;
  materialColor: string;
  onLoadingChange: (loading: boolean) => void;
}

function Model({ url, color }: { url: string; color: string }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  // Apply material color to all meshes
  if (scene) {
    scene.traverse((child) => {
      if (child instanceof Mesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((mat) => {
            mat.color.setHex(parseInt(color.replace('#', ''), 16));
          });
        } else {
          child.material.color.setHex(parseInt(color.replace('#', ''), 16));
        }
      }
    });
  }

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin w-12 h-12 border-4 border-[var(--brand)] border-t-transparent rounded-full"></div>
    </div>
  );
}

export function ModelViewer3D({ fileUrl, materialColor, onLoadingChange }: ModelViewer3DProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const controlsRef = useRef<any>(null);

  const handleResetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const handleZoomIn = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyIn(0.5);
    }
  };

  const handleZoomOut = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyOut(0.5);
    }
  };

  const handleToggleRotation = () => {
    setAutoRotate(!autoRotate);
  };

  if (!fileUrl) {
    return (
      <div className="w-full h-96 glass rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--surface)] flex items-center justify-center">
            <svg className="w-8 h-8 text-[var(--text-tertiary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <p className="text-[var(--text-secondary)]">Sube un archivo para ver el modelo 3D</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 glass rounded-2xl overflow-hidden">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        <button
          onClick={handleResetView}
          className="w-10 h-10 rounded-lg glass backdrop-blur-xl flex items-center justify-center hover:bg-[var(--brand)] hover:text-[var(--bg)] transition-colors"
          title="Resetear vista"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 rounded-lg glass backdrop-blur-xl flex items-center justify-center hover:bg-[var(--brand)] hover:text-[var(--bg)] transition-colors"
          title="Acercar"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-10 h-10 rounded-lg glass backdrop-blur-xl flex items-center justify-center hover:bg-[var(--brand)] hover:text-[var(--bg)] transition-colors"
          title="Alejar"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleToggleRotation}
          className={`w-10 h-10 rounded-lg glass backdrop-blur-xl flex items-center justify-center transition-colors ${
            autoRotate ? 'bg-[var(--brand)] text-[var(--bg)]' : 'hover:bg-[var(--brand)] hover:text-[var(--bg)]'
          }`}
          title={autoRotate ? 'Parar rotación' : 'Iniciar rotación'}
        >
          <RotateCw className="w-4 h-4" />
        </button>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        onCreated={() => {
          setIsLoading(false);
          onLoadingChange(false);
        }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          <Model url={fileUrl} color={materialColor} />
          
          <OrbitControls
            ref={controlsRef}
            autoRotate={autoRotate}
            autoRotateSpeed={2}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={20}
          />
        </Suspense>
      </Canvas>

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-[var(--bg)]/80 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-[var(--brand)] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-[var(--text-secondary)]">Cargando modelo...</p>
          </div>
        </div>
      )}
    </div>
  );
}
