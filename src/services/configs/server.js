const Host = "t3d.iran.liara.run";
//const Host = "t3dweb.herokuapp.com",

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
    Attend: "attend",
    Chats: "chats",
    Interactions: "interact",
    SingleChat: "single",
    Notices: "notices",
    NoticeManagement: "manage"
};
