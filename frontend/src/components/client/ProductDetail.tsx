"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import products from "@/data/products";
import { ShoppingCart } from "lucide-react";


interface ProductDetailProps {
  category: string;
  title: string;
  images: string[];
  newPrice: string;
  oldPrice: string;
  rating: number;
  colors: string[];
  storageOptions: string[];
  description: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ category, title, images, newPrice, oldPrice, rating, colors, storageOptions, description }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState<string>(colors[0] || "");
  const [selectedStorage, setSelectedStorage] = useState<string>(storageOptions[0] || "");
  const similarProducts = products.filter(
    (product) =>
      product.category.toLowerCase() === category.toLowerCase()
  );
  

  return (
    <section className="py-12 ">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
          {/* Ảnh sản phẩm */}
          <div>
            <Swiper
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              modules={[Navigation, Thumbs]}
              className="rounded-lg overflow-hidden"
            >
              {images.map((img, index) => (
                <SwiperSlide key={index} className="!flex !justify-center items-center">
                  <Image src={img} alt={title} width={400} height={400} className="object-cover rounded-lg" />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Gallery ảnh nhỏ */}
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={8}
              slidesPerView={3}
              watchSlidesProgress
              modules={[Thumbs]}
              className="mt-4 w-[300px]"
            >
              {images.map((img, index) => (
                <SwiperSlide key={index} className="!flex !justify-center items-center">
                  <Image
                    src={img}
                    alt={title}
                    width={80}
                    height={40}
                    className="cursor-pointer object-cover rounded-lg border border-gray-300 hover:border-blue-500 transition duration-300 ease-in-out"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="mt-6">
              <h2 className="font-bold">Thông tin sản phẩm</h2>
              <p className="text-gray-700 mt-2">{description}</p>

            </div>
          </div>

          {/* Thông tin sản phẩm */}
          <div className="flex flex-col gap-10">
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
                <span className="text-[10px]">Thêm vào giỏ hàng</span>
              </button>
            </div>
            <div className="mt-6"></div>
              <h2 className="font-bold">Thông số kỹ thuật</h2>
              <p>Kích thước màn hình

6.9 inches
Công nghệ màn hình

Super Retina XDR OLED
Camera sau

Camera chính: 48MP, f/1.78, 24mm, 2µm, chống rung quang học dịch chuyển cảm biến thế hệ thứ hai, Focus Pixels 100%
Telephoto 2x 12MP: 52 mm, ƒ/1.6
Camera góc siêu rộng: 48MP, 13 mm,ƒ/2.2 và trường ảnh 120°, Hybrid Focus Pixels, ảnh có độ phân giải
Camera trước

12MP, ƒ/1.9, Tự động lấy nét theo pha Focus Pixels
Chipset

Apple A18 Pro
Công nghệ NFC

Có
Bộ nhớ trong

256 GB
Thẻ SIM

Sim kép (nano-Sim và e-Sim) - Hỗ trợ 2 e-Sim
Hệ điều hành

iOS 18
Độ phân giải màn hình

2868 x 1320 pixels
Tính năng màn hình

Dynamic Island
Màn hình Luôn Bật
Công nghệ ProMotion với tốc độ làm mới thích ứng lên đến 120Hz
Màn hình HDR
True Tone
Dải màu rộng (P3)
Haptic Touch
Tỷ lệ tương phản 2.000.000:1
Loại CPU

CPU 6 lõi mới với 2 lõi hiệu năng và 4 lõi hiệu suất
Tương thích

Tương Thích Với Thiết Bị Trợ Thính</p>
          </div>
        </div>
        {/* Sản phẩm tương tự */}
        {similarProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Sản phẩm tương tự</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {similarProducts.map((product) => (
                <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                  <Image src={product.images[0]} alt={product.title} width={200} height={200} className="object-cover rounded-lg mx-auto" />
                  <h3 className="font-semibold text-center mt-4">{product.title}</h3>
                  <p className="text-center text-red-500 font-bold">{product.newPrice}₫</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;
