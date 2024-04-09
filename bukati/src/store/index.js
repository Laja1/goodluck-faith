import { createSlice, configureStore } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQuantity: 0 },
  reducers: {
    addToCart(state, action) {
      const { id, name, price, imageUrl } = action.payload;

      const existingItemIndex = state.items.findIndex(
        (item) => item.productId === id
      );

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity++;
      } else {
        state.items.push({
          productId: id,
          imageUrl: imageUrl,
          name: name,
          price: parseFloat(price),
          quantity: 1,
        });
      }
      state.totalQuantity++;
    },
    addQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.productId === id);
      state.totalQuantity++;
      existingItem.quantity++;
    },
    subtractQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.productId === id);

      if (existingItem) {
        state.totalQuantity--;
        if (existingItem.quantity === 1) {
          // If quantity is 1, remove the item from the cart
          state.items = state.items.filter((item) => item.productId !== id);
        } else {
          // Decrease the quantity by 1
          existingItem.quantity--;
        }
      }
    },

    removeFromCart(state, action) {
      const id = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.productId === id
      );

      if (existingItemIndex !== -1) {
        state.totalQuantity--;

        if (state.items[existingItemIndex].quantity === 1) {
          state.items.splice(existingItemIndex, 1);
        } else {
          state.items[existingItemIndex].quantity--;
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, addQuantity, subtractQuantity } =
  cartSlice.actions;

export default configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});
