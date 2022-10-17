
import { Route, Switch } from 'react-router-dom';
import { Routes } from '../services/configs';
import ProfilePanelLayout from './../layouts/ProfilePanelLayout';
import MyGamesAndFriends from './../profile/friendgames/MyGamesAndFriends';
import NoticeManager from './../profile/admin/NoticeManager';
import ChatRoom from './../chat/ChatRoom';
import AcountManager from './../profile/edit/AcountManager';
import MainLayout from '../layouts/MainLayout';
import GameDeck from './../games/GameDeck';
import GameGuide from './../informations/GameGuide';
import ContactUs from './../informations/ContactUs';
import ScoresTableContainer from './../tables/scores/ScoresTableContainer';
import SignUp from '../users/SignUp';
import RankingsContainer from '../tables/rankings/RankingsContainer';
import StudentsManagement from '../profile/admin/StudentsManagement';
import LeaguesManager from './../profile/admin/LeaguesManager';
import LeagueLayout from './../layouts/LeagueLayout';
import SingleGamePlay from '../games/gameplay/SingleGamePlay';
const MainRouter = () => {
	return (
		<Switch>
			<Route path={`${Routes.Client.Profile}/:path?`} exact>
				<ProfilePanelLayout>
					<Switch>
						<Route path={Routes.Client.MyGamesAndFriends}>
							<MyGamesAndFriends />
						</Route>
						<Route path={Routes.Client.ChatRoom}>
							<ChatRoom />
						</Route>
						<Route exact path={Routes.Client.Profile}>
							<AcountManager />
						</Route>
					</Switch>
				</ProfilePanelLayout>
			</Route>
			<Route path={`${Routes.Client.Admin}/:path?`} exact>
				<ProfilePanelLayout>
					<Switch>
						<Route path={Routes.Client.Notices}>
							<NoticeManager />
						</Route>
						<Route path={Routes.Client.LeaguesManager}>
							<LeaguesManager />
						</Route>
						<Route path={Routes.Client.StudentManagement}>
							<StudentsManagement />
						</Route>
					</Switch>
				</ProfilePanelLayout>
			</Route>
			<Route path={`${Routes.Client.League}/:path?`} exact>
				<LeagueLayout>
					<Switch>
						<Route path={Routes.Client.League}>
							<LeaguesManager />
						</Route>
					</Switch>
				</LeagueLayout>
			</Route>
			<Route>
				<MainLayout>
					<Switch>
						<Route path={Routes.Client.SignUp}>
							<SignUp />
						</Route>

						<Route path={Routes.Client.GameDeck}>
							<GameDeck />
						</Route>
						<Route path={Routes.Client.SingleGameplay}>
							<SingleGamePlay />
						</Route>
						<Route path={Routes.Client.Rankings}>
							<RankingsContainer />
						</Route>
						<Route path={Routes.Client.GameGuide}>
							<GameGuide />/
						</Route>
						<Route path={Routes.Client.ContactUs}>
							<ContactUs />
						</Route>

						<Route path={Routes.Client.Root} exact>
							<ScoresTableContainer />
						</Route>
					</Switch>
				</MainLayout>
			</Route>
		</Switch>
	);
};

export default MainRouter;
