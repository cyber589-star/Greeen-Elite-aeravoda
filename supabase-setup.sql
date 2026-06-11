-- ============================================
-- GREEN ELIXIR AYURVEDA - SUPABASE SETUP
-- Run this in Supabase SQL Editor
-- ============================================

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10,2) DEFAULT 0,
  category TEXT DEFAULT 'Skincare',
  stock INTEGER DEFAULT 0,
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  address TEXT,
  total NUMERIC(10,2) DEFAULT 0,
  status TEXT DEFAULT 'pending',
  items JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments Table
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id),
  amount NUMERIC(10,2) DEFAULT 0,
  method TEXT DEFAULT 'upi',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Allow all operations for anon (admin panel handles auth)
CREATE POLICY "Allow all products" ON products FOR ALL USING (true);
CREATE POLICY "Allow all orders" ON orders FOR ALL USING (true);
CREATE POLICY "Allow all payments" ON payments FOR ALL USING (true);

-- Insert sample products
INSERT INTO products (name, price, category, stock, image_url, description) VALUES
('Brightening Day Cream', 849, 'Skincare', 25, '/images/product-brightening-cream.png', 'Ayurvedic brightening care for radiant skin'),
('Gold Face Cleanser', 649, 'Skincare', 30, '/images/product-gold-cleanser.png', '24K gold infused cleanser'),
('Swarna Bhasma', 2499, 'Health', 15, '/images/product-swarna-bhasma.png', 'Ancient gold ash formulation'),
('Immunity Kadha', 349, 'Health', 50, '/images/product-immunity-kadha.jpg', 'Traditional immune blend'),
('Vedic Strength Capsules', 999, 'Men', 20, '/images/product-vitality-capsules.jpg', 'Ashwagandha stamina blend'),
('Hair Care Serum', 749, 'Hair Care', 35, '/images/product-hair-serum.png', 'Green tea hair serum'),
('Kumkumadi Face Oil', 899, 'Skincare', 18, '/images/product-kumkumadi-oil.jpg', 'Saffron elixir for radiant skin'),
('Triphala Churna', 299, 'Health', 40, '/images/product-triphala.jpg', 'Digestive wellness formula'),
('Himalayan Shilajit', 1499, 'Men', 12, '/images/product-shilajit.jpg', 'Pure Himalayan resin'),
('Herbal Face Mask', 449, 'Skincare', 28, '/images/product-face-mask.jpg', 'Tulsi & rose face mask')
ON CONFLICT DO NOTHING;

-- Insert sample orders
INSERT INTO orders (customer_name, customer_email, customer_phone, address, total, status, items) VALUES
('Priya Sharma', 'priya@email.com', '9876543210', 'Mumbai, Maharashtra', 1548, 'delivered', '[{"name":"Brightening Day Cream","qty":1},{"name":"Gold Face Cleanser","qty":1}]'),
('Rohan Gupta', 'rohan@email.com', '9876543211', 'Delhi, India', 2499, 'shipped', '[{"name":"Swarna Bhasma","qty":1}]'),
('Ananya Patel', 'ananya@email.com', '9876543212', 'Bangalore, Karnataka', 1248, 'processing', '[{"name":"Kumkumadi Face Oil","qty":1},{"name":"Herbal Face Mask","qty":1}]'),
('Vikram Singh', 'vikram@email.com', '9876543213', 'Sonipat, Haryana', 349, 'pending', '[{"name":"Immunity Kadha","qty":1}]'),
('Meera Reddy', 'meera@email.com', '9876543214', 'Hyderabad, Telangana', 2247, 'delivered', '[{"name":"Hair Care Serum","qty":1},{"name":"Triphala Churna","qty":1}]')
ON CONFLICT DO NOTHING;

-- Insert sample payments
INSERT INTO payments (order_id, amount, method, status) VALUES
((SELECT id FROM orders WHERE customer_name='Priya Sharma' LIMIT 1), 1548, 'upi', 'completed'),
((SELECT id FROM orders WHERE customer_name='Rohan Gupta' LIMIT 1), 2499, 'card', 'completed'),
((SELECT id FROM orders WHERE customer_name='Ananya Patel' LIMIT 1), 1248, 'upi', 'completed'),
((SELECT id FROM orders WHERE customer_name='Vikram Singh' LIMIT 1), 349, 'cod', 'pending'),
((SELECT id FROM orders WHERE customer_name='Meera Reddy' LIMIT 1), 2247, 'netbanking', 'completed')
ON CONFLICT DO NOTHING;
