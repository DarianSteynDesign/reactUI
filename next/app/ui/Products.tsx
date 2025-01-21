import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../store/slices/cartSlice";
import { AppDispatch } from "../store/store";

export function Products() {
  const dispatch: AppDispatch = useDispatch();

  const dummyItems = [
    { id: "1", name: "Apple", quantity: 2, price: 0.99 },
    { id: "2", name: "Banana", quantity: 5, price: 0.59 },
    { id: "3", name: "Orange", quantity: 3, price: 1.29 },
  ];

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
    <div className="max-w-3xl mx-auto p-4">
      <h3 className="text-xl font-semibold mb-4">Items to Buy</h3>
      <ul className="space-y-4">
        {dummyItems.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <span className="font-medium text-lg">{item.name}</span>
            <span className="text-sm text-gray-500">
              Quantity: {item.quantity}
            </span>
            <span className="text-sm text-gray-500">
              Price: ${item.price.toFixed(2)}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleAddItem(item.id, item.name, item.price)}
                className="px-3 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                +
              </button>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
              >
                -
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
