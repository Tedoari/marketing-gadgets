'use client'

import { useParams } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/app/data/products";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import ProductDatePicker from '@/components/ProductDatePicker';

export default function ProductDetails() {
  const { id } = useParams();
  const productId = parseInt(id as string, 10);
  const product = products.find((product) => product.id === productId);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <>
      <Header />
      <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Product Image */}
        <div>
          {product.image ? (
            <img src={product.image} alt={product.title} className="w-full h-96 object-cover rounded-lg" />
          ) : (
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}

          {/* Product Details Under Image */}
          <div className="mt-4">
            <h1 className="text-3xl font-bold">{product.title}</h1>

            {/* Expandable Section */}
            <div className="mt-4 border rounded-lg p-4 shadow-sm">
              <details>
                <summary className="font-semibold cursor-pointer">
                  The Well Known {product.title}
                </summary>
                <p className="text-gray-600 mt-2">
                  Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.
                </p>
              </details>
            </div>
          </div>
        </div>

          <div className="mt-4">
            <ProductDatePicker productId={productId} />
          </div>

        </div>
      <Footer />
    </>
  );
}
