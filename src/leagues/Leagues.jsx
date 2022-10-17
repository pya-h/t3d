import { Col, Row, Container } from "react-bootstrap";
import "./leagues.css";
import { useEffect, useState } from "react";
import leagueServices from "../services/http/leagueServices";
import { Status } from "../services/configs";
import { Sorry } from "../tools/notification";
import SingleLeagueCard from "./SingleLeagueCard";
import NoItems from "../commons/NoItems";
const Leagues = () => {
	const [leagues, setLeagues] = useState([]);
	const [reload, triggerReload] = useState(false); //a trigger for run reload competition and leagues when needed
	useEffect(() => {
		(async () => {
			try {
				const { data, status } = await leagueServices.listLeagues();
				if (status === Status.Successful) setLeagues([...data.leagues]);
			} catch (err) {
				if (!Status.isErrorExpected(err))
					Sorry(
						"خطا در برقراری ارتباط ... لطفا ارتباط خود را با اینترنت بررسی کنید."
					);
			}
		})();
	}, [reload]);

	return (
		<Container>
			<hr />
			{leagues.length ? (
				<Row>
					{leagues.map((league) => (
						<Col className="mb-5" lg={6} md={6} sm={12} xs={12}>
							<SingleLeagueCard
								reload={() => triggerReload(!reload)}
								league={league}
							/>
						</Col>
					))}
				</Row>
			) : (
				<NoItems>در حال حاضر لیگی برگزار نمی گردد</NoItems>
			)}
		</Container>
	);
};

export default Leagues;
