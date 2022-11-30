import { ShippingConstant } from "../constants/constants";

const { SAVE_PAYMENT_METHOD, SAVE_SHIPPING_ADDRESS } = ShippingConstant;

export const saveShippingAddressAction = (input) => (dispatch) => {
	dispatch({ type: SAVE_SHIPPING_ADDRESS, payload: input });
};
