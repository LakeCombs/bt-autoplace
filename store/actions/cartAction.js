import { CartConstant } from "../constants/constants";
import { ShippingConstant } from "../constants/constants";
import { WishListConstant } from "../constants/constants";
const { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART, REMOVE_CART_ITEM } =
	CartConstant;
const { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } = WishListConstant;
const { SAVE_PAYMENT_METHOD, SAVE_SHIPPING_ADDRESS } = ShippingConstant;

export const addToCartAction = (product) => (dispatch) => {
	dispatch({ type: ADD_TO_CART, payload: product });
};

export const removedFromCartAction = (product) => (dispatch) => {
	dispatch({ type: REMOVE_CART_ITEM, payload: product });
};

export const removedItemFromCartAction = (product) => (dispatch) => {
	dispatch({ type: REMOVE_FROM_CART, payload: product });
};
export const reviewProductAction = async (id) => {
	const { data } = await axios.get(`/api/products/${id}/reviews`);
	return data;
};

export const addToWishListAction = (product) => (dispatch) => {
	dispatch({ type: ADD_TO_WISHLIST, payload: product });
};

export const removeFromWishListAction = (product) => (dispatch) => {
	dispatch({ type: REMOVE_FROM_WISHLIST, payload: product });
};

export const saveShippingAddressAction = (shippingDetails) => (dispatch) => {
	dispatch({ type: SAVE_SHIPPING_ADDRESS, payload: shippingDetails });
};

export const savePaymentMethodAction = (paymentMethod) => (dispatch) => {
	dispatch({ type: SAVE_PAYMENT_METHOD, payload: paymentMethod });
};
