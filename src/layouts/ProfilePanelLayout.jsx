import { Fragment, useContext, useEffect, useState } from "react";
import { Devices } from "../services/configs";
import ProfilePanel from "../profile/panel/ProfilePanel";
import CollapsedPanel from "../profile/panel/CollapsedPanel";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import AutoSignIn from "../users/AutoSignIn";
import GlobalContext from "../globals/state/GlobalContext";
import {
	LoadInteractions,
	ResetInteractions,
} from "../globals/redux/actions/interactions";
import { LoadMyPlayer } from "../globals/redux/actions/player";
import LoadingBar from "../commons/LoadingBar";

const ProfilePanelLayout = ({ children }) => {
	const context = useContext(GlobalContext);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		// this form of dispatching is used to support preloaders
		(async () => {
			try {
				setLoading(true);
				await dispatch(LoadMyPlayer());
				await dispatch(LoadInteractions());
				// profile unmounted
			} catch (err) {
				setLoading(false);
			}
			setLoading(false);
		})();

		return () => {
			// remove chat list from redux to save memory
			dispatch(ResetInteractions());
		};
	}, [dispatch]);

	return (
		<Fragment>
			<LoadingBar loading={loading} />
			<AutoSignIn />
			{context.device === Devices.Desktop ? (
				<Row className="w-100 mx-auto">
					<Col lg={3}>
						<ProfilePanel />
					</Col>
					<Col lg={9}>{children}</Col>
				</Row>
			) : (
				<Row className="w-100 mx-auto">
					<Col className="mx-auto" sm={12}>
						<CollapsedPanel />
					</Col>
					<Col sm={12}>{children}</Col>
				</Row>
			)}
		</Fragment>
	);
};

export default ProfilePanelLayout;
