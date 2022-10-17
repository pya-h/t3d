import MultiGamePlay from "./gameplay/MultiGamePlay";
import { useSelector } from "react-redux";
import RandomGame from "./RandomGame";
import {
  Tab,
  Tabs,
  Card,
  Button,
  Row,
  Col,
  Container,
  Alert,
} from "react-bootstrap";
import { Fragment, useState } from "react";
import Leagues from "../leagues/Leagues";
import SinglePlayer from "./SinglePlayer";

const GameDeck = () => {
  const room = useSelector((state) => state.room);
  const game = useSelector((state) => state.game);
  const [continueGame, setContinueGame] = useState(false);
  const [surrender, setSurrender] = useState(false);

  const onSurrenderClick = () => {
    setSurrender(true);
    setContinueGame(true);
  };

  //***** */ show opponent record before game start choice
  return (
    <Fragment>
      {continueGame && room.name ? (
        <MultiGamePlay surrender={surrender} />
      ) : (
        <Card border="secondary" bg="transparent" className="game-deck-card">
          <Card.Body>
            <Tabs
              transition={false}
              variant="pills"
              // transition={Fade}
              className="mb-3"
            >
              {Boolean(room.name) && (
                <Tab eventKey="currentGame" title="Current Game">
                  <Container>
                    <hr />
                    <Row className="justify-content-center">
                      <Col>
                        <Alert
                          className="text-center"
                          variant="primary"
                        >{`Game Type: ${
                          room.scoreless ? "Speed" : "Scored"
                        }`}</Alert>
                      </Col>
                      <Col>
                        <Alert
                          className="text-center"
                          variant="primary"
                        >{`Board size: ${room.type} * ${room.type} * ${room.type}`}</Alert>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col>
                        <Button
                          type="submit"
                          className="mt-4 animated-button"
                          block
                          variant="primary"
                          onClick={() => setContinueGame(true)}
                        >
                          <i
                            className="fa fa-gamepad-o px-2"
                            aria-hidden="true"
                          ></i>
                          {game ? "Continue" : "Start"}
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          type="submit"
                          className="mt-4 animated-button"
                          block
                          variant="danger"
                          onClick={onSurrenderClick}
                        >
                          <i
                            className="fa fa-gamepad-o px-2"
                            aria-hidden="true"
                          ></i>
                          {game ? "Surrender" : "Cancel"}
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </Tab>
              )}
              <Tab
                eventKey="randomGame"
                disabled={Boolean(room.name)}
                title="Random Game"
              >
                <RandomGame />
              </Tab>
              <Tab
                eventKey="leagues"
                disabled={Boolean(room.name)}
                title="Leagues"
              >
                <Leagues />
              </Tab>
              <Tab
                eventKey="singleplayer"
                disabled={Boolean(room.name)}
                title="Single Player"
              >
                <SinglePlayer />
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      )}
    </Fragment>
  );
};

export default GameDeck;
