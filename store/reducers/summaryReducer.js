import { SummaryConstant } from "../constants/constants";
const { FETCH_FAILURE, FETCH_REQUEST, FETCH_SUCCESS } = SummaryConstant;

export const summaryReducer = (
	state = {
		loading: false,
		error: "",
		summary: {},
	},
	action
) => {
	switch (action.type) {
		case FETCH_REQUEST:
			return { loading: true };
		case FETCH_SUCCESS:
			return { loading: false, summary: action.payload };
		case FETCH_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
