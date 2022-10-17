import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useSelector } from 'react-redux';

const OnlineStatistics = () => {
    const {players, games} = useSelector((state) => state.statistics);
    return (
        <ListGroup className="list-group list-group-flush">
            <ListGroup.Item className="bg-transparent">
                <Row>
                    <Col xs={8}>
                        <Card.Text className="w-100 text-right">
                            <i
                                className="fa fa-wifi px-2"
                                aria-hidden="true"></i>
                            کاربران آنلاین
                        </Card.Text>
                    </Col>
                    <Col>
                        <Badge className="player-badge-font-size" variant="info" pill>
                            {players}
                        </Badge>
                    </Col>
                </Row>
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent">
                <Row>
                    <Col xs={8}>
                        <Card.Text className="w-100 text-right">
                            <i
                                className="fa fa-gamepad px-2"
                                aria-hidden="true"></i>
                            بازی های درجریان
                        </Card.Text>
                    </Col>
                    <Col>
                        <Badge className="player-badge-font-size" variant="info" pill>
                            {games}
                        </Badge>

                    </Col>
                </Row>
            </ListGroup.Item>
        </ListGroup>
    );
};

export default OnlineStatistics;
