console.log("Hello, world!");

function createPlayer(sign) {
    return {
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


const player1 = createPlayer("X");
const player2 = createPlayer("O");

let gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

let player = player1;
const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        cell.textContent = player.sign;
        player = player === player1 ? player2 : player1;
    });
});

runGame(player1, player2);