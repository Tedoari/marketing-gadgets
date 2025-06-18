/* eslint-disable @next/next/no-img-element */
'use client';

import { useParams } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/app/data/products";
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import ProductDatePicker from '@/components/ProductDatePicker';

export default function ProductDetails() {
  const { id } = useParams();
  const productId = parseInt(id as string, 10);
  const product = products.find((product) => product.id === productId);

  //const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [mainMedia, setMainMedia] = useState<string>(product?.images[0] || "");

  if (!product) {
    return <div>Product not found!</div>;
  }

  // Helper to check if media is a video
  const isVideo = (file: string) => file.toLowerCase().endsWith('.mp4');

  // Handle media change on thumbnail click
  const handleMediaClick = (media: string) => {
    setMainMedia(media);
  };

  return (
    <>
      <Header />
      <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Left Column */}
        <div>
          {/* Product Name */}
          <h1 className="text-3xl font-bold">{product.title}</h1>

          {/* Main Media */}
          {mainMedia ? (
            isVideo(mainMedia) ? (
              <video
                src={mainMedia}
                controls
                className="w-full h-96 object-cover rounded-lg mt-4"
              />
            ) : (
              <img
                src={mainMedia}
                alt={product.title}
                className="w-full h-96 object-cover rounded-lg mt-4"
              />
            )
          ) : (
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg mt-4">
              <span className="text-gray-500">No Media Available</span>
            </div>
          )}

          {/* Thumbnails */}
          <div className="mt-4 flex space-x-2">
            {product.images.map((media, index) => (
              <div
                key={index}
                onClick={() => handleMediaClick(media)}
                className="cursor-pointer"
              >
                {isVideo(media) ? (
                  <video
                    src={media}
                    className="w-16 h-16 object-cover rounded-md hover:opacity-75"
                    muted
                  />
                ) : (
                  <img
                    src={media}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-md hover:opacity-75"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Expandable Section */}
          <div className="mt-4 border rounded-lg p-4 shadow-sm">
            <details>
              <summary className="font-semibold cursor-pointer">
                The Well Known {product.title}
              </summary>
              <p className="text-gray-600 mt-2">
                Test
              </p>
            </details>
          </div>
        </div>

        {/* Right Column: Date Picker */}
        <div className="flex items-center justify-center mt-4 md:mt-0">
          <ProductDatePicker productId={productId} />
        </div>

      </div>
      <Footer />
    </>
  );
}
