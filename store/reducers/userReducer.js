import { LoginUser } from "../actions/userAction";
import { UserConstant } from "../constants/constants";
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
	CLEAR_DELETE_USER,
	ADMIN_UPDATE_USER_REQUEST,
	ADMIN_UPDATE_USER_SUCCESS,
	ADMIN_UPDATE_USER_FAILURE,
	ADMIN_UPDATE_USER_CLEAR,
} = UserConstant;

export const userLoginReducer = (
	state = {
		loading: false,
		error: "",
		userInfo: {},
	},
	action
) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload };

		case USER_LOGOUT:
			return { loading: false, error: "", userInfo: {} };

		default:
			return state;
	}
};

export const updateUserReducer = (
	state = {
		loading: false,
		error: "",
		userInfo: {},
	},
	action
) => {
	switch (action.type) {
		case UPDATE_USER_REQUEST:
			return { loading: true };
		case UPDATE_USER_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case UPDATE_USER_FAILURE:
			return { loading: false, error: action.payload };
		case UPDATE_USER_CLEAR:
			return { loading: false, userInfo: {}, error: "" };

		default:
			return state;
	}
};

export const regiserUserReducer = (
	state = {
		loading: false,
		error: "",
		userInfo: {},
	},
	action
) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };
		case USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const changePasswordReducer = (
	state = {
		loading: false,
		error: "",
		success: {},
	},
	action
) => {
	switch (action.type) {
		case UPDATE_PASSWORD_REQUEST:
			return { loading: true };
		case UPDATE_PASSWORD_SUCCESS:
			return { loading: false, success: true, success: action.payload };
		case UPDATE_PASSWORD_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const getUserByIdReducer = (
	state = { loading: false, error: "", user: {} },
	action
) => {
	switch (action.type) {
		case GET_USER_BY_ID_REQUEST:
			return { loading: true };
		case GET_USER_BY_ID_SUCCESS:
			return { loading: false, user: action.payload };
		case GET_USER_BY_ID_FAILURE:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const getAllUserReducer = (
	state = { loading: false, error: "", users: [] },
	action
) => {
	switch (action.type) {
		case FETCH_ALL_USER_REQUEST:
			return { loading: true };
		case FETCH_ALL_USER_SUCCESS:
			return { loading: false, users: action.payload };
		case FETCH_ALL_USER_FAILURE:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const deleteUserReducer = (
	state = { loading: false, error: "", user: {} },
	action
) => {
	switch (action.type) {
		case DELETE_USER_REQUEST:
			return { loading: true };
		case DELETE_USER_SUCCESS:
			return { loading: false, user: action.payload };
		case DELETE_USER_FAILURE:
			return { loading: false, error: action.payload };
		case CLEAR_DELETE_USER:
			return { loading: false, error: "", user: {} };

		default:
			return state;
	}
};

export const adminUpdateUserReducer = (
	state = { loading: false, error: "", user: {} },
	action
) => {
	switch (action.type) {
		case ADMIN_UPDATE_USER_REQUEST:
			return { loading: true };
		case ADMIN_UPDATE_USER_SUCCESS:
			return { loading: false, user: action.payload };
		case ADMIN_UPDATE_USER_FAILURE:
			return { loading: false, error: action.payload };
		case ADMIN_UPDATE_USER_CLEAR:
			return { loading: false, error: "", user: {} };

		default:
			return state;
	}
};
