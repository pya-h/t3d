import {
	Card,
	Alert,
	Badge,
	Row,
	Col,
	Button,
} from "react-bootstrap";
import { Status } from "../../services/configs";
import { OK, Sorry } from "../../tools/notification";
import gameServices from "../../services/http/gameServices";
import { useState } from "react";
const SingleLeagueCard = ({ league }) => {
	const Summaries = [
		"At random, all players compete against each other; the loser of each game is eliminated from the cup and the winner advances to the next round. The champion of this cup is the one who defeats all opponents.",
		"Each player plays an independent game against every other player and earns points based on their results. The champion of this tournament is the player who finishes first in the standings.",
		"This tournament is a mix of a knockout cup and a main league. In the preliminary round, players compete within their assigned groups. The top two of each group advance to the second round, which is a knockout stage.",
	];
	const Colors = ["dark", "primary", "success", "warning"];
	const [showMore, toggleShow] = useState(false); //show showMore or not?

	const join = async () => {
		try {
			const { status } = await gameServices.joinLeague(league.leagueID);
			if (status === Status.Successful)
				OK(`You have successfully joined the ${league.title} league.`);
		} catch (err) {
			console.log(err);
			if (err.response.status === Status.MethodNotAllowed)
				Sorry(
					"Joining this league is not allowed. This league is at full capacity."
				);
			if (!Status.isErrorExpected(err))
				Sorry(
					"Failed to load leagues. Please check your internet connection."
				);
		}
	};
	return (
		<div
			onClick={(e) => toggleShow(!showMore)}
			className={`bg-transparent single-league-card border-${
				Colors[league.mode]
			}`}>
			<Card.Body className="expand-opacity-animation">
				<Card.Title className="text-center">{league.title}</Card.Title>
				<hr />
				{!showMore && (
					<Card.Text className="league-description-text text-left">
						{Summaries[league.mode]}
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
								{league.players.length}
							</Badge>
							Person
						</span>
					</Alert>
				)}
			</Card.Body>
			{showMore && <Card.Footer>
				<Row>
					<Col>
						<Button block variant="outline-success" onClick={join}>
							Participate
						</Button>
					</Col>
					<Col>
						<Button block variant="outline-secondary">
							Present Players
						</Button>
					</Col>
				</Row>
			</Card.Footer>}
		</div>
	);
};

export default SingleLeagueCard;
{
	/* <Container>
			<Row>
				<Alert className="text-left w-100" variant="info">
					<Alert.Heading className="text-center">
						<Badge variant="success mx-2 p-2">{league.title}</Badge>
					</Alert.Heading>
					<p className="mx-5">{Summaries[league.mode]}</p>
				</Alert>
			</Row>
			<hr />
			<Row>
				<Alert className="text-left w-100" pill="true" variant="info">
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
							
							{league.players.length}
						</Badge>
						Person
					</span>
					<hr />
					<span className="text-center">
						
						Deadline : until
						<Badge
							style={{ fontSize: "16px" }}
							className="mx-2 p-2"
							variant="primary"
							pill>
							
							{toHijri(league.deadline)[0]}
						</Badge>
					</span>
				</Alert>
			</Row>
			<hr />
			<Row>
				<Col>
					<Button block variant="outline-success" onClick={join}>
						Participate
					</Button>
				</Col>
				<Col>
					<Button block variant="outline-secondary">
						Present Players
					</Button>
				</Col>
			</Row>
		</Container> */
}
