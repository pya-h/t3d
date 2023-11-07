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
			className="single-league-card mx-0 px-0">
			{Boolean(league) && (
				<Card.Body>
					<Tabs
						defaultActiveKey="draws"
						variant="pills"
						// transition={Fade}
						className="mb-3">
						<Tab eventKey="draws" title="بازی ها">
							<hr />
							<MatchesTable ongoing={league.ongoing} />
						</Tab>
						{league.mode && <Tab eventKey="table" title="جدول">
							<hr />
							<Rankings
								players={league.contesters}
								rankByProgress={true}
							/>
						</Tab>}
						<Tab eventKey="details" title="جزییات">
							<hr />
						</Tab>
					</Tabs>
				</Card.Body>
			)}
		</Card>
	);
};

export default LeagueHome;
