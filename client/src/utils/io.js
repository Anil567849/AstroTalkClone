import React from 'react'
import io from 'socket.io-client';
const socket = io("http://localhost:8000"); // Connect to the server


const socketConnection = () => {

    socket.on('connect', () => {
      console.log('Connected to the server');
      socket.emit('clientConnection', 'Hello, server!');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });
    return () => {
      socket.disconnect();
    };

}

socketConnection();



export {io, socket};