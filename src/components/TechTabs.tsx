import { Layers, Zap, Check } from 'lucide-react';
import { useState } from 'react';

interface Technology {
  id: string;
  name: string;
  icon: typeof Layers;
  description: string;
  advantages: string[];
  tolerances: string;
  materials: string[];
}

const technologies: Technology[] = [
  {
    id: 'fdm',
    name: 'FDM (Deposición fundida)',
    icon: Layers,
    description: 'Tecnología ideal para prototipos funcionales y piezas de producción con excelente resistencia mecánica.',
    advantages: [
      'Piezas resistentes y funcionales',
      'Amplia variedad de materiales',
      'Costo-efectivo para volúmenes medios',
      'Excelente para piezas grandes',
    ],
    tolerances: '±0.2mm - ±0.5mm',
    materials: ['PLA', 'PETG', 'ABS', 'TPU', 'Nylon', 'ASA'],
  },
  {
    id: 'sla',
    name: 'SLA (Estereolitografía)',
    icon: Zap,
    description: 'Tecnología de resina UV para detalles excepcionales y acabados superficiales de alta calidad.',
    advantages: [
      'Detalle y precisión extremos',
      'Acabado superficial suave',
      'Ideal para modelos y moldes',
      'Geometrías complejas sin soportes visibles',
    ],
    tolerances: '±0.05mm - ±0.15mm',
    materials: ['Resina Standard', 'Resina Tough', 'Resina Flexible', 'Resina Transparente'],
  },
];

export function TechTabs() {
  const [activeTab, setActiveTab] = useState<string>('fdm');
  const activeTech = technologies.find((t) => t.id === activeTab) || technologies[0];

  return (
    <section className="py-24" id="tecnologias">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
            Tecnologías de <span className="gradient-text">impresión</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)]">
            Utilizamos las tecnologías más avanzadas para garantizar la máxima calidad en cada proyecto.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <button
                key={tech.id}
                onClick={() => setActiveTab(tech.id)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-medium transition-all focus-ring ${
                  activeTab === tech.id
                    ? 'glass text-[var(--brand)] shadow-lg'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tech.name}</span>
              </button>
            );
          })}
        </div>

        {/* Content Panel */}
        <div className="glass rounded-3xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Description & Advantages */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-display font-bold mb-4">{activeTech.name}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">{activeTech.description}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Ventajas principales</h4>
                <ul className="space-y-3">
                  {activeTech.advantages.map((advantage, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-[var(--brand)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--text-secondary)]">{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[var(--text-secondary)]">Tolerancias típicas</span>
                  <span className="text-lg font-display font-bold text-[var(--brand)]">{activeTech.tolerances}</span>
                </div>
              </div>
            </div>

            {/* Right: Materials */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Materiales disponibles</h4>
              <div className="grid grid-cols-2 gap-3">
                {activeTech.materials.map((material) => (
                  <div
                    key={material}
                    className="glass glass-hover rounded-xl p-4 text-center transition-all hover:scale-105 cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--brand)] to-[var(--brand-2)] mx-auto mb-3" />
                    <span className="text-sm font-medium">{material}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-2xl border-2 border-[var(--border)]">
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  ¿No encuentras el material que necesitas? Contacta con nosotros para opciones especiales y materiales técnicos avanzados.
                </p>
                <a
                  href="/contacto"
                  className="inline-flex items-center space-x-2 mt-4 text-[var(--brand)] hover:text-[var(--brand-dark)] transition-colors font-medium text-sm"
                >
                  <span>Consultar materiales especiales</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
