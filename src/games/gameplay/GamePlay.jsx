import { Component } from "react";
import "../games.css";
import {
	connect,
	createSocketRequest,
} from "../../services/ws/gamePlaySocketServices";
import withReduxDashboard from "../../globals/redux/withReduxDashboard";
import { withRouter } from "react-router";
import TableDesign from "./TableDesign";
import { GameSetting, Routes } from "../../services/configs";
import { Attention, Notify, Sorry } from "../../tools/notification";
import { toTimeShort } from "../../tools/format";

class GamePlay extends Component {
	//**** game resets on device change. fix it */
	state = {
		players: [
			{
				// ID: '',
				shape: <i className="fa fa-times" aria-hidden="true" />, // "X" : some device may not support font-awsome
				color: "blue",
				lineColor: "primary",
				score: 0,
			},
			{
				// ID: '',
				shape: <i className="fa fa-sun-o" aria-hidden="true" />, // "O" : some device may not support font-awsome
				color: "darkred",
				lineColor: "danger",
				score: 0,
			},
		], // maybe use player actual user name and change this item to an object of objects?
		turn: 0, // start turn is decided by throwning dices
		dimension: 3,
		table: null,
		myTurn: undefined, // change this
		gameID: null,
		socketGamePlay: undefined,
		playerOnline: true,
		timeRemaining: 0, //create a config
		timerID: null,
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

	syncPlayersTurnTimer = (t0) => {
		const remaining =
			GameSetting.T3D.TurnTimeOut - (Date.now() - t0) / 1000;
		this.setState({ timeRemaining: Math.floor(remaining) });
		//is it needed to declare timerID as state?
		if (this.state.timerID) clearInterval(this.state.timerID);
		const timerID = setInterval(() => {
			const { timeRemaining, timerID } = this.state;
			if (timeRemaining <= 0) {
				const { socketGamePlay } = this.state;
				const { room } = this.props;
				clearInterval(timerID);
				this.setState({ timerID: null });
				socketGamePlay.send(
					createSocketRequest("ban_move", room.name, null)
				);
				return;
			}
			this.setState({ timeRemaining: this.state.timeRemaining - 1 });
		}, 1000);
		this.setState({ timerID });
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
		const { connectionCheckTimerID, timerID } = this.state;
		clearTimeout(connectionCheckTimerID);
		clearTimeout(timerID); //move time out timer
	};

	socketOnMessage = (response) => {
		const { data } = response;
		const { cmd, msg } = JSON.parse(data);
		const { surrender } = this.props;
		if (this.props.location.pathname === Routes.Client.GameDeck) {
			if (cmd === "START") {
				const startTime = toTimeShort(msg);
				//edit !surrender part
				!surrender && Attention(`بازی راس ساعت ${startTime} آغاز شد.`);
			} else if (cmd === "GAME") {
				const { IDs, dimension, myTurn } = msg;
				this.setState({ dimension, myTurn });
				const opponentID = IDs[Number(!myTurn)];
				const { opponent, LoadThisPlayer } = this.props;
				if (!opponent && opponentID && !surrender)
					//ithink !surrender must be removed
					//if opponent is not null -> means this was called before and there's no need to run again
					LoadThisPlayer(opponentID);
			} else if (cmd === "LOAD") {
				this.updatePlayerStates(msg);
				const { table, t0 } = msg;
				console.log(msg);
				this.setState({
					table,
				});
				this.updatePlayerStates(msg);
				this.updateGameScorebaord();
				this.syncPlayersTurnTimer(t0);
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
						this.getCellCoordinates(cellID, dimension),
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
					this.syncPlayersTurnTimer(t0);
				} else if (cmd === "MOVE_MISSED") {
					const { turn, t0 } = msg;
					//msg --> forced set turn
					this.setState({ turn });
					this.syncPlayersTurnTimer(t0);
				} else if (cmd === "NOT_AUTHORIZED") {
					Sorry(
						"نشست شما منقضی شده، لطفا دوباره وارد حساب کاربری خود شوید"
					);
					// signOut();
				} else if (cmd === "END") {
					this.updatePlayerStates(msg);
					this.endThisGame();
					this.disableAllTimers();
				} else if (cmd === "CLOSE") {
					Attention(
						"بدلیل حاضر نبودن هیچ کدام از بازیکینان، بازی شما کنسل شد"
					);
					this.closeThisGame();
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
			//if there is a next job --> then player is sending a move or something important and
			//time out needs to be called quicker 'cause players have timeout in serimport { LoadPlayer } from './../../globals/redux/actions/player';
			//time out needs to be called quicker 'cause players have timeout in server for sending moves
		}
	};

	enableConnectionCheckTimer = () => {
		return setInterval(() => {
			if (window.navigator.onLine) { 
				if (!this.state.playerOnline) { // user comming bacvk online just now
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

		const { room, surrender } = this.props;
		this.setState({ dimension: room.type });
		this.loadCurrentGame();

		this.setState({
			connectionCheckTimerID: this.enableConnectionCheckTimer(),
		});
	}

	componentWillUnmount() {
		this.disableAllTimers();
	}
	getCellCoordinates = (cellID, dimen) => {
		const cellFloor = Math.floor(cellID / (dimen * dimen));
		const onFloorId = cellID % (dimen * dimen);
		const cellRow = Math.floor(onFloorId / dimen);
		const cellColumn = onFloorId % dimen;
		// just test a random id to see how above formula works!
		return { floor: cellFloor, row: cellRow, column: cellColumn };
	};
	onEachCellClick = (event) => {
		const { dimension, turn, myTurn, table } = this.state;
		const { opponent, room } = this.props;
		if (opponent && turn === myTurn) {
			try {
				const selectedCellButton = event.target;

				const cell = this.getCellCoordinates(
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
			tempTable[cell.floor][cell.row][cell.column] = turn; //maybe its better to use players actual Id huh?
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

			this.inspectAreaAroundTheCell(cell.floor, cell.row, cell.column);

			return true;
		}
		return false;
	};

	inspectAreaAroundTheCell = (floor, row, column) => {
		// inpect the table in all ways around a selected cell (new selected one), to update points and color the score routes
		// is it needed to write a inspectAll method ?
		const { players, table, dimension } = this.state;
		const playerInTheCell = table[floor][row][column];
		let rowCount = 0,
			columnCount = 0,
			floorMainDiagCount = 0,
			floorSideDiagCount = 0,
			tableMainDiagCount = 0,
			tableSideDiagCount = 0,
			tableAltitudeCount = 0,
			tableRowFloorMainDiagCount = 0,
			tableRowFloorSideDiagCount = 0,
			tableColumnFloorMainDiagCount = 0,
			tableColumnFloorSideDiagCount = 0;
		for (let i = 0; i < dimension; i++) {
			if (table[floor][row][i] === playerInTheCell) rowCount++; // inspect in a row
			if (table[floor][i][column] === playerInTheCell) columnCount++; // inspect in a column
			if (table[i][row][column] === playerInTheCell) tableAltitudeCount++; // inspect in a altitude line
			if (row === column) {
				if (table[floor][i][i] === playerInTheCell)
					floorMainDiagCount++; // inspect in a 2D main diagonal line through the cell's floor
				if (row === floor && table[i][i][i] === playerInTheCell)
					tableMainDiagCount++; // inspect in a 3D main diagonal line through the whole table
			}
			if (row + column + 1 === dimension) {
				if (table[floor][i][dimension - i - 1] === playerInTheCell)
					floorSideDiagCount++; // inpect in a 2D side Diagonal line through the cell's floor
				if (
					row === floor &&
					table[i][i][dimension - i - 1] === playerInTheCell
				)
					tableSideDiagCount++; // inspect in a 3D side diagonal line through the whole table
			}
			if (floor === column && table[i][row][i] === playerInTheCell)
				tableRowFloorMainDiagCount++;
			if (
				floor + column + 1 === dimension &&
				table[i][row][dimension - i - 1] === playerInTheCell
			)
				tableRowFloorSideDiagCount++;
			if (floor === row && table[i][i][column] === playerInTheCell)
				tableColumnFloorMainDiagCount++;
			if (
				floor + row + 1 === dimension &&
				table[i][dimension - i - 1][column] === playerInTheCell
			)
				tableColumnFloorSideDiagCount++;
		}

		// now inspect whether a line has been made and take action for it
		// the actual purpose of lines below, is to convert cell:{floor, row, format} format to ButtonID format;
		// ButtonID (or cellID) format is an integer between 0 and (dimension^3)
		rowCount === dimension &&
			this.connectTheScoreLines(
				floor * dimension * dimension + row * dimension,
				1,
				players[playerInTheCell]
			);
		columnCount === dimension &&
			this.connectTheScoreLines(
				floor * dimension * dimension + column,
				dimension,
				players[playerInTheCell]
			);
		floorMainDiagCount === dimension &&
			this.connectTheScoreLines(
				floor * dimension * dimension,
				dimension + 1,
				players[playerInTheCell]
			);
		floorSideDiagCount === dimension &&
			this.connectTheScoreLines(
				floor * dimension * dimension + (dimension - 1),
				dimension - 1,
				players[playerInTheCell]
			);
		tableMainDiagCount === dimension &&
			this.connectTheScoreLines(
				0,
				dimension * (dimension + 1) + 1,
				players[playerInTheCell]
			);
		tableSideDiagCount === dimension &&
			this.connectTheScoreLines(
				dimension - 1,
				dimension * (dimension + 1) - 1,
				players[playerInTheCell]
			);
		tableAltitudeCount === dimension &&
			this.connectTheScoreLines(
				row * dimension + column,
				dimension * dimension,
				players[playerInTheCell]
			);
		tableRowFloorMainDiagCount === dimension &&
			this.connectTheScoreLines(
				row * dimension,
				dimension * dimension + 1,
				players[playerInTheCell]
			);
		tableRowFloorSideDiagCount === dimension &&
			this.connectTheScoreLines(
				(row + 1) * dimension - 1,
				dimension * dimension - 1,
				players[playerInTheCell]
			);
		tableColumnFloorMainDiagCount === dimension &&
			this.connectTheScoreLines(
				column,
				dimension * (dimension + 1),
				players[playerInTheCell]
			);
		tableColumnFloorSideDiagCount === dimension &&
			this.connectTheScoreLines(
				dimension * (dimension - 1) + column,
				dimension * (dimension - 1),
				players[playerInTheCell]
			);
	};

	// method below: checks each possible line(according to the condition that user gives it),
	// if the line is made colorifies the line and returns 1 ( as one single score for each line checked ), otherwise returns 0
	connectTheScoreLines = (firstCell, step, player) => {
		const { dimension, turn } = this.state;
		const { room } = this.props;
		for (let i = 0; i < dimension; i++) {
			this.cellButtons[
				firstCell + i * step
			].className = `game-table-cells btn btn-${player.lineColor}`;
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

	closeThisGame = () => {
		this.state.socketGamePlay.close();
		this.setState({ socketGamePlay: null });
		setTimeout(() => {
			this.props.CleanScoreboard();
			this.props.ResetOpponent();
			this.props.ExitRoom();
			this.props.history.replace("/"); // in competition mode must be send back to competition page
		}, 5000);
	};

	endThisGame = () => {
		const { players, myTurn } = this.state;
		const oppTurn = Number(!myTurn);
		//NOTE: u can deliver this message to socket global to make sure toast shows all the tie but its no need really :|
		if (players[myTurn].score > players[oppTurn].score)
			Notify("شما برنده شدید و سه امتیاز کسب کردید");
		else if (players[myTurn].score === players[oppTurn].score)
			Notify("شما مساوی شدید و یک امتیاز کسب کردید");
		else Notify("شما باختید");
		//reset everything:
		this.closeThisGame();
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

export default withRouter(withReduxDashboard(GamePlay));