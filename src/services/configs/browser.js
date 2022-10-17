//browser storage keywords
const KeyToken = "ptk", KeyLeague = "lgk";
module.exports = {
    save: (token) => {
        // use remember me option
        sessionStorage.setItem(KeyToken, token);
    },
    enter_league: (leagueID) => {
        sessionStorage.setItem(KeyLeague, leagueID);
    },
    reset: () => {
        sessionStorage.clear();
    },
    TOKEN: () => sessionStorage.getItem(KeyToken),
    LEAGUE: () => sessionStorage.getItem(KeyLeague)
};
