export const meReducer = (state = null, action) => {
    switch (action.type) {
        case "LOAD_MINE":
            return {...action.payload};
        case "RESET_MINE":
            return null;
        default:
            return state;
    }
};
