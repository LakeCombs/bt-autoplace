import Cookie from "js-cookie";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	adminUpdateUserReducer,
	changePasswordReducer,
	deleteUserReducer,
	getAllUserReducer,
	getUserByIdReducer,
	logoutUserReducer,
	regiserUserReducer,
	userLoginReducer,
} from "./reducers/userReducer";
import {
	allProductReducer,
	createProductReducer,
	deleteProductReducer,
	getProductByIdReducer,
	updateProductReducer,
} from "./reducers/productReducer";
import {
	adminUpdateDeliveredReducer,
	createOrderReducer,
	getAllOrderReducer,
	getMyOrderReducer,
	getOrderByIdReducer,
} from "./reducers/orderReducer";
import { cartReducer } from "./reducers/cartReducer";
import { deliveryReducer, paymentReducer } from "./reducers/payReducer";
import { uploadImageReducer } from "./reducers/uploadReducer";
import { summaryReducer } from "./reducers/summaryReducer";

const initialState = {
	cart: {
		items: Cookie.get("cartItems") ? JSON.parse(Cookie.get("cartItems")) : [],
		wishList: Cookie.get("wishList") ? JSON.parse(Cookie.get("wishList")) : [],
		shippingAddress: Cookie.get("shippingAddress")
			? JSON.parse(Cookie.get("shippingAddress"))
			: {},
		paymentMethod: Cookie.get("paymentMethod")
			? Cookie.get("paymentMethod")
			: "",
	},

	userLogin: {
		userInfo: Cookie.get("userInfo")
			? JSON.parse(Cookie.get("userInfo"))
			: null,
	},
};

const reducer = combineReducers({
	userLogin: userLoginReducer,
	userRegister: regiserUserReducer,
	updateUser: userLoginReducer,
	updatePassword: changePasswordReducer,
	userById: getUserByIdReducer,
	allUser: getAllUserReducer,
	deleteUser: deleteUserReducer,
	cart: cartReducer,
	adminUpdateUser: adminUpdateUserReducer,

	allProduct: allProductReducer,
	productById: getProductByIdReducer,
	updateProduct: updateProductReducer,
	createProduct: createProductReducer,
	deleteProduct: deleteProductReducer,

	getMyOrder: getMyOrderReducer,
	createOrder: createOrderReducer,
	allOrder: getAllOrderReducer,
	orderById: getOrderByIdReducer,
	adminUpdateDelivered: adminUpdateDeliveredReducer,

	payment: paymentReducer,
	deliver: deliveryReducer,

	uploadImage: uploadImageReducer,

	summary: summaryReducer,
});

const middleware = [thunk];

const reduxStore = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default reduxStore;
