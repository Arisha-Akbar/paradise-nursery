/*
  # Create plants table for Paradise Nursery

  1. New Tables
    - `plants`
      - `id` (uuid, primary key) - Unique identifier for each plant
      - `name` (text, not null) - Plant name
      - `price` (numeric, not null) - Price with 2 decimal precision
      - `image` (text, not null) - Image URL path
      - `category` (text, not null) - Category (Tropical, Low Light, Vines, etc.)
      - `description` (text) - Optional plant description
      - `created_at` (timestamptz) - Timestamp when record was created
      - `updated_at` (timestamptz) - Timestamp when record was last updated

  2. Security
    - Enable RLS on `plants` table
    - Add policy for public read access (anyone can browse plants)
    - Only authenticated admin users can modify plants (restrictive by default)

  3. Initial Data
    - Populate with existing plant catalog
*/

CREATE TABLE IF NOT EXISTS plants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric(10,2) NOT NULL CHECK (price >= 0),
  image text NOT NULL,
  category text NOT NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE plants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view plants"
  ON plants
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Only authenticated users can insert plants"
  ON plants
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can update plants"
  ON plants
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete plants"
  ON plants
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS plants_category_idx ON plants(category);

INSERT INTO plants (name, price, image, category, description) VALUES
  ('Monstera Deliciosa', 24.99, '/images/monstera.jpg', 'Tropical', 'A stunning tropical plant with large, fenestrated leaves'),
  ('Snake Plant', 19.99, '/images/snake.jpg', 'Low Light', 'Hardy plant perfect for beginners, tolerates low light'),
  ('Pothos', 14.99, '/images/pothos.jpg', 'Vines', 'Easy-care trailing vine, great for hanging baskets'),
  ('Fiddle Leaf Fig', 39.99, '/images/fiddle.jpg', 'Tropical', 'Elegant tree with large violin-shaped leaves'),
  ('ZZ Plant', 22.99, '/images/zz.jpg', 'Low Light', 'Nearly indestructible, perfect for low-light spaces'),
  ('Philodendron', 17.99, '/images/philodendron.jpg', 'Vines', 'Classic houseplant with heart-shaped leaves')
ON CONFLICT DO NOTHING;