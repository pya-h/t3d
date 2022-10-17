import { Fragment, useState, useEffect } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import "./chat.css";
import { toHijri } from "../tools/format";
const Message = ({ msg, previousDay }) => {
	const { date } = msg; // destructure date from msg then make a new date object
	// reason for making new Date objects is that react throws error some time when you use it without new Date :|
	const [showDate, setShowDate] = useState(false); //for each day, the first message in that day has persian date above it
	const [time, setTime] = useState(null);
	const [hijriDate, setHijriDate] = useState(null);

	useEffect(() => {
		const [hDate, hTime] = toHijri(date);
		setTime(hTime);
		setHijriDate(hDate);
		setShowDate(
			new Date(date).getDate() !== previousDay || previousDay === 0
		); //     0 means this is the first message in the chat
	}, [date, previousDay]);

	return (
		<Fragment>
			{!showDate ? null : (
				<Fragment>
					<hr />
					<p className="message-date">{hijriDate}</p>
				</Fragment>
			)}
			<Row>
				<Col md={6} sm={msg.me ? 8 : 4} xs={msg.me ? 9 : 3}>
					{msg.me && (
						<Alert className="text-right" variant="dark">
							<Row>
								<Col lg={9} xs={12}>
									{msg.me}
								</Col>
								<Col className="message-time" lg={3} xs={12}>
									{time}
								</Col>
							</Row>
						</Alert>
					)}
				</Col>
				<Col md={6} sm={msg.friend ? 8 : 4} xs={msg.friend ? 9 : 3}>
					{msg.friend && (
						<Alert className="text-right" variant="primary">
							<Row>
								<Col lg={9} xs={12}>
									{msg.friend}
								</Col>
								<Col className="message-time" lg={3} xs={12}>
									{time}
								</Col>
							</Row>
						</Alert>
					)}
				</Col>
			</Row>
		</Fragment>
	);
};

export default Message;
