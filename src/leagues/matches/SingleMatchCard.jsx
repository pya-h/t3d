import { Card, Row } from "react-bootstrap";
import "./matches.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toTimeShort } from "../../tools/format";
import { browserStorage } from "../../services/configs";
import { AttendLeagueGame } from "../../globals/redux/actions/tools";

const SingleMatchCard = ({ playerX, playerO, schedule }) => {
    const me = useSelector((state) => state.me);
    const [onClickForThis, setOnClickForThis] = useState(false);
    const [cardColor, setCardColor] = useState(null);

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
                        {toTimeShort(schedule)}
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
