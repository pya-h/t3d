import { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import { MessagePushed } from "../globals/redux/actions";
import { browserStorage, Routes } from "../services/configs";
import { Attention, Invitation, NewMsg } from "./notification";
import jwtdecode from "jwt-decode";
import { AcceptInvitation } from "../globals/redux/actions/tools";
import { RejectGameInvitation } from "./../globals/redux/actions/tools";
import GlobalContext from "../globals/state/GlobalContext";

const NotificationCenter = ({ location }) => {
	const message = useSelector((state) => state.message);
	const { pathname } = location;
	const tools = useSelector((state) => state.tools);
	const dispatch = useDispatch();
	const context = useContext(GlobalContext);
	// check TOKEN EXPIRE time and notify user before he starts a game to re login
	const { gameInvitation } = tools;
	const { goTo } = context;
	useEffect(() => {
		try {
			if (message && message.recieved && !message.recieved.pushed) {
				if (pathname !== Routes.Client.ChatRoom) {
					if (pathname !== Routes.Client.GameDeck) {
						// then just only push when message sender is the opponent
						//return;
					}

					NewMsg(message.recieved, () =>
						goTo(Routes.Client.ChatRoom)
					);
					//prevent recieved message from getting stuck in notificatioon loop
					dispatch(MessagePushed());
				}
			}

			if (gameInvitation) {
				Invitation(
					gameInvitation,
					() => {
						dispatch(AcceptInvitation(gameInvitation.ID, gameInvitation.type));
					},
					() => {
						dispatch(RejectGameInvitation());
					}
				);
			}
			const decoded_token = jwtdecode(browserStorage.TOKEN());

			const toMin = (mili) => mili / 1000 / 60;
			if (decoded_token) {
				const { exp, iat } = decoded_token;
				const expirationLength = (exp - iat) / 60;
				const criticalNow = toMin(Date.now()) + expirationLength / 4;
				// ex: expiration is at 60 min
				// after converting all values to minutes
				// critical point is about 15 minutes to expiration
				// so if toMin(now) + 15min passes expiration date -> inform user to take action
				if (criticalNow >= exp / 60) {
					Attention(
						"نشست شما در شرف انقضاست ... برای پیش گیری از بروز مشکل لطفا دوباره وارد حساب خود شوید"
					);
					// ...some action
					// implement onClick for this toast
					// like rerouting to sing in model and etc
				}
			}
		} catch (err) {
			console.log(err);
		}
	}, [message, pathname, gameInvitation, goTo, dispatch]);

	return null;
};

export default withRouter(NotificationCenter);
