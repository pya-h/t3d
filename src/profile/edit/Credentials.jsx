import { Form, Card, Row, Col, Button } from "react-bootstrap";
import Configs from "../../services/configs";
import userServices from "../../services/http/userServices";
import { useState, useEffect } from "react";
import { OK, Sorry } from "../../tools/notification";
import LoadingBar from "../../commons/LoadingBar";

import "../profile.css";

const Credentials = () => {
	const [fullname, setFullname] = useState("");
	const [studentID, setStudentID] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState("");

	const [pageUpdateTrigger, triggerPageUpdate] = useState(false); // true <=> false -> triggers page , ==> see useEffect

	const reloadPage = () => {
		setLoading(false);
		triggerPageUpdate(!pageUpdateTrigger);
	};

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const { status, data } = await userServices.getMyCredentials();
				if (status === Configs.Status.Successful) {
					const { me } = data;
					setFullname(me.fullname);
					setStudentID(me.studentID);
					setEmail(me.email);
				}
			} catch (err) {
				if (!Configs.Status.isErrorExpected(err))
					Sorry(
						"حین دریافت اطلاعات کاربر ایرادی پیش آمد. ... لطفا دوباره تلاش کنید."
					);
				setLoading(false);
			}
			setLoading(false);
		})();
	}, [pageUpdateTrigger]);

	const saveChanges = async (event) => {
		//add patern and stuff to states and inputs
		// check all inputs plz
		event.preventDefault();
		setLoading(true);
		try {
			const { status } = await userServices.editMyCredentials({
				studentID,
				fullname,
				email,
				password,
			});
			if (status === Configs.Status.Successful) {
				OK(`تغییرات با موفقیت اعمال شد`);
				// dispatch(TriggerRecordUpdate());
				// find another way to update

				reloadPage();
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
		<Form onSubmit={(e) => saveChanges(e)}>
			<LoadingBar loading={loading} />

			<Row>
				<Col className="mt-3 text-center" xs={4}>
					<Form.Label className="text-center">نام کاربر</Form.Label>
				</Col>

				<Col>
					<Form.Control
						type="text"
						className="account-info-textbox"
						pattern="[آ-ی ]{6,}" // persian characters and space
						onInput={(e) => e.target.setCustomValidity("")}
						onInvalid={(e) =>
							e.target.setCustomValidity(
								"نام خانوادگی باید با حروف فارسی و با حداقل طول سه حرف باشد"
							)
						}
						placeholder="نام و نام خانوادگی"
						value={fullname}
						required="required"
						onChange={(e) => setFullname(e.target.value)}
					/>
				</Col>
			</Row>

			<Row>
				<Col className="mt-3 text-center" xs={4}>
					<Form.Label className="text-center">ایمیل</Form.Label>
				</Col>

				<Col>
				<Form.Control
					type="email"
					pattern=".{6,}"
					onInput={(e) => e.target.setCustomValidity("")}
					onInvalid={(e) =>
						e.target.setCustomValidity(
							"ورودی باید فرمت معتبر ایمیل را رعایت کرده و حداقل 6 کاراکتر باشد"
						)
					}
					className="account-info-textbox text-left"
					placeholder="E-mail"
					value={email}
					required="required"
					onChange={(e) => setEmail(e.target.value)}
				/>
				</Col>

			</Row>
			<Row>
				<Col className="mt-3 text-center" xs={4}>
					<Form.Label className="text-center">
						شماره دانشجویی
					</Form.Label>
				</Col>
				<Col>
					<Form.Control
						type="text"
						disabled
						className="account-info-textbox text-left"
						placeholder="Student ID"
						value={studentID}
					/>
				</Col>
			</Row>
			<Card.Footer className="p-1 m-0 mt-4">
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
								className="fa fa-floppy-o px-2"
								aria-hidden="true"></i>
							ثبت تغییرات
						</Button>
					</Col>
				</Row>
			</Card.Footer>
		</Form>
	);
};

export default Credentials;
