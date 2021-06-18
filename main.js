let gameBoardObj = function(){
    let gameBoard = ['','','','','','','','','']

    const boxes = document.querySelectorAll('.grid-item')
    
    let uIRender = function(){
        for(let i=0; i < gameBoard.length; i++){
            boxes[i].textContent = gameBoard[i]
        }
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

        let gridContainer = document.querySelector('.grid-container')
        let container = document.querySelector('.container')
        container.insertBefore(winBanner,gridContainer)

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
        let cycleMe = true

        let checkHere = function(e){
            
            if(e.target.textContent == ''){
                e.target.textContent = player.firPlayr
                gameBoard[e.target.id] = player.firPlayr
                player1.push(parseInt(e.target.id))
                console.log('player1',player1)
                player1Wins = player.winAlgo(player1)
                let gameIsOver = gameOverTester()
                if(player1Wins){
                    player1 = []
                    player2 = []
                    winBanner(player.firPlayr)
                    reStartButton()
                }else if(gameIsOver){
                    let text = 'Game Is Over'
                    winBanner(text,swch=true)
                }
            }
            
            //    end of the event listener
            if(!player1Wins){
                let randomDiv = ''
                let randNum = ''
                while(cycleMe){
                    randNum =  Math.floor(Math.random() * 9)
                    randomDiv = document.getElementById(`${randNum}`)

                    if(randomDiv.textContent == ''){
                    cycleMe = false
                    }
                }
                cycleMe = true

                randomDiv.textContent = player.secPlayr
                gameBoard[randNum] = player.secPlayr
                player2.push(parseInt(randNum))
                console.log('player2',player2)
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

        boxes.forEach(function(box){
            box.addEventListener('click',checkHere)
        })

    }
    
    return {uIRender,addMarks}
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