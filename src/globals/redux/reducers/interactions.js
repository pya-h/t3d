export const interactionsReducer = (state = [], action) => {
    switch (action.type) {
        case "LOAD_INTERACTIONS":
            return [...action.payload];
        case "RESET_INTERACTIONS":
            return [];
        default:
            return state;
    }
};