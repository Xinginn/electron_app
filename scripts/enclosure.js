const enclosures = [
  {id:1, name: "La savane", shape: "square", surface: 450, biome: "desert"},
  {id:2, name: "la fosse aux ours", shape: "circle", surface: 120, biome: "jungle"},
]

document.getElementById("enclosure-form").addEventListener("submit", event => handleSubmit(event))
document.getElementById("create-enclosure-button").addEventListener("click", event => toggleCreation())



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

function toggleCreation(){
  document.getElementById("enclosure-creation-container").classList.toggle("hidden")
  document.getElementById("create-enclosure-button").classList.toggle("hidden")
}

function startEdit(index) {
  const item = enclosures[index]
  console.log(item)
  document.getElementById("enclosure-creation-container").classList.toggle("hidden")
  document.getElementById("create-enclosure-button").classList.toggle("hidden")
  document.getElementById("id").setAttribute('value', (item.id).toString())
  document.getElementById("name").setAttribute('value', (item.name))
  document.getElementById("shape").value = item.shape
  document.getElementById("surface").setAttribute('value', (item.surface).toString())
  document.getElementById("biome").value = item.biome
}

function requestDelete(index) {
  console.log('delete', index)
}

function handleSubmit(event){
  event.preventDefault();
  const isCreation = (event.target.id.value == -1);

  // set id if it is a new item
  const id = (isCreation) ? (enclosures[enclosures.length-1].id) +1 : parseInt(event.target.id.value);
  const payload = {
    name: event.target.name.value,
    shape: event.target.shape.value,
    surface: parseFloat(event.target.surface.value),
    biome: event.target.biome.value,
  }
  if (isCreation) {
    console.log('is creation')

    enclosures.push({id, ...payload})
  } else {
    for (let i = 0; i < enclosures.length; i++){
      if (enclosures[i].id === id){
        const newItem = Object.assign(enclosures[i], payload);
        enclosures[i] = newItem;
      }
    }
  }
  displayEnclosures();
}

displayEnclosures();