import { useSelector } from "react-redux";
import MatchesTable from "./matches/MatchesTable";
import { Tab, Tabs, Card } from "react-bootstrap";
import Rankings from "../tables/rankings/Rankings";

const LeagueHome = () => {
	const league = useSelector((state) => state.league);

	return (
		<Card
			border="primary"
			bg="transparent"
			className="single-league-card">
			{Boolean(league) && (
				<Card.Body>
					<Tabs
						defaultActiveKey="draws"
						variant="pills"
						// transition={Fade}
						className="mb-3">
						<Tab eventKey="draws" title="Games">
							<hr />
							<MatchesTable ongoing={league.ongoing} />
						</Tab>
						<Tab eventKey="table" title="Table">
							<hr />
							<Rankings
								players={league.contesters}
								rankByProgress={true}
							/>
						</Tab>
						<Tab eventKey="details" title="Details">
							<hr />
						</Tab>
					</Tabs>
				</Card.Body>
			)}
		</Card>
	);
};

export default LeagueHome;
