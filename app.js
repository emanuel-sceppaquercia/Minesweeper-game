document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.board');
    let width = 10;
    let mines = 20;
    let gameOver = false;
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

            // Add event, normal click
            square.addEventListener('click', function(e){
                click(square);
            });
        }

        // Add total numbers of mines adjacent to the tile
        for(let i = 0; i < squares.length; i++){
            let total = 0;
            const leftEdge = (i % width == 0);
            const rightEdge = (i % width == 9);
            
            if(squares[i].classList.contains('tile')){
                if(i > 0 && !leftEdge && squares[i-1].classList.contains('mine')) total++;
                if(i > 9 && !rightEdge && squares[i+1].classList.contains('mine')) total++;
                if(i > 9 && squares[i-width].classList.contains('mine')) total++;
                if(i < 90 && squares[i+width].classList.contains('mine')) total++;
                if(i > 9 && !leftEdge && squares[i-width-1].classList.contains('mine')) total++;
                if(i > 9 && !rightEdge && squares[i-width+1].classList.contains('mine')) total++;
                if(i < 90 && !leftEdge && squares[i+width-1].classList.contains('mine')) total++;
                if(i < 90 && !rightEdge && squares[i+width+1].classList.contains('mine')) total++;
            }
            squares[i].setAttribute('data',total);
        }

    }

    createBoard();

    // Click function. Set fuctions that depends on class square
    function click(square){
        let currentId = square.getAttribute('id'); 

        if(gameOver) return;
        if(square.classList.contains('checked') || square.classList.contains('flag')) return;

        if(square.classList.contains('mine')){
            gameOver = true;
        } else {
            let total = square.getAttribute('data');
            if(total != 0){
                square.classList.add('checked');
                square.innerHTML = total;
                return;
            }
            square.classList.add('checked'); 
            checkSquare(square,currentId);   
        }

    }

    // Check all sorrounding squares after a click event.
    function checkSquare(square,id){
        const leftEdge = (id % width == 0);
        const rightEdge = (id % width == 9);

        setTimeout(() => {
            if(id > 0 && !leftEdge){
                click(squares[id-1]);
            }
            if(id > 0 && !rightEdge){
                click(squares[parseInt(id)+1]);
            }
            if(id > 10){
                click(squares[parseInt(id)-width]);
            }
            if(id < 90){
                click(squares[parseInt(id)+width]);
            }
            if(id > 10 && !leftEdge){
                click(squares[parseInt(id)-width-1]);
            }
            if(id > 10 && !rightEdge){
                click(squares[parseInt(id)-width+1]);
            }
            if(id < 90 && !leftEdge){
                click(squares[parseInt(id)+width-1]);
            }
            if(id < 90 && !rightEdge){
                click(squares[parseInt(id)+width+1]);
            }
        }, 4)

    }
})