import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { OK } from "../../tools/notification";
import userServices from "./../../services/http/userServices";
import { Sorry } from "./../../tools/notification";
import Configs from "../../services/configs";
import LoadingBar from "../../commons/LoadingBar";
import ImagePicker from "./ImagePicker";

const AvatarChange = () => {
	const [password, setPassword] = useState("");
	const [myAvatar, selectMyAvatar] = useState(null);
	const [loading, setLoading] = useState("");

	const upload = async (event) => {
		event.preventDefault();
		setLoading(true);
		try {
			const { status } = await userServices.uploadAvatar(password, myAvatar);
			if (status === Configs.Status.Successful) {
				OK("Your avatar has been updated successfully.");
			}
		} catch (err) {
			if (!Configs.Status.isErrorExpected(err))
				Sorry(
					"An error occurred while saving your changes. Please try again."
				);
		}
		setLoading(false);
		setPassword("");
	};
	return (
		<Form onSubmit={(e) => upload(e)}>
			<LoadingBar loading={loading} />
			<ImagePicker selector={selectMyAvatar} />
			<Card.Footer className="p-1 m-0  mt-4">
				<Row>
					<Col lg={2} md={2} sm={4} xs={4}>
						<Form.Label className="text-center w-100 mt-3">
							Current Password
						</Form.Label>
					</Col>
					<Col lg={7} md={7} sm={8} xs={8}>
						<Form.Control
							type="password"
							className="text-left account-info-textbox animated-textbox"
							placeholder="Password"
							value={password}
							required
							onInput={(e) => e.target.setCustomValidity("")}
							onInvalid={(e) =>
								e.target.setCustomValidity(
									"To save any changes to your account, you must enter your current password."
								)
							}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Col>
					<Col lg={3} md={3} sm={12} xs={12}>
						<Button
							type="submit"
							block
							variant="success"
							className="mt-2 animated-button">
							<i
								className="fa fa-upload px-2"
								aria-hidden="true"></i>
							Change Avatar
						</Button>
					</Col>
				</Row>
			</Card.Footer>
		</Form>
	);
};

export default AvatarChange;
