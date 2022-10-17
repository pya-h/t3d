export const opponentReducer = (state = null, action) => {
    switch (action.type) {
        case "LOAD_OPPONENT":
            return {...action.payload};
        case "RESET_OPPONENT":
            return null;
        default:
            return state;
    }
};
