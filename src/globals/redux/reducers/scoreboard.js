// simple scoreboard for player's live games

export const scoreboardReducer = (state = {me: null, opp: null}, action) => {
    switch (action.type) {
        case "UPDATE_SCOREBOARD":
            return {...action.payload}; // payload === {me: {shape: , score: }, opp: 0} // null for ended or not started games : {me: null, opp: null}
        case "CLEAN_SCOREBOARD":
            return {me: null, opp: null};
        default:
            return state;
    }
};