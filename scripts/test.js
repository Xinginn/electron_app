document.getElementById('addTextButton').addEventListener("click", () => {
  addText();
})




function addText() {
  const testContent = document.getElementById('chat-messages')
  testContent.innerHTML += "lalala<br/>";
}
