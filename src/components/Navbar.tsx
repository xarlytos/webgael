import { Menu, X, Upload } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { CartDropdown } from './CartDropdown';

interface NavbarProps {
  currentPath?: string;
}

export function Navbar({ currentPath = '/' }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/catalogo', label: 'Catálogo' },
    { href: '/sube-tu-diseno', label: 'Sube tu diseño' },
    { href: '/contacto', label: 'Contacto' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[var(--z-fixed)] glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 group focus-ring rounded-lg">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--brand)] to-[var(--brand-2)] flex items-center justify-center transition-transform group-hover:scale-105">
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
            <span className="font-display font-bold text-lg md:text-xl tracking-tight">
              Hazlo en <span className="gradient-text">3D</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors focus-ring ${
                  currentPath === link.href
                    ? 'text-[var(--brand)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text)]'
                }`}
              >
                {link.label}
                {currentPath === link.href && (
                  <span
                    className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                    style={{ background: 'var(--gradient-primary)' }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* CTA & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <CartDropdown />
            <a
              href="/sube-tu-diseno"
              className="btn-gradient px-5 py-2.5 rounded-full text-sm font-semibold text-[var(--bg)] flex items-center space-x-2 focus-ring"
            >
              <Upload className="w-4 h-4" />
              <span>Sube tu diseño</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <ThemeToggle />
            <CartDropdown />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl glass glass-hover transition-all focus-ring"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-[var(--border)]">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  currentPath === link.href
                    ? 'bg-[var(--surface)] text-[var(--brand)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text)]'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/sube-tu-diseno"
              className="btn-gradient px-4 py-3 rounded-xl text-base font-semibold text-[var(--bg)] flex items-center justify-center space-x-2 mt-4"
            >
              <Upload className="w-5 h-5" />
              <span>Sube tu diseño</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
