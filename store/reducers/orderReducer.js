import { OrderConstant } from "../constants/constants";
const {
	FETCH_ORDER_FAILURE,
	FETCH_ORDER_REQUEST,
	FETCH_ORDER_SUCCESS,
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAILURE,
	GET_ALL_ORDER_FAILURE,
	GET_ALL_ORDER_REQUEST,
	GET_ALL_ORDER_SUCCESS,
	GET_ORDER_BY_ID_REQUEST,
	GET_ORDER_BY_ID_FAILURE,
	GET_ORDER_BY_ID_SUCCESS,
	ADMIN_UPDATE_DELIVERED_FAILURE,
	ADMIN_UPDATE_DELIVERED_REQUEST,
	ADMIN_UPDATE_DELIVERED_SUCCESS,
	CLEAR_ADMIN_UPDATE_DELIVERY,
} = OrderConstant;

export const getMyOrderReducer = (
	state = { loading: false, error: "", orders: [] },
	action
) => {
	switch (action.type) {
		case FETCH_ORDER_REQUEST:
			return { loading: true };
		case FETCH_ORDER_SUCCESS:
			return { loading: false, orders: action.payload };
		case FETCH_ORDER_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const createOrderReducer = (
	state = { loading: false, error: "", order: {} },
	action
) => {
	switch (action.type) {
		case CREATE_ORDER_REQUEST:
			return { loading: true };
		case CREATE_ORDER_SUCCESS:
			return { loading: false, order: action.payload };
		case CREATE_ORDER_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const getAllOrderReducer = (
	state = { loading: false, error: "", orders: [] },
	action
) => {
	switch (action.type) {
		case GET_ALL_ORDER_REQUEST:
			return { loading: true };
		case GET_ALL_ORDER_SUCCESS:
			return { loading: false, orders: action.payload };
		case GET_ALL_ORDER_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const getOrderByIdReducer = (
	state = { loading: false, error: "", order: {} },
	action
) => {
	switch (action.type) {
		case GET_ORDER_BY_ID_REQUEST:
			return { loading: true };
		case GET_ORDER_BY_ID_SUCCESS:
			return { loading: false, order: action.payload };
		case GET_ORDER_BY_ID_FAILURE:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const adminUpdateDeliveredReducer = (
	state = { loading: false, error: "", order: {} },
	action
) => {
	switch (action.type) {
		case ADMIN_UPDATE_DELIVERED_REQUEST:
			return { loading: true };
		case ADMIN_UPDATE_DELIVERED_SUCCESS:
			return { loading: false, order: action.payload };
		case ADMIN_UPDATE_DELIVERED_FAILURE:
			return { loading: false, error: action.payload };
		case CLEAR_ADMIN_UPDATE_DELIVERY:
			return { loading: false, error: "", order: {} };
		default:
			return state;
	}
};
