import { T3DLogic } from "./GameLogics";
class ArtificialIntelligence {
    static LEVELS = { Noob: 0, Ordinary: 1, Pro: 2 };

    constructor(turn, table, level = this.LEVELS.Ordinary, dimenstion = 4) {
        // check level value
        this.level = level;
        this.dimension = dimenstion;
        // this.weights = [...table]; // non-zero cell weights are determined in this list
        // this.table = [...table];
        this.weights = T3DLogic.initiate(dimenstion).table; // non-zero cell weights are determined in this list
        this.table = [...table];
        this.turn = turn;
        this.moves = [];

        // put a random cell in weights as the ai's first move
    }

    update = (cell, player) => {
        // save new moves and update ai state
        this.moves.unshift({ ...cell, by: player }); // add new move to the beginning of the array moves
        this.table[cell.floor][cell.row][cell.column] = player + 1;
        this.weigh(cell);
    };

    weigh = ({ floor, row, column }) => {
        /* update weights of each cell that has intersection with this cell
            note: weight meaning:
                if this cell is full => weight = +-(dimension+1)^3 
                if it has no intersection (or equal intersections with both ai and players cell)=> weight = 0
                if it has intersections => weight = (number of all rival's intersections) - (number of all ai intersections)
                this is beacause we want to put more importance on defending rather than attacking
        */
        const playerInIntersection = this.table[floor][row][column]; // remember: turn is always one less
        const sign = this.turn + 1 === playerInIntersection ? -1 : +1; // connection with ai => sign is negative
        // connection with human player => sign is positive
        // this is just to put more importance on defence than attacking

        this.weights[floor][row][column] =
            sign *
            ((this.dimension + 1) *
                (this.dimension + 1) *
                (this.dimension + 1));
        // ***NOTE: YOU CAN SKIP THIS UNTIL EMPTIES HAS REACHED TO A CERTAIN VALUE***
        for (let i = 0; i < this.dimension; i++) {
            const value = this.turn + 1 === playerInIntersection ? 0 : +1; // connection with ai => sign is negative

            if (!this.table[floor][row][i])
                this.weights[floor][row][i] += value;
            if (!this.table[floor][i][column])
                this.weights[floor][i][column] += value;
            if (!this.table[i][row][column])
                this.weights[i][row][column] += value;
            if (row === column) {
                if (!this.table[floor][i][i])
                    this.weights[floor][i][i] += value;
                if (row === floor && !this.table[i][i][i])
                    this.weights[i][i][i] += value;
            }
            if (row + column + 1 === this.dimension) {
                if (!this.table[floor][i][this.dimension - i - 1])
                    this.weights[floor][i][this.dimension - i - 1] += value;
                if (row === floor && !this.table[i][i][this.dimension - i - 1])
                    this.weights[i][i][this.dimension - i - 1] += value;
            }
            if (floor === column && !this.table[i][row][i])
                this.weights[i][row][i] += value;
            if (
                floor + column + 1 === this.dimension &&
                !this.table[i][row][this.dimension - i - 1]
            )
                this.weights[i][row][this.dimension - i - 1] += value;
            if (floor === row && !this.table[i][i][column])
                this.weights[i][i][column] += value;
            if (
                floor + row + 1 === this.dimension &&
                !this.table[i][this.dimension - i - 1][column]
            )
                this.weights[i][this.dimension - i - 1][column] += value;
        }
    };

    heaviest = () => {
        let floor = -1,
            row = -1,
            column = -1;
        let maxWeight = 0;
        // find the heaviest cell (cell with greatest weight)
        // if there are multi => returns the last heaviest one
        const maxPossibleWeight = Math.pow(this.dimension, 3);
        for (let f = 0; f < this.dimension; f++) {
            for (let r = 0; r < this.dimension; r++) {
                for (let c = 0; c < this.dimension; c++) {
                    const weight = Math.abs(this.weights[f][r][c]);
                    if (
                        weight <= maxPossibleWeight && // this condistion means that the cell is empty
                        weight >= maxWeight
                    ) {
                        floor = f;
                        row = r;
                        column = c;
                        maxWeight = Math.abs(this.weights[floor][row][column]);
                    }
                }
            }
        }
        return { floor, row, column };
    };
    reaction = () => {
        switch (this.level) {
            case ArtificialIntelligence.LEVELS.Noob:
                // a noob ai just checks 2 last moves
                // last move is made by player
                // do .strike on player moves => defencing
                // the one to last move is made by ai
                // do .strike on ai move means => attacking
                return this.strike() || this.random(); // if there is no strike to do, then do a random move

            case ArtificialIntelligence.LEVELS.Ordinary:
                // when no strike:=>  weigh all empty cells
                // select a nonzero :
                return this.strike() || this.heaviest() || this.random(); // if there is no strike to do, then do a random move

            case ArtificialIntelligence.LEVELS.Pro: {
                // :todo
                return null;
            }
            default:
                // todo
                break;
        }
    };

    strike = () => {
        // depends on whose moves you send this method does defence or attack
        const movesToCheck =
            this.level !== ArtificialIntelligence.LEVELS.Noob
                ? this.moves
                : this.moves.slice(0, 2);
        for (const move of movesToCheck) {
            const { floor, row, column } = move;
            const playerInTheCell = this.table[floor][row][column];
            let count = 0,
                empty = -1; // index of the empty cell in a specific line (floor, row, column line)

            for (var i = 0; i < this.dimension; i++) {
                if (this.table[floor][row][i] === playerInTheCell) count++;
                // inspect in a row
                else if (!this.table[floor][row][i]) empty = i;
            }
            if (empty >= 0 && count === this.dimension - 1)
                return { floor, row, column: empty };

            for (i = 0, count = 0, empty = -1; i < this.dimension; i++) {
                if (this.table[floor][i][column] === playerInTheCell) count++;
                // inspect in a column
                else if (!this.table[floor][i][column]) empty = i;
            }
            if (empty >= 0 && count === this.dimension - 1)
                return { floor, row: empty, column };

            for (i = 0, count = 0, empty = -1; i < this.dimension; i++) {
                if (this.table[i][row][column] === playerInTheCell) count++;
                // inspect in a altitude line
                else if (!this.table[i][row][column]) empty = i;
            }
            if (empty >= 0 && count === this.dimension - 1)
                return { floor: empty, row, column };

            for (i = 0, count = 0, empty = -1; i < this.dimension; i++) {
                if (
                    row === column &&
                    this.table[floor][i][i] === playerInTheCell
                )
                    count++;
                // inspect in a 2D main diagonal line through the cell's floor
                else if (!this.table[floor][i][i]) empty = i;
            }
            if (empty >= 0 && count === this.dimension - 1)
                return { floor, row: empty, column: empty };

            for (i = 0, count = 0, empty = -1; i < this.dimension; i++) {
                if (
                    row === floor &&
                    row === column &&
                    this.table[i][i][i] === playerInTheCell
                )
                    count++;
                // inspect in a 3D main diagonal line through the whole this.table
                else if (!this.table[i][i][i]) empty = i;
            }
            if (empty >= 0 && count === this.dimension - 1)
                return {
                    floor: empty,
                    row: empty,
                    column: empty,
                };

            for (i = 0, count = 0, empty = -1; i < this.dimension; i++) {
                if (
                    row + column + 1 === this.dimension &&
                    this.table[floor][i][this.dimension - i - 1] ===
                        playerInTheCell
                )
                    count++;
                // inpect in a 2D side Diagonal line through the cell's floor
                else if (!this.table[floor][i][this.dimension - i - 1])
                    empty = i;
            }
            if (empty >= 0 && count === this.dimension - 1)
                return {
                    floor,
                    row: empty,
                    column: this.dimension - empty - 1,
                };

            for (i = 0, count = 0, empty = -1; i < this.dimension; i++) {
                if (
                    row + column + 1 === this.dimension &&
                    row === floor &&
                    this.table[i][i][this.dimension - i - 1] === playerInTheCell
                )
                    count++;
                // inspect in a 3D side diagonal line through the whole this.table
                else if (!this.table[i][i][this.dimension - i - 1]) empty = i;
            }
            if (empty >= 0 && count === this.dimension - 1)
                return {
                    floor: empty,
                    row: empty,
                    column: this.dimension - empty - 1,
                };

            for (i = 0, count = 0, empty = -1; i < this.dimension; i++) {
                if (
                    floor === column &&
                    this.table[i][row][i] === playerInTheCell
                )
                    count++;
                else if (!this.table[i][row][i]) empty = i;
            }
            if (empty >= 0 && count === this.dimension - 1)
                return {
                    floor: empty,
                    row,
                    column: empty,
                };

            for (i = 0, count = 0, empty = -1; i < this.dimension; i++) {
                if (
                    floor + column + 1 === this.dimension &&
                    this.table[i][row][this.dimension - i - 1] ===
                        playerInTheCell
                )
                    count++;
                else if (!this.table[i][row][this.dimension - i - 1]) empty = i;
            }
            if (empty >= 0 && count === this.dimension - 1)
                return {
                    floor: empty,
                    row,
                    column: this.dimension - empty - 1,
                };

            for (i = 0, count = 0, empty = -1; i < this.dimension; i++) {
                if (
                    floor === row &&
                    this.table[i][i][column] === playerInTheCell
                )
                    count++;
                else if (!this.table[i][i][column]) empty = i;
            }
            if (empty >= 0 && count === this.dimension - 1)
                return {
                    floor: empty,
                    row: empty,
                    column,
                };

            for (i = 0, count = 0, empty = -1; i < this.dimension; i++) {
                if (
                    floor + row + 1 === this.dimension &&
                    this.table[i][this.dimension - i - 1][column] ===
                        playerInTheCell
                )
                    count++;
                else if (!this.table[i][this.dimension - i - 1][column])
                    empty = i;
            }
            if (empty >= 0 && count === this.dimension - 1)
                return {
                    floor: empty,
                    row: this.dimension - empty - 1,
                    column,
                };
        }
        return null;
    };

    defend = () => {};

    attack = () => {};

    random = (dimension) => {
        let floor = 0,
            row = 0,
            column = 0;
        do {
            [floor, row, column] = [1, 2, 3].map((test) =>
                Math.floor(Math.random() * this.dimension)
            );
        } while (this.table[floor][row][column]);
        return { floor, row, column };
    };
}

export default ArtificialIntelligence;
