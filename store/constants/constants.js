export const UserConstant = {
	USER_LOGIN_REQUEST: "USER_LOGIN_REQUEST",
	USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
	USER_LOGIN_FAIL: "USER_LOGIN_FAIL",

	USER_REGISTER_REQUEST: "USER_REGISTER_REQUEST",
	USER_REGISTER_SUCCESS: "USER_REGISTER_SUCCESS",
	USER_REGISTER_FAIL: "USER_REGISTER_FAIL",

	UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST",
	UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",
	UPDATE_USER_FAILURE: "UPDATE_USER_FAILURE",
	UPDATE_USER_CLEAR: "UPDATE_USER_CLEAR",

	ADMIN_UPDATE_USER_REQUEST: "ADMIN_UPDATE_USER_REQUEST",
	ADMIN_UPDATE_USER_SUCCESS: "ADMIN_UPDATE_USER_SUCCESS",
	ADMIN_UPDATE_USER_FAILURE: "ADMIN_UPDATE_USER_FAILURE",
	ADMIN_UPDATE_USER_CLEAR: "ADMIN_UPDATE_USER_CLEAR",

	UPDATE_PASSWORD_REQUEST: "UPDATE_PASSWORD_REQUEST",
	UPDATE_PASSWORD_SUCCESS: "UPDATE_PASSWORD_SUCCESS",
	UPDATE_PASSWORD_FAILURE: "UPDATE_PASSWORD_FAILURE",

	FETCH_ALL_USER_REQUEST: "FETCH_ALL_USER_REQUEST",
	FETCH_ALL_USER_SUCCESS: "FETCH_ALL_USER_SUCCESS",
	FETCH_ALL_USER_FAILURE: "FETCH_ALL_USER_FAILURE",

	GET_USER_BY_ID_REQUEST: "GET_USER_BY_ID_REQUEST",
	GET_USER_BY_ID_SUCCESS: "GET_USER_BY_ID_SUCCESS",
	GET_USER_BY_ID_FAILURE: "GET_USER_BY_ID_FAILURE",

	DELETE_USER_REQUEST: "DELETE_USER_REQUEST",
	DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
	DELETE_USER_FAILURE: "DELETE_USER_FAILURE",
	CLEAR_DELETE_USER: "CLEAR_DELETE_USER",

	USER_LOGOUT: "USER_LOGOUT",
};

export const ProductConstant = {
	GET_ALL_PRODUCT_REQUEST: "GET_ALL_PRODUCT_REQUEST",
	GET_ALL_PRODUCT_SUCCESS: "GET_ALL_PRODUCT_SUCCESS",
	GET_ALL_PRODUCT_FAILURE: "GET_ALL_PRODUCT_FAILURE",

	GET_PRODUCT_BY_ID_REQUEST: "GET_PRODUCT_BY_ID_REQUEST",
	GET_PRODUCT_BY_ID_SUCCESS: "GET_PRODUCT_BY_ID_SUCCESS",
	GET_PRODUCT_BY_ID_FAILURE: "GET_PRODUCT_BY_ID_FAILURE",

	UPDATE_PRODUCT_BY_ID_REQUEST: "UPDATE_PRODUCT_BY_ID_REQUEST",
	UPDATE_PRODUCT_BY_ID_SUCCESS: "UPDATE_PRODUCT_BY_ID_SUCCESS",
	UPDATE_PRODUCT_BY_ID_FAILURE: "UPDATE_PRODUCT_BY_ID_FAILURE",
	CLEAR_UPDATE_PRODUCT: "CLEAR_UPDATE_PRODUCT",

	CREATE_PRODUCT_REQUEST: "CREATE_PRODUCT_REQUEST",
	CREATE_PRODUCT_SUCCESS: "CREATE_PRODUCT_SUCCESS",
	CREATE_PRODUCT_FAILURE: "CREATE_PRODUCT_FAILURE",
	CLEAR_CREATE_PRODUCT: "CLEAR_CREATE_PRODUCT",

	DELETE_PRODUCT_REQUEST: "DELETE_PRODUCT_REQUEST",
	DELETE_PRODUCT_SUCCESS: "DELETE_PRODUCT_SUCCESS",
	DELETE_PRODUCT_FAILURE: "DELETE_PRODUCT_FAILURE",

	DELETE_PRODUCT_RESET: "DELETE_PRODUCT_RESET",
};

// cart constant
export const CartConstant = {
	ADD_TO_CART: "ADD_TO_CART",
	REMOVE_FROM_CART: "REMOVE_FROM_CART",
	CLEAR_CART: "CLEAR_CART",
	REMOVE_CART_ITEM: "REMOVE_CART_ITEM",
};

export const WishListConstant = {
	ADD_TO_WISHLIST: "ADD_TO_WISHLIST",
	REMOVE_FROM_WISHLIST: "REMOVE_FROM_WISHLIST",
};

// shipping constant
export const ShippingConstant = {
	SAVE_SHIPPING_ADDRESS: "SAVE_SHIPPING_ADDRESS",
	SAVE_PAYMENT_METHOD: "SAVE_PAYMENT_METHOD",
};

//order constant
export const OrderConstant = {
	FETCH_ORDER_REQUEST: "FETCH_ORDER_REQEST",
	FETCH_ORDER_SUCCESS: "FETCH_ORDER_SUCCESS",
	FETCH_ORDER_FAILURE: "FETCH_ORDER_FAILURE",

	CREATE_ORDER_REQUEST: "CREATE_ORDER_REQUEST",
	CREATE_ORDER_SUCCESS: "CREATE_ORDER_SUCCESS",
	CREATE_ORDER_FAILURE: "CREATE_ORDER_FAILURE",

	GET_ALL_ORDER_REQUEST: "GET_ALL_ORDER_REQUEST",
	GET_ALL_ORDER_SUCCESS: "GET_ALL_ORDER_SUCCESS",
	GET_ALL_ORDER_FAILURE: "GET_ALL_ORDER_FAILURE",

	GET_ORDER_BY_ID_REQUEST: "GET_ORDER_BY_ID_REQUEST",
	GET_ORDER_BY_ID_SUCCESS: "GET_ORDER_BY_ID_SUCCESS",
	GET_ORDER_BY_ID_FAILURE: "GET_ORDER_BY_ID_FAILURE",

	ADMIN_UPDATE_DELIVERED_REQUEST: "ADMIN_UPDATE_DELIVERED_REQUEST",
	ADMIN_UPDATE_DELIVERED_SUCCESS: "ADMIN_UPDATE_DELIVERD_SUCCESS",
	ADMIN_UPDATE_DELIVERED_FAILURE: "ADMIN_UPDATE_DELIVERED_FAILURE",
	CLEAR_ADMIN_UPDATE_DELIVERY: "CLEAR_ADMIN_UPDATE_DELIVERY",
};

export const PayConstant = {
	PAY_REQUEST: "PAY_REQUEST",
	PAY_SUCCESS: "PAY_SUCCESS",
	PAY_FAILURE: "PAY_FAILURE",

	RESET_PAY: "RESET_PAY",
};

export const DeliveryConstant = {
	DELIVER_REQUEST: "DELIVER_REQUEST",
	DELIVER_SUCCESS: "DELIVER_SUCCESS",
	DELIVER_RESET: "DELIVER_RESET",
};

export const UploadImageConstant = {
	UPLOAD_REQUEST: "UPLOAD_REQUEST",
	UPLOAD_SUCCESS: "UPLOAD_SUCCESS",
	UPLOAD_FAILURE: "UPLOAD_FAILURE",
};

export const SummaryConstant = {
	FETCH_SUCCESS: "FETCH_SUCCESS",
	FETCH_REQUEST: "FETCH_REQUEST",
	FETCH_FAILURE: "FETCH_FAILURE",
};
