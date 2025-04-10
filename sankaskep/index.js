import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import { Socket } from 'node:dgram';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// open the database file
const db = await open({
  filename: 'chat.db',
  driver: sqlite3.Database
});

// create our 'messages' table (you can ignore the 'client_offset' column for now)
await db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_offset TEXT UNIQUE,
      content TEXT
  );
`);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {}
});


const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(__dirname));


app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});


io.on('connection', socket => {
  console.log('Ny användare:', socket.id);

  socket.on('createRoom', roomName => {
    const room = io.sockets.adapter.rooms.get(roomName);
    if (!room) {
      socket.join(roomName);
      socket.emit('roomCreated', roomName);
      console.log(`Rum ${roomName} skapat av ${socket.id}`);

    }
  })

  socket.on('joinRoom', roomName => {
    const room = io.sockets.adapter.rooms.get(roomName);
    const numOfPlayers = room ? room.size : 0

    if (!room) {
      socket.emit('noSuchRoom', roomName);

    } else if (numOfPlayers < 2) {

      socket.join(roomName);
      socket.emit('roomJoined', roomName);
      io.to(roomName).emit('startGame');
      console.log(`${socket.id} gick med i rum ${roomName}`);

    } else {
      socket.emit('maxPlayers', roomName);
      console.log(`Rum ${roomName} är fullt`);
    }

  })

  socket.on('disconnect', () => {
    console.log('Användare kopplade bort:', socket.id);
  });
});




server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});