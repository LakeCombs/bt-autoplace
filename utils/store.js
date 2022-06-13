import { createContext, useReducer } from "react";
import Cookie from "js-cookie";

export const Store = createContext();

const initialState = {
  cart: {
    items: Cookie.get("cartItems") ? JSON.parse(Cookie.get("cartItems")) : [],
    shippingAddress: Cookie.get("shippingAddress") ? JSON.parse(Cookie.get("shippingAddress")) : {},
    paymentMethod: Cookie.get("paymentMethod") ? Cookie.get("paymentMethod") : ''
  },
  userInfo: Cookie.get("userInfo") ? JSON.parse(Cookie.get("userInfo")) : null,
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
      const cartItems = state.cart.items.filter(
        (item) => item._id !== action.payload._id
      );
      Cookie.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, items: cartItems } };

    case "USER_LOGIN":
      return { ...state, userInfo: action.payload };

    case "USER_LOGOUT":
      return {
        ...state,
        userInfo: null,
        cart: {
          items: [],
          shippingAddress: {},
          paymentMethod: ""
        },
      };

    case "SAVE_SHIPPING_ADDRESS":
      return {...state, cart: {...state.cart, shippingAddress: action.payload}}

    case "SAVE_PAYMENT_METHOD":
        return {...state, cart: {...state.cart, paymentMethod: action.payload}}
    
    case "CLEAR_CART":
      return {...state, cart: {...state.cart, items: []}}


    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
