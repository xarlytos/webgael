import { useState } from 'react';
import { Download, Box } from 'lucide-react';

export function TestModelGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateTestSTL = () => {
    setIsGenerating(true);
    
    // Crear un cubo simple en formato STL ASCII
    const stlContent = `solid test_cube
  facet normal 0.0 0.0 1.0
    outer loop
      vertex 0.0 0.0 1.0
      vertex 1.0 0.0 1.0
      vertex 1.0 1.0 1.0
    endloop
  endfacet
  facet normal 0.0 0.0 1.0
    outer loop
      vertex 0.0 0.0 1.0
      vertex 1.0 1.0 1.0
      vertex 0.0 1.0 1.0
    endloop
  endfacet
  facet normal 0.0 0.0 -1.0
    outer loop
      vertex 0.0 0.0 0.0
      vertex 0.0 1.0 0.0
      vertex 1.0 1.0 0.0
    endloop
  endfacet
  facet normal 0.0 0.0 -1.0
    outer loop
      vertex 0.0 0.0 0.0
      vertex 1.0 1.0 0.0
      vertex 1.0 0.0 0.0
    endloop
  endfacet
  facet normal 0.0 1.0 0.0
    outer loop
      vertex 0.0 1.0 0.0
      vertex 0.0 1.0 1.0
      vertex 1.0 1.0 1.0
    endloop
  endfacet
  facet normal 0.0 1.0 0.0
    outer loop
      vertex 0.0 1.0 0.0
      vertex 1.0 1.0 1.0
      vertex 1.0 1.0 0.0
    endloop
  endfacet
  facet normal 0.0 -1.0 0.0
    outer loop
      vertex 0.0 0.0 0.0
      vertex 1.0 0.0 0.0
      vertex 1.0 0.0 1.0
    endloop
  endfacet
  facet normal 0.0 -1.0 0.0
    outer loop
      vertex 0.0 0.0 0.0
      vertex 1.0 0.0 1.0
      vertex 0.0 0.0 1.0
    endloop
  endfacet
  facet normal 1.0 0.0 0.0
    outer loop
      vertex 1.0 0.0 0.0
      vertex 1.0 1.0 0.0
      vertex 1.0 1.0 1.0
    endloop
  endfacet
  facet normal 1.0 0.0 0.0
    outer loop
      vertex 1.0 0.0 0.0
      vertex 1.0 1.0 1.0
      vertex 1.0 0.0 1.0
    endloop
  endfacet
  facet normal -1.0 0.0 0.0
    outer loop
      vertex 0.0 0.0 0.0
      vertex 0.0 0.0 1.0
      vertex 0.0 1.0 1.0
    endloop
  endfacet
  facet normal -1.0 0.0 0.0
    outer loop
      vertex 0.0 0.0 0.0
      vertex 0.0 1.0 1.0
      vertex 0.0 1.0 0.0
    endloop
  endfacet
endsolid test_cube`;

    // Crear blob y descargar
    const blob = new Blob([stlContent], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'test_cube.stl';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setTimeout(() => setIsGenerating(false), 1000);
  };

  return (
    <div className="glass rounded-2xl p-6 text-center">
      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--surface)] flex items-center justify-center">
        <Box className="w-6 h-6 text-[var(--brand)]" />
      </div>
      <h3 className="font-display font-bold mb-2">¿No tienes un archivo 3D?</h3>
      <p className="text-sm text-[var(--text-secondary)] mb-4">
        Descarga un modelo de prueba para probar la calculadora
      </p>
      <button
        onClick={generateTestSTL}
        disabled={isGenerating}
        className="btn-gradient px-6 py-3 rounded-full text-sm font-semibold text-[var(--bg)] flex items-center space-x-2 mx-auto focus-ring disabled:opacity-50"
      >
        <Download className="w-4 h-4" />
        <span>{isGenerating ? 'Generando...' : 'Descargar modelo de prueba'}</span>
      </button>
    </div>
  );
}
