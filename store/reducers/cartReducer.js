import { CartConstant } from "../constants/constants";
import { ShippingConstant } from "../constants/constants";
import { WishListConstant } from "../constants/constants";
const { ADD_TO_CART, CLEAR_CART, REMOVE_CART_ITEM, REMOVE_FROM_CART } =
	CartConstant;
const { SAVE_PAYMENT_METHOD, SAVE_SHIPPING_ADDRESS } = ShippingConstant;
const { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } = WishListConstant;

import Cookie from "js-cookie";
import { LoginUser } from "../actions/userAction";

export function cartReducer(
	state = {
		items: [],
		wishList: [],
		shippingAddress: {
			address: "",
			city: "",
			state: "",
		},
		paymentMethod: {},
	},
	action
) {
	switch (action.type) {
		case ADD_TO_CART:
			const newItem = action.payload;
			const existItem = state?.items?.find(
				(item) => item?.item?._id === newItem._id
			);

			const items = existItem
				? state.items.map((item) => {
						if (item?.item?._id === existItem?.item?._id) {
							return { ...item, count: item.count + 1 };
						} else {
							return {
								...item,
							};
						}
				  })
				: [...state.items, { item: newItem, count: 1 }];

			Cookie.set("cartItems", JSON.stringify(items));
			return { ...state, items };

		case REMOVE_CART_ITEM:
			const cartItems = state.items?.find(
				(item) => item?.item?._id === action?.payload?._id
			)
				? state.items.map((item) => {
						if (item?.item?._id === action.payload?._id && item?.count > 1) {
							return { ...item, count: item.count - 1 };
						} else {
							return {
								...item,
							};
						}
				  })
				: state?.items?.filter(
						(item) => item?.item?._id === action.payload?._id
				  );

			Cookie.set("cartItems", JSON.stringify(cartItems));
			return { ...state, items: cartItems };

		case REMOVE_FROM_CART:
			const RemainingItem = state.items.filter(
				(item) => item?.item?._id !== action.payload?._id
			);
			Cookie.set("cartItem", JSON.stringify(RemainingItem));
			return { ...state, items: RemainingItem };

		case ADD_TO_WISHLIST:
			const wish = action.payload;

			const wishExist = state.wishList.find((item) => item?._id === wish._id);
			const wishList = wishExist
				? state.wishList.map((item) =>
						item.name === wishExist.name ? wish : item
				  )
				: [...state.wishList, wish];

			Cookie.set("wishList", JSON.stringify(wishList));
			return { ...state, wishList };

		case REMOVE_FROM_WISHLIST:
			const removeit = state?.wishList.filter(
				(item) => item._id !== action.payload._id
			);
			Cookie.set("wishList", JSON.stringify(removeit));
			return { ...state, wishList: removeit };

		case SAVE_SHIPPING_ADDRESS:
			const shippingAdd = {
				name: action.payload.name,
				address: action.payload.address,
				city: action.payload.city,
				state: action.payload.state,
			};
			Cookie.set("shippingAddress", JSON.stringify(shippingAdd));
			return { ...state, shippingAddress: shippingAdd };

		case SAVE_PAYMENT_METHOD:
			return { ...state, paymentMethod: action.payload };

		case CLEAR_CART:
			return { ...state, items: [] };

		default:
			return state;
	}
}
