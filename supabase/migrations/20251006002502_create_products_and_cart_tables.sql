/*
  # Create Products and Cart Tables

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text) - Product name
      - `description` (text) - Product description
      - `price` (numeric) - Product price
      - `material` (text) - Material type (PLA, PETG, Resina, etc.)
      - `time` (text) - Print time estimate
      - `rating` (numeric) - Product rating (0-5)
      - `image` (text) - Product image URL
      - `stock` (integer) - Available stock
      - `colors` (text[]) - Available colors
      - `dimensions` (text) - Product dimensions
      - `weight` (text) - Product weight
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

    - `cart_items`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users) - User who owns this cart item
      - `product_id` (uuid, references products) - Product reference
      - `quantity` (integer) - Quantity in cart
      - `color` (text) - Selected color
      - `notes` (text) - Custom notes
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on both tables
    - Products: Public read access, no write access
    - Cart items: Users can only access their own cart items
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric(10,2) NOT NULL,
  material text NOT NULL,
  time text NOT NULL,
  rating numeric(3,2) DEFAULT 0,
  image text NOT NULL,
  stock integer DEFAULT 0,
  colors text[] DEFAULT ARRAY[]::text[],
  dimensions text,
  weight text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  color text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT quantity_positive CHECK (quantity > 0)
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Products policies (public read access)
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  USING (true);

-- Cart items policies (users can only access their own cart)
CREATE POLICY "Users can view own cart items"
  ON cart_items FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cart items"
  ON cart_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart items"
  ON cart_items FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart items"
  ON cart_items FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product_id ON cart_items(product_id);

-- Insert sample products
INSERT INTO products (name, description, price, material, time, rating, image, stock, colors, dimensions, weight)
VALUES
  (
    'Soporte para auriculares',
    'Soporte elegante y funcional para tus auriculares. Diseño minimalista que mantiene tus auriculares organizados y protegidos. Base estable con peso equilibrado.',
    12.99,
    'PLA',
    '8h',
    4.8,
    'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=800',
    25,
    ARRAY['Negro', 'Blanco', 'Gris', 'Azul'],
    '120x100x250mm',
    '150g'
  ),
  (
    'Organizador de cables',
    'Sistema de organización de cables con múltiples ranuras. Perfecto para escritorio u oficina. Mantén tus cables ordenados y siempre a mano.',
    8.50,
    'PETG',
    '6h',
    4.9,
    'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800',
    40,
    ARRAY['Negro', 'Blanco', 'Verde', 'Naranja'],
    '150x80x40mm',
    '80g'
  ),
  (
    'Maceta geométrica',
    'Maceta con diseño geométrico moderno. Ideal para plantas pequeñas y suculentas. Incluye plato inferior para drenaje.',
    15.99,
    'PLA',
    '10h',
    4.7,
    'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=800',
    30,
    ARRAY['Terracota', 'Blanco', 'Verde Menta', 'Rosa'],
    '100x100x120mm',
    '120g'
  ),
  (
    'Soporte para móvil',
    'Soporte ajustable para smartphone. Compatible con todos los tamaños de móviles. Ángulo de visión ajustable para máxima comodidad.',
    9.99,
    'PETG',
    '5h',
    4.6,
    'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800',
    50,
    ARRAY['Negro', 'Blanco', 'Rojo', 'Azul Marino'],
    '80x70x90mm',
    '65g'
  ),
  (
    'Figura decorativa',
    'Escultura artística de alta definición impresa en resina. Detalles excepcionales y acabado premium. Pieza única para decoración.',
    22.50,
    'Resina',
    '12h',
    5.0,
    'https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg?auto=compress&cs=tinysrgb&w=800',
    15,
    ARRAY['Gris Piedra', 'Blanco Mármol', 'Negro Mate'],
    '150x150x200mm',
    '280g'
  ),
  (
    'Caja organizadora',
    'Caja modular con compartimentos personalizables. Perfecta para herramientas, material de oficina o hobby. Sistema apilable.',
    18.99,
    'ABS',
    '14h',
    4.8,
    'https://images.pexels.com/photos/4792285/pexels-photo-4792285.jpeg?auto=compress&cs=tinysrgb&w=800',
    20,
    ARRAY['Negro', 'Gris Oscuro', 'Azul', 'Rojo'],
    '200x150x80mm',
    '220g'
  )
ON CONFLICT DO NOTHING;