import { Card, Tab, Tabs } from "react-bootstrap";
import Credentials from "./Credentials";
import PasswordChange from "./PasswordChange";
import AvatarChange from "./AvatarChange";

const AcountManager = () => {
	//states

	const TABS = { CREDENTIALS: 0, AVATAR: 1, PASSWORD: 2 };

	return (
		<Card border="secondary" bg="transparent" className="game-deck-card">
			<Card.Body>
				<Tabs
					defaultActiveKey={TABS.CREDENTIALS}
					variant="pills"
					// transition={Fade}
					className="mb-3">
					<Tab eventKey={TABS.CREDENTIALS} title="Edit Profile">
						<hr />
						<Credentials />
					</Tab>
					<Tab eventKey={TABS.AVATAR} title="Avatar">
						<hr />
						<AvatarChange />
					</Tab>
					<Tab eventKey={TABS.PASSWORD} title="Change Password">
						<hr />
						<PasswordChange />
					</Tab>
				</Tabs>
			</Card.Body>
		</Card>
	);
};

export default AcountManager;
