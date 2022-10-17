import http from "./httpService";
import { Routes } from "../configs";

const { Server } = Routes;

const userServices = {
	signUp: (user) =>
		http.post(
			`${Server.Root}/${Server.Users}/${Server.SignUp}`,
			JSON.stringify(user)
		),
	signIn: (user) =>
		http.post(
			`${Server.Root}/${Server.Users}/${Server.SignIn}`,
			JSON.stringify(user)
		),
	getPlayer: (userID) =>
		http.get(`${Server.Root}/${Server.Users}/${Server.Records}/${userID}`),
	getAvatar: (userID) =>
		http.get(
			`${Server.Root}/${Server.Users}/${Server.MyAvatar}/${userID}`
		),
	getAllPlayers: () =>
		http.get(`${Server.Root}/${Server.Users}/${Server.Records}`),
	getMe: () => http.get(`${Server.Root}/${Server.Users}/${Server.Private}`),
	getMyCredentials: () =>
		http.get(
			`${Server.Root}/${Server.Users}/${Server.Private}/${Server.Credentials}`
		),
	editMyCredentials: (newMe) =>
		http.put(
			`${Server.Root}/${Server.Users}/${Server.Private}/${Server.Credentials}`,
			JSON.stringify(newMe)
		),
	changeMyPassword: (passwords) =>
		http.put(
			`${Server.Root}/${Server.Users}/${Server.Private}/${Server.Credentials}/${Server.PasswordChange}`,
			JSON.stringify(passwords)
		),
	uploadAvatar: (password, avatar) => {
		let formData = new FormData();
		formData.append("avatar", avatar);
		return http.post(
			`${Server.Root}/${Server.Users}/${Server.Private}/${Server.MyAvatar}`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);
	},
	getMyFriends: () =>
		http.get(
			`${Server.Root}/${Server.Users}/${Server.Private}/${Server.Credentials}/${Server.Friends}`
		),
	isMyFriend: (targetID) =>
		http.get(
			`${Server.Root}/${Server.Users}/${Server.Private}/${Server.Credentials}/${Server.Friends}/${targetID}`
		)
};

export default userServices;
