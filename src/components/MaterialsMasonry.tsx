import { Shield, Thermometer, Layers, Droplet } from 'lucide-react';
import { useState } from 'react';

interface Material {
  name: string;
  type: 'FDM' | 'SLA';
  properties: {
    strength: number;
    detail: number;
    flexibility: number;
    temperature: number;
  };
  colors: string[];
  icon: typeof Shield;
  description: string;
  applications: string[];
}

const materials: Material[] = [
  {
    name: 'PLA',
    type: 'FDM',
    properties: { strength: 7, detail: 7, flexibility: 3, temperature: 6 },
    colors: ['#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00'],
    icon: Layers,
    description: 'Material biodegradable ideal para prototipos y figuras decorativas.',
    applications: ['Prototipos', 'Figuras', 'Decoración', 'Maquetas'],
  },
  {
    name: 'PETG',
    type: 'FDM',
    properties: { strength: 8, detail: 7, flexibility: 6, temperature: 8 },
    colors: ['#FFFFFF', '#000000', '#FF6B6B', '#4ECDC4'],
    icon: Shield,
    description: 'Resistente y duradero, perfecto para piezas funcionales.',
    applications: ['Piezas mecánicas', 'Recipientes', 'Protectores', 'Herramientas'],
  },
  {
    name: 'ABS',
    type: 'FDM',
    properties: { strength: 9, detail: 6, flexibility: 5, temperature: 9 },
    colors: ['#FFFFFF', '#000000', '#808080'],
    icon: Thermometer,
    description: 'Alta resistencia térmica y mecánica para aplicaciones exigentes.',
    applications: ['Automoción', 'Carcasas', 'Piezas de repuesto', 'Prototipos funcionales'],
  },
  {
    name: 'TPU',
    type: 'FDM',
    properties: { strength: 6, detail: 6, flexibility: 10, temperature: 5 },
    colors: ['#000000', '#FF0000', '#0000FF'],
    icon: Droplet,
    description: 'Material flexible y elástico, ideal para piezas con movimiento.',
    applications: ['Juntas', 'Amortiguadores', 'Fundas', 'Wearables'],
  },
  {
    name: 'Resina Standard',
    type: 'SLA',
    properties: { strength: 6, detail: 10, flexibility: 3, temperature: 6 },
    colors: ['#F5F5DC', '#808080', '#000000'],
    icon: Layers,
    description: 'Resina versátil con excelente detalle para modelos y prototipos.',
    applications: ['Figuras detalladas', 'Joyería', 'Modelos arquitectónicos', 'Miniaturas'],
  },
  {
    name: 'Resina Tough',
    type: 'SLA',
    properties: { strength: 9, detail: 9, flexibility: 4, temperature: 7 },
    colors: ['#D3D3D3', '#696969'],
    icon: Shield,
    description: 'Alta resistencia mecánica similar al ABS para piezas funcionales.',
    applications: ['Prototipos funcionales', 'Piezas de ensamblaje', 'Carcasas', 'Conectores'],
  },
  {
    name: 'Resina Flexible',
    type: 'SLA',
    properties: { strength: 5, detail: 9, flexibility: 9, temperature: 5 },
    colors: ['#F5F5F5', '#000000'],
    icon: Droplet,
    description: 'Resina elástica con alta precisión de detalle.',
    applications: ['Prototipos ergonómicos', 'Juntas', 'Sellos', 'Moldes flexibles'],
  },
];

const filters = [
  { id: 'all', label: 'Todos', icon: Layers },
  { id: 'fdm', label: 'FDM', icon: Layers },
  { id: 'sla', label: 'SLA', icon: Droplet },
];

export function MaterialsMasonry() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredMaterials = materials.filter((material) => {
    if (activeFilter === 'all') return true;
    return material.type.toLowerCase() === activeFilter;
  });

  return (
    <section className="py-24" id="materiales">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
            Amplia variedad de <span className="gradient-text">materiales</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)]">
            Selecciona el material perfecto para tu proyecto según resistencia, detalle y aplicación.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-12">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-full font-medium transition-all focus-ring ${
                  activeFilter === filter.id
                    ? 'btn-gradient text-[var(--bg)]'
                    : 'glass glass-hover text-[var(--text-secondary)]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{filter.label}</span>
              </button>
            );
          })}
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => {
            const Icon = material.icon;
            return (
              <div
                key={material.name}
                className="glass glass-hover rounded-3xl p-6 transition-all hover:scale-105 group cursor-pointer"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--brand)] to-[var(--brand-2)] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[var(--bg)]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold">{material.name}</h3>
                      <span className="text-xs px-2 py-1 rounded-full glass inline-block mt-1">
                        {material.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
                  {material.description}
                </p>

                {/* Properties */}
                <div className="space-y-2 mb-4">
                  <PropertyBar label="Resistencia" value={material.properties.strength} />
                  <PropertyBar label="Detalle" value={material.properties.detail} />
                  <PropertyBar label="Flexibilidad" value={material.properties.flexibility} />
                  <PropertyBar label="Temperatura" value={material.properties.temperature} />
                </div>

                {/* Colors */}
                <div className="mb-4">
                  <div className="text-xs text-[var(--text-tertiary)] mb-2">Colores disponibles</div>
                  <div className="flex gap-2">
                    {material.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-8 h-8 rounded-lg border-2 border-[var(--border)] transition-transform hover:scale-110"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Applications */}
                <div>
                  <div className="text-xs text-[var(--text-tertiary)] mb-2">Aplicaciones</div>
                  <div className="flex flex-wrap gap-2">
                    {material.applications.slice(0, 3).map((app) => (
                      <span
                        key={app}
                        className="text-xs px-3 py-1 rounded-full bg-[var(--surface)] text-[var(--text-secondary)]"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PropertyBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-[var(--text-tertiary)]">{label}</span>
        <span className="text-[var(--text-secondary)] font-medium">{value}/10</span>
      </div>
      <div className="h-1.5 bg-[var(--surface)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${(value / 10) * 100}%`,
            background: 'var(--gradient-primary)',
          }}
        />
      </div>
    </div>
  );
}
