import { Fragment } from "react";
import NoItems from "../../commons/NoItems";
import SingleScoreCard from "./SingleScoreCard";

const ScoresTable = ({ scores }) => {
	return (
		<Fragment>
			{scores.length ? (
				scores.map((score) => (
					<SingleScoreCard
						key={score.gameID}
						Type={score.Type}
						date={score.date}
						playerXName={score.players[0].name}
						playerOName={score.players[1].name}
						xScore={score.players[0].score}
						oScore={score.players[1].score}></SingleScoreCard>
				))
			) : (
				<NoItems>هیچ بازی ای انجام نگرفته است</NoItems>
			)}
		</Fragment>
	);
};

export default ScoresTable;
