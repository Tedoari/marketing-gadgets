// components/ProductGallery.tsx

'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { products, Category } from '@/app/data/products';  // Import products and Category from the new file

export default function ProductGallery() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Popular');

  // Filter products on category and if it's the popular category, show all products
  const filteredProducts = products.filter(
    (product) => selectedCategory === 'Popular' || product.categories.includes(selectedCategory)
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      
      {/* Search Bar
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-gray-300"
        />
      </div> */}
      
      {/* Category Filters */}
      <div className="flex gap-3 mb-6">
        {(['Popular', 'Robotics', 'Games'] as Category[]).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm ${
              selectedCategory === category ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border rounded-lg shadow-sm flex flex-col h-100 p-4">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.title}
                width={600}
                height={400}
                className="rounded-lg object-cover w-full h-[75%]"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
            <h3 className="mt-2 text-lg font-semibold">{product.title}</h3>
            
            {/* Add a button to navigate */}
            <div className="mt-4 text-right">
              <Link href={`/product/${product.id}`}>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
