const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');


const { Time } = require('./time');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
      origin: "*",
    },
  });

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if(error){ 
          return callback(error); 
        }

        socket.join(user.room);

        //welcome message
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}`, time: Time() });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined chat!`, time: Time() });

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
      
      const user = getUser(socket.id);
      
      io.to(user.room).emit('message', { user: user.name, text: message, time: Time() });
      
      callback();
    })

    socket.on('sendLocation', ({ location }, callback) => {
      const user = getUser(socket.id);

      io.to(user.room).emit('location', { user: user.name, text: location , time : Time() });

      callback();
    })


    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user) {
          io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left!`, time: Time() })
          io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
        }
    })
});
 

server.listen(process.env.PORT || 5000, () => console.log(`Server has started on port:${PORT}`));
