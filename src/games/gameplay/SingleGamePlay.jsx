import { Component } from "react";
import withReduxDashboard from "../../globals/redux/withReduxDashboard";
import TableDesign from "./TableDesign";
import GlobalContext from "../../globals/state/GlobalContext";
import { T3DLogic } from "./GameLogics";
import { Routes } from "../../services/configs";
import ArtificialIntelligence from "./ArtificialIntelligence";

class SingleGamePlay extends Component {
    static contextType = GlobalContext;

    state = {
        players: [
            {
                // ID: '',
                shape: <i className="fa fa-times pulsing-item p-0" aria-hidden="true" style={{width: "15px", height: "15px"}} />, // "X" : some device may not support font-awsome
                color: "blue",
                lineColor: "primary",
                score: 0,
            },
            {
                // ID: '',
                shape: <i className="fa fa-sun-o pulsing-item p-0" aria-hidden="true" style={{width: "15px", height: "15px"}} />, // "O" : some device may not support font-awsome
                color: "darkred",
                lineColor: "danger",
                score: 0,
            },
        ], // maybe use player actual user name and change this item to an object of objects?
        turn: 1, // after calling rescheduleDeadline in componentDidMount => turn ===0
        dimension: 4,
        table: null,
        empties: 64,
        myTurn: undefined, // change this
        timeRemaining: 0, //create a config
        deadlineID: null,
        ai: null,
    };

    constructor() {
        super();
        this.cellButtons = [];
    }

    componentDidMount() {
        const { game } = this.props;
        if (game) {
            this.cellButtons =
                document.getElementsByClassName("game-table-cells"); // pay attension to searched className! may cause an error
            const { dimension, table, myTurn, empties } = game;
            const ai = new ArtificialIntelligence(
                +!myTurn,
                table,
                game.difficulty,
                dimension
            );
            this.setState({ table, myTurn, dimension, empties, ai });
            this.rescheduleDeadline();
            setTimeout(() => {
                this.updateGameScorebaord();
            }, 2000);
        } else {
            this.context.goTo(Routes.Client.GameDeck);
        }
    }

    componentWillUnmount() {
        const { deadlineID } = this.state;
        clearTimeout(deadlineID); //move time out timer
        // edit this later; SINGLE GAME PLAYER MUST ALSO BE SAVED UPON EXIT
        this.props.CloseOngoingGame();
    }
    updateGameScorebaord = () => {
        const { myTurn, players } = this.state;
        const oppTurn = +!myTurn;

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

    rescheduleDeadline = () => {
        const { turn } = this.state;
        this.setState({
            timeRemaining: Math.floor(T3DLogic.Rules.TurnTimeOut),
            turn: (turn + 1) % 2,
        });
        //is it needed to declare deadlineID as state?
        if (this.state.deadlineID) clearInterval(this.state.deadlineID);
        const deadlineID = setInterval(() => {
            const { timeRemaining, turn, myTurn } = this.state;
            if (turn !== myTurn) this.react();
            else if (timeRemaining > 0)
                this.setState({ timeRemaining: timeRemaining - 1 });
            else this.rescheduleDeadline();
        }, 1000);
        this.setState({ deadlineID });
    };

    react = () => {
        try {
            const { table, dimension, turn, myTurn, ai } = this.state;
            const nextMove = ai.reaction(table);
            if (nextMove && turn !== myTurn) {
                const verified = this.verifyAndApplyTheMove(
                    nextMove,
                    this.cellButtons[
                        T3DLogic.getButtonCoordinates(dimension, nextMove)
                    ]
                );
                if (verified) {
                    ai.update(nextMove, ai.turn);
                } else {
                    // sth went wrong (cell was full)
                }
            } else {
                //error happened
            }
        } catch (err) {
            console.log(err);
        }
    };
    onEachCellClick = (event) => {
        const { dimension, turn, myTurn, ai } = this.state;
        console.log(this.state);
        if (turn === myTurn) {
            try {
                const selectedCellButton = event.target;

                const cell = T3DLogic.getCellCoordinates(
                    selectedCellButton.id,
                    dimension
                );
                if (this.verifyAndApplyTheMove(cell, selectedCellButton)) {
                    ai.update(cell, myTurn);
                    // setTimeout(() => this.react(), 1000);
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            // ??wtf
        }
    };

    verifyAndApplyTheMove = (cell, cellButton) => {
        const { turn } = this.state;

        let tempTable = [...this.state.table];
        cellButton.focus();
        if (tempTable[cell.floor][cell.row][cell.column] === null) {
            tempTable[cell.floor][cell.row][cell.column] = turn + 1; //maybe its better to use players actual Id huh?
            this.setState({ table: tempTable });

            cellButton.style.opacity = 0.0;
            setTimeout(() => {
                cellButton.className = `game-table-cells player-${
                    turn ? "o" : "x"
                }-cell animate-new-move`;
                cellButton.style.opacity = 1.0;
            }, 100);
            --this.state.empties;

            T3DLogic.inspectAreaAroundTheCell(
                cell,
                this.state,
                this.connectScoreLines
            );
            if (this.state.empties <= 0)
                T3DLogic.endThisGame(this.state, this.onCloseGame);
            else this.rescheduleDeadline();

            return true;
        }
        return false;
    };

    // method below: checks each possible line(according to the condition that user gives it),
    // if the line is made colorifies the line and returns 1 ( as one single score for each line checked ), otherwise returns 0
    connectScoreLines = (firstCell, step, index) => {
        const { dimension, turn } = this.state;
        const players = [...this.state.players];
        const { game } = this.props;
        for (let i = 0; i < dimension; i++) {
            this.cellButtons[
                firstCell + i * step
            ].className = `game-table-cells btn btn-${players[index].lineColor}`;
            !game.scoreless &&
                setTimeout(() => {
                    this.cellButtons[
                        firstCell + i * step
                    ].className = `game-table-cells player-${
                        turn ? "o" : "x"
                    }-cell`;
                }, 1000 + i * 100);
        }
        ++players[index].score;
        this.setState({ players });
        this.updateGameScorebaord();
        if (game.scoreless) this.state.empties = 0;
    };

    /***************END THIS GAME IS IN GAMELOGICS */
    onCloseGame = () => {
        clearTimeout(this.state.deadlineID);
        setTimeout(() => {
            this.props.CloseOngoingGame();
            this.context.goTo("/");
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

export default withReduxDashboard(SingleGamePlay);
