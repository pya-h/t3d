import { Row, Col } from "react-bootstrap";
import LeagueHome from "./../leagues/LeagueHome";
import { EnterLeague, ExitLeague } from "./../globals/redux/actions/league";
import { browserStorage } from "../services/configs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LoadingBar from "../commons/LoadingBar";
import AutoSignIn from "../users/AutoSignIn";
const LeagueLayout = () => {
	// right side => player record inside the league
	// left sidebar => my upcomming games
	// middle section => all games in this round
	// not started games will have empty score badges
	// started games score will be written, but the whole score card will be with minimum height, no game info button is needed
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// this form of dispatching is used to support preloaders
		(async () => {
			try {
				setLoading(true);
				await dispatch(EnterLeague(browserStorage.LEAGUE()));
				// profile unmounted
			} catch (err) {
				setLoading(false);
			}
			setLoading(false);
		})();

		return () => {
			// remove chat list from redux to save memory
			dispatch(ExitLeague());
		};
	}, [dispatch]);

	return (
		<Row>
            <AutoSignIn />
			<LoadingBar loading={loading} />
			<Col xs={12} sm={12} md={4} lg={3}></Col>
			<Col>
				<LeagueHome />
			</Col>
			<Col xs={0} sm={0} md={0} lg={3}></Col>
		</Row>
	);
};

export default LeagueLayout;
