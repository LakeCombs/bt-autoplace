import { UploadImageConstant } from "../constants/constants";
const { UPLOAD_FAILURE, UPLOAD_REQUEST, UPLOAD_SUCCESS } = UploadImageConstant;

export const uploadImageReducer = (
	state = {
		loading: false,
		error: "",
		image: {},
	},
	action
) => {
	switch (action.type) {
		case UPLOAD_REQUEST:
			return { loading: true };
		case UPLOAD_SUCCESS:
			return { loading: false, image: action.payload };
		case UPLOAD_FAILURE:
			return { loading: false, image: action.payload };

		default:
			return state;
	}
};
