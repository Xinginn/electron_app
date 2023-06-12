

let enclosuresData = []

document.getElementById("enclosure-form").addEventListener("submit", event => handleSubmit(event))
document.getElementById("create-enclosure-button").addEventListener("click", event => toggleCreation())



function displayEnclosures(){
  // get all enclosures
  enclosuresData = getEnclosures();

  const head = "<tr><th>id</th><th>nom</th><th>forme</th><th>surface (m²)</th><th>biome</th><th>actions</th></tr>"
  const body = enclosuresData.reduce((stack, current) => {
    // open new row after current stack
    let row = stack + "<tr>";
    for (let key of Object.keys(current)){
      row += `<td>${current[key]}</td>`
    }
    // add modify button
    row += `<td><button id="enclosure-edit-${current.id}">Modifier</button>`
    // add delete button
    row += `<button id="enclosure-delete-${current.id}">Supprimer</button></td>`
    // close row
    row += "</tr>";
    return row;
  }, "");
  // connect all new buttons to functions

  document.getElementById("enclosure-table").innerHTML = head + body;
  for (let idx = 0; idx < enclosuresData.length; idx++){
    const id = enclosuresData[idx].id;

    document.getElementById(`enclosure-edit-${id}`).addEventListener("click", () => {
      startEdit(id);
    })
    document.getElementById(`enclosure-delete-${id}`).addEventListener("click", () => {
      requestDelete(id);
    })
  }
}

function toggleCreation(){
  document.getElementById("enclosure-creation-container").classList.toggle("hidden")
  document.getElementById("create-enclosure-button").classList.toggle("hidden")
}

function startEdit(id) {
  const item = getEnclosureById(id);
  document.getElementById("enclosure-creation-container").classList.toggle("hidden")
  document.getElementById("create-enclosure-button").classList.toggle("hidden")
  document.getElementById("id").setAttribute('value', (item.id).toString())
  document.getElementById("name").setAttribute('value', (item.name))
  document.getElementById("shape").value = item.shape
  document.getElementById("surface").setAttribute('value', (item.surface).toString())
  document.getElementById("biome").value = item.biome
}

function requestDelete(id) {
  if (window.confirm('Voulez vous vraiment supprimer cet enclos?')) {
    console.log('delete ', id)
    
    deleteEnclosure(id);
    displayEnclosures();
    console.log(enclosuresData);
  }
}

function handleSubmit(event){
  event.preventDefault();
  const isCreation = (event.target.id.value == -1);

  // set id if it is a new item
  const id = (isCreation) ? (enclosuresData[enclosuresData.length-1].id) +1 : parseInt(event.target.id.value);
  const payload = {
    name: event.target.name.value,
    shape: event.target.shape.value,
    surface: parseFloat(event.target.surface.value),
    biome: event.target.biome.value,
  }
  if (isCreation) {
    console.log('is creation')
    postEnclosure(payload)
    //enclosures.push({id, ...payload})
  } else {
    patchEnclosure(id, payload)
    /*
    for (let i = 0; i < enclosures.length; i++){
      if (enclosures[i].id === id){
        const newItem = Object.assign(enclosures[i], payload);
        enclosures[i] = newItem;
      }
    }
    */
  }
  displayEnclosures();
}

displayEnclosures();
