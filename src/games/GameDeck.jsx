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
                <Tab eventKey="currentGame" title="بازی کنونی">
                  <Container>
                    <hr />
                    <Row className="justify-content-center">
                      <Col>
                        <Alert
                          className="text-center"
                          variant="primary"
                        >{`نوع بازی: ${
                          room.scoreless ? "سرعتی" : "امتیازی"
                        }`}</Alert>
                      </Col>
                      <Col>
                        <Alert
                          className="text-center"
                          variant="primary"
                        >{`ابعاد بازی: ${room.type} * ${room.type} * ${room.type}`}</Alert>
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
                          {game ? "ادامه" : "شروع"}
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
                          {game ? "تسلیم" : "لغو"}
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </Tab>
              )}
              <Tab
                eventKey="randomGame"
                disabled={Boolean(room.name)}
                title="بازی تصادفی"
              >
                <RandomGame />
              </Tab>
              <Tab
                eventKey="leagues"
                disabled={Boolean(room.name)}
                title="لیگ ها"
              >
                <Leagues />
              </Tab>
              <Tab
                eventKey="singleplayer"
                disabled={Boolean(room.name)}
                title="تک نفره"
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
