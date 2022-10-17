import { combineReducers } from "redux";
import { meReducer } from "./me";
import { opponentReducer } from "./opponent";
import { roomReducer } from './room';
import { scoreboardReducer } from './scoreboard';
import { toolsReducer } from "./tools";
import { statisticsReducer } from "./statistics";
import { messageReducer } from './message';
import { interactionsReducer } from './interactions';
import { leagueReducer } from './league';
import { gameReducer } from "./game";

export const reducers = combineReducers({
    me: meReducer,
    opponent: opponentReducer,
    room: roomReducer,
    scoreboard: scoreboardReducer,
    tools: toolsReducer,
    statistics: statisticsReducer,
    message: messageReducer,
    interactions: interactionsReducer,
    league: leagueReducer,
    game: gameReducer
});