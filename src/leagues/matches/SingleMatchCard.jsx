import { Card, Row } from "react-bootstrap";
import "./matches.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toShortHijri } from "../../tools/format";
import { browserStorage } from "../../services/configs";
import { AttendLeagueGame } from "../../globals/redux/actions/tools";

/*const attendThisGame = async () => {
    // trig event in GlobbalSocket to create the room for game
    try {
        const { status, data } = await leagueServices.attendLeagueGame(
            browserStorage.LEAGUE()
        );
        if (status === Status.Successful) {
            const { gameID } = data;
            console.log("gameID = ", gameID);
            // redirect to gameId
        }
    } catch (err) {
        console.log(err);
        if (!Status.isErrorExpected(err))
            Sorry(
                "خطا در برقراری ارتباط ... لطفا ارتباط خود را با اینترنت بررسی کنید."
            );
    }
};*/

const SingleMatchCard = ({ playerX, playerO, schedule }) => {
    const me = useSelector((state) => state.me);
    const [onClickForThis, setOnClickForThis] = useState(false);
    const [cardColor, setCardColor] = useState(null);
    const [hijriDate, setHijriDate] = useState({date: null, time: null});

    const dispatch = useDispatch();
    // change this structure to remove using of context

    useEffect(() => {
        const now = new Date();

        if (
            me &&
            (me.userID.toString() === playerX?.userID?.toString() ||
                me.userID.toString() === playerO?.userID?.toString())
        ) {
            if (now >= new Date(schedule)) {
                // if its due is passed, make the cardf red indicating the player has lost the game
                // other wise add a onClick and color to the corresponding card
                setCardColor("primary");
                setOnClickForThis(true);
            }
        }
        const [date, time] = toShortHijri(schedule);
        setHijriDate({time, date});
    }, [schedule, playerX, playerO, me]);
    return (
        <Card
            bg={cardColor}
            onClick={!onClickForThis ? null : () => dispatch(AttendLeagueGame(browserStorage.LEAGUE()))}
            border="primary"
            className="single-match-card"
            style={{fontSize: "14px"}}
        >
            <Card.Body>
                <Row className="text-center mx-auto">
                    <span className="col-4 text-right">
                        {playerX.fullname}
                    </span>
                    <span className="col-4 text-center">
                        {hijriDate.date + " - " + hijriDate.time}
                    </span>
                    <span className="col-4 text-left">
                        {playerO.fullname}
                    </span>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default SingleMatchCard;
