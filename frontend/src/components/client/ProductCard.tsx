import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  id: string;
  images: string[];  // Mảng ảnh
  category: string;
  title: string;
  newPrice: string;
  oldPrice: string;
  rating: number;
}

const ProductCard: React.FC<ProductProps> = ({ id, images, category, title, newPrice, oldPrice, rating }) => {
  const thumbnail = images.length > 0 ? images[0] : "/image/default.png"; // Lấy ảnh đầu tiên hoặc ảnh mặc định

  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-xl transition">
      <Link href={`/client/product/${id}`} className="block">
        <div className="relative">
          <Image 
            src={thumbnail} 
            alt={title} 
            width={200} height={200} className="mx-auto" // Sửa kích thước ảnh
            priority
          />
        </div>
        <p className="text-sm text-gray-500 font-medium mt-2">{category}</p>
        <h3 className="text-lg font-bold mt-1">{title}</h3>
        <div className="flex flex-col sm:flex-row gap-2 mt-1">
          <p className="text-red-500 font-bold">{newPrice}₫</p>
          <p className="text-gray-400 line-through">{oldPrice}₫</p>
        </div>
        <div className="flex mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`text-yellow-500 ${i < rating ? "" : "opacity-30"}`}>⭐</span>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
