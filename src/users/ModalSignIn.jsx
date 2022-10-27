import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import { Component, Fragment } from "react";
import userServices from "../services/http/userServices";
import LoadingBar from "../commons/LoadingBar";
import Configs, { browserStorage, Routes } from "../services/configs";
import { Sorry } from "./../tools/notification";
import GlobalContext from './../globals/state/GlobalContext';

class ModalSignIn extends Component {
	// *********************Objectives***********************
	// 1. handle errors particularly
	static contextType = GlobalContext;

	state = {
		showModal: false,
		studentID: "",
		password: "",
		loading: false,
	};

	onCloseClick = () => this.setState({ showModal: false });
	onShowClick = () => this.setState({ showModal: true });

	onSignInSubmitted = async (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const { studentID, password } = this.state;
		const user = { studentID: Number(studentID), password };
		try {
			const { status, data } = await userServices.signIn(user);
			if (status === Configs.Status.Successful) {
				browserStorage.save(data.token);
				this.context.goTo(Routes.Client.Root);
			}
		} catch (err) {
			// check nonserver errors
			this.setState({ password: "" });
			if (!Configs.Status.isErrorExpected(err))
				Sorry("ورود با مشکل مواجه شد. لطفا ارتباط اینترنت خود را بررسی کنید.");
		}
		this.setState({ loading: false });
	};

	onForgotPasswordClick = () => {};

	render() {
		const { showModal, studentID, password, loading } = this.state;

		return (
			<Fragment>
				<LoadingBar loading={loading} />
				<Button variant="outline-primary" onClick={this.onShowClick}>
					<i className="fa fa-user px-2" aria-hidden="true"></i>
					ورود کاربران
				</Button>

				<Modal
					backdrop="static"
					show={showModal}
					onHide={this.onCloseClick}>
					<Modal.Header closeButton></Modal.Header>

					<Modal.Body>
						<Form
							className="m-4 text-right"
							onSubmit={(event) => this.onSignInSubmitted(event)}>

								<Form.Control
									type="text"
									className="text-center txt-shaking"
									placeholder="شماره دانشجویی"
									autoComplete="username"
									value={studentID}
									onChange={(e) =>
										this.setState({
											studentID: e.target.value,
										})
									}
								/>
<br />

								<Form.Control
									type="password"
									className="text-center txt-shaking"
									placeholder="رمز عبور"
									autoComplete="current-password"
									value={password}
									onChange={(e) =>
										this.setState({
											password: e.target.value,
										})
									}
									/>

							<hr />
							<Row className="p-0">
								<Col className="text-center">
									<Button
										type="submit"
										block
										className="text-center"
										variant="outline-success">
										ورود
										<i
											className="fa fa-sign-in px-2"
											aria-hidden="true"></i>
									</Button>
								</Col>
								<Col className="text-center">
									<Button
										block
										className="text-center"
										variant="outline-warning"
										onClick={this.onForgotPasswordClick}>
										<i
											className="fa fa-recycle px-2"
											aria-hidden="true"></i>
										فراموشی رمز
									</Button>
								</Col>
							</Row>
						</Form>
					</Modal.Body>
				</Modal>
			</Fragment>
		);
	}
}

export default ModalSignIn;
