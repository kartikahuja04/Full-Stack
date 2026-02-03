import React from 'react';
import './index.css';
import ProductCard from './ProductCard';

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 129.99,
    description: 'Noise-cancelling over-ear headphones with 30 hours battery life.',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?q=80&w=1626&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' ,
    inStock: true,
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    description: 'Fitness tracking, heart-rate monitor, and notifications on your wrist.',
    imageUrl: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?q=80&w=930&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    inStock: false,
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    price: 89.5,
    description: 'Portable speaker with deep bass and 10-hour play time.',
    imageUrl: 'https://images.unsplash.com/photo-1529359744902-86b2ab9edaea?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    inStock: true,
  },
];

function App() {
  return (
    
    <div className="min-h-screen bg-gray-100 flex justify-center items-start font-sans text-gray-900">
      <main className="w-full max-w-4xl p-6 mt-10 bg-white rounded-xl shadow-md border border-gray-200">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">Featured Products</h1>
        </header>
        <section className="flex flex-row flex-nowrap gap-8 justify-center overflow-x-auto pb-2">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </section>
      </main>
    </div>
    
  );
}

export default App;
