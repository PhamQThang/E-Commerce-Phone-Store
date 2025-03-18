"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

interface ProductImageCarouselProps {
  images: string[];
}

const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({ images }) => {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {images.map((src, index) => (
          <div className="flex-[0_0_100%] min-w-0" key={index}>
            <Image
              src={src}
              alt={`Product image ${index + 1}`}
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImageCarousel;
