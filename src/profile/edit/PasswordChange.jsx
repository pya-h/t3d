import { Form, Card, Row, Col, Button } from "react-bootstrap";
import { useState, useContext } from "react";
import { OK, Sorry } from "../../tools/notification";
import GlobalContext from "../../globals/state/GlobalContext";
import userServices from "../../services/http/userServices";
import Configs from "../../services/configs";
import LoadingBar from "../../commons/LoadingBar";

import "../profile.css";

const PasswordChange = () => {
	const [password, setPassword] = useState("");

	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const context = useContext(GlobalContext);
	const [loading, setLoading] = useState("");

	const checkConfirmPassword = (event) => {
		setConfirmNewPassword(event.target.value);
		if (newPassword !== event.target.value) {
			event.target.setCustomValidity(
				"تایید رمز عبور جدید باید با خود رمز عبور جدید مطابقت کامل داشته باشد"
			);
			//console.log(password, confirmPassword);
		} else event.target.setCustomValidity("");
	};

	const changeMyPassword = async (event) => {
		event.preventDefault();
		setLoading(true);
		try {
			const { status } = await userServices.changeMyPassword({
				password,
				newPassword,
			});
			if (status === Configs.Status.Successful) {
				OK("رمز شما با موفقیت تغییر داده شد");
				context.signOut();
			}
		} catch (err) {
			if (!Configs.Status.isErrorExpected(err))
				Sorry(
					"خطایی در ذخیره تغییرات بوجود امد ... لطفا دوباره تلاش کنید"
				);
		}
		setPassword("");
		setLoading(false);
	};
	return (
		<Form onSubmit={(e) => changeMyPassword(e)}>
			<LoadingBar loading={loading} />
			<Row>
				<Col className="mt-3 text-center" xs={4}>
					<Form.Label className="text-center">
						رمز عبور جدید
					</Form.Label>
				</Col>

				<Col>
					<Form.Control
						type="password"
						pattern=".{6,15}"
						onInput={(e) => e.target.setCustomValidity("")}
						onInvalid={(e) =>
							e.target.setCustomValidity(
								"رمز عبور باید حداقل 6 کاراکتر و حداکثر 15 کاراکتر داشته باشد"
							)
						}
						className="account-info-textbox text-left animated-textbox"
						placeholder="New Password"
						value={newPassword}
						required="required"
						onChange={(e) => setNewPassword(e.target.value)}
					/>
				</Col>
			</Row>
			<Row>
				<Col className="mt-3 text-center" xs={4}>
					<Form.Label className="text-center">
						تایید رمز عبور جدید
					</Form.Label>
				</Col>

				<Col>
					<Form.Control
						type="password"
						className="account-info-textbox text-left animated-textbox"
						placeholder="Confirm New Password"
						value={confirmNewPassword}
						required
						onChange={(event) => checkConfirmPassword(event)}
					/>
				</Col>
			</Row>
			<Card.Footer className="p-1 m-0  mt-4">
				<Row>
					<Col lg={2} md={2} sm={4} xs={4}>
						<Form.Label className="text-center w-100 mt-3">
							رمزعبور فعلی
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
									"جهت اعمال هر گونه تغییر در حساب کاربری تان باید رمز عبور خود را وارد نمایید"
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
								className="fa fa-key px-2"
								aria-hidden="true"></i>
							تغییر رمز عبور
						</Button>
					</Col>
				</Row>
			</Card.Footer>
		</Form>
	);
};

export default PasswordChange;
