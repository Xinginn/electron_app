const enclosures = [
  {id:1, name: "La savane", shape: "square", surface: 450, biome: "desert"},
  {id:2, name: "la fosse aux ours", shape: "circle", surface: 120, biome: "jungle"},
]

document.getElementById("enclosure-form").addEventListener("submit", event => handleSubmit(event))

function displayEnclosures(){
  // get all enclosures
  const data = enclosures;

  const head = "<tr><th>id</th><th>nom</th><th>forme</th><th>surface (m²)</th><th>biome</th><th>actions</th></tr>"
  let rowIndex = 0;
  const body = data.reduce((stack, current) => {
    // open new row after current stack
    let row = stack + "<tr>";
    for (let key of Object.keys(current)){
      row += `<td>${current[key]}</td>`
    }
    // add modify button
    row += `<td><button id="enclosure-edit-${rowIndex}">Modifier</button>`
    // add delete button
    row += `<button id="enclosure-delete-${rowIndex}">Supprimer</button></td>`
    // close row
    row += "</tr>";
    rowIndex += 1;
    return row;
  }, "");
  // connect all new buttons to functions

  document.getElementById("enclosure-table").innerHTML = head + body;
  for (let i = 0; i < rowIndex; i++){
    const el = 
    document.getElementById(`enclosure-edit-${i}`).addEventListener("click", () => {
      startEdit(i);
    })
    document.getElementById(`enclosure-delete-${i}`).addEventListener("click", () => {
      requestDelete(i);
    })
  }
}

function startEdit(index) {
  document.getElementById("enclosure-creation-container").
}

function requestDelete(index) {
  console.log('delete', index)
}

function handleSubmit(event){
  event.preventDefault();
  const payload = {
    name: event.target.name.value,
    shape: event.target.shape.value,
    surface: event.target.surface.value,
    biome: event.target.biome.value,
  }
  console.log(payload)
}

displayEnclosures();