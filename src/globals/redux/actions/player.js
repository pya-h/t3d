import { Status } from "../../../services/configs";
import userServices from "./../../../services/http/userServices";
import { Sorry } from "./../../../tools/notification";

export const ResetOpponent = () => {
	return async (dispatch) => {
		await dispatch({ type: "RESET_OPPONENT" });
	};
};

export const ResetMyPlayer = () => {
	return async (dispatch) => {
		await dispatch({ type: "RESET_MINE" });
	};
};

export const LoadThisPlayer = (userID) => {
	return async (dispatch) => {
		if (userID) {
			try {
				const { data, status } = await userServices.getPlayer(userID);
				if (status === Status.Successful) {
					const { player } = data;
					await dispatch({ type: "LOAD_OPPONENT", payload: player });
				}
			} catch (err) {
				// console.log(err);
				if (!Status.isErrorExpected(err))
					Sorry(
						"Failed to load opponent information. Please check your internet connection."
					);
				// ... toast proper message?
				await dispatch(ResetOpponent());
			}
		} else {
			// ...propere message
			await dispatch(ResetOpponent());
		}
	};
};

export const LoadMyPlayer = () => {
	return async (dispatch) => {
		try {
			const { data, status } = await userServices.getMe();
			if (status === Status.Successful) {
				const { player } = data;
				await dispatch({ type: "LOAD_MINE", payload: player });
			}
		} catch (err) {
			console.log(err);
			// ... toast proper message?
			if (!Status.isErrorExpected(err))
				Sorry("Failed to load your profile. Please check your internet connection.")
			await dispatch(ResetMyPlayer());
		}
	};
};
