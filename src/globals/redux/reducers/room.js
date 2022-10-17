export const roomReducer = (state = {name: null, type: null, scoreless: null}, action) => {
    switch (action.type) {
        case "ENTER_ROOM":
            return {...action.payload};
        case "EXIT_ROOM":
            return {name: null, type: null, scoreless: null}
        default:
            return state;
    }
};