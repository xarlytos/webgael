import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ShoppingBag, CreditCard, MapPin, User, Mail, Phone, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Checkout() {
  const { cart, cartTotal, removeFromCart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });
  const [processing, setProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(async () => {
      setOrderComplete(true);
      await clearCart();
      setProcessing(false);
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-32 pb-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="glass rounded-3xl p-12">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--brand-2)] flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-[var(--bg)]" />
              </div>
              <h1 className="text-4xl font-display font-bold mb-4">
                ¡Pedido <span className="gradient-text">confirmado</span>!
              </h1>
              <p className="text-lg text-[var(--text-secondary)] mb-8">
                Hemos recibido tu pedido y comenzaremos a trabajar en él de inmediato. Te enviaremos un email con los detalles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/catalogo"
                  className="px-8 py-4 rounded-full glass glass-hover font-semibold focus-ring transition-all"
                >
                  Seguir comprando
                </a>
                <a
                  href="/"
                  className="btn-gradient px-8 py-4 rounded-full font-semibold text-[var(--bg)] focus-ring"
                >
                  Volver al inicio
                </a>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-32 pb-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-[var(--text-tertiary)]" />
            <h1 className="text-4xl font-display font-bold mb-4">Tu carrito está vacío</h1>
            <p className="text-lg text-[var(--text-secondary)] mb-8">
              Añade productos al carrito para continuar con tu compra
            </p>
            <a
              href="/catalogo"
              className="inline-block btn-gradient px-8 py-4 rounded-full font-semibold text-[var(--bg)] focus-ring"
            >
              Ver catálogo
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
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-12 text-center">
            Finalizar <span className="gradient-text">compra</span>
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="glass rounded-3xl p-6 lg:p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--brand)] to-[var(--brand-2)] flex items-center justify-center">
                    <User className="w-5 h-5 text-[var(--bg)]" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">Información de contacto</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] focus:border-[var(--brand)] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] focus:border-[var(--brand)] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] focus:border-[var(--brand)] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div className="glass rounded-3xl p-6 lg:p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--brand)] to-[var(--brand-2)] flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[var(--bg)]" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">Dirección de envío</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      Dirección
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] focus:border-[var(--brand)] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                        Ciudad
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] focus:border-[var(--brand)] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                        Código postal
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] focus:border-[var(--brand)] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      Notas adicionales (opcional)
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] focus:border-[var(--brand)] focus:outline-none transition-colors resize-none"
                      rows={3}
                      placeholder="Instrucciones especiales de entrega..."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="glass rounded-3xl p-6 lg:p-8 sticky top-24">
                <h2 className="text-2xl font-display font-bold mb-6">Resumen del pedido</h2>

                <div className="space-y-4 mb-6">
                  {cart.map((item) => {
                    const product = item.product;
                    if (!product) return null;

                    return (
                      <div key={item.id} className="flex gap-3 items-start">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate">{product.name}</h3>
                          <p className="text-xs text-[var(--text-tertiary)] mb-1">
                            {item.color} × {item.quantity}
                          </p>
                          <p className="font-bold text-sm gradient-text">
                            €{(Number(product.price) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 rounded hover:bg-red-500/10 hover:text-red-500 transition-colors focus-ring"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-[var(--border)] pt-4 space-y-2 mb-6">
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Subtotal</span>
                    <span>€{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Envío</span>
                    <span className="text-[var(--brand)]">Gratis</span>
                  </div>
                  <div className="flex justify-between text-xl font-display font-bold pt-2 border-t border-[var(--border)]">
                    <span>Total</span>
                    <span className="gradient-text">€{cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={processing}
                  className="w-full btn-gradient px-8 py-4 rounded-full font-semibold text-[var(--bg)] flex items-center justify-center space-x-3 focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>{processing ? 'Procesando...' : 'Confirmar pedido'}</span>
                </button>

                <p className="text-xs text-[var(--text-tertiary)] text-center mt-4">
                  Al confirmar, aceptas nuestros términos y condiciones
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
