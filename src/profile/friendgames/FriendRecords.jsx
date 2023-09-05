import {
	Button,
	Card,
	Col,
	ListGroup,
	Row,
	InputGroup,
	Image,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import "../profile.css";
import Record from "./Record";
import { Sorry } from "./../../tools/notification";
import { useState, useEffect } from "react";
import userServices from "./../../services/http/userServices";
import {
	EndFriendlyInvitation,
	InviteToFriendlyGame,
} from "../../globals/redux/actions/tools";
import { Status } from "../../services/configs";
const FriendRecords = ({ person, thisIsMe }) => {
	const room = useSelector((state) => state.room);
	const [gameType, setGameType] = useState(4);
	const [avatar, setAvatar] = useState(null); //s
	const dispatch = useDispatch();

	useEffect(() => {
		if (person) {
			(async () => {
				try {
					const { data, status } = await userServices.getAvatar(
						person.userID
					);
					if (status === Status.Successful) setAvatar(data.avatar);
				} catch (err) {
					if (!Status.isErrorExpected(err))
						Sorry(
							"مشکلی در بارگذاری آواتار این شخص پیش آمد ... لطفا اتصال اینترنت خود را بررسی کنید."
						);
					// use- no-avatar.png here too?
					// in case server return wrong?
				}
			})();
		}
	}, [person]);
	const onInviteToGameClick = () => {
		if (!room.dimension && !room.dimension && !thisIsMe) {
			//if you want to enable players play multiple games then remove this
			// if player isnt still in a game
			//check room info?
			dispatch(InviteToFriendlyGame(person.userID, gameType));
			setTimeout(() => {
				//Notify('دوست مورد نظر درخواست شما را نپذیرفت')
				dispatch(EndFriendlyInvitation());
			}, 10000);
		} else {
			Sorry("برای شروع بازی جدید، باید بازی قبلی شما به اتمام برسد");
		}
	};
	const { records } = person;

	return (
		<Card border="success" bg="transparent" className="friend-records">
			<Card.Body>
				<Row className="w-100 p-0 mx-auto">
					{/* <hr /> */}
					<Col
						sm={12}
						md={12}
						lg={3}
						className="text-center mx-auuto">
						<Image
							className="friends-section-avatar"
							src={avatar}
							alt="خطا"
							roundedCircle
						/>
					</Col>
					<Col sm={12} md={12} lg={9}>
						<ListGroup className="list-group list-group-flush">
							<Row className="h-100">
								<Col className="p-0 h-100 w-100">
									<Record title="امتیاز بازیکن">
										{records.points}
									</Record>
								</Col>
								<Col className="p-0 h-100 w-100">
									<Record title="تعداد بردها">
										{records.wins}
									</Record>
								</Col>
							</Row>
							<Row className="h-100">
								<Col className="p-0 h-100 w-100">
									<Record title="تعداد تساوی">
										{records.draws}
									</Record>
								</Col>
								<Col className="p-0 h-100 w-100">
									<Record title="تعداد باختها">
										{records.loses}
									</Record>
								</Col>
							</Row>
						</ListGroup>
					</Col>
				</Row>
			</Card.Body>
			{!thisIsMe && person && (
				<Card.Footer>
					<Row>
						<Col sm={4} xs={12}>
							<Button
								variant="secondary"
								block
								onClick={onInviteToGameClick}>
								<i
									className="fa fa-handshake-o px-2"
									aria-hidden="true"></i>
								درخواست بازی
							</Button>
						</Col>
						<Col sm={8} xs={12}>
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Radio
										value={3}
										name="dimension"
										onChange={() => setGameType(3)}
									/>
									<InputGroup.Text>3 * 3 * 3</InputGroup.Text>
								</InputGroup.Prepend>
								<InputGroup.Prepend>
									<InputGroup.Radio
										value={4}
										name="dimension"
										onChange={() => setGameType(4)}
										defaultChecked
									/>
									<InputGroup.Text>4 * 4 * 4</InputGroup.Text>
								</InputGroup.Prepend>
								<InputGroup.Prepend>
									<InputGroup.Radio
										value={5}
										name="dimension"
										onChange={() => setGameType(5)}
									/>
									<InputGroup.Text>5 * 5 * 5</InputGroup.Text>
								</InputGroup.Prepend>
							</InputGroup>
						</Col>
					</Row>
				</Card.Footer>
			)}
		</Card>
	);
};

export default FriendRecords;
