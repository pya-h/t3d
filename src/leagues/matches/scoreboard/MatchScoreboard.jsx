import React from "react";
import { useState } from "react";
import { Badge, Button, Col, Row } from "react-bootstrap";
import "./scoreboard.css";

const MatchScoreboard = ({ children }) => {
    const [round, setRound] = useState(0);

    return children ? (
        <div>
            <div className="w-100 text-center">
                <Badge pill variant="primary" className="mt-3 p-2 px-5">
                    دور {round + 1}
                </Badge>
            </div>

            <div className="scoreboard-container">
                <div className="scoreboard">
                    {children[round].map((match, index) => (
                        <Row key={index} className="scoreboard-row mx-1">
                            <Col className="text-right">
                              <span className="scoreboard-user">{match.players[0].fullname}</span>
                                {+match.game.players[0].score >
                                    +match.game.players[1].score && (
                                    <i
                                        className="fa fa-futbol-o pulsing-item trophy-icon"
                                        aria-hidden="true"
                                    ></i>
                                )}
                            </Col>
                            <Col xs={3} className="scoreboard-score text-center">
                                {+match.game.players[0].score} - {+match.game.players[1].score}
                            </Col>
                            <Col className="text-left">
                                {/*{match.winner && <FontAwesomeIcon icon={faFutbol} />}*/}
                                {+match.game.players[0].score <
                                    +match.game.players[1].score && (
                                    <i
                                        className="fa fa-futbol-o pulsing-item trophy-icon"
                                        aria-hidden="true"
                                    ></i>
                                )}&nbsp;&nbsp;
                                <span className="scoreboard-user">{match.players[1].fullname}</span>
                            </Col>
                        </Row>
                    ))}
                </div>
                <hr />
                <Row>
                    <Col>
                        {round < children.length - 1 && (
                            <Button
                                block
                                onClick={() =>
                                    setRound((i) => (i + 1) % children.length)
                                }
                                variant="primary"
                            >
                                {/* <i className="fa fa-recycle px-3" aria-hidden="true"></i> */}
                                &lt;
                            </Button>
                        )}
                    </Col>
                    <Col>
                        {round > 0 && (
                            <Button
                                block
                                onClick={() =>
                                    setRound((i) => (i - 1) % children.length)
                                }
                                variant="warning"
                            >
                                &gt;
                            </Button>
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    ) : null;
};

export default MatchScoreboard;
