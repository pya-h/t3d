import { Card } from "react-bootstrap";
import SingleRankCard from "./SingleRankCard";

const Rankings = ({ players, rankByProgress }) => {
	return (
		<Card border="dark" style={{ width: "100%", borderRadius: "5px", lineHeight: "5rem" }}>
			<Card.Header className="text-center">رده بندی</Card.Header>
			<table style={{lineHeight: "5rem"}} className="table table-striped table-bordered table-hover text-center">
				<thead className="bg-info">
					<tr>
						<th scope="col">#</th>
						<th scope="col">نام بازیکن</th>
						<th scope="col">امتیاز</th>
						<th scope="col">تعداد برد</th>
						<th scope="col">تعداد باخت</th>
						<th scope="col">تعداد تساوی</th>
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
