import axios from "axios";
import { getError } from "../../utils/util";
import { UploadImageConstant } from "../constants/constants";
const { UPLOAD_FAILURE, UPLOAD_REQUEST, UPLOAD_SUCCESS } = UploadImageConstant;

export const uploadImageAction = (file) => async (dispatch, getState) => {
	try {
		dispatch({ type: UPLOAD_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const { data } = await axios.post(
			"/api/upload",
			{ file },
			{
				headers: {
					"Content-Type": "multipart/form-data",
					authorization: `Bearer ${userInfo?.token}`,
				},
			}
		);

		dispatch({ type: UPLOAD_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: UPLOAD_FAILURE, payload: getError(error) });
	}
};
