
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import '../profile.css';

const Record = ({children,title, small}) => {
    return (
        <ListGroup.Item className="h-100 bg-transparent">
            <Row className={!small && "h-100 py-2"}>
                <Col className="text-right">
                    <Card.Text>{title}</Card.Text>
                </Col>
                <Col className={small ? "text-left" : "text-center"}>
                    <Badge
                        className="friend-badge-font-size"
                        pill
                        variant="primary">
                        {children}
                    </Badge>
                </Col>
            </Row>
        </ListGroup.Item>
    );
};

export default Record;
