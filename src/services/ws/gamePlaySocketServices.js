import {browserStorage, Routes} from '../configs';

export const createSocketRequest = (request, rname, msg) =>
    JSON.stringify({
        request,
        rname,
        token: browserStorage.TOKEN(),
        msg,
    });

export const connect = (room) => {
    return new Promise((resolve, reject) => {
        var server = new WebSocket(`${Routes.Server.WebSocketRoot}/${Routes.Server.wsGamePlayRoute}`);
        server.onopen = () => {
            server.send(createSocketRequest("join", room.name, {gameType: room.type, scoreless: room.scoreless})); //temp
            resolve(server);
        };

        server.onerror = (error) => {
            // console.log(`WebSocket error: ${error}`);
            server.close();
            reject(error);
        };

        server.onclose = () => {
            
            resolve(null);
            // this part needs editing ? maybe not
        };
    });
};
