const Port = null,
    Host = 'pheelstyle.ir/t3d';

//server routes
module.exports = {
    Host,
    Root: `https://${Host}`,
    WebSocketRoot: `wss://${Host}/ws`,
    wsGamePlayRoute: "gameplay",
    wsGlobalRoute: "global",
    SignUp: "signup",
    SignIn: "signin",
    Users: "users",
    Private: "private",
    Credentials: "credentials",
    MyAvatar: "avatar",
    PasswordChange: "password",
    Friends: "friends",
    Records: "records",
    Administrators: "administrators",
    Games: "games",
    Mine: "mine",
    Leagues: "leagues",
    NewLeague: "new",
    LeaguesList: "list",
    Chats: "chats",
    Interactions: "interact",
    SingleChat: "single",
    Notices: "notices",
    NoticeManagement: "manage"
};