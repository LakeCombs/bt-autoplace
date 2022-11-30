import { LoginUser } from "../actions/userAction";
import { UserConstant } from "../constants/constants";
import Cookie from "js-cookie";
import axios from "axios";
import { getError } from "../../utils/util";
import { ActionTypes } from "@mui/base";

const {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	UPDATE_USER_REQUEST,
	UPDATE_USER_FAILURE,
	UPDATE_USER_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	UPDATE_PASSWORD_FAILURE,
	UPDATE_PASSWORD_REQUEST,
	UPDATE_PASSWORD_SUCCESS,
	UPDATE_USER_CLEAR,
	GET_USER_BY_ID_FAILURE,
	GET_USER_BY_ID_REQUEST,
	GET_USER_BY_ID_SUCCESS,
	FETCH_ALL_USER_FAILURE,
	FETCH_ALL_USER_REQUEST,
	FETCH_ALL_USER_SUCCESS,
	DELETE_USER_REQUEST,
	DELETE_USER_SUCCESS,
	DELETE_USER_FAILURE,
	CLEAR_CREATE_PRODUCT,
	ADMIN_UPDATE_USER_REQUEST,
	ADMIN_UPDATE_USER_SUCCESS,
	ADMIN_UPDATE_USER_FAILURE,
	ADMIN_UPDATE_USER_CLEAR,
} = UserConstant;

export const registerUser =
	({ first_name, last_name, email, password, phone }) =>
	async (dispatch) => {
		try {
			dispatch({ type: USER_REGISTER_REQUEST });
			const { data } = await axios.post("/api/users/register", {
				first_name,
				last_name,
				email,
				password,
				phone,
			});

			dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
			dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
			Cookie.set("userInfo", JSON.stringify(data));
		} catch (error) {
			dispatch({ type: USER_REGISTER_FAIL, payload: getError(error) });
		}
	};

export const loginUser =
	({ email, password }) =>
	async (dispatch) => {
		try {
			dispatch({ type: USER_LOGIN_REQUEST });
			const { data } = await axios.post("/api/users/login", {
				email,
				password,
			});

			dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
			Cookie.set("userInfo", JSON.stringify(data));
		} catch (error) {
			dispatch({ type: USER_LOGIN_FAIL, payload: getError(error) });
		}
	};

export const updateUserAction = (input) => async (dispatch, getState) => {
	try {
		dispatch({ type: UPDATE_USER_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();

		const { data } = await axios.put(
			"/api/users/profile",
			{ ...input },
			{
				headers: { authorization: `Bearer ${userInfo?.token}` },
			}
		);

		dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
		dispatch({ type: UPDATE_USER_CLEAR });
		Cookie.set("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({ type: UPDATE_USER_FAILURE, payload: getError(error) });
	}
};

export const adminUpdateUserAction =
	({ userId, input }) =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: ADMIN_UPDATE_USER_REQUEST });
			const {
				userLogin: { userInfo },
			} = getState();

			const { data } = await axios.put(
				`/api/admin/users/${userId}`,
				{
					...input,
				},
				{ headers: { authorization: `Bearer ${userInfo.token}` } }
			);

			dispatch({ type: ADMIN_UPDATE_USER_SUCCESS, payload: data });
			dispatch({ type: ADMIN_UPDATE_USER_CLEAR });
		} catch (error) {
			dispatch({ type: ADMIN_UPDATE_USER_FAILURE, payload: getError(error) });
		}
	};

export const updatePasswordAction =
	({ old_password, new_password }) =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: UPDATE_PASSWORD_REQUEST });
			const {
				userLogin: { userInfo },
			} = getState();
			const { data } = await axios.put(
				"/api/users/password",
				{ old_password, new_password },
				{
					headers: { authorization: `Bearer ${userInfo?.token}` },
				}
			);

			dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data });
			dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
			dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: {} });
			Cookie.set("userInfo", JSON.stringify(data));
		} catch (error) {
			dispatch({ type: UPDATE_PASSWORD_FAILURE, payload: getError(error) });
		}
	};

export const logoutUser = () => (dispatch) => {
	dispatch({ type: USER_LOGOUT });
	Cookie.remove("userInfo");
};

export const getUserByIdAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: GET_USER_BY_ID_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const { data } = await axios.get(`/api/admin/users/${id}`, {
			headers: { authorization: `Bearer ${userInfo.token}` },
		});

		dispatch({ type: GET_USER_BY_ID_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: GET_USER_BY_ID_FAILURE, payload: getError(error) });
	}
};

export const getAllUserAction = () => async (dispatch, getState) => {
	try {
		dispatch({ type: FETCH_ALL_USER_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const { data } = await axios.get(`/api/admin/users`, {
			headers: { authorization: `Bearer ${userInfo.token}` },
		});
		dispatch({ type: FETCH_ALL_USER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: FETCH_ALL_USER_FAILURE, payload: getError(error) });
	}
};

export const deleteUserAction = (userId) => async (dispatch, getState) => {
	try {
		dispatch({ type: DELETE_USER_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const { data } = await axios.delete(`/api/admin/users/${userId}`, {
			headers: { authorization: `Bearer ${userInfo.token}` },
		});

		dispatch({ type: DELETE_USER_SUCCESS, payload: data });
		dispatch({ type: CLEAR_CREATE_PRODUCT });
	} catch (error) {
		dispatch({ type: DELETE_USER_FAILURE, payload: getError(error) });
	}
};
