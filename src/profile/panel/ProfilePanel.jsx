import { NavLink } from "react-router-dom";
import { Button, Row } from "react-bootstrap";
import "../profile.css";
import { useSelector } from "react-redux";
import { Fragment, useContext } from "react";
import Configs from "../../services/configs";
import GlobalContext from './../../globals/state/GlobalContext';

const ProfilePanel = () => {
    const me = useSelector((state) => state.me);
    const context = useContext(GlobalContext);

    return (
            <Row className="profile-panel-sidebar d-flex flex-column flex-shrink-0">
                {/* <Button
                    style={{ border: "none" }}
                    variant="outline-warning"
                    className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <i className="fa fa-cogs px-2" aria-hidden="true"></i>
                    User Panel
                </Button> */}
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item animated-button">
                        <NavLink
                            exact
                            to={Configs.Routes.Client.Profile}
                            className="nav-link"
                            aria-current="page">
                            <i
                                className="fa fa-user-o px-2"
                                aria-hidden="true"></i>
                            Profile
                        </NavLink>
                    </li>
                    <li className="animated-button" >
                        <NavLink
                            className="nav-link link-dark"
                            to={Configs.Routes.Client.MyGamesAndFriends}>
                            <i
                                className="fa fa-users px-2"
                                aria-hidden="true"></i>
                            Friends & Games
                        </NavLink>
                    </li>
                    <li className="animated-button" >
                        <NavLink
                            className="nav-link link-dark"
                            to={Configs.Routes.Client.ChatRoom}>
                            <i
                                className="fa fa-comment px-2"
                                aria-hidden="true"></i>
                            Chat Room
                        </NavLink>
                    </li>
                    <hr />
                    {me && me.isAdmin && (
                        <Fragment>
                            {/* admin tools */}
                            <li className="animated-button" > 
                                <NavLink
                                    className="nav-link link-dark border-top"
                                    to={Configs.Routes.Client.Notices}>
                                    <i
                                        className="fa fa-newspaper-o px-2"
                                        aria-hidden="true"></i>
                                    Notices
                                </NavLink>
                            </li>
                            <li className="animated-button" >
                                <NavLink
                                    className="nav-link link-dark"
                                    to={Configs.Routes.Client.StudentManagement}>
                                    Student Management
                                </NavLink>
                            </li>
                            <li className="animated-button" >
                                <NavLink
                                    className="nav-link link-dark"
                                    to={Configs.Routes.Client.LeaguesManager}>
                                    League Manager
                                </NavLink>
                            </li>
                            <li className="animated-button" >
                                <NavLink
                                    className="nav-link link-dark"
                                    to={Configs.Routes.Client.Documents}>
                                    Site Description
                                </NavLink>
                            </li>
                        </Fragment>
                    )}
                </ul>
                <hr />
                <Button variant="outline-danger" className="animated-button" onClick={context.signOut}>
                    <i className="fa fa-sign-out px-2" aria-hidden="true"></i>
                    Sign Out
                </Button>
            </Row>
    );
};

export default ProfilePanel;
