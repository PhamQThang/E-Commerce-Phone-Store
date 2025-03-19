interface RatingBreakdownProps {
    breakdown: Record<number, number>;
  }
  
  const RatingBreakdown: React.FC<RatingBreakdownProps> = ({ breakdown }) => {
    const totalReviews = Object.values(breakdown).reduce((a, b) => a + b, 0);
  
    return (
      <div className="space-y-2">
        {Object.entries(breakdown)
          .reverse()
          .map(([stars, count]) => (
            <div key={stars} className="flex items-center">
              <span className="w-4">{stars}★</span>
              <div className="w-40 h-2 bg-gray-200 ml-2 rounded">
                <div className="h-full bg-red-500" style={{ width: `${(count / totalReviews) * 100}%` }}></div>
              </div>
              <span className="ml-2 text-gray-600">{count} đánh giá</span>
            </div>
          ))}
      </div>
    );
  };
  
  export default RatingBreakdown;
  