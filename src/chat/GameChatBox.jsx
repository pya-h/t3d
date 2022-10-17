import { Alert, Button, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SendMessageTo } from "../globals/redux/actions/message";
const GameChatBox = ({ friendID }) => {
	const [myMessage, setMyMessage] = useState("");
	const message = useSelector((state) => state.message);
	const dispatch = useDispatch();
	const me = useSelector((state) => state.me);

	const composeMessage = (event) => {
		if (myMessage) {
			//if message is not empty
			event.preventDefault();
			dispatch(SendMessageTo(me.fullname, friendID, myMessage));
			setMyMessage("");
		}
	};

	return (
		<Form onSubmit={(event) => composeMessage(event)}>
			<Row className="w-100 mt-3 mx-auto">
				<Alert className="w-100 text-right" variant="info">
					{message && message.recieved ? (
						message.recieved.text
					) : (
						<p className="p-1"> </p>
					)}
				</Alert>
			</Row>
			<Row className="w-100 p-0 m-0">
				<Col lg={2} md={3} className="m-0 p-0 text-center">
					<Button
						type="submit"
						className="w-100 mx-auto"
						variant="outline-info">
						<i className="fa fa-paper-plane" aria-hidden="true"></i>
					</Button>
				</Col>
				<Col lg={10} md={9} className="m-0 p-0 w-100">
					<Form.Control
						className="p-0 w-100 bg-transparent chat-room-message-box
                                    mx-auto text-right"
						value={myMessage}
						onChange={(e) => setMyMessage(e.target.value)}
						placeholder="پیام..."></Form.Control>
				</Col>
			</Row>
		</Form>
	);
};

export default GameChatBox;
