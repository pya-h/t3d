//client routes
// Partial Routes
const Profile = "/profile",
    Admin = "/admin",
    ChatRoom = "chatroom",
    MyGamesAndFriends = "games",
    Notices = "notices",
    StManagement = "students",
    Documents = "documents",
    Leagues = "leagues";

module.exports = {
    Root: "/",
    SignUp: "/register",
    SignIn: "/login",
    GameDeck: "/gamedeck",
    SingleGameplay: "/single",
    Rankings: "/rankings",
    GameGuide: "/guide",
    ContactUs: "/contactme",
    League: "/league",
    Profile,
    Admin,
    ChatRoom: `${Profile}/${ChatRoom}`,
    MyGamesAndFriends: `${Profile}/${MyGamesAndFriends}`,
    Notices: `${Admin}/${Notices}`,
    StudentManagement: `${Admin}/${StManagement}`,
    Documents: `${Admin}/${Documents}`,
    LeaguesManager: `${Admin}/${Leagues}`
};