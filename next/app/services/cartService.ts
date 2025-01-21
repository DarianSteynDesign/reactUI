export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export const CartService = {
  async getCartItems(): Promise<CartItem[]> {
    const response = await fetch("http://localhost:5000/api/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart items");
    }

    return await response.json();
  },

  async postCart(cart: CartItem[]) {
    const response = await fetch("http://localhost:5000/api/cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ cart }),
    });

    if (!response.ok) {
      throw new Error("Failed to save cart");
    }

    return await response.json();
  },
};
