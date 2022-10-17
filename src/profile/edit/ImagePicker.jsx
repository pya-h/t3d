import { Col, Form, Image, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Notify } from "./../../tools/notification";
import './avatar.css';
const ImagePicker = ({ selector }) => {
	const [preview, setPreview] = useState(null);
	const me = useSelector((state) => state.me);

	const { avatar } = me ? me : { avatar: null };
	useEffect(() => {
		setPreview(avatar);
	}, [avatar]);
	const updatePreview = (imageFile) => {
		try {
			selector(imageFile);
			const oFReader = new FileReader();
			oFReader.readAsDataURL(imageFile);

			oFReader.onload = (oFREvent) => {
				setPreview(oFREvent.target.result);
			};
		} catch (err) {
			Notify("پیش نمایش فایل انتخابی با مشکل رو به رو شد.");
		}
	};

	return (
		<Form.Group>
			<Row>
				<Col className="text-center" sm={4} xs={4} md={3} lg={2}>
					<Image
						className="friends-section-avatar"
						src={preview}
						rounded
					/>
				</Col>
				<Col
					className="dropbox-rectangle">
					<Form.Control
						className="btn-outline-primary file-picker-control"
						type="file"
						id="filepicker"
						onChange={(e) => updatePreview(e.target.files[0])}
						accept=".jpg,.jpeg,.png"
						required
						onInput={(e) => e.target.setCustomValidity("")}
						onInvalid={(e) =>
							e.target.setCustomValidity(
								"ابتدا عکس مورد نظر را از اینجا انتخاب کنید"
							)
						}
					/>
				</Col>
			</Row>
			<Row>
				<Form.Label
					htmlFor="filepicker"
					className="btn-outline-primary file-picker-label animated-button">
					با کلیک روی اینجا عکس خود را انتخاب کنید و یا فایل آن را
					بکشید و در وسط کادر سبز رنگ رها کنید ...
				</Form.Label>
			</Row>
		</Form.Group>
	);
};

export default ImagePicker;
