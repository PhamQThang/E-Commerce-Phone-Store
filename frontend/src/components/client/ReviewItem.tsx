import { Star } from "lucide-react";

interface ReviewItemProps {
  review: {
    user: string;
    date: string;
    rating: number;
    comment: string;
  };
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  return (
    <div className="border-t py-4">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          {review.user[0]}
        </div>
        <div className="ml-3">
          <p className="font-bold">{review.user}</p>
          <p className="text-gray-500 text-sm">{review.date}</p>
        </div>
      </div>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < review.rating ? "text-yellow-500" : "text-gray-300"}`} />
        ))}
      </div>
      <p className="mt-2">{review.comment}</p>
    </div>
  );
};

export default ReviewItem;
