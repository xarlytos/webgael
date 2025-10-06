// Mock Supabase client for frontend-only development
// This allows the app to work without a real Supabase connection

export const supabase = {
  // Mock client that doesn't actually connect to Supabase
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    signIn: () => Promise.resolve({ data: { user: null }, error: null }),
    signUp: () => Promise.resolve({ data: { user: null }, error: null }),
    signOut: () => Promise.resolve({ error: null })
  },
  from: (table: string) => ({
    select: () => ({
      eq: () => ({
        single: () => Promise.resolve({ data: null, error: null }),
        order: () => Promise.resolve({ data: [], error: null })
      }),
      order: () => Promise.resolve({ data: [], error: null })
    }),
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => ({
      eq: () => Promise.resolve({ data: null, error: null })
    }),
    delete: () => ({
      eq: () => Promise.resolve({ data: null, error: null })
    })
  })
};

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
