import { ChevronLeft, ChevronRight, Clock, Layers, Ruler } from 'lucide-react';
import { useState } from 'react';

interface ShowcaseItem {
  id: number;
  title: string;
  category: string;
  material: string;
  time: string;
  size: string;
  image: string;
  description: string;
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: 1,
    title: 'Prototipo funcional',
    category: 'Ingeniería',
    material: 'PETG Negro',
    time: '18h',
    size: '150x100x80mm',
    image: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Carcasa técnica con ensambles precisos',
  },
  {
    id: 2,
    title: 'Figura artística',
    category: 'Arte',
    material: 'Resina Standard',
    time: '12h',
    size: '200x150x180mm',
    image: 'https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Escultura detallada con acabado premium',
  },
  {
    id: 3,
    title: 'Pieza de repuesto',
    category: 'Automoción',
    material: 'ABS',
    time: '24h',
    size: '180x120x95mm',
    image: 'https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Componente mecánico resistente',
  },
  {
    id: 4,
    title: 'Maqueta arquitectónica',
    category: 'Arquitectura',
    material: 'PLA Blanco',
    time: '36h',
    size: '300x200x150mm',
    image: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Modelo a escala con múltiples detalles',
  },
];

export function ShowcaseCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length);
  };

  const currentItem = showcaseItems[currentIndex];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--brand-2) 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
            Proyectos <span className="gradient-text">destacados</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)]">
            Explora algunos de nuestros trabajos más recientes y descubre las posibilidades.
          </p>
        </div>

        <div className="relative">
          {/* Main Carousel */}
          <div className="glass rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-96 lg:h-[500px] overflow-hidden group">
                <img
                  src={currentItem.image}
                  alt={currentItem.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 rounded-full glass backdrop-blur-xl text-sm font-medium">
                    {currentItem.category}
                  </span>
                </div>

                {/* Navigation Buttons */}
                <div className="absolute bottom-6 right-6 flex items-center space-x-3">
                  <button
                    onClick={prevSlide}
                    className="w-12 h-12 rounded-xl glass backdrop-blur-xl glass-hover transition-all focus-ring flex items-center justify-center"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-12 h-12 rounded-xl glass backdrop-blur-xl glass-hover transition-all focus-ring flex items-center justify-center"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="text-3xl lg:text-4xl font-display font-bold mb-4">{currentItem.title}</h3>
                <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
                  {currentItem.description}
                </p>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="glass rounded-2xl p-4">
                    <div className="flex items-center space-x-2 text-[var(--text-tertiary)] mb-2">
                      <Layers className="w-4 h-4" />
                      <span className="text-xs">Material</span>
                    </div>
                    <div className="font-display font-semibold text-[var(--brand)]">
                      {currentItem.material}
                    </div>
                  </div>

                  <div className="glass rounded-2xl p-4">
                    <div className="flex items-center space-x-2 text-[var(--text-tertiary)] mb-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">Tiempo</span>
                    </div>
                    <div className="font-display font-semibold text-[var(--brand)]">
                      {currentItem.time}
                    </div>
                  </div>

                  <div className="glass rounded-2xl p-4 col-span-2">
                    <div className="flex items-center space-x-2 text-[var(--text-tertiary)] mb-2">
                      <Ruler className="w-4 h-4" />
                      <span className="text-xs">Dimensiones</span>
                    </div>
                    <div className="font-display font-semibold text-[var(--brand)]">
                      {currentItem.size}
                    </div>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center space-x-2">
                  {showcaseItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-1.5 rounded-full transition-all focus-ring ${
                        index === currentIndex ? 'w-12 bg-[var(--brand)]' : 'w-8 bg-[var(--surface)]'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
