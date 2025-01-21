import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  addItem,
  fetchCartItems,
  postCartItems,
  removeItem,
} from "../store/slices/cartSlice";
import CartSummary from "./CartSummary";

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector(
    (state: RootState) => state.cart
  );
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(() => {
    console.log("Recalculating total price...");
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    if (items.length > 0) {
      dispatch(postCartItems(items));
    }
  }, [items, dispatch]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div className="relative">
      <div
        className="flex items-center space-x-2 cursor-pointer text-gray-700 hover:text-gray-900"
        onClick={() => setDropdownOpen((prev) => !prev)}
      >
        {itemCount > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {itemCount}
          </span>
        )}
      </div>

      {isDropdownOpen && (
        <div className="absolute top-0 left-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">My Cart</h3>
          </div>
          <div className="p-4 space-y-4">
            {items.length > 0 ? (
              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                  >
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity} | ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          dispatch(
                            addItem({
                              id: item.id,
                              name: item.name,
                              price: item.price,
                            })
                          )
                        }
                        className="text-white bg-green-500 hover:bg-green-600 px-2 py-1 rounded-md text-xs"
                      >
                        +
                      </button>
                      <button
                        onClick={() => dispatch(removeItem(item.id))}
                        className="text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded-md text-xs"
                      >
                        -
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">Your cart is empty</p>
            )}

            <CartSummary totalItems={itemCount} totalPrice={totalPrice} />
          </div>
          <div className="p-4 border-t flex justify-between items-center">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm"
              onClick={() => setDropdownOpen(false)}
            >
              Close
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
              onClick={() => console.log("Checkout")}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
