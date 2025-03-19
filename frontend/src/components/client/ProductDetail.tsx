"use client";

import { useState } from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import products from "@/data/products";
import { ShoppingCart } from "lucide-react";
import { Table , TableHead, TableHeader, TableRow, TableBody, TableCell} from "../ui/table";
import { Button } from "../ui/button";
import ProductReviews from "./ProductReviews";


interface ProductDetailProps {
  category: string;
  title: string;
  images: string[];
  newPrice: string;
  oldPrice: string;
  rating: number;
  colors: string[];
  storageOptions: string[];
  description: {
    text: string;
    images: string[];
  };
  specifications: {
    category: string;
    name: string;
    value: string;
  }[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({ category, title, images, newPrice, oldPrice, rating, colors, storageOptions, description, specifications}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(colors[0] || "");
  const [selectedStorage, setSelectedStorage] = useState<string>(storageOptions[0] || "");
  const similarProducts = products.filter(
    (product) =>
      product.category.toLowerCase() === category.toLowerCase()
  );
  

  return (
    <section className="py-12 ">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-10 p-6">
          {/* Carousel chính */}
          <div className="w-full md:w-2/3 flex flex-col gap-4">
            <Carousel className="w-auto">
              <CarouselContent style={{ transform: `translateX(-${activeIndex * 100}%)`, transition: "transform 0.3s ease-in-out" }}>
                {images.map((img, index) => (
                  <CarouselItem key={index} className="flex justify-center items-center min-w-full">
                    <Image src={img} alt={title} width={400} height={400} className="object-cover rounded-lg" />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious
                onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                className="absolute top-1/2 -translate-y-1/2 left-[10%] bg-white/50 hover:bg-white text-black p-2 rounded-full shadow"
              />

              <CarouselNext
                onClick={() => setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                className="absolute top-1/2 -translate-y-1/2 right-[10%] bg-white/50 hover:bg-white text-black p-2 rounded-full shadow"
              />

            </Carousel>

            {/* Gallery ảnh nhỏ */}
            <div className="flex mt-4 gap-2 justify-center">
              {images.map((img, index) => (
                <Button
                  key={index}
                  className={`border-2 p-1 rounded-lg transition ${
                    activeIndex === index ? "border-blue-500" : "bg-white border-gray-300" 
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <Image src={img} alt={title} width={80} height={40} className=" rounded-lg" />
                </Button>
              ))}
            </div>
          </div>

          {/* Thông tin sản phẩm */}
          <div className="w-full md:w-1/3 flex flex-col gap-10">
            <div>
              <p className="text-gray-500">{category}</p>
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <p className="text-red-500 font-bold text-2xl">{newPrice}₫</p>
                <p className="text-gray-400 line-through">{oldPrice}₫</p>
              </div>
              <p className="text-yellow-500 flex gap-1 mt-2">
                {Array.from({ length: rating }, (_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </p>
              {/* Chọn màu sắc */}
            {colors.length > 0 && (
              <div>
                <p className="font-semibold text-gray-700">Màu sắc:</p>
                <div className="flex gap-3 mt-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`px-4 py-2 rounded-lg border ${selectedColor === color ? "border-blue-500 text-blue-600" : "border-gray-300"}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chọn dung lượng */}
            {storageOptions.length > 0 && (
              <div>
                <p className="font-semibold text-gray-700">Bộ nhớ:</p>
                <div className="flex gap-3 mt-2">
                  {storageOptions.map((storage) => (
                    <button
                      key={storage}
                      className={`px-4 py-2 rounded-lg border ${selectedStorage === storage ? "border-blue-500 text-blue-600" : "border-gray-300"}`}
                      onClick={() => setSelectedStorage(storage)}
                    >
                      {storage}
                    </button>
                  ))}
                </div>
              </div>
            )}
            </div>

            {/* Nút thao tác */}
            <div className="flex gap-4 mt-6">
              <button className="w-2/3 bg-red-600 hover:bg-red-600 text-white font-semibold py-3 rounded-lg shadow-md transition-all flex flex-col justify-center items-center gap-1">
                Mua ngay
                <span className="text-[12px]">(Giao nhanh từ 2 giờ hoặc nhận tại cửa hàng)</span>
              </button>
              <button className="border-2 border-red-600 text-red-600 font-bold py-3 px-6 rounded-lg shadow-md flex flex-col justify-center items-center gap-2 hover:bg-red-100 transition">
                <ShoppingCart className="text-red-600 text-2xl" /> {/* Icon giỏ hàng */}
                <span className="text-[10px]">Thêm vào giỏ</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-10">
          <div className="mt-6 w-full sm:w-2/3">
            <h2 className="font-bold">Thông tin sản phẩm</h2>
            <p className="text-gray-700 mt-2">{description.text} </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {description.images.map((img, index) => (
                <img key={index} src={img} alt={`Mô tả ${index}`} width="150" />
              ))}
            </div>
          </div>
          <div className="mt-6 w-full sm:w-1/3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead colSpan={3} className="text-center text-black text-2xl font-bold">Thông số kỹ thuật</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {specifications.map((spec, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{spec.name}</TableCell>
                    <TableCell>{spec.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </div>

        </div>
        {/* Sản phẩm tương tự */}
        {similarProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Sản phẩm tương tự</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {similarProducts.map((product) => (
                <div key={product.id} className="bg-white border rounded-lg p-4 shadow hover:shadow-lg transition">
                  <Image src={product.images[0]} alt={product.title} width={200} height={200} className="object-cover rounded-lg mx-auto" />
                  <h3 className="font-semibold text-center mt-4">{product.title}</h3>
                  <p className="text-center text-red-500 font-bold">{product.newPrice}₫</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* review */}
        <div className="mt-12">
        <ProductReviews />
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
