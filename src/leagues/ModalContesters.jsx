import { Button, Container, Modal, Row, Alert } from "react-bootstrap";
import { useState, Fragment } from "react";

const ModalContesters = ({ contesters }) => {
	const [show, setShow] = useState(false);

	return (
		<Fragment>
			<Button
				block
				onClick={() => setShow(true)}
				variant="outline-secondary">
				بازیکنان حاضر
			</Button>

			<Modal show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton></Modal.Header>

				<Modal.Body>
					<Container>
						{contesters &&
							contesters.map((contester) => (
								<Row className=" mx-auto text-center animated-button">
									<Alert
										className="w-100 mx-auto text-center"
										variant="secondary">
										{contester.fullname}
									</Alert>
								</Row>
							))}
						<Row>
							<Button
								type="submit"
								block
								className="text-center animated-button"
								onClick={() => setShow(false)}
								variant="outline-danger">
								بستن
								<i
									className="fa fa-sign-in px-2"
									aria-hidden="true"></i>
							</Button>
						</Row>
					</Container>
				</Modal.Body>
			</Modal>
		</Fragment>
	);
};

export default ModalContesters;
