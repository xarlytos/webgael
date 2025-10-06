import { Upload, Search, Cog, Truck, Package } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: Upload,
    title: 'Sube tu diseño',
    description: 'Carga tu archivo STL y obtén un presupuesto instantáneo con opciones de material y acabado.',
  },
  {
    number: 2,
    icon: Search,
    title: 'Revisión técnica',
    description: 'Nuestro equipo revisa tu diseño para garantizar la mejor calidad de impresión posible.',
  },
  {
    number: 3,
    icon: Cog,
    title: 'Producción',
    description: 'Fabricamos tu pieza con la tecnología y materiales seleccionados, con control de calidad estricto.',
  },
  {
    number: 4,
    icon: Package,
    title: 'Control de calidad',
    description: 'Verificamos dimensiones, acabado y resistencia antes de preparar el envío.',
  },
  {
    number: 5,
    icon: Truck,
    title: 'Entrega',
    description: 'Empaquetamos con cuidado y enviamos tu pedido con tracking completo.',
  },
];

export function Steps5() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute top-0 left-1/3 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
            Proceso simple en <span className="gradient-text">5 pasos</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)]">
            Desde tu idea hasta la entrega, un proceso transparente y eficiente.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--brand)] via-[var(--brand-2)] to-[var(--accent)]" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative group">
                  {/* Connection Line - Mobile/Tablet */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden absolute top-20 left-1/2 w-0.5 h-full bg-gradient-to-b from-[var(--brand)] to-[var(--brand-2)] transform -translate-x-1/2" />
                  )}

                  <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Icon Container */}
                    <div className="relative mb-6">
                      <div className="w-40 h-40 rounded-3xl glass backdrop-blur-xl border-2 border-[var(--border)] flex items-center justify-center transition-all group-hover:scale-105 group-hover:border-[var(--brand)]">
                        <Icon className="w-16 h-16 text-[var(--brand)] transition-transform group-hover:scale-110" />
                      </div>

                      {/* Step Number Badge */}
                      <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--brand-2)] flex items-center justify-center text-[var(--bg)] font-display font-bold text-lg shadow-lg">
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-display font-bold mb-3">{step.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="/sube-tu-diseno"
            className="inline-flex items-center space-x-2 btn-gradient px-8 py-4 rounded-full text-base font-semibold text-[var(--bg)] focus-ring"
          >
            <Upload className="w-5 h-5" />
            <span>Empezar ahora</span>
          </a>
        </div>
      </div>
    </section>
  );
}
