import { LoadThisPlayer } from "./player";
import { Sorry, Notify } from "../../../tools/notification";
import { T3DLogic } from '../../../games/gameplay/GameLogics';
import { EndLeagueGame } from "./tools";

export const EnterRoom = (room) => {
    return async(dispatch, getState) => {
        const me = getState().me;

        try {
            if (room && room.gameID)
                await dispatch({
                    type: "REGISTER_GAME",
                    payload: { multy: true, gameID: room.gameID },
                });
            await dispatch({
                type: "ENTER_ROOM",
                payload: room,
            });
            // now dispatch opponent
            if (room.name) {
                const rivalID = room.name
                    .split("_")
                    .filter(
                        (playerID) =>
                        playerID.toString() !== me.userID.toString()
                    );
                await dispatch(LoadThisPlayer(rivalID));
            }
        } catch (err) {
            Sorry(
                "مشکلی حین بارکذاری داده های بازی پیش آمد. ممکن است اطلاعاتی که برای شما نمایش داده شده است، اشتباه باشد"
            );
            console.log("sth went wrong while entering the room 'cause: ", err);
        }
    };
};

export const ExitRoom = () => {
    return async(dispatch) => {
        await dispatch({
            type: "EXIT_ROOM",
        });
        await dispatch({ type: "RESET_OPPONENT" });
    };
};

export const CleanScoreboard = () => {
    return async(dispatch) => { await dispatch({ type: "CLEAN_SCOREBOARD" }); };
};

export const UpdateScoreboard = (details) => {
    return async(dispatch) => {
        await dispatch({
            type: "UPDATE_SCOREBOARD",
            payload: details,
        });
    };
};

export const RegisterMultiplayer = (gameID) => {
    return async(dispatch) => {
        try {
            if (gameID)
                await dispatch({
                    type: "REGISTER_GAME",
                    payload: { multy: true, gameID },
                });
        } catch (err) {
            console.log(err);
            await dispatch({ type: "RESET_GAME" });
        }
    };
};

export const CloseOngoingGame = () => {
    return async(dispatch) => {
        try {

            await dispatch({ type: "RESET_GAME" });
            await dispatch({ type: "CLEAN_SCOREBOARD" });
            await dispatch({ type: "EXIT_ROOM" });
            await dispatch({ type: "RESET_OPPONENT" });
            await dispatch(EndLeagueGame());
            console.log("GAME CLOSED")
        } catch (err) {
            console.log("closing the ongoing game failed completing cause: ", err);
            Notify("مشکلی حین بستن بازی کنونی پیش آمد.");
        }
    }
}

export const RegisterSinglePlayer = (dimension, scoreless, difficulty) => {
    return async(dispatch) => {
        try {
            const { myTurn, table, empties } = T3DLogic.initiate(dimension);
            await dispatch({
                type: "REGISTER_GAME",
                payload: { multy: false, dimension, scoreless, difficulty, myTurn, table, empties },
            });
        } catch (err) {
            console.log(err);
            Sorry("مشکلی در اجرای بازی تک نفره پیش آمد. لطفا مجددا تلاش کنید.")
        }
    }
}