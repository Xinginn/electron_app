document.getElementById('addTextButton').addEventListener("click", () => {
  addText();
})


function addText() {
  const testContent = document.getElementById('test-content')
  testContent.innerHTML += "lalala<br/>";
}