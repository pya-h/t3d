import { Button, Card, Container, Form, Row, Tab, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import "./chat.css";
import { SendMessageTo } from "../globals/redux/actions/message";
import Message from "./Message";

const ChatBox = ({ friend, chat }) => {
	const [myMessage, setMyMessage] = useState("");
	const message = useSelector((state) => state.message);
	const dispatch = useDispatch();
	const me = useSelector((state) => state.me);
	const mostRecentMessageRef = useRef(null);

	const composeMessage = (event) => {
		event.preventDefault();
		// init state vears ro get chat
		if (myMessage) {
			dispatch(SendMessageTo(me.fullname, friend.userID, myMessage));
			setMyMessage("");
		}
	};

	//how to scroll to last recent message in the start?
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		if (mostRecentMessageRef && mostRecentMessageRef.current)
	// 			mostRecentMessageRef.current.scrollIntoView({
	// 				behavior: "smooth",
	// 				top: mostRecentMessageRef.current.offsetTop,
	// 			});
	// 	}, 1000);
	// }, [])
	useEffect(() => {
		setTimeout(() => {
			if (mostRecentMessageRef && mostRecentMessageRef.current)
				mostRecentMessageRef.current.scrollIntoView({
					behavior: "smooth",
					top: mostRecentMessageRef.current.offsetTop,
				});
		}, 100);
	}, [message]);

	return (
		<Tab.Pane eventKey={friend.userID}>
			<Container>
				<Row>
					<Card
						border="dark"
						bg="transparent"
						className="chat-main-card chat-box-scrollable">
						<Card.Body>
							{chat &&
								chat instanceof Array &&
								chat.map((msg, index) => (
									<div ref={mostRecentMessageRef}>
										<Message
											// key={msg.key}
											msg={msg}
											previousDay={
												index !== 0
													? new Date(
															chat[index - 1].date
													  ).getDate()
													: 0
											}
										/>
									</div>
								))}
						</Card.Body>
					</Card>
				</Row>
				<Row>
					<Form
						onSubmit={(event) => composeMessage(event)}
						className="w-100 mt-3">
						<Row className="w-100 p-0 m-0">
							<Col xs={1} className="m-0 p-0 text-center">
								<Button
									type="submit"
									className="w-100 mx-auto"
									variant="outline-info">
									<i
										className="fa fa-paper-plane"
										aria-hidden="true"></i>
								</Button>
							</Col>
							<Col xs={11} className="m-0 p-0 w-100">
								<Form.Control
									className="py-0 px-3 bg-transparent chat-room-message-box animated-textbox text-right"
									value={myMessage}
									onChange={(e) =>
										setMyMessage(e.target.value)
									}
									placeholder="پیام..."></Form.Control>
							</Col>
						</Row>
					</Form>
				</Row>
			</Container>
		</Tab.Pane>
	);
};

export default ChatBox;
