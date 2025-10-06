import { useEffect, useRef, useState } from 'react';
import { RotateCcw, ZoomIn, ZoomOut, RotateCw, Play, Pause, Maximize2, Minimize2 } from 'lucide-react';
import * as THREE from 'three';

interface Real3DViewerProps {
  fileUrl: string | null;
  materialColor: string;
  onLoadingChange: (loading: boolean) => void;
}

export function Real3DViewer({ fileUrl, materialColor, onLoadingChange }: Real3DViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const controlsRef = useRef<any>(null);
  const modelRef = useRef<any>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!fileUrl || !canvasRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
        // Handle window resize for fullscreen
        const handleResize = () => {
          if (rendererRef.current && cameraRef.current && containerRef.current) {
            const width = containerRef.current.offsetWidth;
            const height = containerRef.current.offsetHeight;
            
            cameraRef.current.aspect = width / height;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(width, height);
          }
        };

        // Add resize listener
        window.addEventListener('resize', handleResize);
        
        // Add fullscreen change listener
        const handleFullscreenChange = () => {
          // Update fullscreen state based on actual fullscreen status
          const isCurrentlyFullscreen = !!document.fullscreenElement;
          setIsFullscreen(isCurrentlyFullscreen);
          
          setTimeout(() => {
            if (rendererRef.current && cameraRef.current && containerRef.current) {
              const width = containerRef.current.offsetWidth;
              const height = containerRef.current.offsetHeight;
              
              cameraRef.current.aspect = width / height;
              cameraRef.current.updateProjectionMatrix();
              rendererRef.current.setSize(width, height);
            }
          }, 100);
        };
        
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        const handleFullscreenError = () => {
          setIsFullscreen(false);
        };
        document.addEventListener('fullscreenerror', handleFullscreenError);
        // Scene setup with gradient background
        const scene = new THREE.Scene();
        
        // Create gradient background
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const context = canvas.getContext('2d');
        if (context) {
          const gradient = context.createLinearGradient(0, 0, 0, 256);
          gradient.addColorStop(0, '#0a0a0a');
          gradient.addColorStop(1, '#1a1a2e');
          context.fillStyle = gradient;
          context.fillRect(0, 0, 256, 256);
        }
        const texture = new THREE.CanvasTexture(canvas);
        scene.background = texture;
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
          75,
          containerRef.current!.offsetWidth / containerRef.current!.offsetHeight,
          0.1,
          1000
        );
        camera.position.set(5, 5, 5);
        cameraRef.current = camera;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ 
          canvas: canvasRef.current,
          antialias: true,
          alpha: true
        });
        renderer.setSize(containerRef.current!.offsetWidth, containerRef.current!.offsetHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        rendererRef.current = renderer;

        // Enhanced lighting setup for better visibility
        const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.1;
        directionalLight.shadow.camera.far = 50;
        scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0xffffff, 0.6, 100);
        pointLight.position.set(-5, 5, -5);
        scene.add(pointLight);

        // Add rim light for better definition
        const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
        rimLight.position.set(-5, -5, 5);
        scene.add(rimLight);

        // Create a simple geometry for testing - centered at origin
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial({ 
          color: materialColor,
          shininess: 80,
          specular: 0x444444,
          emissive: new THREE.Color(materialColor).multiplyScalar(0.1)
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(0, 0, 0); // Explicitly center at origin
        cube.castShadow = true;
        cube.receiveShadow = true;
        scene.add(cube);
        modelRef.current = cube;

        // Center camera on the model
        camera.position.set(3, 3, 3);
        camera.lookAt(0, 0, 0);

        // Ground plane
        const groundGeometry = new THREE.PlaneGeometry(20, 20);
        const groundMaterial = new THREE.MeshPhongMaterial({ 
          color: 0x1a1a1a,
          transparent: true,
          opacity: 0.3
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -2;
        ground.receiveShadow = true;
        scene.add(ground);

        // Mouse controls
        let isMouseDown = false;
        let mouseX = 0;
        let mouseY = 0;
        let targetRotationX = 0;
        let targetRotationY = 0;

        const handleMouseDown = (event: MouseEvent) => {
          isMouseDown = true;
          mouseX = event.clientX;
          mouseY = event.clientY;
        };

        const handleMouseUp = () => {
          isMouseDown = false;
        };

        const handleMouseMove = (event: MouseEvent) => {
          if (!isMouseDown) return;

          const deltaX = event.clientX - mouseX;
          const deltaY = event.clientY - mouseY;

          targetRotationY += deltaX * 0.01;
          targetRotationX += deltaY * 0.01;

          mouseX = event.clientX;
          mouseY = event.clientY;
        };

        const handleWheel = (event: WheelEvent) => {
          const zoomSpeed = 0.1;
          const zoom = event.deltaY > 0 ? 1 + zoomSpeed : 1 - zoomSpeed;
          camera.position.multiplyScalar(zoom);
          camera.position.clampLength(2, 20);
        };

        canvasRef.current.addEventListener('mousedown', handleMouseDown);
        canvasRef.current.addEventListener('mouseup', handleMouseUp);
        canvasRef.current.addEventListener('mousemove', handleMouseMove);
        canvasRef.current.addEventListener('wheel', handleWheel);

        // Animation loop
        const animate = () => {
          animationIdRef.current = requestAnimationFrame(animate);

          if (isRotating && !isMouseDown) {
            cube.rotation.y += 0.01;
          } else {
            // Smooth rotation to target
            cube.rotation.x += (targetRotationX - cube.rotation.x) * 0.1;
            cube.rotation.y += (targetRotationY - cube.rotation.y) * 0.1;
          }

          // Update material color smoothly
          if (modelRef.current && modelRef.current.material) {
            const newColor = new THREE.Color(materialColor);
            modelRef.current.material.color.lerp(newColor, 0.1);
            modelRef.current.material.emissive = newColor.clone().multiplyScalar(0.1);
          }

          renderer.render(scene, camera);
        };

        animate();
        setIsLoading(false);
        onLoadingChange(false);

        // Cleanup function
        return () => {
          if (animationIdRef.current) {
            cancelAnimationFrame(animationIdRef.current);
          }
          if (canvasRef.current) {
            canvasRef.current.removeEventListener('mousedown', handleMouseDown);
            canvasRef.current.removeEventListener('mouseup', handleMouseUp);
            canvasRef.current.removeEventListener('mousemove', handleMouseMove);
            canvasRef.current.removeEventListener('wheel', handleWheel);
          }
          window.removeEventListener('resize', handleResize);
          document.removeEventListener('fullscreenchange', handleFullscreenChange);
          document.removeEventListener('fullscreenerror', handleFullscreenError);
        };

    } catch (err) {
      console.error('Error initializing 3D viewer:', err);
      setError('Error al cargar el visor 3D');
      setIsLoading(false);
      onLoadingChange(false);
    }
  }, [fileUrl, materialColor, isRotating]);

  const handleResetView = () => {
    if (cameraRef.current) {
      cameraRef.current.position.set(3, 3, 3);
      cameraRef.current.lookAt(0, 0, 0);
    }
    if (modelRef.current) {
      modelRef.current.rotation.set(0, 0, 0);
      modelRef.current.position.set(0, 0, 0);
    }
  };

  const handleZoomIn = () => {
    if (cameraRef.current) {
      cameraRef.current.position.multiplyScalar(0.9);
      cameraRef.current.position.clampLength(2, 20);
    }
  };

  const handleZoomOut = () => {
    if (cameraRef.current) {
      cameraRef.current.position.multiplyScalar(1.1);
      cameraRef.current.position.clampLength(2, 20);
    }
  };

  const handleToggleRotation = () => {
    setIsRotating(!isRotating);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
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

  if (error) {
    return (
      <div className="w-full h-96 glass rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-96 glass rounded-2xl overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none w-screen h-screen' : ''
      }`}
      style={isFullscreen ? { width: '100vw', height: '100vh' } : {}}
    >
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ 
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
          width: isFullscreen ? '100vw' : '100%',
          height: isFullscreen ? '100vh' : '100%'
        }}
      />

      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        <button
          onClick={handleResetView}
          className="w-10 h-10 rounded-lg glass backdrop-blur-xl flex items-center justify-center hover:bg-[var(--brand)] hover:text-[var(--bg)] transition-all duration-200"
          title="Resetear vista"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 rounded-lg glass backdrop-blur-xl flex items-center justify-center hover:bg-[var(--brand)] hover:text-[var(--bg)] transition-all duration-200"
          title="Acercar"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-10 h-10 rounded-lg glass backdrop-blur-xl flex items-center justify-center hover:bg-[var(--brand)] hover:text-[var(--bg)] transition-all duration-200"
          title="Alejar"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleToggleRotation}
          className={`w-10 h-10 rounded-lg glass backdrop-blur-xl flex items-center justify-center transition-all duration-200 ${
            isRotating ? 'bg-[var(--brand)] text-[var(--bg)]' : 'hover:bg-[var(--brand)] hover:text-[var(--bg)]'
          }`}
          title={isRotating ? 'Parar rotación' : 'Iniciar rotación'}
        >
          {isRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={handleToggleFullscreen}
          className="w-10 h-10 rounded-lg glass backdrop-blur-xl flex items-center justify-center hover:bg-[var(--brand)] hover:text-[var(--bg)] transition-all duration-200"
          title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-[var(--bg)]/90 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-[var(--brand)] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-[var(--text-secondary)] font-medium">Cargando visor 3D...</p>
          </div>
        </div>
      )}

      {/* Instructions overlay */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="glass backdrop-blur-xl rounded-lg p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--text-secondary)]">Arrastra para rotar • Rueda para zoom</span>
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: materialColor }}
              />
              <span className="text-[var(--text-secondary)]">{materialColor}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
