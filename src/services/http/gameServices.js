import { Routes } from "../configs";

import http from "./httpService";

const { Server } = Routes;

const gameServices = {
    getAllGames: () => http.get(`${Server.Root}/${Server.Games}`),
    getMyGames: () => http.get(`${Server.Root}/${Server.Games}/${Server.Mine}`),
};

export default gameServices;