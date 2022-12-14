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
                        league.ongoing = league.matches[
                            league.matches.length - 1
                        ].map((match) => {
                            const playerXIndex = league.contesters.findIndex(
                                (cont) => cont.userID === match.players[0]
                            );
                            const playerOIndex = league.contesters.findIndex(
                                (cont) => cont.userID === match.players[1]
                            );

                            const players = [];
                            [playerXIndex, playerOIndex].forEach((index) => {
                                if (
                                    index >= 0 &&
                                    index <= league.contesters.length
                                ) {
                                    //index and is found and has a valid value
                                    const { fullname, userID, progress } =
                                    league.contesters[index];
                                    players.push({ fullname, userID, progress }); //put contesters .progress into .records for ranking table
                                } else {
                                    players.push({
                                        fullname: "????????????",
                                        userID: null,
                                        progress: null
                                    });
                                }
                            });

                            return { players, schedule: match.schedule };
                        });
                    }
                    await dispatch({
                        type: "ENTER_LEAGUE",
                        payload: data.league,
                    });
                }
            } catch (err) {
                Sorry(
                    "?????????? ?????? ???????? ???? ?????? ?????? ??????. ???????? ?????????? ?????????????? ?????? ???? ?????????? ????????."
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