import { Card, Container, Row } from "react-bootstrap";
import "./info.css";
import { Fragment, useEffect, useState } from "react";

const ContactUs = () => {
    const [lineHeight, setLineHeight] = useState(0.6);

    useEffect(() => setLineHeight(2), []);
	return (
		<Fragment>
			<Card
				style={{ lineHeight: `${lineHeight}rem` }}
				border="dark"
				className="simple-single-card"
			>
				<Card.Header className="text-center">
					Iran University of Science and Technology
				</Card.Header>
				<Card.Body className="text-left">
					<Card.Text className="my-3">
						Project Manager:
						<span className="px-5 mx-5">Dr. Saeed Ebadollahi</span>
					</Card.Text>
					<hr />
					<Card.Text className="my-3">
						Email:
						<span className="px-5 mx-5">
							<Card.Link
								className="mx-5"
								href="https://mail.google.com"
							>
								s_ebadollahi@iust.ac.ir
							</Card.Link>
						</span>
					</Card.Text>
					<hr />

					<Card.Text className="my-3">
						Phone:
						<span className="mx-5" dir="ltr">
							+98 21 7322 5626
						</span>
					</Card.Text>
					<hr />
					<Card.Text className="my-3">
						Faculty Website:
						<Card.Link
							className="mx-4"
							dir="ltr"
							href="http://ee.iust.ac.ir"
						>
							http://ee.iust.ac.ir
						</Card.Link>
					</Card.Text>
					<hr />
					<Card.Text className="my-3">
						Instagram:
						<Card.Link
							className="mx-5 px-5"
							dir="ltr"
							href="https://instagram.com/iust.ac"
						>
							@iust.ac
						</Card.Link>
					</Card.Text>
					<hr />

					<Card.Text className="my-3 text-center">
						A brief description of the project and the School of Electrical Engineering - Control Systems.
					</Card.Text>
					<hr />
				</Card.Body>
			</Card>
			<hr />
			<Card
				style={{lineHeight: `${lineHeight}rem` }}
				border="danger"
				className="simple-single-card"

			>
				<Card.Header className="text-center">
					Design & Developer: thcpp
				</Card.Header>
				<Card.Body className="text-left">
					<Card.Text className="my-3">
						Name:
						<span class="mx-5 px-5">
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pedram Makanparast
						</span>
						<br />
						<span class="mx-5 px-5">
                        &nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Graduate, Electrical Engineering - Control
						</span>
					</Card.Text>
					<hr />

					<Card.Text className="my-3">
						Email:&nbsp;&nbsp;&nbsp;&nbsp;
						<span class="mx-5 px-5">
							<a href="https://mail.google.com">
								thcplusplus@gmil.com
							</a>
						</span>
						<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<span class="mx-5 px-5">
							<a href="https://mail.google.com">
								p4ya.py@gmail.com
							</a>
						</span>
					</Card.Text>
					<hr />

					<Card.Text className="my-3">
						Phone:
						<span dir="ltr" className="px-5">
							+98 911 883 9554
						</span>
					</Card.Text>

					<hr />

					<Card.Text className="my-3">
						GitHub:
						<Card.Link
							dir="ltr"
							className="mx-5 px-5"
							href="https://github.com/pya-h"
						>
							https://github.com/pya-h
						</Card.Link>
					</Card.Text>
					<hr />

					<Card.Text dir="ltr" className="my-3 mx-5 px-5 text-center">
						About:

                        I was a Not-Interested electrical engineering student, who loved programming so much!
                        This project is 100% and completely coded by me and only me. I've worked my whatever off for this!
                        Just consider that.
					</Card.Text>
					<hr />
				</Card.Body>
			</Card>
		</Fragment>
	);
};

export default ContactUs;
