const socket = io();
let currentRoom = null;
let size = null;

function joinRoom() {
    const room = document.getElementById('roomCode').value
    if (room) {
        socket.emit('joinRoom', room);
    }
}

function createRoom() {
    let sizeInput = document.querySelector('input[name="choose-size"]');
    const room = generateRoomCode();
    size = parseInt(sizeInput.value.trim()) || 10; // default to 10 if invalid

    socket.emit('createRoom', room, size);
}

function chooseSize(){
    const display = document.getElementById("size")
    display.style.display ='flex'
    display.style.justifyContent  = "center"
}

function generateRoomCode(length = 5) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

function exitGame(){
    window.location.href = 'index.html';

    socket.disconnect()
}

socket.on('roomCreated', room => {
    currentRoom = room;
    document.getElementById('connection').innerText = `Rum skapat: ${room}, väntar på en spelare till`
})


socket.on('roomJoined', room => {
    currentRoom = room;
    document.getElementById('connection').innerText = `Rum: ${room}`
})

socket.on('maxPlayers', room => {
    document.getElementById('connection').innerText = `Rummet ${room} är fullt!, kan ej koppla`;
});

socket.on('noSuchRoom', room => {
    document.getElementById('connection').innerText = `Rummet ${room} finns inte.`;
});


socket.on('startGame', () => {
    localStorage.setItem('roomName', currentRoom); // spara rumsinfo
    window.location.href = 'game.html';
    document.getElementById('connection').innerText = `Rum: ${currentRoom} start, player: ${socket.id}`;
});
