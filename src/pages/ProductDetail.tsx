import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ArrowLeft, ShoppingCart, Star, Clock, Layers, Ruler, Weight, Minus, Plus, Package } from 'lucide-react';
import { Product } from '../lib/supabase';
import { getProductById } from '../lib/mockData';
import { useCart } from '../context/CartContext';

export function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [addingToCart, setAddingToCart] = useState(false);
  const [message, setMessage] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const productId = new URLSearchParams(window.location.search).get('id');
    if (productId) {
      fetchProduct(productId);
    }
  }, []);

  const fetchProduct = (id: string) => {
    try {
      const product = getProductById(id);
      if (product) {
        setProduct(product);
        if (product.colors && product.colors.length > 0) {
          setSelectedColor(product.colors[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    if (!selectedColor) {
      setMessage('Por favor selecciona un color');
      return;
    }

    setAddingToCart(true);
    setMessage('');

    try {
      await addToCart(product, quantity, selectedColor, notes);
      setMessage('¡Producto añadido al carrito!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('Error al añadir al carrito');
      }
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-[var(--brand)] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-32 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-display font-bold mb-4">Producto no encontrado</h1>
            <a href="/catalogo" className="text-[var(--brand)] hover:underline">
              Volver al catálogo
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href="/catalogo"
            className="inline-flex items-center space-x-2 text-[var(--text-secondary)] hover:text-[var(--text)] mb-8 focus-ring rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver al catálogo</span>
          </a>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-6">
              <div className="relative rounded-3xl overflow-hidden glass aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-display font-bold mb-2">
                      {product.name}
                    </h1>
                    <p className="text-[var(--text-secondary)] text-lg">{product.material}</p>
                  </div>
                  <div className="flex items-center space-x-1 glass px-4 py-2 rounded-full">
                    <Star className="w-5 h-5 fill-[var(--brand)] text-[var(--brand)]" />
                    <span className="font-medium">{product.rating}</span>
                  </div>
                </div>

                <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass rounded-2xl p-4">
                  <div className="flex items-center space-x-2 text-[var(--text-tertiary)] mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">Tiempo de impresión</span>
                  </div>
                  <div className="font-display font-semibold text-[var(--brand)]">
                    {product.time}
                  </div>
                </div>

                <div className="glass rounded-2xl p-4">
                  <div className="flex items-center space-x-2 text-[var(--text-tertiary)] mb-2">
                    <Layers className="w-4 h-4" />
                    <span className="text-xs">Material</span>
                  </div>
                  <div className="font-display font-semibold text-[var(--brand)]">
                    {product.material}
                  </div>
                </div>

                <div className="glass rounded-2xl p-4">
                  <div className="flex items-center space-x-2 text-[var(--text-tertiary)] mb-2">
                    <Ruler className="w-4 h-4" />
                    <span className="text-xs">Dimensiones</span>
                  </div>
                  <div className="font-display font-semibold text-[var(--brand)]">
                    {product.dimensions}
                  </div>
                </div>

                <div className="glass rounded-2xl p-4">
                  <div className="flex items-center space-x-2 text-[var(--text-tertiary)] mb-2">
                    <Weight className="w-4 h-4" />
                    <span className="text-xs">Peso</span>
                  </div>
                  <div className="font-display font-semibold text-[var(--brand)]">
                    {product.weight}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
                    Color
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-3 rounded-xl glass glass-hover text-sm font-medium transition-all focus-ring ${
                          selectedColor === color
                            ? 'bg-[var(--brand)] text-[var(--bg)]'
                            : ''
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
                    Cantidad
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 rounded-xl glass glass-hover flex items-center justify-center focus-ring transition-all"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-2xl font-display font-bold min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-12 h-12 rounded-xl glass glass-hover flex items-center justify-center focus-ring transition-all"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                    <div className="flex items-center space-x-2 text-[var(--text-tertiary)] ml-auto">
                      <Package className="w-4 h-4" />
                      <span className="text-sm">{product.stock} disponibles</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
                    Notas personalizadas (opcional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Añade cualquier instrucción especial..."
                    className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] focus:border-[var(--brand)] focus:outline-none transition-colors resize-none"
                    rows={3}
                  />
                </div>
              </div>

              <div className="border-t border-[var(--border)] pt-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[var(--text-secondary)]">Precio total:</span>
                  <span className="text-4xl font-display font-bold gradient-text">
                    €{(Number(product.price) * quantity).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart || !selectedColor}
                  className="w-full btn-gradient px-8 py-4 rounded-full text-lg font-semibold text-[var(--bg)] flex items-center justify-center space-x-3 focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span>{addingToCart ? 'Añadiendo...' : 'Añadir al carrito'}</span>
                </button>

                {message && (
                  <div className={`mt-4 p-4 rounded-xl text-center font-medium ${
                    message.includes('Error') || message.includes('selecciona')
                      ? 'bg-red-500/10 text-red-500'
                      : 'bg-green-500/10 text-green-500'
                  }`}>
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
