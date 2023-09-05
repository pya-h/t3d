import { Card, Container, Row } from "react-bootstrap";
import "./info.css";
import { Fragment, useEffect, useState } from "react";

const ContactUs = () => {
    const [lineHeight, setLineHeight] = useState(1);

    useEffect(() => setLineHeight(5), []);
	return (
		<Fragment>
			<Card
				style={{ fontSize: "140%", lineHeight: `${lineHeight}rem` }}
				border="dark"
				className="simple-single-card"
			>
				<Card.Header className="text-center">
					دانشگاه علم و صنعت ایران
				</Card.Header>
				<Card.Body className="text-right">
					<Card.Text className="my-3">
						مدیر پروژه:‌
						<span className="px-5 mx-5">دکتر سعید عباداللهی</span>
					</Card.Text>
					<hr />
					<Card.Text className="my-3">
						ایمیل:
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
						شماره تماس:
						<span className="mx-5" dir="ltr">
							+98 21 7322 5626
						</span>
					</Card.Text>
					<hr />
					<Card.Text className="my-3">
						سایت دانشکده:
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
						اینستاگرام:
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
						توضیح مختصر درباره پروژه و دانشکده مهندسی برق کنترل.
					</Card.Text>
					<hr />
				</Card.Body>
			</Card>
			<hr />
			<Card
				style={{ fontSize: "140%", lineHeight: `${lineHeight}rem` }}
				border="danger"
				className="simple-single-card"

			>
				<Card.Header className="text-center">
					طراح و برنامه نویس: thcpp
				</Card.Header>
				<Card.Body className="text-right">
					<Card.Text className="my-3">
						نام:
						<span class="mx-5 px-5">
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;پدرام مکان پرست
						</span>
						<br /> <br />
						<span class="mx-5 px-5">
                        &nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;فارغ
							التحصیل رشته مهندسی برق - کنترل
						</span>
					</Card.Text>
					<hr />

					<Card.Text className="my-3">
						ایمیل:&nbsp;&nbsp;&nbsp;&nbsp;
						<span class="mx-5 px-5">
							<a href="https://mail.google.com">
								thcplusplus@gmil.com
							</a>
						</span>
						<span class="mx-5 px-5">
							<a href="https://mail.google.com">
								p4ya.py@gmail.com
							</a>
						</span>
					</Card.Text>
					<hr />

					<Card.Text className="my-3">
						شماره تماس:
						<span dir="ltr" className="px-5">
							+98 911 883 9554
						</span>
					</Card.Text>

					<hr />

					<Card.Text className="my-3">
						گیت هاب:
						<Card.Link
							dir="ltr"
							className="mx-5 px-5"
							href="https://github.com/pya-h"
						>
							@pya-h
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
