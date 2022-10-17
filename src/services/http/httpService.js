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
				"مشکلی در ارسال درخواست شما به سرور وجود داشت، لطفا دوباره تلاش کنید"
			);
		} else if (error.response.status === Status.Unauthorized) {
			// is this needed? browserStorage.reset();
			Sorry(
				"احراز هویت موفقیت آمیز نبود. لطفا وارد حساب کاربری خود شوید"
			);
			browserStorage.reset();
		} else if (error.response.status === Status.Forbidden) {
			Sorry("شماره دانشجویی یا رمز عبور نادرست است");
		} else if (error.response.status === Status.NotAcceptable) {
			//or used Locked: 423
			Sorry("این قسمت فقط مختص کاربران ادمین می باشد");
		} else if (error.response.status === Status.Conflict) {
			Attention(
				"کاربری با این شماره دانشجویی یا ایمیل قبلا ثبت نام کرده است"
			);
		} else if (error.response.status === Status.SessionExpired) {
			Sorry("نشست شما منقضی شده است، لطفا دوباره وارد حساب خود شوید.");
			browserStorage.reset();
			//redirect to sign in page !
		} else if (error.response.status === Status.UnprocessableEntity) {
			Sorry("ورودی شما با استانداردهای سایت مطابقت ندارد");
		} else if (error.response.status === Status.InternalServerError) {
			Sorry("مشکلی از سمت سرور پیش آمده است ... لطفا لحظاتی بعد دوباره تلاش کنید");
		}
		else if (!Status.isErrorExpected(error)) {
			// console.log(error);
			Sorry(
				"خطای غیرمنتظره ای رخ داده است. اگر برای چندمین بار است که این پیغلم را می بینید، لطفا مشکل خود را باه ما اطلاع دهید."
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
