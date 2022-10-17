import { toast } from "react-toastify";

export const Sorry = (text) => {
	toast.error(text, {
		// theme: "light",
		position: "top-right",
		closeOnClick: true,
		icon: (
			<i
				style={{ float: "right" }}
				className="fa fa-times"
				aria-hidden="true"></i>
		),
	});
};

export const OK = (text) => {
	toast.success(text, {
		// theme: "light",
		position: "top-left",
		closeOnClick: true,
		icon: (
			<i
				style={{ float: "right" }}
				className="fa fa-check"
				aria-hidden="true"></i>
		),
	});
};

export const Notify = (text) => {
	toast.info(text, {
		// theme: "light",
		position: "top-center",
		closeOnClick: true,
		icon: (
			<i
				style={{ float: "right" }}
				className="fa fa-info"
				aria-hidden="true"></i>
		),
	});
};

export const Attention = (text, onClick) => {
	/*toast.warn(text, {
        type: "colored",
        position: "top-center",
        closeOnClick: true,
        icon: <i style={{float:'right'}} className="fa fa-gavel" aria-hidden="true"></i>,
    });*/
	toast.warn(text, {
		type: "dark",
		position: "top-center",
		onClick, // check these two lines functionality to make sure they doesnt interfere with eachother
		closeOnClick: !Boolean(onClick), //if it has an onClick, then dont close it, but if it hasnt any onClick then set closeOnClick to true
		icon: (
			<i
				style={{ float: "right" }}
				className="fa fa-gavel"
				aria-hidden="true"></i>
		),
	});
};

//add maximum number of simultanious NewMsg s
export const NewMsg = ({ name, text }, onClick) => {
	toast(
		<p className="text-right">
			{`${name} : ${text}`}
		</p>,
		{
			type: "dark",
			position: "top-left",
			onClick,
			icon: (
				<i
					style={{ float: "right" }}
					className="fa fa-envelope-o px-2 py-1"
					aria-hidden="true"></i>
			),
		}
	);
};

export const Invitation = (by, accept, reject) => {
	toast(
		<p className="text-right text-primary">
			{`درخواست بازی ${by.type}*${by.type}*${by.type} از ${by.name}\n برای پذیرفتن دعوت کلیک کنید`}
		</p>,
		{
			position: "top-left",
			onClick: () => accept(by.ID, by.type),
			onClose: () => reject(),
			icon: (
				<i
					style={{ float: "right" }}
					className="fa fa-gamepad px-2 py-1"
					aria-hidden="true"></i>
			),
		}
	);
};
