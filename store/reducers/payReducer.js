import { PayConstant, DeliveryConstant } from "../constants/constants";

const { PAY_FAILURE, PAY_REQUEST, PAY_SUCCESS, RESET_PAY } = PayConstant;
const { DELIVER_REQUEST, DELIVER_RESET, DELIVER_SUCCESS, DELIVER_FAIL } =
	DeliveryConstant;

export const paymentReducer = (
	state = { loading: false, error: "", order: {}, successPay: false },
	action
) => {
	switch (action.type) {
		case PAY_REQUEST:
			return { loading: true };
		case PAY_SUCCESS:
			return {
				loading: false,
				order: action.payload,
				successPay: true,
			};
		case PAY_FAILURE:
			return { loading: false, error: action.payload };
		case RESET_PAY:
			return { ...state, loading: false, successPay: false, error: "" };
		default:
			return state;
	}
};

export const deliveryReducer = (
	state = {
		loadingDeliver: false,
		successDeliver: false,
		error: "",
	},
	action
) => {
	switch (action.type) {
		case DELIVER_REQUEST:
			return { ...state, loadingDeliver: true };
		case DELIVER_SUCCESS:
			return { ...state, loadingDeliver: false, successDeliver: true };
		case DELIVER_FAIL:
			return { ...state, loadingDeliver: false, error: action.payload };
		case DELIVER_RESET:
			return {
				...state,
				loadingDeliver: false,
				successDeliver: false,
				error: "",
			};

		default:
			return state;
	}
};
