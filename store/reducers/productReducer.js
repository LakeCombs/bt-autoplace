import { ProductConstant } from "../constants/constants";

const {
	GET_ALL_PRODUCT_FAILURE,
	GET_ALL_PRODUCT_REQUEST,
	GET_ALL_PRODUCT_SUCCESS,

	GET_PRODUCT_BY_ID_FAILURE,
	GET_PRODUCT_BY_ID_REQUEST,
	GET_PRODUCT_BY_ID_SUCCESS,

	UPDATE_PRODUCT_BY_ID_FAILURE,
	UPDATE_PRODUCT_BY_ID_REQUEST,
	UPDATE_PRODUCT_BY_ID_SUCCESS,
	CLEAR_UPDATE_PRODUCT,

	CREATE_PRODUCT_REQUEST,
	CREATE_PRODUCT_FAILURE,
	CREATE_PRODUCT_SUCCESS,
	CLEAR_CREATE_PRODUCT,

	DELETE_PRODUCT_FAILURE,
	DELETE_PRODUCT_REQUEST,
	DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_RESET,
} = ProductConstant;

export const allProductReducer = (
	state = {
		loading: false,
		error: "",
		products: [],
	},
	action
) => {
	switch (action.type) {
		case GET_ALL_PRODUCT_REQUEST:
			return { loading: false };
		case GET_ALL_PRODUCT_SUCCESS:
			return { loading: false, products: action.payload };
		case GET_ALL_PRODUCT_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const getProductByIdReducer = (
	state = {
		loading: false,
		error: "",
		product: {},
	},
	action
) => {
	switch (action.type) {
		case GET_PRODUCT_BY_ID_REQUEST:
			return { loading: false };
		case GET_PRODUCT_BY_ID_SUCCESS:
			return { loading: false, product: action.payload };
		case GET_PRODUCT_BY_ID_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const updateProductReducer = (
	state = {
		loading: false,
		error: "",
		product: {},
	},
	action
) => {
	switch (action.type) {
		case UPDATE_PRODUCT_BY_ID_REQUEST:
			return { loading: true };
		case UPDATE_PRODUCT_BY_ID_SUCCESS:
			return { loading: false, product: action.payload };
		case UPDATE_PRODUCT_BY_ID_FAILURE:
			return { loading: false, error: action.payload };
		case CLEAR_UPDATE_PRODUCT:
			return { laoding: false, error: "", product: null };
		default:
			return state;
	}
};

export const createProductReducer = (
	state = {
		loading: false,
		error: "",
		product: {},
	},
	action
) => {
	switch (action.type) {
		case CREATE_PRODUCT_REQUEST:
			return { loading: true };
		case CREATE_PRODUCT_SUCCESS:
			return { loading: false, product: action.payload };
		case CREATE_PRODUCT_FAILURE:
			return { loading: false, error: action.payload };
		case CLEAR_CREATE_PRODUCT:
			return { loading: false, error: "", product: {} };
		default:
			return state;
	}
};

export const deleteProductReducer = (
	state = {
		loading: false,
		error: "",
		product: {},
	},
	action
) => {
	switch (action.type) {
		case DELETE_PRODUCT_REQUEST:
			return { loading: true };
		case DELETE_PRODUCT_SUCCESS:
			return { loading: false, product: action.payload };
		case DELETE_PRODUCT_FAILURE:
			return { loading: false, error: action.payload };
		case DELETE_PRODUCT_RESET:
			return {};
		default:
			return state;
	}
};
