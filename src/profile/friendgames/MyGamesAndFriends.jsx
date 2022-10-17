import { useState, useEffect } from "react";
import LoadingBar from "../../commons/LoadingBar";
import Configs, { Status } from "../../services/configs";
import gameServices from "../../services/http/gameServices";
import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import ScoresTable from "../../tables/scores/ScoresTable";
import "../profile.css";
import FriendRecords from "./FriendRecords";
import { useSelector } from "react-redux";
import { Sorry } from "../../tools/notification";

const MyGamesAndFriends = () => {
	const me = useSelector((state) => state.me);
	const [loading, setLoading] = useState(false);
	const [myGames, setMyGames] = useState([]);
	const [filterID, setFilterID] = useState("me");
	const [selectedFriendIndex, setSelectedFriendIndex] = useState(-1);
	const [friends, setFriends] = useState([]);
	const [friendsCount, setFriendsCount] = useState(0);
	const interactions = useSelector((state) => state.interactions); //.map((interact) => interact.with)

	useEffect(() => {
		if (friendsCount !== interactions.length) {
			//thsi if checks whether change made in interaction is friend/unfriend operation or not
			//otherwise, every new message sent or recieved cause a new .map calling!

			// const temp = interactions;
			// const sorted = temp.sort((f1, f2) => f2.name - f1.name);
			setFriends(interactions.map((interact) => interact.with));
			setFriendsCount(interactions.length);
		}
	}, [interactions, friendsCount]);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true); // use preloader here?
				let serverResponse = await gameServices.getMyGames();
				if (serverResponse.status === Configs.Status.Successful)
					setMyGames([...serverResponse.data.myGames.reverse()]);
			} catch (err) {
				console.log(err);
				if (!Status.isErrorExpected(err))
					Sorry(
						"مشکلی حین بارگذاری لیست بازی ها پیش آمد. ارتباط اینترنتی خود را بررسی کنید."
					);
				setLoading(false);
			}
			setLoading(false);
		})();
	}, []);

	useEffect(() => {
		setSelectedFriendIndex(
			filterID !== "me"
				? friends.findIndex((friend) => friend.userID === filterID)
				: -1
		);
		// if filterID === "me" || frined id wia .findIndex not found ---> returns -1
	}, [filterID, friends]);

	const unfriend = (friend) => {
		//... show a modal or sth to ask if user's sure
		// send proper http request to clear both from each others friend list
	};
	return (
		<Card border="secondary" bg="transparent" className="big-single-card">
			<Card.Header className="text-center">
				لیست دوستان و آمار بازی ها
			</Card.Header>
			<LoadingBar loading={loading} />
			<Card.Body>
				<LoadingBar loading={loading} />
				<Tab.Container
					defaultActiveKey={filterID}
					onSelect={(key) => setFilterID(key)}>
					<Row>
						<Col
							lg={3}
							md={4}
							sm={12}
							className="friend-list-name-length tabs-list-friends-in-games-scrollable">
							<Nav
								variant="pills"
								className="flex-column text-right">
								<Nav.Link
									className="animated-navitem"
									eventKey="me">
									همه بازی ها
								</Nav.Link>

								{friends.map((friend) => (
									<Nav.Link
										className="animated-navitem"
										eventKey={friend.userID}>
										<Row className="m-0 w-100">
											<Col>{friend.name}</Col>
											<Col xs={1}>
												<i
													onClick={() =>
														unfriend(friend)
													}
													className="icon-unfriend fa fa-times pl-2"
													area-hidden="true"></i>
											</Col>
										</Row>
									</Nav.Link>
								))}
							</Nav>
						</Col>
						{/* EDIT MAIL LAYOUT <Col> LIKE THIS */}
						<Col lg={9} md={8} sm={12}>
							<Tab.Content>
								<Tab.Pane eventKey="me">
									{me && (
										<FriendRecords
											person={me}
											thisIsMe={true}
										/>
									)}
									<ScoresTable scores={myGames} />
								</Tab.Pane>
								{friends.map((friend) => (
									<Tab.Pane eventKey={friend.userID}>
										<FriendRecords
											person={
												selectedFriendIndex !== -1
													? friends[
															selectedFriendIndex
													  ]
													: me
											}
											thisIsMe={
												me.userID ===
												selectedFriendIndex
											}
										/>
										<ScoresTable
											scores={myGames.filter(
												(game) =>
													friend.userID ===
														game.players[0].id ||
													friend.userID ===
														game.players[1].id
											)}
										/>
									</Tab.Pane>
								))}
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</Card.Body>
		</Card>
	);
};

export default MyGamesAndFriends;
