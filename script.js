const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function createPlayer(name, sign) {
    return {
        name,
        sign
    }
}

function placeSign(player, row, col) {
    if (row >= 0 && row < 3 && col >= 0 && col < 3 && gameBoard[row][col] == null) {
        gameBoard[row][col] = player.sign;
        return true;
    } else {
        return false;
    }
}

function checkWin(player) {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (gameBoard[i][0] === player.sign && gameBoard[i][1] === player.sign && gameBoard[i][2] === player.sign) {
            return true;
        }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
        if (gameBoard[0][i] === player.sign && gameBoard[1][i] === player.sign && gameBoard[2][i] === player.sign) {
            return true;
        }
    }

    // Check diagonals
    if (gameBoard[0][0] === player.sign && gameBoard[1][1] === player.sign && gameBoard[2][2] === player.sign) {
        return true;
    }
    if (gameBoard[0][2] === player.sign && gameBoard[1][1] === player.sign && gameBoard[2][0] === player.sign) {
        return true;
    }

    // No win
    return false;
}

function checkDraw() {
    for (let row of gameBoard) {
        if (row.includes(null)) {
            return false;
        }
    }
    return true;
}

function runGame(player1, player2) {
    let isDone = false;

    function nextTurn(player) {
        readline.question('Enter your row coordinate: ', x => {
            let row = parseInt(x);
            readline.question('Enter your column coordinate: ', y => {
                let col = parseInt(y);
                if (placeSign(player, row, col)) {
                    console.log(gameBoard);
                    if (checkWin(player)) {
                        console.log(`${player.name} Wins!`);
                        isDone = true;
                        readline.close();
                    } else if (checkDraw()) {
                        console.log("It's a draw!");
                        isDone = true;
                        readline.close();
                    } else {
                        nextTurn(player === player1 ? player2 : player1);
                    }
                } else {
                    console.log("Invalid move, try again.");
                    nextTurn(player);
                }
            });
        });
    }

    nextTurn(player1);
}

const player1 = createPlayer("rodney", "X");
const player2 = createPlayer("low", "O");

let gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

runGame(player1, player2);