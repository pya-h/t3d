import { Card, Col, Form, Row, Button } from "react-bootstrap";
import LoadingBar from "../../commons/LoadingBar";
import '../profile.css';
import { useState, useEffect } from 'react';

const EditStudent = ({userID}) => {
    const [fullname, setFullname] = useState("");
	const [studentID, setStudentID] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState("");

    useEffect(() => {
        setLoading(true);
        //find student via userID

        setLoading(false)
    }, [])
    const saveChanges = (event) => {
        event.preventDefaults();
    }
	return (
		<Form onSubmit={(e) => saveChanges(e)}>
			<LoadingBar loading={loading} />

			<Form.Group className="form-inline">
				<Form.Label className="w-25 text-center">
					شماره دانشجویی
				</Form.Label>
				<Form.Control
					type="text"
					className="account-info-textbox w-75"
					placeholder="Student ID"
					value={studentID}
				/>
			</Form.Group>
			<Form.Group className="form-inline">
				<Form.Label className="w-25 text-center">نام کاربر</Form.Label>
				<Form.Control
					type="text"
					className="account-info-textbox w-75"
					pattern="[آ-ی ]{6,}" // persian characters and space
					onInput={(e) => e.target.setCustomValidity("")}
					onInvalid={(e) =>
						e.target.setCustomValidity(
							"نام خانوادگی باید با حروف فارسی و با حداقل طول سه حرف باشد"
						)
					}
					placeholder="Full Name"
					value={fullname}
					required="required"
					onChange={(e) => setFullname(e.target.value)}
				/>
			</Form.Group>

			<Form.Group className="form-inline">
				<Form.Label className="w-25 text-center">ایمیل</Form.Label>
				<Form.Control
					type="email"
                    disabled
					className="account-info-textbox w-75"
					placeholder="E-mail"
					value={email}
				/>
			</Form.Group>
			<Card.Footer className="p-1 m-0">
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
							className="mt-2 w-100">
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

export default EditStudent;
