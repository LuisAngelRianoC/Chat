const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const puerto = 8080

app.get('/', function (req,res) {
    // se renderiza el archivo
    res.render('index.ejs');
});

io.sockets.on("connection", function(socket) {

// Evento para cuando un usuario se conecta
    socket.on("username", function(username) {
      socket.username = username;
      io.emit(
        "is_online", 
        "🔵 <i>" + socket.username + " se unio</i>");
    });

// Evento para cuando un usuario se desconecta
    socket.on("disconnect", function(username) {
      io.emit(
        "is_online",
        "🔴 <i>" + socket.username + " se salio</i>"
      );
    });
  
    socket.on("chat_message", function(mensaje) {
      io.emit(
        "chat_message",
        "<strong>" + socket.username + "</strong>: " + mensaje
      );
    });
  });

const server = http.listen(puerto,function() {
    console.log(`Puerto ${puerto} listo`);
})