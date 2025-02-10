document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const gameContainer = document.getElementById("game");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = false;

    function startGame() {
        const player1 = document.getElementById("player1").value || "Player 1";
        const player2 = document.getElementById("player2").value || "Player 2";

        document.querySelector(".player-inputs").style.display = "none";
        gameContainer.style.display = "block";

        status.textContent = `${player1} (X) vs ${player2} (O) - X's turn`;
        gameActive = true;

        board.innerHTML = "";
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-index", i);
            cell.addEventListener("click", handleCellClick);
            board.appendChild(cell);
        }
    }

    function handleCellClick(event) {
        const index = event.target.getAttribute("data-index");

        if (gameBoard[index] === "" && gameActive) {
            gameBoard[index] = currentPlayer;
            event.target.textContent = currentPlayer;

            if (checkWinner()) {
                status.textContent = `${currentPlayer} Wins!`;
                showPopup();
                gameActive = false;
                return;
            }

            if (!gameBoard.includes("")) {
                status.textContent = "It's a Draw!";
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]            // Diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
        });
    }

    window.startGame = startGame;
});
