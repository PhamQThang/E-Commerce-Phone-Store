"use client";
import { Star } from "lucide-react";

interface RatingSummaryProps {
  rating: number;
  totalReviews: number;
}

const RatingSummary: React.FC<RatingSummaryProps> = ({ rating, totalReviews }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold">{rating}/5</h2>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-5 h-5 ${i < rating ? "text-yellow-500" : "text-gray-300"}`} />
        ))}
      </div>
      <p className="text-blue-500">{totalReviews} đánh giá</p>
    </div>
  );
};

export default RatingSummary;
