import { Button, Card, Col, Form, Row, Tabs } from "react-bootstrap";
import { Tab } from "react-bootstrap";
import EditStudent from "./EditStudent";
import "../profile.css";
import { useState } from "react";
const StudentsManagement = () => {
	const [userID, setUserID] = useState(null);
    const [lookFor, setLookFor] = useState("");

    const searchForStudent = (event) => {
        event.preventDefaults();
        // search data base and find student name
        // return student userID
        // then in each tab request data associated with the userid
    }
	return (
		<Card border="secondary" bg="transparent" className="big-single-card">
			{!userID && <Card.Header>
				<Form onSubmit={e => searchForStudent(e)}>
					<Row className=" w-100">
						<Col lg={10} md={10} sm={9} xs={9}>
							<Form.Control
								type="text"
								placeholder="نام دانشجو"
                                value={lookFor}
                                onChange={e => setLookFor(e.target.value)}
								className="account-info-textbox mt-0 animated-textbox"
							/>
						</Col>
						<Col className="text-left" lg={2} md={2} sm={3} xs={3}>
							<Button className="animated-button" block variant="warning">
							<i className="fa fa-search" aria-hidden="true"></i>
							</Button>
						</Col>
					</Row>
				</Form>
			</Card.Header>}
			{userID && (
				<Card.Body>
					<Tabs
						defaultActiveKey="strecords"
						variant="pills"
						// transition={Fade}
						className="mb-3">
						<Tab eventKey="strecords" title="رکوردها">
							<hr />
						</Tab>
						<Tab eventKey="stedit" title="ویرایش دانشجو">
							<hr />
							<EditStudent userID={userID}/>
						</Tab>
						<Tab eventKey="stfriends" title="روابط">
							<hr />
						</Tab>
						<Tab eventKey="stdelete" title="حذف">
							<hr />
						</Tab>
					</Tabs>
				</Card.Body>
			)}
		</Card>
	);
};

export default StudentsManagement;
