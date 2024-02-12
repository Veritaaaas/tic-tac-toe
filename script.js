console.log("Hello, world!");

function createPlayer(sign, score) {
    return {
        sign,
        score
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


const reset = document.querySelector('#reset');

const player1 = createPlayer("X", 0);
const player2 = createPlayer("O", 0);
const cells = document.querySelectorAll('.cell');
const player1_score = document.querySelector('#player1').getElementsByTagName("h3")[1];
const player2_score = document.querySelector('#player2').getElementsByTagName("h3")[1];
const tie_score = document.querySelector('#tie').getElementsByTagName("h3")[1];


let gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

let player = player1;

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        let row = Math.floor(index / 3);
        let col = index % 3;

        if (cell.textContent === "" && placeSign(player, row, col)) {
            cell.textContent = player.sign;

            if(checkWin(player)) {
                alert(player.sign + " wins!");
                if (player.sign === "X") {
                    player1_score.textContent = player.score + 1;
                } else {
                    player2_score.textContent = player.score + 1;
                }
            } else if (checkDraw()) {
                alert("It's a draw!");
                tie_score.textContent = parseInt(tie_score.textContent) + 1;
            }

            player = player === player1 ? player2 : player1;
        }
    });
});

reset.addEventListener('click', () => {
    gameBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    cells.forEach((cell) => {
        cell.textContent = "";
    });

    player1.score = 0;
    player2.score = 0;

    player1_score.textContent = 0;
    player2_score.textContent = 0;
    tie_score.textContent = 0;
});

