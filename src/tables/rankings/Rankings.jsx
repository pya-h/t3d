import { Card } from "react-bootstrap";
import SingleRankCard from "./SingleRankCard";

const Rankings = ({ players, rankByProgress }) => {
	return (
		<Card border="dark" style={{ width: "100%", borderRadius: "5px", lineHeight: "3rem" }}>
			<Card.Header className="text-center">Rankings</Card.Header>
			<table style={{lineHeight: "2rem"}} className="table table-striped table-bordered table-hover text-center">
				<thead className="bg-info">
					<tr>
						<th scope="col">#</th>
						<th scope="col">Name</th>
						<th scope="col">Points</th>
						<th scope="col">Wins</th>
						<th scope="col">Losses</th>
						<th scope="col">Draws</th>
					</tr>
				</thead>
				<tbody>
					{players.map((player) => (
						<SingleRankCard
							key={player.userID}
							rowNumber={
								players.findIndex(
									(p) => p.userID === player.userID
								) + 1
							}
							playerID={player.userID}
							name={player.fullname}
							records={rankByProgress ? player.progress : player.records} />
					))}
				</tbody>
			</table>
		</Card>
	);
};

export default Rankings;
