import { Card } from "react-bootstrap";
import {  Fragment } from "react";
import SingleMatchCard from "./SingleMatchCard";

import "./matches.css";
const MatchesTable = ({ongoing}) => {
	return (
		<Fragment>
			{Boolean(ongoing.length) ? (
				ongoing.map((match) => (
					<SingleMatchCard
						// key={match.gameID}
						schedule={match.schedule}
						playerX={match.players[0]}
						playerO={match.players[1]} />
				))
			) : (
				<Card className="bg-transparent mx-auto mt-3" border="danger">
					<Card.Body className="text-center">
						<Card.Text>هیچ قرعه ای انجام نگرفته است</Card.Text>
					</Card.Body>
				</Card>
			)}
		</Fragment>
	);
};

export default MatchesTable;
