import { Notify } from "./../../tools/notification";

export const T3DLogic = {
    Rules: { TurnTimeOut: 45 }, //secs
    initiate: (dimension) => {
        let indexes = [];
        for (let i = 0; i < dimension; i++) indexes.push(i);
        return {
            empties: dimension * dimension * dimension,
            table: indexes.map(() =>
                indexes.map(() => indexes.map(() => null))
            ),
            myTurn: Math.floor(Math.random() * 2),
        };
    },
    getButtonCoordinates: (dim, { floor, row, column }) =>
        floor * dim * dim + row * dim + column,
    getCellCoordinates: (cellID, dimen) => {
        const cellFloor = Math.floor(cellID / (dimen * dimen));
        const onFloorId = cellID % (dimen * dimen);
        const cellRow = Math.floor(onFloorId / dimen);
        const cellColumn = onFloorId % dimen;
        // just test a random id to see how above formula works!
        return { floor: cellFloor, row: cellRow, column: cellColumn };
    },
    endThisGame: ({ players, myTurn }, onClose) => {
        const oppTurn = Number(!myTurn);
        //NOTE: u can deliver this message to socket global to make sure toast shows all the tie but its no need really :|
        if (players[myTurn].score > players[oppTurn].score)
            Notify("شما برنده شدید و سه امتیاز کسب کردید");
        else if (players[myTurn].score === players[oppTurn].score)
            Notify("شما مساوی شدید و یک امتیاز کسب کردید");
        else Notify("شما باختید");
        //reset everything:
        onClose();
    },
    inspectAreaAroundTheCell: ({ floor, row, column }, { players, table, dimension },
        connectScoreLines
    ) => {
        // inpect the table in all ways around a selected cell (new selected one), to update points and color the score routes
        // is it needed to write a inspectAll method ?
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
            connectScoreLines(
                floor * dimension * dimension + row * dimension,
                1,
                playerInTheCell - 1
            );
        columnCount === dimension &&
            connectScoreLines(
                floor * dimension * dimension + column,
                dimension,
                playerInTheCell - 1
            );
        floorMainDiagCount === dimension &&
            connectScoreLines(
                floor * dimension * dimension,
                dimension + 1,
                playerInTheCell - 1
            );
        floorSideDiagCount === dimension &&
            connectScoreLines(
                floor * dimension * dimension + (dimension - 1),
                dimension - 1,
                playerInTheCell - 1
            );
        tableMainDiagCount === dimension &&
            connectScoreLines(
                0,
                dimension * (dimension + 1) + 1,
                playerInTheCell - 1
            );
        tableSideDiagCount === dimension &&
            connectScoreLines(
                dimension - 1,
                dimension * (dimension + 1) - 1,
                playerInTheCell - 1
            );
        tableAltitudeCount === dimension &&
            connectScoreLines(
                row * dimension + column,
                dimension * dimension,
                playerInTheCell - 1
            );
        tableRowFloorMainDiagCount === dimension &&
            connectScoreLines(
                row * dimension,
                dimension * dimension + 1,
                playerInTheCell - 1
            );
        tableRowFloorSideDiagCount === dimension &&
            connectScoreLines(
                (row + 1) * dimension - 1,
                dimension * dimension - 1,
                playerInTheCell - 1
            );
        tableColumnFloorMainDiagCount === dimension &&
            connectScoreLines(
                column,
                dimension * (dimension + 1),
                playerInTheCell - 1
            );
        tableColumnFloorSideDiagCount === dimension &&
            connectScoreLines(
                dimension * (dimension - 1) + column,
                dimension * (dimension - 1),
                playerInTheCell - 1
            );
    },
};