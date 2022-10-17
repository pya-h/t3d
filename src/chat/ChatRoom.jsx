import { Card, Row, Col, Nav, Tab } from "react-bootstrap";
import { useContext } from "react";
import { Devices } from "../services/configs";
import ChatBox from "./ChatBox";
import "./chat.css";
import GlobalContext from "../globals/state/GlobalContext";
import { useSelector } from "react-redux";

const ChatRoom = () => {
	const context = useContext(GlobalContext);
	const interactions = useSelector((state) => state.interactions).sort(
		//first sort all by last recieved message => this makes chat list contacts sorted properly
		(i1, i2) =>
			new Date(i2.messages[i2.messages.length - 1].date).getTime() -
			new Date(i1.messages[i1.messages.length - 1].date).getTime()
	);

	return (
		<Card border="secondary" bg="transparent" className="chat-main-card">
			<Card.Header className="text-center">چت روم شما</Card.Header>
			<Card.Body>
				<Tab.Container>
					<Row>
						<Col
							className={
								context.device !== Devices.SmartPhone
									? "chat-room-devider chat-scrollable-friends "
									: "smartphone-chat-scrollable-friends"
							}
							lg={3}
							md={3}
							sm={12}>
							<Nav
								variant="pills"
								className="flex-column text-right">
								{interactions.map((interact) => (
										<Nav.Link className="animated-navitem"
											// key={friend.userID}
											eventKey={interact.with.userID}>
											{interact.with.name}
										</Nav.Link>
								))}
							</Nav>
						</Col>
						{/* EDIT MAIL LAYOUT <Col> LIKE THIS */}
						<Col lg={9} md={9} sm={12}>
							<Tab.Content>
								{interactions.map((interact) => (
									<ChatBox
										friend={interact.with}
										chat={interact.messages}
									/>
								))}
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</Card.Body>
		</Card>
	);
};

export default ChatRoom;
