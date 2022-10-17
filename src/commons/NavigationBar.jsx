import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import GlobalContext from "../globals/state/GlobalContext";
import { Devices, Routes } from "../services/configs";

const NavigationBar = () => {
	const me = useSelector((state) => state.me);
	const context = useContext(GlobalContext);

	return (
		<Navbar style={{borderBottom: '1px solid grey'}}  bg="light" className="nav-pills text-left">
			<Container className="text-left">
				<Nav className="me-auto">
					<NavLink
						className="nav-link text-primary"
						activeClassName="btn-success text-dark"
						to={
							me
								? Routes.Client.Profile
								: Routes.Client.SignUp
						}>
						<i
							className="fa fa-address-card px-2"
							aria-hidden="true"></i>
						{me
							? context.device !== Devices.SmartPhone && me.fullname
							: "Sign Up"}
					</NavLink>
					<NavLink
						className="nav-link text-primary"
						to={Routes.Client.Root}
						exact
						activeClassName="btn-outline-secondary text-dark">
						<i className="fa fa-home px-2" aria-hidden="true"></i>
						{context.device === Devices.Desktop && "Home"}
					</NavLink>

					<NavLink
						className="nav-link text-primary"
						to={Routes.Client.GameDeck}
						activeClassName="btn-outline-secondary text-dark">
						<i
							className="fa fa-gamepad px-2"
							aria-hidden="true"></i>
						{context.device === Devices.Desktop && "Games"}
					</NavLink>
					{me && (
						<NavLink
							className="nav-link text-primary"
							to={Routes.Client.ChatRoom}
							activeClassName="btn-outline-secondary text-dark">
							<i
								className="fa fa-comment px-2"
								aria-hidden="true"></i>
							{context.device === Devices.Desktop && "Chat Room"}
						</NavLink>
					)}

					<NavLink
						className="nav-link text-primary"
						to={Routes.Client.Rankings}
						activeClassName="btn-outline-secondary text-dark">
						<i
							className="fa fa-list-ol px-2"
							aria-hidden="true"></i>
						{context.device === Devices.Desktop && "Rankings"}
					</NavLink>
					<NavLink
						className="nav-link text-primary"
						to={Routes.Client.GameGuide}
						activeClassName="btn-outline-secondary text-dark">
						<i className="fa fa-eye px-2" aria-hidden="true"></i>
						{context.device === Devices.Desktop && "Guide"}
					</NavLink>
					<NavLink
						className="nav-link text-primary"
						to={Routes.Client.ContactUs}
						activeClassName="btn-outline-secondary text-dark">
						<i
							className="fa fa-phone-square px-2"
							aria-hidden="true"></i>
						{context.device === Devices.Desktop && "Contact Us"}
					</NavLink>
				</Nav>
			</Container>
		</Navbar>
	);
};

export default NavigationBar;
