import { Card, Row } from "react-bootstrap";
import "./matches.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { toTimeShort } from "../../tools/format";
import leagueServices from "../../services/http/leagueServices";
import { browserStorage, Status } from "../../services/configs";
import { Sorry } from "../../tools/notification";

const attendThisGame = async () => {
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
};

const SingleMatchCard = ({ Type, date, playerX, playerO, schedule }) => {
    const me = useSelector((state) => state.me);
    const [onClickForThis, setOnClickForThis] = useState(false);
    const [cardColor, setCardColor] = useState(null);

    // change this structure to remove using of context

    useEffect(() => {
        const now = new Date();

        if (
            me &&
            (me.userID.toString() === playerX.userID.toString() ||
                me.userID.toString() === playerO.userID.toString())
        ) {
            if (now >= new Date(schedule)) {
                // if its due is passed, make the cardf red indicating the player has lost the game
                // other wise add a onClick and color to the corresponding card
                setCardColor("success");
                setOnClickForThis(true);
            }
        }
    }, [schedule, playerX, playerO, me]);
    return (
        <Card
            bg={cardColor}
            onClick={onClickForThis ? attendThisGame : null}
            border="primary"
            className="single-match-card"
        >
            <Card.Body>
                <Row className="text-center mx-auto">
                    <span className="col-lg-5 col-md-6 text-right">
                        {playerX.fullname}
                    </span>
                    <span className="col-lg-2 col-md-2 text-center">
                        {toTimeShort(schedule)}
                    </span>
                    <span className="col-lg-5 col-md-6 text-left">
                        {playerO.fullname}
                    </span>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default SingleMatchCard;
