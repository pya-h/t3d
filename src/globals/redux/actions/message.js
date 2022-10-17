import { UpdateMyChatList } from "./interactions";

export const SendMessageTo = (name, friendID, text) => {
	return async (dispatch) => {
		try {
			if (text && friendID && name) {
				await dispatch({
					type: "SEND_MESSAGE",
					payload: { name, friendID, text },
				});
				await dispatch(UpdateMyChatList(name, friendID, text, {sent: true}));
			} else {
				console.log("msg not sent: data missing...");
			}
		} catch (err) {
			console.log(err);
		}
	};
};

export const RecieveMessageFrom = (name, friendID, text) => {
	return async (dispatch) => {
		try {
			if (text && friendID && name) {
				await dispatch({
                    type: "RECIEVE_MESSAGE",
                    payload: { name, friendID, text },
                });
				await dispatch(UpdateMyChatList(name, friendID, text, {recieved: true}));
			} else {
				console.log("msg not recieved: data missing...");
			}
		} catch (err) {
			console.log(err);
		}
	};
};