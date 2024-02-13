console.log("Hello, world!");

function createPlayer(name, sign, score) {
    return {
        name,
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

function showGameOverModal(winner) 
{
    let modal = document.querySelector('.modal');
    let winner_result = document.querySelector('#winner');

    winner_result.textContent = winner.name + " wins!";
    modal.style.display = "flex";
}

function drawGameOverModal()
{
    let modal = document.querySelector('.modal');
    let winner_result = document.querySelector('#winner');

    winner_result.textContent = "It's a draw!";
    modal.style.display = "flex";

}


const reset = document.querySelector('#reset');
const single_icon = document.querySelector('#computer');
const player_status = document.querySelector('#player-status');
const playAgainButton = document.querySelector('#play-again');
let isSinglePlayer = true;

let player1 = createPlayer("Player 1", "X", 0);
let player2 = createPlayer("Player 2", "O", 0);
let computer = createPlayer("Computer", "O", 0);
const turn = document.querySelector('.turn');
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

single_icon.addEventListener('click', () => {
    if (single_icon.className === "fa-solid fa-user") {
        single_icon.className = "fa-solid fa-user-group";
        player_status.textContent = "Two Players";
        isSinglePlayer = false;
        reset.click();
    } else {
        single_icon.className = "fa-solid fa-user";
        player_status.textContent = "Single Player";
        isSinglePlayer = true;
        reset.click();
    }
});


cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        let row = Math.floor(index / 3);
        let col = index % 3;

        if (cell.textContent === "" && placeSign(player, row, col)) 
        {
            if (player.sign === "X")
            {
                cell.style.color = "#0CFCF8";
            }
            else
            {
                cell.style.color = "#FFC857";
            }
            cell.textContent = player.sign;

            if(checkWin(player)) {
                showGameOverModal(player);
                if (player.sign === "X") 
                {
                    player1.score += 1; 
                    player1_score.textContent = player1.score;
                } 
                else 
                {
                    player2.score += 1; 
                    player2_score.textContent = player2.score;
                }
            } 
            else if (checkDraw()) 
            {
                drawGameOverModal();
                tie_score.textContent = parseInt(tie_score.textContent) + 1;
            }

            if (isSinglePlayer) 
            {
                
                player = computer;
                turn.innerHTML = "<h3> O Turn<\h3>"
                turn.style.color = "#FFC857";
                let emptyCells = [];
                cells.forEach((cell, index) => {
                    if (cell.textContent === "") {
                        emptyCells.push(index);
                    }
                });

                let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                let row = Math.floor(randomIndex / 3);
                let col = randomIndex % 3;

                let randomCell = cells[randomIndex];

                setTimeout(() => 
                {
                    if (randomCell.textContent === "" && placeSign(player, row, col)) 
                    {
                        randomCell.style.color = "#FFC857";
                        randomCell.textContent = player.sign;
            
                        if(checkWin(player)) 
                        {
                            showGameOverModal(player);
                            if (player.sign === "X") 
                            {
                                player1.score += 1; 
                                player1_score.textContent = player1.score;
                            } 
                            else 
                            {
                                player2.score += 1; 
                                player2_score.textContent = player2.score;
                            }
                        } 

                        else if (checkDraw()) 
                        {
                            drawGameOverModal();
                            tie_score.textContent = parseInt(tie_score.textContent) + 1;
                        }

                        player = player1;
                        turn.innerHTML = "<h3> X Turn<\h3>";
                        turn.style.color = "#0CFCF8";
                    }
                }, 200);
            } 

            else 
            {
                turn.innerHTML = player.sign === "X" ? "<h3> O Turn<\h3>" : "<h3> X Turn<\h3>";
                player = player === player1 ? player2 : player1;
                turn.style.color = player.sign === "X" ? "#0CFCF8" : "#FFC857";
            }
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

playAgainButton.addEventListener('click', () => {
    gameBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    cells.forEach((cell) => {
        cell.textContent = "";
    });

    let modal = document.querySelector('.modal');
    modal.style.display = "none";
    player = player1;
});


