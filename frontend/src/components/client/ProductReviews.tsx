"use client";
import { useState } from "react";
import RatingSummary from "./RatingSummary";
import RatingBreakdown from "./RatingBreakdown";
import ReviewFilters from "./ReviewFilters";
import ReviewList from "./ReviewList";

const reviews = [
  { user: "Yến", date: "22/1/2025 22:00", rating: 4, comment: "Nhân viên tư vấn chưa tốt..." },
  { user: "Yến", date: "22/1/2025 22:00", rating: 3, comment: "Gọi bữa 1 bạn nữ tư vấn tốt hơn..." }
];

const breakdown = { 5: 9, 4: 6, 3: 0, 2: 0, 1: 0 };

const filters = [
  { label: "Tất cả", count: 15, active: true },
  { label: "Có hình ảnh", count: 3, active: false },
  { label: "Đã mua hàng", count: 10, active: false }
];

const ProductReviews = () => {
  const [selectedFilter, setSelectedFilter] = useState("Tất cả");

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-lg font-bold">Đánh giá & nhận xét sản phẩm</h2>
      <div className="flex gap-6 mt-4 flex-col sm:flex-row">
        <RatingSummary rating={4.6} totalReviews={15} />
        <RatingBreakdown breakdown={breakdown} />
      </div>
      <ReviewFilters filters={filters} setFilter={setSelectedFilter} />
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default ProductReviews;
