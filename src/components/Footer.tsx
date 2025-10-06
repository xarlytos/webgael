import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Github } from 'lucide-react';

export function Footer() {
  const quickLinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Catálogo', href: '/catalogo' },
    { label: 'Sube tu diseño', href: '/sube-tu-diseno' },
    { label: 'Materiales', href: '/#materiales' },
    { label: 'Soporte', href: '/contacto' },
  ];

  const resources = [
    { label: 'Guía de preparación STL', href: '#' },
    { label: 'Especificaciones técnicas', href: '#' },
    { label: 'Tolerancias y acabados', href: '#' },
    { label: 'Preguntas frecuentes', href: '/#faq' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'Github' },
  ];

  return (
    <footer className="border-t border-[var(--border)] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--brand)] to-[var(--brand-2)] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="var(--bg)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="var(--bg)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="var(--bg)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="font-display font-bold text-xl">
                Hazlo en <span className="gradient-text">3D</span>
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Servicio profesional de impresión 3D. Convertimos tus ideas en realidad con tecnología FDM y SLA.
            </p>
            <div className="flex items-center space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-lg glass glass-hover transition-all focus-ring"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">
              Enlaces rápidos
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--brand)] transition-colors focus-ring rounded"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">
              Recursos
            </h3>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--brand)] transition-colors focus-ring rounded"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">
              Newsletter
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              Recibe novedades, ofertas y consejos sobre impresión 3D.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-sm focus:border-[var(--brand)] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="w-full btn-gradient px-4 py-2.5 rounded-xl text-sm font-semibold text-[var(--bg)] focus-ring"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-sm text-[var(--text-tertiary)]">
            © 2025 Hazlo en 3D. Todos los derechos reservados.
          </p>
          <div className="flex items-center space-x-6 text-sm text-[var(--text-tertiary)]">
            <a href="#" className="hover:text-[var(--brand)] transition-colors focus-ring rounded">
              Política de privacidad
            </a>
            <a href="#" className="hover:text-[var(--brand)] transition-colors focus-ring rounded">
              Términos de servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
