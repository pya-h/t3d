export const gameReducer = (state = null, action) => {
    switch (action.type) {
        case "REGISTER_GAME":
            return {...action.payload };
        case "RESET_GAME":
            return null;
        default:
            return state;
    }
};