import http from "./httpService";
import { Routes } from "../configs";

const {Server} = Routes;
const noticeServices = {
    createNotice: (notice) => {
        return http.post(
            `${Server.Root}/${Server.Notices}/${Server.NoticeManagement}`,
            JSON.stringify(notice)
        );
    },
    getAdvancedNotics: () => { //returns all notices with complete data esp. with ID
        return http.get(
            `${Server.Root}/${Server.Notices}/${Server.NoticeManagement}`
        );
    },
    getShortNotices: () => {
        return http.get(`${Server.Root}/${Server.Notices}`);
    },
    editNotice: (noticeID, notice) => {
        return http.put(
            `${Server.Root}/${Server.Notices}/${Server.NoticeManagement}/${noticeID}`,
            JSON.stringify(notice)
        );
    }
};

export default noticeServices;
