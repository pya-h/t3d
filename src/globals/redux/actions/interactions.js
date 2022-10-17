import { Status } from "../../../services/configs";
import chatServices from "../../../services/http/chatServices";
import { Sorry } from "../../../tools/notification";

// chats and friends
export const LoadInteractions = () => {
	return async (dispatch) => {
		try {
			var myInteractions = [];
			const { status, data } = await chatServices.getMyInteractions();
			if (status === Status.Successful) {
				const { interactions } = data;
				if (interactions instanceof Array) {
					//interactions catched from server side, but it requires modification: sorting, formatting messages
					interactions.forEach((interact) => {
						// reformat clients chats in his/her own viewpoint
						const { friend, messages, ownerOf } = interact;
						myInteractions.push({
							with: friend,
							messages: messages.map((msg) =>
								ownerOf === msg.owner
									? {
											me: msg.text,
											friend: null,
											date: msg.date,
									  }
									: {
											me: null,
											friend: msg.text,
											date: msg.date,
									  }
							),
						});
					});
					await dispatch({
						type: "LOAD_INTERACTIONS",
						payload: myInteractions,
					});
					// dispatch friends here
					// myChats key-value array: its keys are friendID that is relative to a special chat
				} else
					throw new Error(
						"null interaction response! means sth went wrong"
					);
			} else throw new Error("Error happened while forming chats list");
		} catch (err) {
			console.log(
				`Loading chats interrupted cause of this error: ${err}`
			);
			//show proper message
			if (!Status.isErrorExpected(err))
				Sorry(
					"حین بارگذاری پیام ها مشکلی پیش آمد. لطفا لحظاتی بعد دوباره تلاش کنید"
				);
			await dispatch({ type: "RESET_INTERACTIONS" });
		}
	};
};

// export const ExtractFriends = () => {
// 	return async (dispatch, getState) => {
// 		const interactions = getState().interactions;
// 		const friends = Interactions
// 	}
// }
export const UpdateMyChatList = (name, friendID, text, { sent, recieved }) => {
	// one time u load from server, then new messages are simply pushed to previous data
	return async (dispatch, getState) => {
		try {
			const myinteractions = getState().interactions;
			myinteractions
				.find((interact) => interact.with.userID === friendID)
				.messages.push({
					name: name, //is name needed?
					me: sent ? text : null,
					friend: recieved ? text : null,
					date: new Date(),
				});

			await dispatch({
				type: "LOAD_INTERACTIONS",
				payload: myinteractions,
			});
		} catch (err) {
			console.log(err);
			//..propeer message
			// ...reset?
		}
	};
};

export const ResetInteractions = () => {
	return async (dispatch) => {
		await dispatch({ type: "RESET_INTERACTIONS" });
	};
};
