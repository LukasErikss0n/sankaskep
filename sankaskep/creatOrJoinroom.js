const socket = io();
let currentRoom = null;
  
function joinRoom(){
    const room = document.getElementById('roomCode').value
    if (room) {
        socket.emit('joinRoom', room);
    }
}

function createRoom() {
    const room = generateRoomCode();
    console.log(room)
    socket.emit('createRoom', room);
}

function generateRoomCode(length = 5) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

socket.on('roomCreated', room =>{
    currentRoom = room;
    document.getElementById('connection').innerText = `Rum skapat: ${room}, väntar på en spelare till`
})


socket.on('roomJoined', room =>{
    currentRoom = room;
    document.getElementById('connection').innerText = `Rum: ${room}`
})

socket.on('maxPlayers', room => {
    document.getElementById('connection').innerText = `Rummet ${room} är fullt!, kan ej koppla`;
});

socket.on('noSuchRoom', room => {
    document.getElementById('connection').innerText = `Rummet ${room} finns inte.`;
});


socket.on('startGame', room => {
    document.getElementById('connection').innerText = `Rum: ${room} start`;
    
    
    
    // starta spel-logik här
});
