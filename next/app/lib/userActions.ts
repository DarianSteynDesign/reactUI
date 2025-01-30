'use server'

import { CartItem, SignUpFormValues } from "./interfaces/user";

export async function createUser(values: SignUpFormValues) {
  const { name, surname, email, password } = values;

  const response = await fetch('http://localhost:5000/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, surname, email, password }),
  });

  if (!response.ok) {
    throw new Error('Signup failed');
  }

  return response.json();
}

export async function createPost(post: { text: string; image: string, userId: string }) {
  const response = await fetch("http://localhost:5000/api/createPost", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return response.json();
}


export async function incrementLike(postId: string) {
  const response = await fetch('http://localhost:5000/api/like', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ postId })
  });

  if (!response.ok) {
    throw new Error('Failed to increment like');
  }

  const updatedPost = await response.json();
  return updatedPost;
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


