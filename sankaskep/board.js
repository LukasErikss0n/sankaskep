socket.on('connect', () => {
    console.log("✅ Connected to socket.io:", socket.id);
});

socket.on('size', size=>{
    console.log("hhhehehe")
    createBoard("player-board", size);
    createBoard("enemy-board", size);
})



function createBoard(elementId, size){
    const board = document.getElementById(elementId)

    console.log(size)

    for(let y=0; y < size; y++){
        for(let x=0; x < size; x++){
            const cell = document.createElement('div')
            cell.classList.add('cell')
            cell.dataset.x = x
            cell.dataset.y = y
            cell.addEventListener('click', ()=>{
                console.log(`(${x}, ${y})`)
            })
            board.appendChild(cell)
        }
    }
}



