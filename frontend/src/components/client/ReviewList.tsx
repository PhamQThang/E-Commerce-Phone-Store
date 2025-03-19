import ReviewItem from "./ReviewItem";

interface ReviewListProps {
  reviews: {
    user: string;
    date: string;
    rating: number;
    comment: string;
  }[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className="mt-4">
      {reviews.map((review, index) => (
        <ReviewItem key={index} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
