import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CartService } from "../../services/cartService";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CartState = {
  items: [],
  status: "idle",
  error: null,
};

export const postCartItems = createAsyncThunk(
  "cart/postCartItems",
  async (cart: CartItem[], { rejectWithValue }) => {
    try {
      return await CartService.postCart(cart);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCartItems = createAsyncThunk<CartItem[]>(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }

      const data: CartItem[] = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ id: string; name: string; price: number }>
    ) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity -= 1;
        } else {
          state.items.splice(index, 1);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCartItems.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
        }
      )
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
