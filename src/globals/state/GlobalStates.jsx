import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import GlobalContext from "./GlobalContext";
import { withRouter } from "react-router";
import { browserStorage, Routes } from "../../services/configs";
import { useDispatch } from "react-redux";
import { ResetMyPlayer } from "./../redux/actions/player";
import { CloseOngoingGame, EnterRoom } from "./../redux/actions/game";
import { Sorry } from "./../../tools/notification";
import { EnterLeague } from './../redux/actions/league';
const GlobalStates = ({ children, history }) => {
	const isDesktop = useMediaQuery({ query: "(min-width: 1200px)" });
	const isSmartPhone = useMediaQuery({ query: "(max-width: 850px)" });
	const isTablet = !isDesktop && !isSmartPhone;
	const [device, setDevice] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
		// find device mode
		// array is sorted according to Configs.Devices
		setDevice(
			[isDesktop, isTablet, isSmartPhone].findIndex((mode) => mode)
		); //return the index of the one that is true -> wich is the curret device mode
	}, [isDesktop, isTablet, isSmartPhone]);

	const signOut = () => {
		try {
			browserStorage.reset(); //sign out
			history.push(Routes.Client.SignUp);
			dispatch(ResetMyPlayer());
			// edit .replace; use a function that doesnt recent BACK key on browser
		} catch (err) {
			console.log(err);
		}
	};

	const redirectToGamePlay = (room) => {
		dispatch(EnterRoom(room));
		history.push(Routes.Client.GameDeck);
	};

	const cancelGame = () => {
		dispatch(CloseOngoingGame());
		history.push(Routes.Client.Root);
		Sorry("بازی از سوی یکی از بازیکنان لغو شد.");
		setTimeout(() => {
			history.push(Routes.Client.GameDeck);
		}, 500);
	};

	const openLeaguePage = (leagueID) => {
		browserStorage.enter_league(leagueID);
		dispatch(EnterLeague(leagueID));
		history.push(Routes.Client.League);

	}
	const goTo = (destination) => {
		history.push(destination);
	};

	return (
		<GlobalContext.Provider
			value={{ device, signOut, redirectToGamePlay, goTo, cancelGame, openLeaguePage }}>
			{children}
		</GlobalContext.Provider>
	);
};

export default withRouter(GlobalStates);
