'use client';

import { useEffect, useState } from 'react';

const products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999 },
  { id: 2, name: 'Headphones', category: 'Electronics', price: 99 },
  { id: 3, name: 'Coffee Maker', category: 'Home', price: 79 },
  { id: 4, name: 'Desk Lamp', category: 'Home', price: 35 },
  { id: 5, name: 'Running Shoes', category: 'Clothing', price: 120 },
  { id: 6, name: 'Jacket', category: 'Clothing', price: 85 },
];

export default function ProductListingPage() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const visibleProducts = products
    .filter((product) => product.name.toLowerCase().includes(debouncedSearch.toLowerCase()))
    .filter((product) => category === 'All' || product.category === category)
    .sort((a, b) =>
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price,
    );

  return (
    <main>
      <h1>Products</h1>

      <label>
        Search
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </label>

      <label>
        Category
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option>All</option>
          <option>Electronics</option>
          <option>Home</option>
          <option>Clothing</option>
        </select>
      </label>

      <label>
        Sort by price
        <select
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
        >
          <option value="asc">Lowest first</option>
          <option value="desc">Highest first</option>
        </select>
      </label>

      {visibleProducts.length ? (
        <ul>
          {visibleProducts.map((product) => (
            <li key={product.id}>
              {product.name} — {product.category} — ${product.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </main>
  );
}
