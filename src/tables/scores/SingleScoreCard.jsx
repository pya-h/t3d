import { Button, Card, Container, Row } from "react-bootstrap";
import "./scores.css";
import { useEffect, useState, useContext } from "react";
import { toHijri } from "../../tools/format";
import GlobalContext from "./../../globals/state/GlobalContext";
import { Devices } from "../../services/configs";

const SingleScoreCard = ({
	Type,
	date,
	playerXName,
	playerOName,
	xScore,
	oScore,
}) => {
	// format score text:
	const [xBadge, setXBadge] = useState(null);
	const [oBadge, setOBadge] = useState(null);
	const [hijriDate, setHijriDate] = useState(null);
	const context = useContext(GlobalContext);

	useEffect(() => {
		setHijriDate(toHijri(date)[0]); //toHijri = [date, time]
		if (xScore > oScore) {
			// x won
			setXBadge("badge-success");
			setOBadge("badge-danger");
		} else if (xScore === oScore) {
			//draw
			setXBadge("badge-warning");
			setOBadge("badge-warning");
		} else {
			// o won
			setOBadge("badge-success");
			setXBadge("badge-danger");
		}
	}, [date, xScore, oScore]);
	// make this card 'bg-transparent' too?
	return (
		<Card border="dark" className="single-score-card">
			{/* <Card.Header className="text-center border-dark">{`T3D ${Type}x${Type}x${Type}`}</Card.Header> */}
			<Card.Body>
				<Row className="text-center mx-auto">
					{context.device !== Devices.SmartPhone ? (
						<>
							<span className="col-lg-5 col-md-5">
								{playerXName}
							</span>
							<span
								className={`badge badge-pill ${xBadge} single-score-badge col-lg-1 col-md-1`}>
								{xScore}
							</span>

							<span
								className={`badge badge-pill ${oBadge} single-score-badge col-lg-1 col-md-1`}>
								{oScore}
							</span>
							<span className="col-lg-5 col-md-5">
								{playerOName}
							</span>
						</>
					) : (
						<Container>
							<Row>
								<span className="col-10 text-right">{playerXName}</span>
								<span
									className={`badge badge-pill ${xBadge} single-score-badge col-2`}>
									{xScore}
								</span>
							</Row>
                            <hr />
							<Row>
								<span className="col-10 text-right">
									{playerOName}
								</span>
								<span
									className={`badge badge-pill ${oBadge} single-score-badge col-2`}>
									{oScore}
								</span>
							</Row>
						</Container>
					)}
				</Row>
			</Card.Body>
			<Card.Footer className="p-0">
				<Button
					variant="outline-dark"
					block
					disabled
					size="lg"
					className="replay-game-button">
					{hijriDate}
					<i className="fa fa-pie-chart px-3" aria-hidden="true"></i>
				</Button>
			</Card.Footer>
		</Card>
	);
};

export default SingleScoreCard;
