import React, { useEffect, useState } from 'react';
import { useCartStore } from '../../../store/dashboard/cartStore';
import { FaShoppingCart } from 'react-icons/fa';
import './Cart.scss';
import { CartService } from '../../../services/CartService';
import { useQuery } from '@tanstack/react-query';

const Cart: React.FC = () => {
  const { setItems } = useCartStore();
  const { data: cartItems, isLoading: isCartLoading, error: cartError } = useQuery({
    queryKey: ['cartItems'],
    queryFn: () => CartService.getCartItems()
  });

  const { items, addItem, removeItem, saveCart, shouldSaveCart } = useCartStore(
    (state: any) => ({
      items: state.items,
      addItem: state.addItem,
      removeItem: state.removeItem,
      saveCart: state.saveCart,
      shouldSaveCart: state.shouldSaveCart,
    })
  );

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const itemCount = items.reduce((total: number, item: any) => total + item.quantity, 0);

  React.useEffect(() => {
    if (shouldSaveCart) {
      saveCart();
    }
  }, [shouldSaveCart, saveCart]);

  useEffect(() => {
    if (!isCartLoading && cartItems && cartItems.length > 0) {
      setItems(cartItems);
    }
  }, [isCartLoading, cartItems, setItems]);

  const isLoading = isCartLoading;
  const error = cartError;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error?.message || 'An unknown error occurred'}</div>;

  return (
    <div 
      className="cart-container" 
    >
      <div className="cart-icon"
      onClick={() => setDropdownOpen(isDropdownOpen => !isDropdownOpen)}
      >
        <FaShoppingCart />
        {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
      </div>

      {isDropdownOpen && (
        <div className="cart-dropdown">
          <h3>My Cart</h3>
          {items.length > 0 ? (
            <ul className="cart-items">
              {items.map((item: any) => (
                <li key={item.id} className="cart-item">
                  <span>{item.name}</span>
                  <span>Qty: {item.quantity}</span>
                  <span>Price: ${item.price.toFixed(2)}</span>
                  <button onClick={() => addItem({ id: item.id, name: item.name, price: item.price })}>+</button>
                  <button onClick={() => removeItem(item.id)}>-</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
