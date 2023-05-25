import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);


import { Server } from 'socket.io';

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
      }
});


export {io, server, app};


io.on('connection', (socket) => {
    console.log('A client connected app.js');
  
    socket.on('callToAstrologer', (data) => {
      console.log('calling astrologer app.js');
      io.emit('callingAstro', data);
    });
  
    socket.on('cancleCalling', (data) => {
      console.log('cancle calling', data);
    });
  
    socket.on('callRejected', (userId) => {
      io.emit('callRejected', userId);
    });
    
    socket.on('disconnect', () => {
      console.log('A client disconnected');
    });
  });


