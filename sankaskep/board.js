

function createBoard(elementId){
    const size = 10
    const board = document.getElementById(elementId)
    for(let y=0; y < size; y++){
        for(let x=0; x < size; x++){
            const cell = document.createElement('div')
            cell.classList.add('cell')
            cell.dataset.x = x
            cell.dataset.y = y
            cell.addEventListener('click', ()=>{
                console.log(`(${x}, ${y}) on ${elementId}`)
            })
            board.appendChild(cell)
        }
    }
}

createBoard("player-board");
createBoard("enemy-board");