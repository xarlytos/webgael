import { ArrowRight, Calculator, ShoppingBag } from 'lucide-react';
import { useEffect, useRef } from 'react';

export function HeroSplit3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
      });
    }

    let animationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      ctx.fillStyle = 'rgba(89, 243, 193, 0.15)';
      ctx.strokeStyle = 'rgba(89, 243, 193, 0.1)';
      ctx.lineWidth = 1;

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.offsetWidth) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.offsetHeight) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.globalAlpha = 1 - distance / 120;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--brand) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--brand-2) 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--brand)]"></span>
              </span>
              <span className="text-[var(--text-secondary)]">Servicio profesional activo</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.1]">
              Da vida a tus ideas en{' '}
              <span className="gradient-text">3D</span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed max-w-xl">
              Impresión 3D profesional con tecnología FDM y SLA. Desde prototipado rápido hasta producción final con calidad excepcional.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/sube-tu-diseno"
                className="btn-gradient px-8 py-4 rounded-full text-base font-semibold text-[var(--bg)] flex items-center justify-center space-x-2 focus-ring group"
              >
                <Calculator className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>Calcula tu precio</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="/catalogo"
                className="px-8 py-4 rounded-full glass glass-hover text-base font-semibold flex items-center justify-center space-x-2 focus-ring group transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Ver catálogo</span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[var(--border)]">
              <div>
                <div className="text-3xl font-display font-bold gradient-text">2000+</div>
                <div className="text-sm text-[var(--text-tertiary)] mt-1">Piezas impresas</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold gradient-text">24-48h</div>
                <div className="text-sm text-[var(--text-tertiary)] mt-1">Entrega media</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold gradient-text">15+</div>
                <div className="text-sm text-[var(--text-tertiary)] mt-1">Materiales</div>
              </div>
            </div>
          </div>

          {/* 3D Visualization */}
          <div className="relative h-[500px] lg:h-[600px]">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              style={{ mixBlendMode: 'screen' }}
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 animate-float">
                <div className="absolute inset-0 rounded-3xl glass backdrop-blur-xl border-2 border-[var(--border)] animate-tilt">
                  <div className="absolute inset-8 flex items-center justify-center">
                    <svg viewBox="0 0 200 200" className="w-full h-full opacity-90">
                      <defs>
                        <linearGradient id="meshGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{ stopColor: 'var(--brand)', stopOpacity: 1 }} />
                          <stop offset="50%" style={{ stopColor: 'var(--brand-2)', stopOpacity: 1 }} />
                          <stop offset="100%" style={{ stopColor: 'var(--accent)', stopOpacity: 1 }} />
                        </linearGradient>
                      </defs>

                      <g transform="translate(100, 100)">
                        {/* Base cube representation */}
                        <polygon points="0,-50 40,-30 40,30 0,50 -40,30 -40,-30" fill="url(#meshGradient)" opacity="0.3" />
                        <polygon points="0,-50 40,-30 40,30 0,10" fill="url(#meshGradient)" opacity="0.5" />
                        <polygon points="0,-50 -40,-30 -40,30 0,10" fill="url(#meshGradient)" opacity="0.4" />

                        {/* Grid lines */}
                        <line x1="-40" y1="-30" x2="40" y2="-30" stroke="var(--brand)" strokeWidth="1" opacity="0.6" />
                        <line x1="-40" y1="0" x2="40" y2="0" stroke="var(--brand)" strokeWidth="1" opacity="0.6" />
                        <line x1="-40" y1="30" x2="40" y2="30" stroke="var(--brand)" strokeWidth="1" opacity="0.6" />

                        <line x1="0" y1="-50" x2="0" y2="50" stroke="var(--brand-2)" strokeWidth="1" opacity="0.6" />
                        <line x1="-20" y1="-40" x2="-20" y2="40" stroke="var(--brand-2)" strokeWidth="1" opacity="0.4" />
                        <line x1="20" y1="-40" x2="20" y2="40" stroke="var(--brand-2)" strokeWidth="1" opacity="0.4" />
                      </g>
                    </svg>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl glass backdrop-blur-xl border border-[var(--border)] p-4 flex flex-col items-center justify-center">
                  <div className="text-2xl font-display font-bold gradient-text">0.1mm</div>
                  <div className="text-xs text-[var(--text-tertiary)] mt-1">Precisión</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
