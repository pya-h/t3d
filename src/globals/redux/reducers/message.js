export const messageReducer = (
	state = { sent: null, recieved: null },
	action
) => {
	switch (action.type) {
		case "RECIEVE_MESSAGE": {
			return {
				recieved: { ...action.payload, pushed: false },
				sent: state.sent,
			};
		}
		case "SEND_MESSAGE": {
			return {
				sent: { ...action.payload, pushed: true },
				recieved: state.recieved,
			};
		}
		case "MEESAGE_PUSHED":
			return {
				sent: state.sent,
				recieved: {...state.recieved, pushed: true},
			};
		case "RESET_MESSAGES":
			return { sent: null, recieved: null };
		default:
			return state;
	}
};
