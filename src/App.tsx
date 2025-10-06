import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { UploadDesign } from './pages/UploadDesign';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';
import { Checkout } from './pages/Checkout';
import { CartProvider } from './context/CartContext';
import './components/WooCommerce.css';

function App() {
  const path = window.location.pathname;

  return (
    <CartProvider>
      {path === '/contacto' && <Contact />}
      {path === '/sube-tu-diseno' && <UploadDesign />}
      {path === '/catalogo' && <Catalog />}
      {path === '/producto' && <ProductDetail />}
      {path === '/checkout' && <Checkout />}
      {path === '/' && <Home />}
    </CartProvider>
  );
}

export default App;
