const Port = null,
    Host = 'pheelstyle.ir/t3d';

//const Host = "t3dweb.herokuapp.com",

//server routes
module.exports = {
    Host,
    Root: `https://${Host}` + (Port ? `:${Port}` : ''),
    WebSocketRoot: `wss://${Host}` + (Port ? `:${Port}/ws` : '/ws'),
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
