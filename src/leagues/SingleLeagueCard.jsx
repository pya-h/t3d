import { Card, Alert, Badge, Row, Col, Button } from "react-bootstrap";
import { Status } from "../services/configs";
import { OK, Sorry } from "../tools/notification";
import leagueServices from "../services/http/leagueServices";
import { useState, useEffect, useContext } from "react";
import ModalContesters from "./ModalContesters";
import GlobalContext from "./../globals/state/GlobalContext";

const SingleLeagueCard = ({ league, reload }) => {
	const Summaries = [
		"At random, all players compete against each other; the loser of each game is eliminated from the cup and the winner advances to the next round. The champion of this cup is the one who defeats all opponents.",
		"Each player plays an independent game against every other player and earns points based on their results. The champion of this tournament is the player who finishes first in the standings.",
		"This tournament is a mix of a knockout cup and a main league. In the preliminary round, players compete within their assigned groups. The top two of each group advance to the second round, which is a knockout stage.",
	];
	const Colors = ["dark", "primary", "success", "warning"];
	const [showMore, toggleShow] = useState(false); //show showMore or not?
	const [ready, setReady] = useState(false); // if league is ready to play
	const context = useContext(GlobalContext);

	const join = async () => {
		try {
			const { status } = await leagueServices.joinLeague(league.leagueID);
			if (status === Status.Successful) {
				OK(`You have successfully joined the ${league.title} league.`);
				reload();
			}
		} catch (err) {
			console.log(err);
			if (err.response.status === Status.MethodNotAllowed)
				Sorry(
					"Joining this league is not allowed. This league is at full capacity."
				);
			else if (!Status.isErrorExpected(err))
				Sorry(
					"Failed to load leagues. Please check your internet connection."
				);
		}
	};

	const enter = () => {
		// ask server whether the client is really a contester or not
		// re route the client to league route
		// dispatch a redux contaning leagueID of the league is currntly openning
		context.openLeaguePage(league.leagueID);
	};

	useEffect(() => {
		if (
			league &&
			league.contesters &&
			league.contesters.length === league.capacity &&
			league.started
			// && !league.finished
		) {
			// if capacity is full,
			// check if player is in the league => if so then add an option for opening league room
			setReady(true);
		}
	}, [league]);

	return (
		<div
			className={`bg-transparent single-league-card border-${
				Colors[league.Mode]
			}`}>
			<Card.Body
				onClick={(e) => toggleShow(!showMore)}
				className="expand-opacity-animation">
				<Card.Title className="text-center">{league.title}</Card.Title>
				<hr />
				{!showMore && (
					<Card.Text className="league-description-text text-left">
						{Summaries[league.Mode]}
					</Card.Text>
				)}
				{showMore && (
					<Alert
						className="text-left w-100"
						pill="true"
						variant="info">
						<span className="text-center">
							Capacity :
							<Badge
								style={{ fontSize: "16px" }}
								className="mx-2 p-2"
								variant="primary"
								pill>
								{league.capacity}
							</Badge>
							Person
						</span>
						<hr />
						<span className="text-center">
							First Place Prize :
							<Badge
								style={{ fontSize: "16px" }}
								className="mx-2 p-2"
								variant="primary"
								pill>
								{league.prize}
							</Badge>
							Points
						</span>
						<hr />
						<span className="text-center">
							Participants :
							<Badge
								style={{ fontSize: "16px" }}
								className="mx-2 p-2"
								variant="primary"
								pill>
								{league.contesters.length}
							</Badge>
							Person
						</span>
					</Alert>
				)}
			</Card.Body>
			{showMore && (
				<Card.Footer>
					{!ready ? (
						<Row>
							<Col>
								<Button
									block
									variant="outline-success"
									onClick={join}>
									Join
								</Button>
							</Col>
							<Col>
								<ModalContesters
									contesters={league.contesters}
								/>
							</Col>
						</Row>
					) : (
						<Row>
							<Button
								block
								className="animated-button"
								variant="primary"
								onClick={enter}>
								Enter League
							</Button>
						</Row>
					)}
				</Card.Footer>
			)}
		</div>
	);
};

export default SingleLeagueCard;
