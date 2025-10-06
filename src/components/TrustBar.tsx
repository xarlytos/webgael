import { Star } from 'lucide-react';

const clients = [
  { name: 'TechCorp', logo: 'TC' },
  { name: 'InnovateLab', logo: 'IL' },
  { name: 'DesignStudio', logo: 'DS' },
  { name: 'MakerSpace', logo: 'MS' },
  { name: 'ProtoWorks', logo: 'PW' },
];

export function TrustBar() {
  return (
    <section className="py-16 border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Rating */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-[var(--brand)] text-[var(--brand)]" />
              ))}
            </div>
            <p className="text-3xl font-display font-bold mb-2">
              <span className="gradient-text">4.9/5</span> de satisfacción
            </p>
            <p className="text-[var(--text-secondary)]">
              Basado en más de 500 proyectos completados
            </p>
          </div>

          {/* Right: Client Logos */}
          <div>
            <p className="text-sm text-[var(--text-tertiary)] text-center lg:text-left mb-6">
              Confían en nosotros
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
              {clients.map((client) => (
                <div
                  key={client.name}
                  className="w-20 h-20 rounded-xl glass glass-hover flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
                >
                  <span className="font-display font-bold text-xl text-[var(--brand)]">
                    {client.logo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
