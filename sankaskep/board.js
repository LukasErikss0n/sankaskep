const roomName = localStorage.getItem('roomName');
socket.emit('rejoinRoom', roomName);



socket.on('size', size=>{
    createBoard("player-board", size);
    createBoard("enemy-board", size);
})



function createBoard(elementId, size){
    const board = document.getElementById(elementId)

    if(size < 10){
        size == 10
    }
    console.log(size)

    for(let y=0; y < size; y++){
        for(let x=0; x < size; x++){
            const cell = document.createElement('div')
            cell.classList.add('cell')
            cell.dataset.x = x
            cell.dataset.y = y
            cell.addEventListener('click', ()=>{
                socket.emit('playerClick', { x, y });
            })
            board.appendChild(cell)
        }
    }
}



