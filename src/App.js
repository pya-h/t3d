import { ToastContainer } from "react-toastify";
import NavigationBar from "./commons/NavigationBar";
import GlobalStates from "./globals/state/GlobalStates";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./commons/MainRouter";
import { useSelector } from "react-redux";
import GlobalSocketManager from "./services/ws/GlobalSocketManager";

const App = () => {
	const me = useSelector((state) => state.me);
	return (
		<BrowserRouter>
			<ToastContainer />
			<GlobalStates>
				{me && <GlobalSocketManager />}
				<NavigationBar />
				<MainRouter />
			</GlobalStates>
		</BrowserRouter>
	);
};

export default App;
