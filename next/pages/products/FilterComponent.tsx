import { useState, useEffect } from "react";

interface FilterProps {
  onFilterChange: (filters: { price?: number; rating?: number; type?: string }) => void;
}

const FilterComponent: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [price, setPrice] = useState<number | undefined>();
  const [rating, setRating] = useState<number | undefined>();
  const [type, setType] = useState<string | undefined>();

  //Good example of needing to wait for changes in values before calling the onFilterChange function. 
  // #State race conditions
  useEffect(() => {
    onFilterChange({ price, rating, type });
  }, [price, rating, type, onFilterChange]);

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-800 text-white rounded-md">
      {/* Max Price */}
      <input
        type="number"
        placeholder="Max Price"
        value={price || ""}
        onChange={(e) => {
          const value = e.target.value;
          const numberValue = value === "" ? undefined : Number(value);
          setPrice(numberValue);
        }}
        className="px-3 py-2 bg-gray-700 rounded-md w-36"
      />

      {/* Min Rating */}
      <input
        type="number"
        placeholder="Min Rating"
        value={rating || ""}
        onChange={(e) => {
          const value = e.target.value;
          const numberValue = value === "" ? undefined : Number(value);
          setRating(numberValue);
        }}
        className="px-3 py-2 bg-gray-700 rounded-md w-36"
      />

      {/* Product Type */}
      <select
        className="px-3 py-2 bg-gray-700 rounded-md"
        value={type || ""}
        onChange={(e) => {
          setType(e.target.value || undefined);
        }}
      >
        <option value="">All Types</option>
        <option value="Wireless Pods">Wireless Pods</option>
        <option value="Smart Watch">Smart Watch</option>
        <option value="Gaming Mouse">Gaming Mouse</option>
      </select>
    </div>
  );
};

export default FilterComponent;
