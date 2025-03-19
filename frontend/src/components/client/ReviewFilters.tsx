"use client";

interface FilterOption {
  label: string;
  count: number;
  active: boolean;
}

interface ReviewFiltersProps {
  filters: FilterOption[];
  setFilter: (filter: string) => void;
}

const ReviewFilters: React.FC<ReviewFiltersProps> = ({ filters, setFilter }) => {
  return (
    <div className="flex gap-2 mt-4">
      {filters.map((filter) => (
        <button
          key={filter.label}
          className={`px-3 py-1 border rounded ${filter.active ? "bg-red-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter(filter.label)}
        >
          {filter.label} ({filter.count})
        </button>
      ))}
    </div>
  );
};

export default ReviewFilters;
