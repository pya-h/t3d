import { Card, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { T3DLogic } from "./GameLogics";

const BriefScoreboard = ({ timeRemaining, players, turn }) => {
    const [timeStamp, setTimeStamp] = useState(null);
    const aThird = T3DLogic.Rules.TurnTimeOut / 3;
    useEffect(() => {
        let color = null,
            icon = null;
        if (timeRemaining) {
            if (timeRemaining >= aThird) {
                color = "text-success";
                icon = (
                    <i
                        className="fa fa-hourglass-start px-2"
                        aria-hidden="true"
                    ></i>
                );
            } else {
                color = "text-danger";
                icon = (
                    <i
                        className="fa fa-hourglass-half px-2"
                        aria-hidden="true"
                    ></i>
                );
            }
        } else {
            color = "text-dark";
            icon = (
                <i className="fa fa-hourglass-end px-2" aria-hidden="true"></i>
            );
        }
        setTimeStamp(
            <div className={color}>
                {icon}
                {timeRemaining} : {players[turn].shape}
            </div>
        );
    }, [timeRemaining, aThird, players, turn]);

    return (
        <Card.Header className="w-100 text-center">
            <Row style={{ fontSize: "20px" }}>
                <Col
                    style={{
                        textAlign: "right",
                        color: players[1].color,
                    }}
                >
                    {players[1].shape} : {players[1].score}
                </Col>
                <Col>{timeStamp}</Col>
                <Col
                    style={{
                        textAlign: "left",
                        color: players[0].color,
                    }}
                >
                    {players[0].score} : {players[0].shape}
                </Col>
            </Row>
        </Card.Header>
    );
};

export default BriefScoreboard;
