import { Sorry } from "./../../../tools/notification";
import leagueServices from "./../../../services/http/leagueServices";
import { Status } from "../../../services/configs";

export const EnterLeague = (leagueID) => {
    return async(dispatch) => {
        if (leagueID) {
            try {
                // check laugue object for validty(?)
                const { data, status } = await leagueServices.loadLeague(
                    leagueID
                );
                if (status === Status.Successful) {
                    const { league } = data;
                    if (league && league.matches) {
                        // league.ongoing is a shortcut like field that translates current round of the league with sufficient data
                        // this code just returns ongoing round:(last index on the league.matches list)

                        for (const round of league.matches) {
                            for (const match of round) {
                                const playerXIndex = league.contesters.findIndex(
                                    (cont) => cont.userID === match.players[0]
                                );
                                const playerOIndex = league.contesters.findIndex(
                                    (cont) => cont.userID === match.players[1]
                                );

                                match.players = [];
                                [playerXIndex, playerOIndex].forEach((index) => {
                                    if (
                                        index >= 0 &&
                                        index <= league.contesters.length
                                    ) {
                                        //index and is found and has a valid value
                                        const { fullname, userID, progress } = league.contesters[index];
                                        match.players.push({ fullname, userID, progress }); //put contesters .progress into .records for ranking table
                                    } else {
                                        match.players.push({
                                            fullname: "ناشناس",
                                            userID: null,
                                            progress: null
                                        });
                                    }
                                });
                            }
                        }
                    }
                    league.ongoing = league.matches[
                        league.matches.length - 1
                    ];

                    await dispatch({
                        type: "ENTER_LEAGUE",
                        payload: data.league,
                    });
                }
            } catch (err) {
                Sorry(
                    "مشکلی حین ورود به لیگ پیش آمد. لطفا وضعیت اینترنت خود را بررسی کنید."
                );
                // ... toast proper message?
                await dispatch(ExitLeague());
            }
        } else {
            // ...propere message
            await dispatch(ExitLeague());
        }
    };
};

export const ExitLeague = () => {
    return async(dispatch) => {
        await dispatch({ type: "EXIT_LEAGUE" });
    };
};