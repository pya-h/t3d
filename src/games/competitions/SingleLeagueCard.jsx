import {
	Card,
	Alert,
	Badge,
	Row,
	Col,
	Button,
} from "react-bootstrap";
import { Status } from "../../services/configs";
import { OK, Sorry } from "../../tools/notification";
import gameServices from "../../services/http/gameServices";
import { useState } from "react";
const SingleLeagueCard = ({ league }) => {
	const Summaries = [
		"بصورت تصادفی تمامی بازیکنان با هم مسابقه می دهند و بازنده ی هر بازی از جام حذف شده و برنده به مرحله ی بعد صعود می کند. قهرمان این جام فردی است که تمامی حریفانش را شکست دهد.",
		"هر بازیکن، با تمامی بازیکنان دیگر، بازی مستقل کرده و بسته به نتیجه ای که کسب می کنند امتیازاتی کسب می کنند. قهرمان این کسابقات، بازیکنی است که در جدول رده بندی نفر اول باشد.",
		"این مسابقه، ترکیبی از جام حذفی و لیگ اصلی است. در دور مقدماتی، بازیکنان در گروه بندی اختصاص یافته ی خود، رقابت می کنند. نفر اول و دوم هر گروه به دور دوم این مسابقات که ماهیت حذفی دارد صعود می کنند.",
	];
	const Colors = ["dark", "primary", "success", "warning"];
	const [showMore, toggleShow] = useState(false); //show showMore or not?

	const join = async () => {
		try {
			const { status } = await gameServices.joinLeague(league.leagueID);
			if (status === Status.Successful)
				OK(` شما با موفقیت به لیگ ${league.title} ملحق شدید.`);
		} catch (err) {
			console.log(err);
			if (err.response.status === Status.MethodNotAllowed)
				Sorry(
					"پیوستن به این لیگ مجاز نیست. ظرفیت این لیگ تکمیل شده است."
				);
			if (!Status.isErrorExpected(err))
				Sorry(
					"خطا در برقراری ارتباط ... لطفا ارتباط خود را با اینترنت بررسی کنید."
				);
		}
	};
	return (
		<div
			onClick={(e) => toggleShow(!showMore)}
			className={`bg-transparent single-league-card border-${
				Colors[league.mode]
			}`}>
			<Card.Body className="expand-opacity-animation">
				<Card.Title className="text-center">{league.title}</Card.Title>
				<hr />
				{!showMore && (
					<Card.Text className="league-description-text text-right">
						{Summaries[league.mode]}
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
								style={{ fontSize: "16px" }}
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
								style={{ fontSize: "16px" }}
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
								style={{ fontSize: "16px" }}
								className="mx-2 p-2"
								variant="primary"
								pill>
								{league.players.length}
							</Badge>
							نفر
						</span>
					</Alert>
				)}
			</Card.Body>
			{showMore && <Card.Footer>
				<Row>
					<Col>
						<Button block variant="outline-success" onClick={join}>
							شرکت کردن
						</Button>
					</Col>
					<Col>
						<Button block variant="outline-secondary">
							بازیکنان حاضر
						</Button>
					</Col>
				</Row>
			</Card.Footer>}
		</div>
	);
};

export default SingleLeagueCard;
{
	/* <Container>
			<Row>
				<Alert className="text-right w-100" variant="info">
					<Alert.Heading className="text-center">
						<Badge variant="success mx-2 p-2">{league.title}</Badge>
					</Alert.Heading>
					<p className="mx-5">{Summaries[league.mode]}</p>
				</Alert>
			</Row>
			<hr />
			<Row>
				<Alert className="text-right w-100" pill="true" variant="info">
					<span className="text-center">
						
						ظرفیت :
						<Badge
							style={{ fontSize: "16px" }}
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
							style={{ fontSize: "16px" }}
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
							style={{ fontSize: "16px" }}
							className="mx-2 p-2"
							variant="primary"
							pill>
							
							{league.players.length}
						</Badge>
						نفر
					</span>
					<hr />
					<span className="text-center">
						
						مهلت : تا
						<Badge
							style={{ fontSize: "16px" }}
							className="mx-2 p-2"
							variant="primary"
							pill>
							
							{toHijri(league.deadline)[0]}
						</Badge>
					</span>
				</Alert>
			</Row>
			<hr />
			<Row>
				<Col>
					<Button block variant="outline-success" onClick={join}>
						شرکت کردن
					</Button>
				</Col>
				<Col>
					<Button block variant="outline-secondary">
						بازیکنان حاضر
					</Button>
				</Col>
			</Row>
		</Container> */
}
