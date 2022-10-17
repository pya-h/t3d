import "./scores.css";
import { Component } from "react";
import ScoresTable from "./ScoresTable";
import gameServices from "../../services/http/gameServices";
import Configs, { Status } from "../../services/configs";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Sorry } from "../../tools/notification";

class ScoresTableContainer extends Component {
	state = {
		liveScores: [],
		finalScores: [],
		showLiveOnes: false,
		loading: false,
	};

	componentDidMount() {
		// get all game results , live or final, handling promises
		// client and server side for this Module seriously need to be edited
		(async () => {
			this.setState({ loading: true }); // use preloader here?
			const { data, status } = await gameServices.getAllGames();
			if (status === Configs.Status.Successful) return data.allGames;
			return [];
		})()
			.then((result) => {
				result = [...result.reverse()];
				this.setState({
					liveScores: result.filter((game) => game.isLive),
					finalScores: result.filter((game) => !game.isLive),
					loading: false,
				});
				//EDIT EDIT EDIT
			})
			.catch((err) => {
				//******* handle errors */
				// console.log(err);
				if (!Status.isErrorExpected(err))
					Sorry(
						"بارگذاری لیست بازی ها موفقیت آمیز نبود. لطفا لحظاتی بعد مجددا تلاش کنید."
					);
				this.setState({ finalScores: [], loading: false });
			});
	}

	btnShowLiveScores = () => {
		this.setState({ showLiveOnes: true });
	};

	btnShowFinalScores = () => {
		this.setState({ showLiveOnes: false });
	};

	render() {
		// game replay? is it a good idea DataBase Size-Wise ? ===> if true: see 1st page of the notebook
		/* add a NextGames button maybe? (گزینه بازی های اینده) */
		let { liveScores, finalScores, showLiveOnes } = this.state;

		// DESIGN : USE <Tabs> ???
		return (
			<Container>
				<Row className="scores-mode-select-layout m-0 p-0">
					<Col className="w-100 m-0 p-0 pl-1">
						<Button
							variant={
								showLiveOnes
									? "outline-success"
									: "outline-primary"
							}
							className="scores-mode-select-button"
							onClick={this.btnShowLiveScores}>
							نتایج زنده
							<i
								className="fa fa-play-circle px-3"
								aria-hidden="true"></i>
						</Button>
					</Col>
					<Col className="w-100 m-0 p-0 ">
						<Button
							variant={
								!showLiveOnes
									? "outline-success"
									: "outline-primary"
							}
							className="scores-mode-select-button"
							onClick={this.btnShowFinalScores}>
							نتایج نهایی
							<i
								className="fa fa-check-circle-o px-3"
								aria-hidden="true"></i>
						</Button>
					</Col>
				</Row>
				<hr />

				<Row>
					<Col>
						{/* this single column is to make mode select buttons and ScoresTable same width */}
						<ScoresTable
							scores={showLiveOnes ? liveScores : finalScores}
						/>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default ScoresTableContainer;
