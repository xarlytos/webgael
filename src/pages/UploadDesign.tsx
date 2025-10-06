import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Upload, FileCheck, AlertCircle, CheckCircle, ShoppingCart, Download } from 'lucide-react';
import { FileUpload } from '../components/FileUpload';
import { Real3DViewer } from '../components/Real3DViewer';
import { PriceCalculator } from '../components/PriceCalculator';
import { TestModelGenerator } from '../components/TestModelGenerator';

const checklist = [
  { icon: CheckCircle, text: 'Archivo en formato STL o OBJ' },
  { icon: CheckCircle, text: 'Modelo sin errores de geometría (manifold)' },
  { icon: CheckCircle, text: 'Tamaño máximo: 300x300x300mm' },
  { icon: CheckCircle, text: 'Espesor de pared mínimo: 1.5mm (FDM) / 0.8mm (SLA)' },
];

const tips = [
  'Evita paredes excesivamente delgadas que puedan romperse',
  'Considera la orientación de impresión para minimizar soportes',
  'Para piezas ensamblables, añade 0.2-0.3mm de holgura',
  'Revisa que las normales estén correctamente orientadas',
];

export function UploadDesign() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [materialColor, setMaterialColor] = useState('#FF6B6B');
  const [price, setPrice] = useState(0);
  const [time, setTime] = useState('0h');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (file: File | null) => {
    setUploadedFile(file);
  };

  const handleFileUrlChange = (url: string | null) => {
    setFileUrl(url);
  };

  const handlePriceUpdate = (newPrice: number, newTime: string) => {
    setPrice(newPrice);
    setTime(newTime);
  };

  const handleMaterialChange = (material: string, color: string) => {
    setMaterialColor(color);
  };

  const handleAddToCart = () => {
    if (!uploadedFile) return;
    
    // Aquí se añadiría al carrito real
    alert(`¡Producto personalizado añadido al carrito por €${price.toFixed(2)}!`);
  };

  const handleDownloadQuote = () => {
    // Generar PDF del presupuesto
    alert('Descargando presupuesto en PDF...');
  };

  return (
    <div className="min-h-screen">
      <Navbar currentPath="/sube-tu-diseno" />

      <main className="pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-[var(--brand)]/10 px-4 py-2 rounded-full text-sm font-medium text-[var(--brand)] mb-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Calculadora 3D Avanzada</span>
            </div>
            <h1 className="text-6xl sm:text-7xl font-display font-bold mb-8 leading-tight">
              Sube tu <span className="gradient-text">diseño</span>
            </h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed mb-8">
              Carga tu archivo 3D y obtén un presupuesto instantáneo con visualización en tiempo real, 
              opciones de material, acabado y tiempo de entrega.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-[var(--text-tertiary)]">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Visualización 3D interactiva</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Presupuesto instantáneo</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Múltiples materiales</span>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="glass rounded-3xl p-8 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <FileCheck className="w-6 h-6 text-[var(--brand)]" />
              <h2 className="text-2xl font-display font-bold">Checklist de preparación</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {checklist.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-[var(--brand)] flex-shrink-0" />
                    <span className="text-[var(--text-secondary)] text-sm">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upload Section */}
          <div className="glass rounded-3xl p-8 lg:p-12 mb-12 border border-[var(--brand)]/20">
            <div className="text-center mb-10">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand)] to-[var(--brand-2)] rounded-full blur-lg opacity-30"></div>
                <div className="relative bg-[var(--brand)]/10 p-4 rounded-full">
                  <Upload className="w-12 h-12 text-[var(--brand)]" />
                </div>
              </div>
              <h2 className="text-3xl font-display font-bold mb-4">Calculadora de presupuesto</h2>
              <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                Sube tu archivo y configura las opciones de impresión para obtener un presupuesto preciso
              </p>
            </div>

            {/* File Upload */}
            <div className="mb-8">
              <FileUpload
                onFileSelect={handleFileSelect}
                onFileUrlChange={handleFileUrlChange}
              />
            </div>

            {/* Test Model Generator */}
            {!uploadedFile && (
              <div className="mb-8">
                <TestModelGenerator />
              </div>
            )}

            {/* 3D Viewer and Calculator */}
            {uploadedFile && (
              <div className="grid lg:grid-cols-2 gap-8">
                {/* 3D Viewer */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-display font-bold">Vista previa 3D</h3>
                    <div className="flex items-center space-x-2 text-sm text-[var(--text-secondary)]">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Interactivo</span>
                    </div>
                  </div>
                  <div className="relative">
                    <Real3DViewer
                      fileUrl={fileUrl}
                      materialColor={materialColor}
                      onLoadingChange={setIsLoading}
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <div className="glass backdrop-blur-xl rounded-lg px-3 py-2 text-xs text-[var(--text-secondary)]">
                        Arrastra para rotar • Rueda para zoom
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Calculator */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-display font-bold">Configuración</h3>
                    <div className="flex items-center space-x-2 text-sm text-[var(--text-secondary)]">
                      <div className="w-2 h-2 bg-[var(--brand)] rounded-full animate-pulse"></div>
                      <span>En tiempo real</span>
                    </div>
                  </div>
                  <div className="glass rounded-2xl p-6">
                    <PriceCalculator
                      onPriceUpdate={handlePriceUpdate}
                      onMaterialChange={handleMaterialChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {uploadedFile && price > 0 && (
              <div className="mt-12 pt-8 border-t border-[var(--border)]">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center space-x-4 bg-[var(--brand)]/10 px-6 py-3 rounded-full">
                    <div className="text-2xl font-display font-bold gradient-text">
                      €{price.toFixed(2)}
                    </div>
                    <div className="text-sm text-[var(--text-secondary)]">
                      Tiempo: {time} • Color: {materialColor}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleAddToCart}
                    className="btn-gradient px-10 py-5 rounded-full text-lg font-semibold text-[var(--bg)] flex items-center justify-center space-x-3 focus-ring hover:scale-105 transition-transform duration-200 shadow-lg"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    <span>Añadir al carrito</span>
                  </button>
                  
                  <button
                    onClick={handleDownloadQuote}
                    className="px-10 py-5 rounded-full glass glass-hover text-lg font-semibold flex items-center justify-center space-x-3 focus-ring hover:scale-105 transition-all duration-200 border border-[var(--brand)]/20"
                  >
                    <Download className="w-6 h-6" />
                    <span>Descargar presupuesto</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Tips & Privacy */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Tips */}
            <div className="glass rounded-3xl p-8 border border-[var(--brand)]/10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--brand)] to-[var(--brand-2)] flex items-center justify-center shadow-lg">
                  <AlertCircle className="w-6 h-6 text-[var(--bg)]" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold">Consejos útiles</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Para obtener los mejores resultados</p>
                </div>
              </div>
              <ul className="space-y-4">
                {tips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--brand)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[var(--brand)] text-xs font-bold">{index + 1}</span>
                    </div>
                    <span className="text-[var(--text-secondary)] leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Privacy */}
            <div className="glass rounded-3xl p-8 border border-[var(--brand)]/10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold">Privacidad y seguridad</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Tus datos están protegidos</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    Encriptación de nivel empresarial para todos tus archivos
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    No compartimos ni utilizamos tus diseños para otros propósitos
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    Eliminación automática después de 30 días
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Help CTA */}
          <div className="mt-16 text-center">
            <div className="glass rounded-3xl p-8 lg:p-12 border border-[var(--brand)]/20">
              <div className="max-w-2xl mx-auto">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--brand-2)] flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">¿Necesitas ayuda?</h3>
                <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
                  Nuestro equipo de expertos está aquí para ayudarte con cualquier duda sobre 
                  preparación de archivos, materiales o procesos de impresión.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contacto"
                    className="btn-gradient px-8 py-4 rounded-full text-lg font-semibold text-[var(--bg)] flex items-center justify-center space-x-3 focus-ring hover:scale-105 transition-transform duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Chatear con soporte</span>
                  </a>
                  <a
                    href="/contacto"
                    className="px-8 py-4 rounded-full glass glass-hover text-lg font-semibold flex items-center justify-center space-x-3 focus-ring hover:scale-105 transition-all duration-200 border border-[var(--brand)]/20"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Enviar email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
