import { createContext } from "react";

const GlobalContext = createContext({
    device: 0,
    signOut: () => {},
    goTo: () => {},
    redirectToGamePlay: () => {},
    cancelGame: () => {},
    openLeaguePage: () => {}
});

export default GlobalContext;