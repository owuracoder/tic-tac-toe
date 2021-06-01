const gmeBrdObj = (function(){
    let _gameboard  = [['','',''],['','',''],['','','']]
    
    // private variables
    let containerElement = document.querySelector('.container')

    let allRows = document.querySelectorAll('.rows')

    // render on the board the items in the array
    const rendrPge = function () {  
        for(let i = 0; i < allRows.length; i++){           
            for(let j = 0; j < allRows[i].childElementCount; j++){                
                allRows[i].children[j].textContent = _gameboard[i][j]                
            }
        }
    }

    return {rendrPge,containerElement,_gameboard,allRows}   
})()



const players = function(marker1,marker2){
    let markerSign1 = marker1.slice(0,2)
    let markerSign2 = marker2.slice(0,2)
    let player1 = true
    let player2 = false
        const play = function(){
                
            const markHere = function(event){
                function markMe(sign){
                    let colId = event.target.id
                    let parentId = event.target.parentElement.id
                    let parentInt = parseInt(parentId)
        
                    let gameBoard = gmeBrdObj._gameboard
                
                    if(gameBoard[parentInt][colId] == ''){
                        gameBoard[parentInt][colId] = sign
                    }else if(gameBoard[parentInt][colId] == markerSign1 && player1 == true){
                        player1 = false
                        player2 = true
                    } else if(gameBoard[parentInt][colId] == markerSign2 && player2 == false){
                        player1 = true
                        player2 = false
                    }

                    gmeBrdObj.rendrPge()
                    let winAlgo = winOutcome()
                    
                    if(winAlgo == sign){
                        for(let i = 0; i < selcPge.length; i++){
                
                            selcPge[i].removeEventListener('click',markHere)    
                        }
                    }

                    if(player1 == true && player2 == false){
                        player1 = false
                        player2 = true
                    } else if(player1 == false && player2 == true){
                        player1 = true
                        player2 = false
                    }

                }


                if(player1 == true && player2 == false){
                    markMe(markerSign1)
                }else if(player1 == false && player2 == true) {
                    markMe(markerSign2)
                }         

            }

            let selcPge = gmeBrdObj.allRows
            
            for(let i = 0; i < selcPge.length; i++){
                
                selcPge[i].addEventListener('click',markHere)
                
            }
        }

                
        // check for a winner
        const winOutcome = function(){
            let gameBoard = gmeBrdObj._gameboard

            const firstRow = []
            const secondRow = []
            const thirdRow = []
            const firstCol = []
            const secCol = []
            const thirdCol = []
            const rgtDgnal = []
            const lftDgnal = []
            
            for(let i= 0; i < gameBoard.length; i++){
                firstCol.push(gameBoard[i][0])
                secCol.push(gameBoard[i][1])
                thirdCol.push(gameBoard[i][2])

                for(let j= 0; j < gameBoard[i].length; j++){
                    if( i == 0 && j == 2){
                        lftDgnal.push(gameBoard[i][j])
                    } else if( i == 1 && j == 1){
                        lftDgnal.push(gameBoard[i][j])
                    } else if( i == 2 && j == 0){
                        lftDgnal.push(gameBoard[i][j])
                    }
                
                    if(i == 0 && j == 0){
                        rgtDgnal.push(gameBoard[i][j])
                    }else if(i == 1 && j== 1){
                        rgtDgnal.push(gameBoard[i][i])
                    }else if(i == 2 && j == 2){
                        rgtDgnal.push(gameBoard[i][j])
                    }

                    if(i == 0){
                    firstRow.push(gameBoard[i][j])
                    
                    }else if( i == 1){
                    secondRow.push(gameBoard[i][j])
                    } else if (i == 2){
                    thirdRow.push(gameBoard[i][j])
                    } 
                }
            }

            
            
            let firstRowString = firstRow.join('')
            let secondRowString = secondRow.join('')
            let thirdRowString = thirdRow.join('')
            let firstColString = firstCol.join('')
            let secColString = secCol.join('')
            let thirdColString = thirdCol.join('')
            let rgtDgnalString = rgtDgnal.join('')
            let lftDgnalString = lftDgnal.join('')

            if(firstRowString == markerSign1.repeat(3) || secondRowString == markerSign1.repeat(3) || thirdRowString == markerSign1.repeat(3) || firstColString == markerSign1.repeat(3) || secColString == markerSign1.repeat(3) || thirdColString == markerSign1.repeat(3) || rgtDgnalString == markerSign1.repeat(3) || lftDgnalString == markerSign1.repeat(3)){
                return markerSign1
            }else if(firstRowString == markerSign2.repeat(3) || secondRowString == markerSign2.repeat(3) || thirdRowString == markerSign1.repeat(3) || firstColString == markerSign2.repeat(3) || secColString == markerSign2.repeat(3) || thirdColString == markerSign2.repeat(3) || rgtDgnalString == markerSign2.repeat(3) || lftDgnalString == markerSign2.repeat(3)){
                return markerSign2
            }
            else if(!gameBoard[0].includes('') && !gameBoard[1].includes('') && !gameBoard[2].includes('')){
                return 'tie'
            }
        }

    return {play}
}

const playGame = (function(){
    gmeBrdObj.rendrPge()
     
    let round = players('suzy','Richard')
    round.play()
   
})()

playGame







































// const doCustPlyr = function(){


//     const custNmes = function(){
//         let input = document.querySelector('#inpt')
//         let inptVal = input.value
//         console.log(inptVal)
//     }

//     const execPly1 = function(){
//         let form = document.createElement('form')
//             form.classList.add('form-style')
//             let input = document.createElement('input')
//             input.id = 'inpt'
//             input.setAttribute('type','text')
//             input.setAttribute('placeholder','Player One Marker..')
//             input.classList.add('input-text')
//             let button = document.createElement('button')
//             button.id = 'btn'
//             button.innerHTML = '<i class="far fa-check-circle fa-lg"></i>'
//             button.classList.add('btn')
//             form.appendChild(input)
//             form.append(button)
//             let container = document.querySelector('.container')
//             let body = document.querySelector('body')
//             container.classList.add('change')
//             body.appendChild(form)
//             button.addEventListener('click',custNmes)
//     }

//     const showForms = function(player1,player2){
//         let ply1Id = document.querySelector(player1)
//         let ply2Id = document.querySelector(player2)
//         ply1Id.addEventListener('click',execPly1)
//         ply2Id.addEventListener('click',execPly1)
//     }
   
//     return {showForms}
// }