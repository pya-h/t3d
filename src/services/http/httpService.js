import axios from "axios";
import { Status, browserStorage } from "../configs";
import { Attention, Sorry } from "../../tools/notification";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";

// put token in all request headers:
axios.interceptors.request.use(
	(config) => {
		const token = browserStorage.TOKEN();
		if (token) config.headers.Authorization = `Bearer ${token}`;
		else config.headers.Authorization = null;
		return config;
	},
	(error) => {
		// what to do?
		return Promise.reject(error);
	}
);
// what the f should i do?
// (() => {
//     const token = sessionStorage.getItem("token");
//     if (token)
//         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     else {
//         delete axios.defaults.headers.common["Authorization"];
//         /*if setting null does not remove `Authorization` header then try
//               delete axios.defaults.headers.common['Authorization'];
//             */
//     }
//     console.log("token", token);
// })();

axios.interceptors.response.use(null, (error) => {
	try {
		//*****notice: */
		//remove some oftheese errors... because they need to be costomized in every use in each components
		// change to switch
		
		if (error.response.status === Status.BadRequest) {
			Sorry(
				"There was a problem sending your request to the server. Please try again."
			);
		} else if (error.response.status === Status.Unauthorized) {
			// is this needed? browserStorage.reset();
			Sorry(
				"Authentication failed. Please sign in to your account."
			);
			browserStorage.reset();
		} else if (error.response.status === Status.Forbidden) {
			Sorry("Incorrect student number or password.");
		} else if (error.response.status === Status.NotAcceptable) {
			//or used Locked: 423
			Sorry("This section is for admin users only.");
		} else if (error.response.status === Status.Conflict) {
			Attention(
				"A user with this student number or email already exists."
			);
		} else if (error.response.status === Status.SessionExpired) {
			Sorry("Your session has expired. Please sign in again.");
			browserStorage.reset();
			//redirect to sign in page !
		} else if (error.response.status === Status.UnprocessableEntity) {
			Sorry("Your input does not meet the required format.");
		} else if (error.response.status === Status.InternalServerError) {
			Sorry("A server error occurred. Please try again shortly.");
		}
		else if (!Status.isErrorExpected(error)) {
			// console.log(error);
			Sorry(
				"An unexpected error occurred. If you keep seeing this message, please report the issue to us."
			);
		}
	} catch (err) {
        console.log(error);
    }
	return Promise.reject(error);
});

const http = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
};

export default http;
