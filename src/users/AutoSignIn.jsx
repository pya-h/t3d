import { useDispatch } from "react-redux";
import { browserStorage } from "../services/configs";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { LoadMyPlayer } from "../globals/redux/actions/player";
import { ResetMyPlayer } from "./../globals/redux/actions/player";

// auto-sign in if store sign in data was reset
const AutoSignIn = () => {
	const dispatch = useDispatch();
	const opponent = useSelector((state) => state.opponent); //this is just to add opponent to useEffect dependencies
	// tis way, every time player game ends ( opponent resets ), player records will update
	const storageToken = browserStorage.TOKEN();
	useEffect(() => {
		try {
			(async () => {
				if (storageToken) {
					await dispatch(LoadMyPlayer());
				} else {
					await dispatch(ResetMyPlayer());
				}
			})();
		} catch (err) {
			console.log(err);
		}
	}, [storageToken, opponent, dispatch]);

	return null;
};

export default AutoSignIn;
