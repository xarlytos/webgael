import { Upload, Zap } from 'lucide-react';

export function PricingStrip() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background with gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: 'var(--gradient-primary)',
              opacity: 0.1,
            }}
          />
          <div className="absolute inset-0 glass backdrop-blur-xl" />

          {/* Content */}
          <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-20 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-6">
                <Zap className="w-4 h-4 text-[var(--brand)]" />
                <span className="text-sm font-medium">Cotización instantánea</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
                ¿Listo para dar vida a tu <span className="gradient-text">proyecto</span>?
              </h2>

              <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                Sube tu archivo STL y obtén un presupuesto instantáneo. Sin compromiso, sin letra pequeña.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/sube-tu-diseno"
                  className="btn-gradient px-8 py-4 rounded-full text-base font-semibold text-[var(--bg)] flex items-center space-x-2 focus-ring group w-full sm:w-auto justify-center"
                >
                  <Upload className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>Calcular precio ahora</span>
                </a>

                <a
                  href="/contacto"
                  className="px-8 py-4 rounded-full glass glass-hover text-base font-semibold flex items-center justify-center focus-ring transition-all w-full sm:w-auto"
                >
                  <span>Hablar con un experto</span>
                </a>
              </div>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl glass mb-3 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[var(--brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[var(--text-secondary)]">Sin mínimos de pedido</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl glass mb-3 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[var(--brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-[var(--text-secondary)]">Entrega en 24-48h</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl glass mb-3 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[var(--brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-[var(--text-secondary)]">Garantía de calidad</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
