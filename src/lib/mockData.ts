// Mock data for the 3D printing e-commerce application
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  material: string;
  time: string;
  rating: number;
  image: string;
  stock: number;
  colors: string[];
  dimensions: string;
  weight: string;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  color: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  product?: Product;
}

// Mock products data
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Soporte para auriculares',
    description: 'Soporte elegante y funcional para tus auriculares. Diseño minimalista que mantiene tus auriculares organizados y protegidos. Base estable con peso equilibrado.',
    price: 12.99,
    material: 'PLA',
    time: '8h',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 25,
    colors: ['Negro', 'Blanco', 'Gris', 'Azul'],
    dimensions: '120x100x250mm',
    weight: '150g',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Organizador de cables',
    description: 'Sistema de organización de cables con múltiples ranuras. Perfecto para escritorio u oficina. Mantén tus cables ordenados y siempre a mano.',
    price: 8.50,
    material: 'PETG',
    time: '6h',
    rating: 4.9,
    image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 40,
    colors: ['Negro', 'Blanco', 'Verde', 'Naranja'],
    dimensions: '150x80x40mm',
    weight: '80g',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Maceta geométrica',
    description: 'Maceta con diseño geométrico moderno. Ideal para plantas pequeñas y suculentas. Incluye plato inferior para drenaje.',
    price: 15.99,
    material: 'PLA',
    time: '10h',
    rating: 4.7,
    image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 30,
    colors: ['Terracota', 'Blanco', 'Verde Menta', 'Rosa'],
    dimensions: '100x100x120mm',
    weight: '120g',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Soporte para móvil',
    description: 'Soporte ajustable para smartphone. Compatible con todos los tamaños de móviles. Ángulo de visión ajustable para máxima comodidad.',
    price: 9.99,
    material: 'PETG',
    time: '5h',
    rating: 4.6,
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 50,
    colors: ['Negro', 'Blanco', 'Rojo', 'Azul Marino'],
    dimensions: '80x70x90mm',
    weight: '65g',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Figura decorativa',
    description: 'Escultura artística de alta definición impresa en resina. Detalles excepcionales y acabado premium. Pieza única para decoración.',
    price: 22.50,
    material: 'Resina',
    time: '12h',
    rating: 5.0,
    image: 'https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 15,
    colors: ['Gris Piedra', 'Blanco Mármol', 'Negro Mate'],
    dimensions: '150x150x200mm',
    weight: '280g',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Caja organizadora',
    description: 'Caja modular con compartimentos personalizables. Perfecta para herramientas, material de oficina o hobby. Sistema apilable.',
    price: 18.99,
    material: 'ABS',
    time: '14h',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/4792285/pexels-photo-4792285.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 20,
    colors: ['Negro', 'Gris Oscuro', 'Azul', 'Rojo'],
    dimensions: '200x150x80mm',
    weight: '220g',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Mock cart data (empty initially)
export const mockCart: CartItem[] = [];

// Helper functions for mock data
export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find(product => product.id === id);
};

export const getAllProducts = (): Product[] => {
  return mockProducts;
};

export const getCartItems = (): CartItem[] => {
  return mockCart;
};

export const addToCart = (productId: string, quantity: number = 1, color: string | null = null, notes: string | null = null): CartItem => {
  const product = getProductById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  const cartItem: CartItem = {
    id: `cart_${Date.now()}`,
    user_id: 'mock_user',
    product_id: productId,
    quantity,
    color,
    notes,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product
  };

  mockCart.push(cartItem);
  return cartItem;
};

export const removeFromCart = (cartItemId: string): boolean => {
  const index = mockCart.findIndex(item => item.id === cartItemId);
  if (index > -1) {
    mockCart.splice(index, 1);
    return true;
  }
  return false;
};

export const updateCartItemQuantity = (cartItemId: string, quantity: number): boolean => {
  const item = mockCart.find(item => item.id === cartItemId);
  if (item) {
    item.quantity = quantity;
    item.updated_at = new Date().toISOString();
    return true;
  }
  return false;
};

export const clearCart = (): void => {
  mockCart.length = 0;
};
