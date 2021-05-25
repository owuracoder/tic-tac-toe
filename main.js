const gmeBrdObj = (function(pgSlctr) {
    const _gameboard  = [['','',''],['','',''],['','','']]

    // select all columns on the page
    const slctAlCol = function (slctr) {
        let allCols = document.querySelectorAll(slctr)
        return allCols
    }


    // render the items in the array
    const rndrPg = function (contain) {
        let container = document.querySelector(contain)
        
        let rows = container.querySelectorAll('.rows')
        
        for(let i = 0; i < rows.length; i++){
            
            for(let j = 0; j < rows[i].childElementCount; j++){
                
                rows[i].children[j].textContent = _gameboard[i][j]
                
            }
        }
  
    }


    // customise players name on the gameboard
    const doCustPlyr = function(player1){
        function execPly1(){
            let form = document.createElement('form')
            form.classList.add('form-style')
            let input = document.createElement('input')
            input.setAttribute('type','text')
            input.setAttribute('placeholder','Player One Marker..')
            input.classList.add('input-text')
            let button = document.createElement('button')
            button.innerHTML = '<i class="far fa-check-circle fa-lg"></i>'
            button.classList.add('btn')
            form.appendChild(input)
            form.append(button)
            let container = document.querySelector('.container')
            let body = document.querySelector('body')
            container.classList.add('change')
            body.appendChild(form)

            return {button,container,input,body,form}
        }

        let ply1Id = document.querySelector(player1)
        ply1Id.addEventListener('click',execPly1)
        
    }



    // check for a winner
    const winAlgo = (function(){
        const winOutcome = function(){
            const firstRow = []
            const secondRow = []
            const thirdRow = []
            const firstCol = []
            const secCol = []
            const thirdCol = []
            const rgtDgnal = []
            const lftDgnal = []
    
            for(let i= 0; i < _gameboard.length; i++){
                firstCol.push(_gameboard[i][0])
                secCol.push(_gameboard[i][1])
                thirdCol.push(_gameboard[i][2])
    
                for(let j= 0; j < _gameboard[i].length; j++){
                    if( i == 0 && j == 2){
                        lftDgnal.push(_gameboard[i][j])
                      } else if( i == 1 && j == 1){
                        lftDgnal.push(_gameboard[i][j])
                      } else if( i == 2 && j == 0){
                        lftDgnal.push(_gameboard[i][j])
                      }
                  
                      if(i == 0 && j == 0){
                        rgtDgnal.push(_gameboard[i][j])
                      }else if(i == 1 && j== 1){
                        rgtDgnal.push(_gameboard[i][i])
                      }else if(i == 2 && j == 2){
                        rgtDgnal.push(_gameboard[i][j])
                      }
    
                    if(i == 0){
                    firstRow.push(_gameboard[i][j])
                    }else if( i == 1){
                    secondRow.push(_gameboard[i][j])
                    } else if (i == 2){
                    thirdRow.push(_gameboard[i][j])
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
            
    
            if(firstRowString == 'xxx' || secondRowString == 'xxx' || thirdRowString == 'xxx' || firstColString == 'xxx' || secColString == 'xxx' || thirdColString == 'xxx' || rgtDgnalString == 'xxx' || lftDgnalString == 'xxx'){
                return 'x'
            } else if(firstRowString == 'ooo' || secondRowString == 'ooo' || thirdRowString == 'ooo' || firstColString == 'ooo' || secColString == 'ooo' || thirdColString == 'ooo' || rgtDgnalString == 'ooo' || lftDgnalString == 'ooo') {
                return 'o'
            }else if(!_gameboard[0].includes('') && !_gameboard[1].includes('') && !_gameboard[2].includes('')){
                return 'tie'
            }

        }
        return {winOutcome}
    })()


    // Users add marks
    const addMarks = function(marker1, marker2){
        let switchBlock = true
        const markHere = function(event){
            
            let colId = event.target.id
            let parentId = event.target.parentElement.id
            let parentInt = parseInt(parentId)

            if(_gameboard[parentInt][colId] == '' && switchBlock == true){
                 _gameboard[parentInt][colId] = marker1
                 switchBlock = false
            } else if(_gameboard[parentInt][colId] == '' && switchBlock == false){
                _gameboard[parentInt][colId] = marker2
                 switchBlock = true
            }
            rndrPg('.container')
            winAlgo.winOutcome()
         }

        let selcPg = slctAlCol(pgSlctr)

        for(let i = 0; i < selcPg.length; i++){
            selcPg[i].addEventListener('click',markHere)
        }

    }

    return {addMarks,doCustPlyr}
})('.col')

gmeBrdObj.addMarks('x','o')
gmeBrdObj.doCustPlyr('#player1')


