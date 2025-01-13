import { CartItem } from '../store/dashboard/cartStore';

export const CartService = {
  async getCartItems(): Promise<CartItem[]> {
    const token = localStorage.getItem('authToken');
    const response = await fetch('http://localhost:5000/api/cart', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cart items');
    }

    const data: CartItem[] = await response.json();
    return data;
  },

  async postCart(cart: CartItem[]) {
    const token = localStorage.getItem('authToken');
  
    const response = await fetch('http://localhost:5000/api/cart', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ cart }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to save cart');
    }
  
    return response.json();
  },
};
