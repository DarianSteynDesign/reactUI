import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import protonReducer from "./slices/protonSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    proton: protonReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
