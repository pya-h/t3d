export const statisticsReducer = (state = { players: 0, games: 0 }, action) => {
	switch (action.type) {
		case "UPDATE_STATISTICS":
			return { ...action.payload };

		default:
			return state;
	}
};
