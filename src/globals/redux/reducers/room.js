export const roomReducer = (state = { name: null, dimension: null, scoreless: null, leaguID: null, gameID: null }, action) => {
    switch (action.type) {
        case "ENTER_ROOM":
            return {...action.payload };
        case "EXIT_ROOM":
            return { name: null, dimension: null, scoreless: null, leaguID: null, gameID: null }
        default:
            return state;
    }
};