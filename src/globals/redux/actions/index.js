export const UpdateStatistics = (players, games) => {
	return async (dispatch, getState) => {
		await dispatch({
			type: "UPDATE_STATISTICS",
			payload: { players, games },
		});
	};
};

export const MessagePushed = () => {
	return async (dispatch) => {
		await dispatch({ type: "MEESAGE_PUSHED" });
	};
};

export const ResetMessages = () => {
	return async (dispatch) => {
		await dispatch({ type: "RESET_MESSAGES" });
	};
};