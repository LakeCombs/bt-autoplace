import axios from "axios";
import { getError } from "../../utils/util";
import {
	OrderConstant,
	PayConstant,
	CartConstant,
} from "../constants/constants";
import Cookie from "js-cookie";
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
	GET_ORDER_BY_ID_FAILURE,
	GET_ORDER_BY_ID_REQUEST,
	GET_ORDER_BY_ID_SUCCESS,
	ADMIN_UPDATE_DELIVERED_FAILURE,
	ADMIN_UPDATE_DELIVERED_REQUEST,
	ADMIN_UPDATE_DELIVERED_SUCCESS,
	CLEAR_ADMIN_UPDATE_DELIVERY,
} = OrderConstant;
const { CLEAR_CART } = CartConstant;

export const getMyOrdersAction = () => async (dispatch, getState) => {
	try {
		dispatch({ type: FETCH_ORDER_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();

		const { data } = await axios.get(`api/orders/history`, {
			headers: { authorization: `Bearer ${userInfo?.token}` },
		});

		dispatch({ type: FETCH_ORDER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: FETCH_ORDER_FAILURE, payload: getError(error) });
	}
};

export const createOrderAction = (input) => async (dispatch, getState) => {
	try {
		dispatch({ type: CREATE_ORDER_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();

		const { data } = await axios.post(
			`api/orders`,
			{ ...input },
			{
				headers: { authorization: `Bearer ${userInfo?.token}` },
			}
		);
		Cookie.remove("cartItems");
		dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
		dispatch({ type: CLEAR_CART });
	} catch (error) {
		dispatch({ type: CREATE_ORDER_FAILURE, payload: getError(error) });
	}
};

export const fetchOrderByIdAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: GET_ORDER_BY_ID_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();

		const { data } = await axios.get(`/api/orders/${id}`, {
			headers: { authorization: `Bearer ${userInfo?.token}` },
		});

		dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: getError(error) });
	}
};

export const getAllOrderAction = () => async (dispatch, getState) => {
	try {
		dispatch({ type: GET_ALL_ORDER_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const { data } = await axios.get(`/api/admin/orders`, {
			headers: { authorization: `Bearer ${userInfo.token}` },
		});

		dispatch({ type: GET_ALL_ORDER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: GET_ALL_ORDER_FAILURE, payload: getError(error) });
	}
};

export const adminUpdateDeliveredAction =
	(id) => async (dispatch, getState) => {
		try {
			dispatch({
				type: ADMIN_UPDATE_DELIVERED_REQUEST,
			});

			const {
				userLogin: { userInfo },
			} = getState();
			const { data } = await axios.put(
				`/api/orders/${id}/deliver`,
				{},
				{
					headers: { authorization: `Bearer ${userInfo.token}` },
				}
			);
			dispatch({ type: ADMIN_UPDATE_DELIVERED_SUCCESS, payload: data });
			dispatch({ type: CLEAR_ADMIN_UPDATE_DELIVERY });
		} catch (error) {
			dispatch({
				type: ADMIN_UPDATE_DELIVERED_FAILURE,
				payload: getError(error),
			});
		}
	};
