export const toolsReducer = (
	state = {
		randomSearchRepeats: 0,
		friendRequestTarget: null,
		friendlyGameTarget: null,
		gameInvitation: null,
		acceptedGame: null,
		recordReloadTrigger: false,
	},
	action
) => {
	switch (action.type) {
		case "UPDATE_TOOLS":
			return { ...action.payload };
		default:
			return state;
	}
};
