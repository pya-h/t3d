import { render } from "react-dom";
import App from "./App.js";
import { Provider } from "react-redux";
import { store } from "./globals/redux/store/index";

render(
	<Provider store={store}>
			<App />
	</Provider>,
	document.getElementById("root")
);
