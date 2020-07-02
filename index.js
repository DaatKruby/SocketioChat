const path = require('path');
const express =  require('express');
const app = express();

//Configuración
app.set('port', process.env.PORT || 3000);

//archivos estaticos.
app.use(express.static(path.join(__dirname, 'public')));

//Iniciar el servidor.
const server = app.listen(app.get('port'), () => {
    console.log("Servidor en el puerto: "+app.get('port'));
});

const SocketIO = require('socket.io');
const io = SocketIO.listen(server);

//WebSockets
io.on('connection', (socket) => {
    console.log("Nueva conexión. id:> ", socket.id);

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data); //a todos los sockets conectados envia 
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    });

});

