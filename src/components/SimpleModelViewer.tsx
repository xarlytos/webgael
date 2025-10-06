import { useState } from 'react';
import { RotateCcw, ZoomIn, ZoomOut, RotateCw, Play, Pause } from 'lucide-react';

interface SimpleModelViewerProps {
  fileUrl: string | null;
  materialColor: string;
  onLoadingChange: (loading: boolean) => void;
}

export function SimpleModelViewer({ fileUrl, materialColor, onLoadingChange }: SimpleModelViewerProps) {
  const [isRotating, setIsRotating] = useState(true);
  const [zoom, setZoom] = useState(1);

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

  const handleResetView = () => {
    setZoom(1);
    setIsRotating(true);
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.2, 0.5));
  };

  const handleToggleRotation = () => {
    setIsRotating(!isRotating);
  };

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
            isRotating ? 'bg-[var(--brand)] text-[var(--bg)]' : 'hover:bg-[var(--brand)] hover:text-[var(--bg)]'
          }`}
          title={isRotating ? 'Parar rotación' : 'Iniciar rotación'}
        >
          {isRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>

      {/* 3D Model Placeholder */}
      <div className="w-full h-full flex items-center justify-center relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, ${materialColor}20 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, ${materialColor}20 0%, transparent 50%)`
          }} />
        </div>
        
        {/* Model representation */}
        <div 
          className="relative"
          style={{
            transform: `scale(${zoom}) ${isRotating ? 'rotate(360deg)' : ''}`,
            transition: isRotating ? 'transform 20s linear infinite' : 'transform 0.3s ease'
          }}
        >
          {/* 3D Cube representation */}
          <div className="relative w-32 h-32">
            {/* Front face */}
            <div 
              className="absolute inset-0 rounded-lg shadow-2xl"
              style={{ 
                backgroundColor: materialColor,
                transform: 'translateZ(32px)',
                boxShadow: `0 0 20px ${materialColor}40`
              }}
            />
            {/* Back face */}
            <div 
              className="absolute inset-0 rounded-lg"
              style={{ 
                backgroundColor: materialColor,
                opacity: 0.7,
                transform: 'translateZ(-32px)'
              }}
            />
            {/* Top face */}
            <div 
              className="absolute inset-0 w-full h-16 rounded-lg"
              style={{ 
                backgroundColor: materialColor,
                opacity: 0.8,
                transform: 'rotateX(90deg) translateZ(16px)'
              }}
            />
            {/* Bottom face */}
            <div 
              className="absolute inset-0 w-full h-16 rounded-lg"
              style={{ 
                backgroundColor: materialColor,
                opacity: 0.6,
                transform: 'rotateX(-90deg) translateZ(16px)'
              }}
            />
            {/* Right face */}
            <div 
              className="absolute inset-0 w-16 h-full rounded-lg"
              style={{ 
                backgroundColor: materialColor,
                opacity: 0.7,
                transform: 'rotateY(90deg) translateZ(16px)'
              }}
            />
            {/* Left face */}
            <div 
              className="absolute inset-0 w-16 h-full rounded-lg"
              style={{ 
                backgroundColor: materialColor,
                opacity: 0.6,
                transform: 'rotateY(-90deg) translateZ(16px)'
              }}
            />
          </div>
        </div>
      </div>

      {/* File info overlay */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="glass backdrop-blur-xl rounded-lg p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--text-secondary)]">Modelo 3D cargado</span>
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: materialColor }}
              />
              <span className="text-[var(--text-secondary)]">Color: {materialColor}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
