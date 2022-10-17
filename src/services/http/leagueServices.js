import { Routes } from "../configs";

import http from "./httpService";

const { Server } = Routes;

const leagueServices = {
    loadLeague: (leagueID) =>
        http.get(
            `${Server.Root}/${Server.Leagues}/${Server.LeaguesList}/${leagueID}`
        ),
    listLeagues: () =>
        http.get(`${Server.Root}/${Server.Leagues}`),
    joinLeague: (leagueID, teamID = null) =>
        http.post(
            `${Server.Root}/${Server.Leagues}/${Server.LeaguesList}/${leagueID}`,
            JSON.stringify({ teamID })
        ),
    attendLeagueGame: (leagueID) =>
        http.get(
            `${Server.Root}/${Server.Leagues}/${Server.Attend}/${leagueID}`
        ),
    createLeague: (
            password,
            Mode,
            scoreless,
            dimension,
            title,
            capacity,
            prize
        ) =>
        http.post(
            `${Server.Root}/${Server.Leagues}/${Server.NewLeague}`,
            JSON.stringify({
                password,
                title,
                Mode,
                dimension,
                scoreless,
                capacity,
                prize,
            })
        ),
};

export default leagueServices;