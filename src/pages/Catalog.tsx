import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ShoppingBag, Clock, Star } from 'lucide-react';
import { Product } from '../lib/supabase';
import { getAllProducts } from '../lib/mockData';

export function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    try {
      const products = getAllProducts();
      setProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen">
      <Navbar currentPath="/catalogo" />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-display font-bold mb-6">
              Nuestro <span className="gradient-text">catálogo</span>
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Explora nuestra selección de productos listos para imprimir. Todos personalizables en color y material.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-24">
              <div className="animate-spin w-12 h-12 border-4 border-[var(--brand)] border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
              <article
                key={product.id}
                className="glass glass-hover rounded-3xl overflow-hidden transition-all hover:scale-[1.02] group"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />

                  {/* Quick Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 rounded-full glass backdrop-blur-xl text-xs font-medium flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{product.time}</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-display font-bold text-lg mb-1">{product.name}</h3>
                      <p className="text-sm text-[var(--text-tertiary)]">{product.material}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-[var(--brand)] text-[var(--brand)]" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                    <div>
                      <span className="text-2xl font-display font-bold gradient-text">
                        €{Number(product.price).toFixed(2)}
                      </span>
                    </div>
                    <a
                      href={`/producto?id=${product.id}`}
                      className="px-4 py-2 rounded-xl glass glass-hover text-sm font-medium transition-all hover:bg-[var(--brand)] hover:text-[var(--bg)] focus-ring"
                    >
                      Ver detalles
                    </a>
                  </div>
                </div>
              </article>
              ))}
            </div>
          )}

          {/* Custom Design CTA */}
          <div className="mt-16 glass rounded-3xl p-8 lg:p-12 text-center">
            <h2 className="text-3xl font-display font-bold mb-4">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-6 max-w-2xl mx-auto">
              Sube tu propio diseño y obtén un presupuesto personalizado
            </p>
            <a
              href="/sube-tu-diseno"
              className="inline-flex items-center space-x-2 btn-gradient px-8 py-4 rounded-full text-base font-semibold text-[var(--bg)] focus-ring"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Diseño personalizado</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
