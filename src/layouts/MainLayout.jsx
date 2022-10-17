import SignInSideBar from "../sidebars/SignInSideBar";
import NoticeSideBar from "../sidebars/NoticeSideBar";
import { withRouter } from "react-router";
import PlayerInfoSideBar from "../sidebars/PlayerInfoSideBar";
import { useSelector } from "react-redux";
import { Fragment, useState, useEffect, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Devices, Routes } from "../services/configs";
import AutoSignIn from "../users/AutoSignIn";
import GlobalContext from "../globals/state/GlobalContext";

const MainLayout = (props) => {
	const context = useContext(GlobalContext);
	const { pathname } = props.location;
	//redux
	const me = useSelector((state) => state.me);
	const opponent = useSelector((state) => state.opponent);

	const [leftSideBar, setLeftSideBar] = useState(null);
	const [rightSideBar, setRightSideBar] = useState(null);

	//teste
	//determine sidebar
	const {device} = context;
	useEffect(() => {
		setLeftSideBar(<NoticeSideBar />);
		const setPrimaryRightSideBar = () => {
			if (device !== Devices.Tablet)
				setRightSideBar(
					me ? <PlayerInfoSideBar /> : <SignInSideBar />
				);
			else setRightSideBar(null);
		};
		if (pathname === Routes.Client.SignUp) {
			setRightSideBar(null);
			setLeftSideBar(null);
		} else if (pathname === Routes.Client.GameDeck) {
			// EDIT THIS..
			// ON REFRESH -> rightSideBar is null!
			// SOMETIMES: ERROR: cannout read .fullname of undefined person
			setPrimaryRightSideBar();
			if (opponent) {
				if (device !== Devices.SmartPhone) {
					setLeftSideBar(<PlayerInfoSideBar person={opponent} />);
				} else {
					setLeftSideBar(null);
					setRightSideBar(null);
				}
			}
		} else {
			setLeftSideBar(<NoticeSideBar />); //EDIT THIS
			setPrimaryRightSideBar();
		}
	}, [me, opponent, pathname, device]);

	return (
		<Fragment>
			<AutoSignIn />
			{context.device !== Devices.SmartPhone ? (
				<Row className="w-100 mx-auto p-0">
					{rightSideBar && <Col lg={3}>{rightSideBar}</Col>}
					<Col
						className="mx-auto"
						lg={pathname !== Routes.Client.SignUp ? null : 7}>
						{props.children}
					</Col>
					{leftSideBar && (
						<Col className="p-0 pl-2" lg={3} md={4}>
							{leftSideBar}
						</Col>
					)}
				</Row>
			) : (
				<Container>
					{/* what to do for control panelk sidebar in smartphone */}
					{me ? (
						<Row className="w-100 mx-auto">{rightSideBar}</Row>
					) : null}
					<Row className="w-100 mx-auto">{leftSideBar}</Row>
					<Row className="w-100 mx-auto">{props.children}</Row>
				</Container>
			)}
		</Fragment>
	);
};

export default withRouter(MainLayout);
