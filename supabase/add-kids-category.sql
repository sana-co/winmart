-- Run this in the Supabase SQL editor to standardize existing kids products.
-- The app stores categories as text, so new products can use category = 'Kids' immediately.

update public.products
set category = 'Kids'
where category in ('Kid', 'Kids Wear', 'Kids'' Wear', 'Children', 'Children''s Wear');

-- Use this shape when adding a new Kids product from SQL instead of the product manager portal.
-- Replace the sample values before running.
/*
insert into public.products (name, description, price, image_url, category, is_new_arrival, is_top_pick)
values (
  'Kids Denim Set',
  'Comfortable everyday outfit for kids.',
  0.00,
  'https://example.com/kids-denim-set.jpg',
  'Kids',
  true,
  true
);
*/

-- Optional: enforce the app's current product manager category list at the database level.
-- Run this only after confirming all existing products use one of these categories.
/*
alter table public.products
drop constraint if exists products_category_allowed;

alter table public.products
add constraint products_category_allowed
check (category in ('Ladies', 'Gents', 'Kids', 'Accessories'));
*/
