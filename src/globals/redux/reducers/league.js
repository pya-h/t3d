export const leagueReducer = (state = null, action) => {
    switch (action.type) {
        case "ENTER_LEAGUE":
            return {...action.payload};
        case "EXIT_LEAGUE":
            return null;
        default:
            return state;
    }
};