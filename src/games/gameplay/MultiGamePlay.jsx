import { Component } from "react";
import "../games.css";
import {
    connect,
    createSocketRequest,
} from "../../services/ws/gamePlaySocketServices";
import withReduxDashboard from "../../globals/redux/withReduxDashboard";
import { withRouter } from "react-router";
import TableDesign from "./TableDesign";
import { Routes } from "../../services/configs";
import { Attention, Notify } from "../../tools/notification";
import { toTimeShort } from "../../tools/format";
import { T3DLogic } from "./GameLogics";
class MultiGamePlay extends Component {
    state = {
        players: [
            {
                // ID: '',
                shape: <i className="fa fa-times" aria-hidden="true" />, // "X" : some device may not support font-awsome
                text: "X",
                color: "blue",
                lineColor: "primary",
                score: 0,
            },
            {
                // ID: '',
                shape: <i className="fa fa-sun-o" aria-hidden="true" />, // "O" : some device may not support font-awsome
                text: "O",
                color: "darkred",
                lineColor: "danger",
                score: 0,
            },
        ], // maybe use player actual user name and change this item to an object of objects?
        turn: 0, // start turn is decided by throwning dices
        dimension: 3,
        table: null,
        myTurn: undefined, // change this
        socketGamePlay: undefined,
        playerOnline: true,
        timeRemaining: 0, //create a config
        deadlineID: null,
        connectionCheckTimerID: null,
    };

    constructor() {
        super();
        this.cellButtons = [];
    }

    updateGameScorebaord = () => {
        const { myTurn, players } = this.state;
        const oppTurn = Number(!myTurn);

        this.props.UpdateScoreboard({
            me: {
                index: myTurn,
                shape: players[myTurn].shape,
                score: players[myTurn].score,
            },
            opp: {
                index: oppTurn,
                shape: players[oppTurn].shape,
                score: players[oppTurn].score,
            },
        });
    };

    synchronizeDeadline = (t0) => {
        const remaining = T3DLogic.Rules.TurnTimeOut - (Date.now() - t0) / 1000;
        this.setState({ timeRemaining: Math.floor(remaining) });
        //is it needed to declare deadlineID as state?
        if (this.state.deadlineID) clearInterval(this.state.deadlineID);
        const deadlineID = setInterval(() => {
            const { timeRemaining, deadlineID } = this.state;
            if (timeRemaining > 0)
                this.setState({ timeRemaining: timeRemaining - 1 });
            else {
                const { socketGamePlay } = this.state;
                const { room } = this.props;
                clearInterval(deadlineID);
                this.setState({ deadlineID: null });
                socketGamePlay.send(
                    createSocketRequest("ban_move", room.name, null)
                );
            }
        }, 1000);
        this.setState({ deadlineID });
    };

    updatePlayerStates = ({ turn, xScore, oScore }) => {
        const players = [...this.state.players];
        players[0].score = xScore;
        players[1].score = oScore;
        this.setState({
            players,
            turn,
        });
        this.updateGameScorebaord();
    };

    disableAllTimers = () => {
        const { connectionCheckTimerID, deadlineID } = this.state;
        clearTimeout(connectionCheckTimerID);
        clearTimeout(deadlineID); //move time out timer
    };

    socketOnMessage = (response) => {
        const { data } = response;
        const { cmd, msg } = JSON.parse(data);
        const { surrender } = this.props;
        if (this.props.location.pathname === Routes.Client.GameDeck) {
            if (cmd === "START") {
                const startTime = toTimeShort(msg);
                //edit !surrender part
                const { players, myTurn } = this.state;
                if (!surrender) {
                    Notify(`بازی راس ساعت ${startTime} آغاز شد.`);
                    Attention(`مهره ی شما: ${players[myTurn].text}`);
                }
            } else if (cmd === "REMEMBER") {
                const { IDs, dimension, myTurn, gameID } = msg;
                this.setState({ dimension, myTurn });

                const { opponent, LoadThisPlayer, game, RegisterMultiplayer } =
                    this.props;
                const opponentID = IDs[Number(!myTurn)];
                if (!surrender) {
                    //ithink !surrender must be removed
                    //if opponent is not null -> means this was called before and there's no need to run again
                    !opponent && opponentID && LoadThisPlayer(opponentID);
                    !game && gameID && RegisterMultiplayer(gameID);
                }
            } else if (cmd === "LOAD") {
                this.updatePlayerStates(msg);
                const { table, t0 } = msg;
                this.setState({ table });
                this.updatePlayerStates(msg);
                this.updateGameScorebaord();
                this.synchronizeDeadline(t0);
            } else if (this.state.table) {
                if (cmd === "SCORES") this.updatePlayerStates(msg);
                else if (cmd === "UPDATE") {
                    const { room, me } = this.props;
                    const { dimension } = this.state;
                    const { newMove, t0 } = msg;
                    const cellID = Number(newMove.cellIndex);

                    //*************** */
                    //is this needed to check the move in client? considering that complete check has been made in client
                    //and consder that: checking move in client may cause some bugs
                    //for ex: new move is sent -> and 'cause of some error the cell is not empty
                    //turn is not updated and this player can not make new moves to recieve server's table!!!
                    this.verifyAndApplyTheMove(
                        T3DLogic.getCellCoordinates(cellID, dimension),
                        this.cellButtons[cellID]
                    );
                    //wrap it up this part of UPDATE and LOAD in a method
                    this.updatePlayerStates(newMove);

                    this.cellButtons[cellID].focus();
                    this.updateGameScorebaord();

                    // now inform the server that the move is recieved
                    //force connect it?
                    if (newMove.madeBy !== me.userID)
                        this.state.socketGamePlay.send(
                            createSocketRequest(
                                "move_recieved",
                                room.name,
                                true
                            )
                        );
                    // server time out is set and now setInterval for this client to show how much time left
                    this.synchronizeDeadline(t0);
                } else if (cmd === "MOVE_MISSED") {
                    const { turn, t0 } = msg;
                    //msg --> forced set turn
                    this.setState({ turn });
                    this.synchronizeDeadline(t0);
                } else if (cmd === "NOT_AUTHORIZED") {
                    Attention("لطفا وارد حساب کاربری خود شوید");
                    // signOut();
                } else if (cmd === "END") {
                    this.updatePlayerStates(msg);
                    T3DLogic.endThisGame(this.state, this.onCloseGame);
                    this.disableAllTimers();
                } else if (cmd === "CLOSE") {
                    Attention(
                        "بدلیل حاضر نبودن هیچ کدام از بازیکینان، بازی شما کنسل شد"
                    );
                    this.onCloseGame();
                } else if (cmd === "REGISTER_GAME") {
                    const { gameID } = msg;
                    gameID && this.props.RegisterMultiplayer(gameID);
                } else {
                    console.log("wrong socket request");
                }
            }
        }
    };

    forceConnectWS = async (nextJob) => {
        const { room } = this.props;

        try {
            let socket = await connect(room);
            socket.onmessage = this.socketOnMessage;
            this.setState({ socketGamePlay: socket });
            if (nextJob) nextJob();
        } catch (err) {
            console.log(err);
            // **********************
            //time out must be set with rising time out time to prevent server getting fucked up
            setTimeout(() => {
                console.log("rconnecting from GamePlay");
                this.forceConnectWS(nextJob);
            }, 3000);
        }
    };

    enableConnectionCheckTimer = () => {
        return setInterval(() => {
            if (window.navigator.onLine) {
                if (!this.state.playerOnline) {
                    // user comming bacvk online just now
                    //player JUST became online
                    this.setState({ playerOnline: true }); // toggle online status
                    this.forceConnectWS(null); // reconnect to gamePlayWebSocket
                }
            } else if (this.state.playerOnline) {
                //player JUST became offline
                this.setState({ playerOnline: false });
            }
        }, 2500); //2.5 sec is it ok?
    };

    loadCurrentGame = () => {
        const { room, surrender } = this.props;
        console.log(room);
        this.forceConnectWS(() => {
            this.state.socketGamePlay.send(
                createSocketRequest("load", room.name, null)
            );
            if (surrender) {
                this.state.socketGamePlay.send(
                    createSocketRequest("surrender", room.name, true)
                );
            }
        });
    };

    componentDidMount() {
        this.cellButtons = document.getElementsByClassName("game-table-cells"); // pay attension to searched className! may cause an error

        const { room } = this.props;
        this.setState({ dimension: room.type });
        this.loadCurrentGame();

        this.setState({
            connectionCheckTimerID: this.enableConnectionCheckTimer(),
        });
    }

    componentWillUnmount() {
        this.disableAllTimers();
    }

    onEachCellClick = (event) => {
        const { dimension, turn, myTurn } = this.state;
        const { opponent, room } = this.props;
        if (opponent && turn === myTurn) {
            try {
                const selectedCellButton = event.target;

                const cell = T3DLogic.getCellCoordinates(
                    selectedCellButton.id,
                    dimension
                );
                console.log(selectedCellButton.id, cell);
                if (this.verifyAndApplyTheMove(cell, selectedCellButton)) {
                    //this.forceConnectWS(() => {
                    this.state.socketGamePlay.send(
                        createSocketRequest(
                            "move",
                            room.name,
                            selectedCellButton.id
                        )
                    );
                    //});
                }
            } catch (err) {
                console.log(err);
                //load again here?
            }
        }
    };

    verifyAndApplyTheMove = (cell, cellButton) => {
        const { turn } = this.state;
        console.log(this.state.table);
        let tempTable = [...this.state.table];
        if (tempTable[cell.floor][cell.row][cell.column] === null) {
            tempTable[cell.floor][cell.row][cell.column] = turn + 1; //maybe its better to use players actual Id huh?
            this.setState({ table: tempTable });
            // cellButton.value = players[turn].shape;
            // cellButton.style.color = players[turn].color;
            cellButton.style.opacity = 0.0;
            setTimeout(() => {
                cellButton.className = `game-table-cells player-${
                    turn ? "o" : "x"
                }-cell animate-new-move`;
                cellButton.style.opacity = 1.0;
            }, 100);

            T3DLogic.inspectAreaAroundTheCell(
                cell,
                this.state,
                this.connectScoreLines
            );
            return true;
        }
        return false;
    };

    // method below: checks each possible line(according to the condition that user gives it),
    // if the line is made colorifies the line and returns 1 ( as one single score for each line checked ), otherwise returns 0
    connectScoreLines = (firstCell, step, index) => {
        const { dimension, turn, players } = this.state;
        const { room } = this.props;
        for (let i = 0; i < dimension; i++) {
            this.cellButtons[
                firstCell + i * step
            ].className = `game-table-cells btn btn-${players[index].lineColor}`;
            !room.scoreless &&
                setTimeout(() => {
                    this.cellButtons[
                        firstCell + i * step
                    ].className = `game-table-cells player-${
                        turn ? "o" : "x"
                    }-cell`;
                }, 1000 + i * 100);
        }
    };

    onCloseGame = () => {
        this.state.socketGamePlay.close();
        this.setState({ socketGamePlay: null });
        setTimeout(() => {
            this.props.CloseOngoingGame();
            this.props.history.replace("/"); // in competition mode must be send back to competition page
        }, 3000);
    };

    render() {
        return (
            <TableDesign
                dimension={this.state.dimension}
                players={this.state.players}
                table={this.state.table}
                turn={this.state.turn}
                timeRemaining={this.state.timeRemaining}
                onEachCellClick={this.onEachCellClick}
            />
        );
    }
}

export default withRouter(withReduxDashboard(MultiGamePlay));
