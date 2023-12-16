// const Host = "t3d.iran.liara.run";
//const Host = "t3dweb.herokuapp.com",
// const Host = 't3d.pheelstyle.ir',
const Host = 'potent-productive-chinchilla.glitch.me',
    isHttps = true;

//server routes
module.exports = {
    Host,
    Root: `http${isHttps ? 's' : ''}://${Host}`,
    WebSocketRoot: `ws${isHttps ? 's' : ''}://${Host}/ws`,
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