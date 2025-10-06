import { ShoppingCart, X, Minus, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, cartTotal, cartCount, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl glass glass-hover transition-all focus-ring"
        aria-label="Carrito de compras"
      >
        <ShoppingCart className="w-5 h-5" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--brand)] text-[var(--bg)] text-xs font-bold rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[var(--z-modal-backdrop)]"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 top-full mt-2 w-96 glass backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl z-[var(--z-modal)] border border-[var(--border)]">
            <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
              <h3 className="font-display font-bold text-lg">Tu carrito</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-[var(--surface-hover)] transition-colors focus-ring"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="p-8 text-center">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-[var(--text-tertiary)]" />
                  <p className="text-[var(--text-secondary)]">Tu carrito está vacío</p>
                  <a
                    href="/catalogo"
                    onClick={() => setIsOpen(false)}
                    className="inline-block mt-4 text-[var(--brand)] hover:underline text-sm font-medium"
                  >
                    Ver productos
                  </a>
                </div>
              ) : (
                <div className="divide-y divide-[var(--border)]">
                  {cart.map((item) => {
                    const product = item.product;
                    if (!product) return null;

                    return (
                      <div key={item.id} className="p-4 hover:bg-[var(--surface)] transition-colors">
                        <div className="flex gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                          />

                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate mb-1">
                              {product.name}
                            </h4>
                            <p className="text-xs text-[var(--text-tertiary)] mb-2">
                              {item.color}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-6 h-6 rounded glass glass-hover flex items-center justify-center text-xs focus-ring"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-sm font-medium min-w-[1.5rem] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-6 h-6 rounded glass glass-hover flex items-center justify-center text-xs focus-ring"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-sm gradient-text">
                                  €{(Number(product.price) * item.quantity).toFixed(2)}
                                </span>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="p-1 rounded hover:bg-red-500/10 hover:text-red-500 transition-colors focus-ring"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t border-[var(--border)] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total:</span>
                  <span className="text-2xl font-display font-bold gradient-text">
                    €{cartTotal.toFixed(2)}
                  </span>
                </div>

                <a
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full btn-gradient px-6 py-3 rounded-full text-center font-semibold text-[var(--bg)] focus-ring"
                >
                  Ir al pago
                </a>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
