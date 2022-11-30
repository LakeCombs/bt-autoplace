import axios from "axios";
import { getError } from "../../utils/util";
import { OrderConstant, PayConstant } from "../constants/constants";
const { PAY_FAILURE, PAY_REQUEST, PAY_SUCCESS } = PayConstant;

export const paymentAction = (reference) => async (dispatch, getState) => {
	try {
		dispatch({ type: PAY_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const { data } = await axios.put(`/api/orders/${id}/pay`, reference, {
			headers: { authorization: `Bearer ${userInfo.token}` },
		});
		dispatch({ type: PAY_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: PAY_FAILURE, payload: getError(error) });
	}
};
