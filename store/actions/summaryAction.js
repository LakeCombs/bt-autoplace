import axios from "axios";
import { getError } from "../../utils/util";
import { SummaryConstant } from "../constants/constants";
const { FETCH_FAILURE, FETCH_REQUEST, FETCH_SUCCESS } = SummaryConstant;

export const getSummaryAction = () => async (dispatch, getState) => {
	try {
		dispatch({ type: FETCH_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const { data } = await axios.get(`/api/admin/summary`, {
			headers: { authorization: `Bearer ${userInfo.token}` },
		});

		dispatch({ type: FETCH_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: FETCH_FAILURE, payload: getError(error) });
	}
};
