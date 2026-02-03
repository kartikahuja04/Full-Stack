import React from 'react';
import './index.css';

function ProductCard({ name, price, description, imageUrl, inStock }) {
  const stockLabel = inStock ? 'In stock' : 'Out of stock';

  return (
    <article className="bg-white rounded-lg shadow w-64 flex flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg border border-gray-200">
      <div className="relative bg-gray-200">
        <img src={imageUrl} alt={name} className="w-full h-48 object-cover block" />
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-white ${
            inStock ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {stockLabel}
        </span>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-semibold m-0 text-gray-800">{name}</h2>
        <p className="text-gray-600 text-sm m-0">{description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-base text-gray-800">${price.toFixed(2)}</span>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
