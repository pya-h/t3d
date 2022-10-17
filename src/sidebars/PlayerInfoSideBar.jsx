import { Card, Col, Alert, ListGroup, Button, Image } from "react-bootstrap";
import OnlineStatistics from "./OnlineStatistics";
import { SendFriendRequestTo } from "../globals/redux/actions/tools";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import userServices from "./../services/http/userServices";
import Configs, { Status } from "../services/configs";
import GameChatBox from "../chat/GameChatBox";
import Record from "../profile/friendgames/Record";
import { Sorry } from "../tools/notification";

const PlayerInfoSideBar = (props) => {
	const me = useSelector((state) => state.me);
	const scoreboard = useSelector((state) => state.scoreboard);
	const tools = useSelector((state) => state.tools);
	const dispatch = useDispatch();
	const [personIsFriend, setPersonIsFriend] = useState(false);

	const { fullname, userID, records, avatar } = props.person
		? props.person
		: me;
	const [piece, setPiece] = useState(null); //piece === mohreh
	const thisIsMe = me && userID === me.userID;
	useEffect(() => {
		setPiece(!thisIsMe ? scoreboard.opp : scoreboard.me);
	}, [thisIsMe, scoreboard]);

	const { recordReloadTrigger } = tools;
	useEffect(() => {
		if (!thisIsMe) {
			(async () => {
				try {
					const { status, data } = await userServices.isMyFriend(
						userID
					);
					if (status === Configs.Status.Successful) {
						setPersonIsFriend(data.isFriend);
					}
				} catch (err) {
					// handle error.
			if (!Status.isErrorExpected(err))
					Sorry("Could not connect to the server. Please verify your internet connection.");
					console.log(err);
				}
			})();
		}
	}, [userID, thisIsMe, recordReloadTrigger]);

	const onFriendRequestClick = (event) => {
		event.target.innerHTML = "Sent...";
		event.target.disabled = true;
		dispatch(SendFriendRequestTo(userID));
	};

	return (
		<Card border="info" className="player-info-sidebar animated-form">
			<Card.Header className="text-center text-info form-inline">
				<Col>
					<Card.Text className="text-left">{fullname}</Card.Text>
				</Col>
				<Col>
					<Image
						className="player-avatar"
						src={avatar}
						roundedCircle
					/>
				</Col>
			</Card.Header>

			<Card.Body>
				<ListGroup className="list-group list-group-flush">
					{piece && (
						<ListGroup.Item>
							<Alert variant={piece.index ? "danger" : "primary"}>
								<Alert.Heading className="text-center">
									{piece.score} : {piece.shape}
								</Alert.Heading>
							</Alert>
						</ListGroup.Item>
					)}
					<Record small title="Player Score">
						{records.points}
					</Record>
					<Record small title="Wins">
						{records.wins}
					</Record>
					<Record small title="Draws">
						{records.draws}
					</Record>
					<Record small title="Losses">
						{records.loses}
					</Record>
				</ListGroup>
			</Card.Body>
			<Card.Footer>
				{thisIsMe ? (
					<OnlineStatistics />
				) : personIsFriend ? (
					<GameChatBox friendID={userID} />
				) : (
					<Button
						variant={"outline-info"}
						block
						onClick={(event) => onFriendRequestClick(event)}>
						<i
							className="fa fa-handshake-o px-2"
							aria-hidden="true"></i>
						Friend Request
					</Button>
				)}
			</Card.Footer>
		</Card>
	);
};

export default PlayerInfoSideBar;
