const history = [];

function logMessage(message) {
  history.push(message);
  // refresh display
}


const socket = io("ws://localhost:3000", {
  reconnectionDelayMax: 10000,
});

socket.io.on("error", (error) => {
  history.push("Error!")
  console.error(error)
});

socket.on("connect", () => { 
  history.push("Connection successful")
});

socket.on("message", (message) => { 
  console.log("message received", message)
 });
socket.on("data", () => { 
  console.log("data received")
 });