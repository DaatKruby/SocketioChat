const socket =  io()

//Elementos del DOM (html).
let message = document.getElementById("message");
let username = document.getElementById("username");
let btnSend = document.getElementById("send");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

username.addEventListener('keypress', function(event) {
    let key = event.keyCode;
    if(key === 32){
        event.preventDefault();
        alert("El username no puede tener espacios.");
    }
});


btnSend.addEventListener('click', function(){
if(!(username.value == "")){
    sendMessage();
}else alert("Ingresa un username valido.");

});

message.addEventListener('keypress', function(event){
socket.emit('chat:typing', username.value);
let key = event.keyCode;
    if(key === 13){
sendMessage();
}
});

socket.on('chat:message', function(data){
    actions.innerHTML='';
output.innerHTML += `<p> 
<strong>${data.username} </strong>: ${data.message}
</p>`
});

socket.on('chat:typing', function(data){
    actions.innerHTML = `<p><em>${data} está escribiendo. </em></p>`
});

function sendMessage(){
    socket.emit('chat:message', {
        username: username.value,
        message: message.value
    });
    message.value = '';
}
