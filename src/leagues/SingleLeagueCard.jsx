import { Card, Alert, Badge, Row, Col, Button } from "react-bootstrap";
import { Routes, Status } from "../services/configs";
import { Attention, OK, Sorry } from "../tools/notification";
import leagueServices from "../services/http/leagueServices";
import { useState, useEffect, useContext } from "react";
import ModalContesters from "./ModalContesters";
import GlobalContext from "./../globals/state/GlobalContext";
import { useSelector } from "react-redux";

const SingleLeagueCard = ({ league, reload }) => {
	const Summaries = [
		"بصورت تصادفی تمامی بازیکنان با هم مسابقه می دهند و بازنده ی هر بازی از جام حذف شده و برنده به مرحله ی بعد صعود می کند. قهرمان این جام فردی است که تمامی حریفانش را شکست دهد.",
		"هر بازیکن، با تمامی بازیکنان دیگر، بازی مستقل کرده و بسته به نتیجه ای که کسب می کنند امتیازاتی کسب می کنند. قهرمان این کسابقات، بازیکنی است که در جدول رده بندی نفر اول باشد.",
		"این مسابقه، ترکیبی از جام حذفی و لیگ اصلی است. در دور مقدماتی، بازیکنان در گروه بندی اختصاص یافته ی خود، رقابت می کنند. نفر اول و دوم هر گروه به دور دوم این مسابقات که ماهیت حذفی دارد صعود می کنند.",
	];
	const Colors = ["dark", "primary", "success", "warning"];
	const [showMore, toggleShow] = useState(false); //show showMore or not?
	const [ready, setReady] = useState(false); // if league is ready to play
	const context = useContext(GlobalContext);
    const me = useSelector((state) => state.me);

	const join = async () => {
        if (me) {
			try {
				const { status } = await leagueServices.joinLeague(league.leagueID);
				if (status === Status.Successful) {
					OK(` شما با موفقیت به لیگ ${league.title} ملحق شدید.`);
					reload();
				}
			} catch (err) {
				console.log(err);
				if (err.response.status === Status.MethodNotAllowed)
					Sorry(
						"پیوستن به این لیگ مجاز نیست. ظرفیت این لیگ تکمیل شده است."
					);
				else if (!Status.isErrorExpected(err))
					Sorry(
						"خطا در برقراری ارتباط ... لطفا ارتباط خود را با اینترنت بررسی کنید."
					);
			}
		} else {
			Attention("ابتدا باید وارد حساب کاربری خود شوید");
            context.goTo(Routes.Client.SignUp);
		}
	};

	const enter = () => {
		// ask server whether the client is really a contester or not
		// re route the client to league route
		// dispatch a redux contaning leagueID of the league is currntly openning
		if(me) 
			context.openLeaguePage(league.leagueID);
		else {
			Attention("ابتدا باید وارد حساب کاربری خود شوید");
            context.goTo(Routes.Client.SignUp);
		}
	};

	useEffect(() => {
		if (
			league &&
			league.contesters &&
			league.contesters.length === league.capacity &&
			league.started
			// && !league.finished
		) {
			// if capacity is full,
			// check if player is in the league => if so then add an option for opening league room
			setReady(true);
		}
	}, [league]);

	return (
		<div
			className={`bg-transparent single-league-card border-${
				Colors[league.Mode]
			}`}>
			<Card.Body
				onClick={(e) => toggleShow(!showMore)}
				className="expand-opacity-animation">
				<Card.Title className="text-center">{league.title}</Card.Title>
				<hr />
				{!showMore && (
					<Card.Text className="league-description-text text-right">
						{Summaries[league.Mode]}
					</Card.Text>
				)}
				{showMore && (
					<Alert
						className="text-right w-100"
						pill="true"
						variant="info">
						<span className="text-center">
							ظرفیت :
							<Badge
								style={{ fontSize: "14px" }}
								className="mx-2 p-2"
								variant="primary"
								pill>
								{league.capacity}
							</Badge>
							نفر
						</span>
						<hr />
						<span className="text-center">
							جایزه نفر اول :
							<Badge
								style={{ fontSize: "14px" }}
								className="mx-2 p-2"
								variant="primary"
								pill>
								{league.prize}
							</Badge>
							امتیاز
						</span>
						<hr />
						<span className="text-center">
							تعداد شرکت کنندگان :
							<Badge
								style={{ fontSize: "14px" }}
								className="mx-2 p-2"
								variant="primary"
								pill>
								{league.contesters.length}
							</Badge>
							نفر
						</span>
					</Alert>
				)}
			</Card.Body>
			{showMore && (
				<Card.Footer>
					{!ready ? (
						<Row>
							<Col>
								<Button
									block
									variant="outline-success"
									onClick={join}>
									پیوستن
								</Button>
							</Col>
							<Col>
								<ModalContesters
									contesters={league.contesters}
								/>
							</Col>
						</Row>
					) : (
						<Row>
							<Button
								block
								className="animated-button"
								variant="primary"
								onClick={enter}>
								ورود به لیگ
							</Button>
						</Row>
					)}
				</Card.Footer>
			)}
		</div>
	);
};

export default SingleLeagueCard;
