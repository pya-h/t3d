//ONLY for class components: purpose: using redux in class components
import { connect } from "react-redux";
import { UpdateScoreboard, EnterRoom, CloseOngoingGame, RegisterMultiplayer } from "./actions/game";
import { LoadThisPlayer } from "./actions/player";
import { RegisterSinglePlayer } from './actions/game';

// useSelector for functional components
// state==>props : redux

function withReduxDashboard(component) {
    const mapStateToProps = (state) => ({
        me: state.me,
        opponent: state.opponent,
        room: state.room,
        scoreboard: state.scoreboard,
        tools: state.tools,
        game: state.game
    });

    const mapDispatchToProps = (dispatch) => ({
        LoadThisPlayer: (userID) => dispatch(LoadThisPlayer(userID)),
        EnterRoom: (room) => dispatch(EnterRoom(room)),
        UpdateScoreboard: (details) => dispatch(UpdateScoreboard(details)),
        RegisterMultiplayer: (gameID) => dispatch(RegisterMultiplayer(gameID)),
        CloseOngoingGame: () => dispatch(CloseOngoingGame()),
        RegisterSinglePlayer: (dimension, scoreless, difficulty) => dispatch(RegisterSinglePlayer(dimension, scoreless, difficulty))
    });
    return connect(mapStateToProps, mapDispatchToProps)(component);
}

export default withReduxDashboard;