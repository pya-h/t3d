import { Routes } from '../configs';

import http from "./httpService";

const {Server} = Routes;

const chatServices = {
    
    getOurChat: (friendID) => {
        return http.get(`${Server.Root}/${Server.Chats}/${Server.SingleChat}/${friendID}`);
    },
    getMyInteractions: () => {
        return http.get(`${Server.Root}/${Server.Chats}/${Server.Interactions}`);
    }
};

export default chatServices;