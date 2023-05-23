var socket = io.connect('http://localhost:8080');
// enviar mensaje de texto sin recargar/reiniciar la página
$('form').submit(function(e){
    e.preventDefault(); // evitar recarga página
    socket.emit('chat_message', $('#txt').val());
    $('#txt').val('');
    return false;
});
// Añadir mensaje texto al chat
socket.on('chat_message', function(msg){
    $('#mensaje').append($('<li>').html(msg));
});
// Añadir texto si alguien está online
socket.on('is_online', function(username) {
    $('#mensaje').append($('<li>').html(username));
});
// Preguntar el nombre de usuario
var username = prompt('Dime tu nombre, por favor');
socket.emit('username', username);