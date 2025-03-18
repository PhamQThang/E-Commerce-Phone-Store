"use client";
import React from "react";

interface ProductInfoProps {
  title: string;
  category: string;
  oldPrice: string;
  newPrice: string;
  rating: number;
  reviews: number;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  title,
  category,
  oldPrice,
  newPrice,
  rating,
  reviews,
}) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">{category}</h2>
      <h1 className="text-2xl font-bold mt-1">{title}</h1>
      <div className="flex items-center mt-2">
        <span className="text-yellow-500">{"★".repeat(Math.floor(rating))}</span>
        <span className="ml-2 text-gray-600">{reviews} đánh giá</span>
      </div>
      <p className="text-gray-500 line-through mt-2">{oldPrice} đ</p>
      <h3 className="text-red-500 text-xl font-bold">{newPrice} đ</h3>
    </div>
  );
};

export default ProductInfo;
