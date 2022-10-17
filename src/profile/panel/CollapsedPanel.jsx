import { NavLink } from "react-router-dom";
import { Button, Navbar } from "react-bootstrap";
import "../profile.css";
import { useSelector } from "react-redux";
import { Fragment, useContext } from "react";
import Configs from "../../services/configs";
import GlobalContext from "../../globals/state/GlobalContext";

const CollapsedPanel = () => {
	const me = useSelector((state) => state.me);
	const context = useContext(GlobalContext);
	return (
		<Navbar
			bg="transparent"
			style={{ border: "1px solid grey", borderRadius: "5px" }}
			className="justify-content-center p-2 mt-2 nav-pills text-right w-100">
			<NavLink
				activeClassName="btn btn-primary"
				exact
				to={Configs.Routes.Client.Profile}
				className="nav-link mx-1"
				aria-current="page">
				<i className="fa fa-user-o" aria-hidden="true"></i>
			</NavLink>
			<NavLink
				activeClassName="btn btn-primary"
				className="nav-link mx-1"
				to={Configs.Routes.Client.MyGamesAndFriends}>
				<i className="fa fa-users" aria-hidden="true"></i>
			</NavLink>
			<NavLink
				activeClassName="btn btn-primary"
				className="nav-link mx-1"
				to={Configs.Routes.Client.ChatRoom}>
				<i className="fa fa-weixin" aria-hidden="true"></i>
			</NavLink>

			{me && me.isAdmin && (
				<Fragment>
					{/* admin tools */}
					<NavLink
						activeClassName="btn btn-primary"
						className="nav-link mx-1 border-top"
						to={Configs.Routes.Client.Notices}>
						<i className="fa fa-newspaper-o" aria-hidden="true"></i>
					</NavLink>
					<NavLink
						className="nav-link link-dark"
						to={Configs.Routes.Client.StudentManagement}>
						<i className="fa fa-cogs" aria-hidden="true"></i>
					</NavLink>
					<NavLink
						className="nav-link link-dark"
						to={Configs.Routes.Client.LeaguesManager}>
						لیگ منیجر
					</NavLink>

					<NavLink
						className="nav-link link-dark"
						to={Configs.Routes.Client.Documents}>
						<i className="fa fa-cogs" aria-hidden="true"></i>
					</NavLink>
				</Fragment>
			)}

			<Button
				variant="outline-danger"
				className="mx-3"
				onClick={context.signOut}>
				<i className="fa fa-sign-out" aria-hidden="true"></i>
			</Button>
		</Navbar>
	);
};

export default CollapsedPanel;
