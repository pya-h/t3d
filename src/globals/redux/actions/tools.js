import { GameSetting } from "../../../services/configs";

export const RepeatRandomSearch = () => {
    return async(dispatch, getState) => {
        const tools = {...(getState().tools) };
        tools.randomSearchRepeats = (tools.randomSearchRepeats + 1) % GameSetting.RandomSearchRepeatLimit;
        // randomSearchRepeats === 0 => means nor search is not happening or its happening and has reached to maximum allowed retries
        await dispatch({ type: "UPDATE_TOOLS", payload: tools });
    };
};

export const CloseRandomSearch = () => {
    return async(dispatch, getState) => {
        const tools = {...(getState().tools) };
        tools.randomSearchRepeats = 0;
        await dispatch({ type: "UPDATE_TOOLS", payload: tools });
    };
};

export const SendFriendRequestTo = (targetID) => {
    return async(dispatch, getState) => {
        const tools = {...(getState().tools) };
        tools.friendRequestTarget = targetID;
        await dispatch({ type: "UPDATE_TOOLS", payload: tools });
    };
};

export const EndFriendRequest = () => {
    return async(dispatch, getState) => {
        const tools = {...(getState().tools) };
        tools.friendRequestTarget = null;
        await dispatch({ type: "UPDATE_TOOLS", payload: tools });
    };
};

export const InviteToFriendlyGame = (targetID, gameType) => {
    return async(dispatch, getState) => {
        const tools = {...(getState().tools) };
        tools.friendlyGameTarget = { targetID, type: gameType };
        await dispatch({ type: "UPDATE_TOOLS", payload: tools });
    };
};

export const EndFriendlyInvitation = () => {
    return async(dispatch, getState) => {
        const tools = {...(getState().tools) };
        tools.friendlyGameTarget = null;
        await dispatch({ type: "UPDATE_TOOLS", payload: tools });
    };
};

export const RecieveGameInvitation = (ID, name, gameType) => {
    return async(dispatch, getState) => {
        const tools = {...(getState().tools) };
        tools.gameInvitation = { ID, name, type: gameType };
        await dispatch({ type: "UPDATE_TOOLS", payload: tools });
    };
};

export const RejectGameInvitation = () => {
    return async(dispatch, getState) => {
        const tools = {...(getState().tools) };
        tools.gameInvitation = null;
        await dispatch({ type: "UPDATE_TOOLS", payload: tools });
    };
};

export const AcceptInvitation = (inviterID, gameType) => {
    return async(dispatch, getState) => {
        const tools = {...(getState().tools) };
        tools.acceptedGame = { inviterID, type: gameType };
        tools.gameInvitation = null;
        await dispatch({ type: "UPDATE_TOOLS", payload: tools });
    };
};

export const EmptyGameInvitations = () => {
    return async(dispatch, getState) => {
        const tools = {...(getState().tools) };
        tools.friendlyGameTarget = null;
        tools.acceptedGame = null;
        tools.gameInvitation = null;
        await dispatch({ type: "UPDATE_TOOLS", payload: tools });
    };
}
export const ReloadRecords = () => {
    return async(dispatch, getState) => {
        const tools = {...(getState().tools) };
        tools.recordReloadTrigger = !tools.reloadTrigger;
        await dispatch({ type: "UPDATE_TOOLS", payload: tools });
    };
};