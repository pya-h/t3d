import { Fragment, useState, useEffect } from "react";
import { Form, Card, Col, Row, Button, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import noticeServices from "../../services/http/noticeServices";
import { Status, browserStorage } from "../../services/configs";
import "../profile.css";
import LoadingBar from "../../commons/LoadingBar";
import jwtdecode from "jwt-decode";
import { OK, Sorry } from "../../tools/notification";
const NoticeManager = () => {
	//u can create another component for listing notices ?
	const me = useSelector((state) => state.me);
	const [isAllowed, setAllowed] = useState(undefined);
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [notices, setNotices] = useState([]);
	const [selectedNoticeID, setSelectedNoticeID] = useState(null);
	const [updateTrigger, setUpdateTrigger] = useState(false);
	const [loading, setLoading] = useState(false);

	const resetStates = () => {
		setTitle("");
		setText("");
		setStartDate(null);
		setEndDate(null);
		setSelectedNoticeID(null);
		setUpdateTrigger(!updateTrigger); // updateTrigger: true <===> false -> chane -> useEffects calls
	};

	useEffect(() => {
		//use another simpler preloader
		//load all notices in left side for selecting: load all and push them in notices state
		(async () => {
			try {
				setLoading(true);
				const { status, data } =
					await noticeServices.getAdvancedNotics();
				if (status === Status.Successful) {
					//return data.notices;
					if (data.notices.length) setNotices([...data.notices.reverse()]);
					//if all is empty
					if (data.notices.length === 0) {
						setNotices([
							{
								title: "پیام",
								text: "اطلاعیه جدیدی وجود ندارد",
							},
						]);
					}
				}
			} catch (err) {
				//put error message in notice side bar?
				setNotices([
					{
						title: "خطا",
						text: "...مشکلی حین بارگذاری اطلاعیه ها پیش آمد. دوباره امتحان کنید",
					},
				]);
				setLoading(false);
			}
			setLoading(false);
		})();
	}, [updateTrigger]);

	useEffect(() => {
		const token = browserStorage.TOKEN();
        let isAdmin = undefined;
		if (token) {
			const decoded_token = jwtdecode(browserStorage.TOKEN());
			isAdmin = decoded_token &&
				decoded_token.user.admin &&
				decoded_token.exp > Date.now() / 1000; //user is admin and token not expired
			// show proper message for simple users
			if (!me || isAdmin === false) {
				//in first render a wronge message will be shown! find a fix
				//2nd condition must be exactly the same
				Sorry("متاسفانه شما مجوز دسترسی به این صفحه را ندارید.");
				return null;
			}
		}
        else isAdmin = false;
		setAllowed(isAdmin);
	}, [me]);
	//***** in server implemented a middleware for this, is this needed? */

	//runs when create notice button clicks
	const createNewNotice = async () => {
		//add patern and stuff to states and inputs
		try {
			setLoading(true);
			const { status } = await noticeServices.createNotice({
				title,
				text,
				startDate: new Date(startDate),
				endDate: new Date(endDate),
			});
			//*********** */
			//COMPLETELY CHECK NOTICE IN CLIENT AND SERVER
			if (status === Status.CreatedSuccessfully) {
				OK(`اطلاعیه ی ${title} با موفقیت ساخته شد`);
				resetStates();
			}
		} catch (err) {
			if (!Status.isErrorExpected(err))
				Sorry(
					"خطایی در ذخیره اطلاعیه بوجود امد ... لطفا دوباره تلاش کنید"
				);
		}
		setLoading(false);
	};

	const selecteNotice = (notice) => {
		// console.log(notice);
		setSelectedNoticeID(notice._id);
		setTitle(notice.title);
		setText(notice.text);
		setStartDate(new Date(notice.startDate));
		setEndDate(new Date(notice.endDate));
	};

	const cancelEditing = () => {
		resetStates();
	};

	const saveChanges = async () => {
		//add patern and stuff to states and inputs
		if (!selectedNoticeID) return;
		setLoading(true);
		try {
			const { status } = await noticeServices.editNotice(
				selectedNoticeID,
				{ title, text, startDate, endDate }
			);
			if (status === Status.Successful) {
				OK(`اطلاعیه ی ${title} با مورفقیت ویرایش شد`);
				resetStates();
			}
		} catch (err) {
			if (!Status.isErrorExpected(err))
				Sorry(
					"خطایی در ذخیره تغییرات بوجود امد ... لطفا دوباره تلاش کنید"
				);
		}
		setLoading(false);
	};
	// if admin status is checked directly by server then start rendering the page
	//consists two part" right part => used for creating and editing notices
	//left part lists all notices and allows admin to select one => after selecting the notice will be ready to be edited on right side

	//edit all heights in control panel
	//add patern and stuff to states and inputs
	return (
		<Fragment>
			{me && isAllowed && (
				<Row style={{ height: "100%" }}>
					<LoadingBar loading={loading} />
					<Col lg={6} md={5} sm={12}>
						<Card
							border="success"
							bg="transparent"
							className="mx-auto notice-manager-card">
							<Card.Header className="text-center">
								اطلاعیه جدید
							</Card.Header>
							<Card.Body className="text-right">
								<Form.Label className="my-1 mx-auto">
									عنوان اطلاعیه
								</Form.Label>
								<Form.Control
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									pattern=".{3,30}"
									onInput={(e) =>
										e.target.setCustomValidity("")
									}
									onInvalid={(e) =>
										e.target.setCustomValidity(
											"عنوان اطلاعیه باید حداقل 3 و حداکثر 30 کاراکتر داشته باشد"
										)
									}
									className="my-1 mx-auto animated-textbox"
									type="text"
									placeholder="عنوان"
									required="required"
								/>
								<hr />
								<Form.Label className="my-1 mx-auto">
									توضیحات
								</Form.Label>
								<Form.Control
									as="textarea"
									pattern=".{5,200}"
									onInput={(e) =>
										e.target.setCustomValidity("")
									}
									onInvalid={(e) =>
										e.target.setCustomValidity(
											"متن اطلاعیه باید حداقل 5 و حداکثر 200 کاراکتر داشته باشد"
										)
									}
									className="my-1 animated-textbox h-25"
									placeholder="متن کامل اطلاعیه را وارد کنید"
									value={text}
									required="required"
									onChange={(e) => setText(e.target.value)}
								/>
								<hr />
								<Form.Label className="my-1 mx-2">
									تاریخ شروع نمایش
								</Form.Label>

								<DatePicker
									className="my-1 mx-auto w-100"
									calendar={persian}
									locale={persian_fa}
									calendarPosition="bottom-right"
									value={startDate}
									onChange={setStartDate}
									required="required"
								/>
								<hr />
								<Form.Label className="my-1 mx-2">
									تاریخ پایان نمایش
								</Form.Label>

								<DatePicker
									className="my-1 mx-auto"
									calendar={persian}
									locale={persian_fa}
									calendarPosition="bottom-right"
									value={endDate}
									onChange={setEndDate}
									required="required"
								/>
								<hr />
							</Card.Body>
							<Card.Footer>
								{!selectedNoticeID ? (
									<Button
										block
										variant="success"
										onClick={createNewNotice}>
										<i
											className="fa fa-floppy-o px-3"
											aria-hidden="true"></i>
										ایجاد اطلاعیه
									</Button>
								) : (
									<Row>
										<Col lg={6} md={12}>
											<Button 
												block
												variant="outline-primary"
												onClick={saveChanges}>
												<i
													className="fa fa-floppy-o px-3"
													aria-hidden="true"></i>
												ذخیره تغییرات
											</Button>
										</Col>
										<Col lg={6} md={12}>
											<Button 
												block
												variant="outline-warning text-secondary"
												onClick={cancelEditing}>
												<i
													className="fa fa-floppy-o px-3"
													aria-hidden="true"></i>
												لغو ویرایش
											</Button>
										</Col>
									</Row>
								)}
							</Card.Footer>
						</Card>
					</Col>
					<Col lg={6} md={7} sm={12}>
						<Card
							border="info"
							bg="transparent"
							className="mx-auto notice-manager-card">
							<Card.Header className="text-center">
								اطلاعیه های قبلی
							</Card.Header>
							<Card.Body
								style={{ overflowY: "scroll" }}
								className="text-right">
								{notices.map((notice) => {
									return (
										<Fragment>
											<Alert variant="secondary">
												<i
													className="fa fa-info-circle px-3"
													aria-hidden="true"></i>
												<span
													style={{
														color: "red",
														fontSize: "15px",
													}}>
													{notice.title}
												</span>
												: {notice.text}
												<i
													className="icon-edit-notice fa fa-pencil-square-o px-3"
													aria-hidden="true"
													onClick={() =>
														selecteNotice(notice)
													}></i>
											</Alert>
											<hr />
										</Fragment>
									);
								})}
							</Card.Body>
						</Card>
					</Col>
				</Row>
			)}
		</Fragment>
	);
};

export default NoticeManager;
