import { createContext, useReducer } from "react";
import Cookie from "js-cookie";

export const Store = createContext();

const initialState = {
  cart: {
    items: Cookie.get("cartItems") ? JSON.parse(Cookie.get("cartItems")) : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const newItem = action.payload;
      const existItem = state.cart.items.find(
        (item) => item._id === newItem._id
      );
      const items = existItem
        ? state.cart.items.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.items, newItem];
      Cookie.set("cartItems", JSON.stringify(items));
      return { ...state, cart: { ...state.cart, items } };

    case "REMOVE_CART_ITEM":
        const cartItems = state.cart.items.filter(item => item._id !== action.payload._id);
        Cookie.set("cartItems", JSON.stringify(cartItems));
        return { ...state, cart: { ...state.cart, items: cartItems } };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
