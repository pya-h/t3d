import { Row, Col, Container } from "react-bootstrap";
import LeagueHome from "./../leagues/LeagueHome";
import { EnterLeague, ExitLeague } from "./../globals/redux/actions/league";
import { browserStorage } from "../services/configs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBar from "../commons/LoadingBar";
import AutoSignIn from "../users/AutoSignIn";
import MatchScoreboard from "../leagues/matches/scoreboard/MatchScoreboard";

const LeagueLayout = () => {
    // right side => player record inside the league
    // left sidebar => my upcomming games
    // middle section => all games in this round
    // not started games will have empty score badges
    // started games score will be written, but the whole score card will be with minimum height, no game info button is needed
	const league = useSelector((state) => state.league);
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
        <Container>
            <Row>
                <AutoSignIn />
                <LoadingBar loading={loading} />
                <Col xs={12} sm={12} md={12} lg={7}>
                    <LeagueHome>{league}</LeagueHome>
                </Col>
                <Col>{!loading && <MatchScoreboard>{league?.matches}</MatchScoreboard>}</Col>
            </Row>
        </Container>
    );
};

export default LeagueLayout;
