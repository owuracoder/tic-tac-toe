let gameBoardObj = function(){
    let gameBoard = ['','','','','','','','','']

    const boxes = document.querySelectorAll('.grid-item')
    
    let uIRender = function(){
        for(let i=0; i < gameBoard.length; i++){
            boxes[i].textContent = gameBoard[i]
        }
    }

    let aiPlaySmart = function(){

        let player = playerObj()
        let huPlayer = player.firPlayr
        let aiPlayer = player.secPlayr

    function emptyIndexies(board){
    return  board.filter(s => s != huPlayer && s != aiPlayer);
    }

    function winning(board, player){
    if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
    ) {
    return true;
    } else {
    return false;
    }
    }

    function minimax(newBoard, player){

        let availSpots = emptyIndexies(newBoard);

        if (winning(newBoard, huPlayer)){

            return {score:-10};
        }
        else if (winning(newBoard, aiPlayer)){
            return {score:10};
        }
        else if (availSpots.length === 0){
            return {score:0};
        }

        // an array to collect all the objects
        let moves = [];

        // loop through available spots
        for (let i = 0; i < availSpots.length; i++){
            //create an object for each and store the index of that spot 
            let move = {};
            move.index = newBoard[availSpots[i]];
            
            newBoard[availSpots[i]] = player;

            if (player == aiPlayer){
                let result = minimax(newBoard, huPlayer);
                move.score = result.score;
            }
            else{
                let result = minimax(newBoard, aiPlayer);
                move.score = result.score;
            }

            newBoard[availSpots[i]] = move.index;

            moves.push(move);
        }

        let bestMove;

        if(player === aiPlayer){

            let bestScore = -10000;

            for(let i = 0; i < moves.length; i++){

                if(moves[i].score > bestScore){

                    bestScore = moves[i].score;

                    bestMove = i;
                }
            }
        }else{
            let bestScore = 10000;

            for(let i = 0; i < moves.length; i++){

            if(moves[i].score < bestScore){

                bestScore = moves[i].score;

                bestMove = i;

                }
            }
        }

        return moves[bestMove];

    }

    return {minimax}
}

    let reStartButton = function(){

        const button = document.createElement('button')

        button.textContent = 'Restart'

        button.classList.add('btn')

        let winBanner = document.querySelector('.win_banner')

        let header = document.querySelector('.head')

        header.appendChild(button)

        const reStartGame = function(){

            winBanner.remove()

            let clean_gamboard = gameBoard.map(x => x = '')

            gameBoard = clean_gamboard

            uIRender()
        }
       
        button.addEventListener('click',reStartGame)
    }

    let winBanner = function(mark,swch=false){

        let winBanner = document.createElement('div')

        let head = document.createElement('h2')

        if(swch==false){

            head.textContent = `${mark} is the winner`

        }else if(swch==true){

            head.textContent = `${mark}`
        }
        
        head.classList.add('head')

        winBanner.classList.add('win_banner')

        winBanner.appendChild(head)

        let headContainer = document.querySelector('.head-container')

        let container = document.querySelector('.main-container')

        container.insertBefore(winBanner,headContainer)

    }

    function crtNewBoard (oldBoard,huPlayer,aiPlayer){

        let newBoard = []

        for(let i = 0; i < oldBoard.length; i++){

        if(oldBoard[i] == huPlayer || oldBoard[i] == aiPlayer){

          newBoard.push(oldBoard[i])

        } else {

          newBoard.push(i)

        }

      }

      return newBoard

    }

    let gameOverTester = function(){  

        let spaces = gameBoard.length

        gameBoard.forEach(function(elem){

            if(elem != ''){

                spaces--
            }
        })

        if(spaces == 0){

           return true
        }

    }

    let addMarks = function(){

        let player = playerObj()

        let player1 = player.player1

        let player2 = player.player2

        let player1Wins = ''

        let player2Wins = ''

        let checkHere = function(e){
            
            if(e.target.textContent == ''){

                e.target.textContent = player.firPlayr

                gameBoard[e.target.id] = player.firPlayr

                player1.push(parseInt(e.target.id))
                
                // checking discrepancies in x wins
                console.log('current plays',player1)

                player1Wins = player.winAlgo(player1)

                let gameIsOver = gameOverTester()

                if(player1Wins){

                    player1 = []

                    player2 = []

                    winBanner(player.firPlayr)

                    reStartButton()
                }else if(gameIsOver){

                    player1 = []

                    player2 = []

                    let text = 'Game Is Over'

                    winBanner(text,swch=true)

                    reStartButton()
                }
            }


            if(!player1Wins){

                let huPlayer = player.firPlayr

                let aiPlayer = player.secPlayr

                let newBoard = crtNewBoard(gameBoard,huPlayer,aiPlayer)
    
                let aiplays = aiPlaySmart()

                let aiChoice = aiplays.minimax(newBoard,aiPlayer)

                let randNum = aiChoice.index

                if(randNum != undefined){
                    let randomDiv = document.getElementById(`${randNum}`)

                    randomDiv.textContent = player.secPlayr

                    gameBoard[randNum] = player.secPlayr
                    
                    player2.push(parseInt(randNum))
                    
                    player2Wins = player.winAlgo(player2)

                    let gameIsOver = gameOverTester()

                    if(player2Wins){ 

                        player1 = []

                        player2 = []

                        winBanner(player.secPlayr)

                        reStartButton() 

                    }else if(gameIsOver){

                        player1 = []

                        player2 = []

                        let text = 'Game Is Over'

                        winBanner(text,swch=true)

                        reStartButton()
                    }

                }
                
            }
            
                
        }

        boxes.forEach(function(box){

            box.addEventListener('click',checkHere)
        })

    }
    
    return {uIRender,addMarks,gameBoard}
}

let playerObj = function(){

    let firPlayr = 'x'

    let secPlayr = 'o'

    const winnings = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
     
    let player1 = []

    let player2 = []

    const winAlgo = function(board){

        for(let i = 0; i < winnings.length; i++){

            let result = winnings[i].every(elem => board.includes(elem))

            if(result == true){

              return true
            }
        }
    }

    return{firPlayr,secPlayr,player1,player2,winAlgo}
}


let controlObj = (function(){
    

    let init = function(){
        
        let game = gameBoardObj()

        game.addMarks()

        game.uIRender()

    }       

    return {init}
     
})()

controlObj.init()