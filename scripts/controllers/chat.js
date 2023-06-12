const history = [];
const chatHistoryElement = document.getElementById("chat-history");
document.getElementById("chat-send-button").addEventListener("click", () => {
  sendMessage();
})

// create socket
const socket = io("ws://localhost:3000", {
  reconnectionDelayMax: 10000,
});


// record and display message
function logMessage(message, extraClass = "") {
  history.push(message);
  chatHistoryElement.innerHTML += `<div class="chat-message ${extraClass}">${message}</div>`;
}

// retrieve message string and send it via socket
function sendMessage() {
  const inputElement = document.getElementById("chat-input");
  socket.emit('message', inputElement.value); 
  inputElement.value = "";
}


// handle error
socket.io.on("error", (error) => {
  logMessage("Error!", "error");
  console.error(error);
});

// handle successful connection
socket.on("connect", () => {
  logMessage("Connexion réussie", "info");
});

// handle incoming message 
socket.on("message", (message) => {
  logMessage(message);
});

