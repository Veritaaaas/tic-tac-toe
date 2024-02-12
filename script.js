const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function createPlayer(name, sign, state) {
    return {
        name,
        sign,
        state
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

function runGame(player1, player2) {
    let row = 0;
    let col = 0;

    readline.question('Enter your row coordinate: ', x => {
        row = parseInt(x);
        readline.question('Enter your column coordinate: ', y => {
            col = parseInt(y);
            placeSign(player1, row, col);
            console.log(gameBoard);
            readline.close();
        });
    });
}

const player1 = createPlayer("rodney", "X", []);
const player2 = createPlayer("low", "O", []);

let gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

runGame(player1, player2);