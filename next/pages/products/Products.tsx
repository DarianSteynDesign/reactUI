import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../../app/store/slices/cartSlice";
import { AppDispatch } from "../../app/store/store";

interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  rating: number;
  image: string; // Base64 image
}

interface ProductComponentProps {
  products: Product[];
}

export function ProductComponent({ products }: ProductComponentProps) {
  const dispatch: AppDispatch = useDispatch();

  const handleAddItem = useCallback(
    (id: string, name: string, price: number) => {
      dispatch(addItem({ id, name, price }));
    },
    [dispatch]
  );

  const handleRemoveItem = useCallback(
    (id: string) => {
      dispatch(removeItem(id));
    },
    [dispatch]
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />

              {/* Product Info */}
              <h2 className="text-white text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-400 text-sm">{item.type}</p>
              
              {/* Rating */}
              <div className="flex items-center space-x-1 mt-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={i < item.rating ? "text-yellow-400" : "text-gray-600"}>
                    ★
                  </span>
                ))}
              </div>

              {/* Price */}
              <p className="text-blue-400 font-bold text-lg mt-2">${item.price.toFixed(2)}</p>

              {/* Add to Cart */}
              <div className="flex justify-between mt-3">
                <button
                  onClick={() => handleAddItem(item.id, item.name, item.price)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products available</p>
        )}
      </div>
    </div>
  );
}
