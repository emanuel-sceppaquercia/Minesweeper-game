document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.board');
    let width = 10;
    let mines = 20;
    let squares = [];

    // create Board 
    function createBoard(){
        // create a new array with the total amount of squares, filling with "tile" and "mine"
        // then, ramdomize the positions.
        let gameBoard = Array((width*width)-mines).fill('tile').concat(Array(mines).fill('mine'));
        gameBoard = gameBoard.sort(() => Math.random() -0.5);

        // for every loop, create a new div, with the unique ID and Class name (tile or mine)
        // then, insert to the board 
        for (let i = 0; i < width*width; i++){
            const square = document.createElement('div');
            square.setAttribute('id',i);
            square.classList.add(gameBoard[i]);
            board.appendChild(square);
            squares.push(square);
        }
    }

    createBoard();
})