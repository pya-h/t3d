//local routes
const Port = 8080,
    isHttps = true;

module.exports = {
    Port,
    Root: `http${isHttps ? 's' : ''}://localhost:${Port}`,
    WebSocketRoot: `ws${isHttps ? 's' : ''}://localhost:${Port}/ws`,
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
    Notices: "notices",
    NoticeManagement: "manage"
};