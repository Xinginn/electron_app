

let enclosuresData = []

document.getElementById("enclosure-form").addEventListener("submit", event => handleSubmit(event))
document.getElementById("create-enclosure-button").addEventListener("click", event => startCreation())
document.getElementById("close-enclosure-button").addEventListener("click", event => toggleForm())


// labels for display
const biomeLabels = {
  desert: "Désertique",
  jungle: "Jungle",
  sea: "Maritime",
  forest: "Forestier"
}

const shapeLabels = {
  square: "Carré",
  circle: "Circulaire",
  other: "Irrégulier"
}



// refresh enclosure table display. called at start, and after each modification
async function displayEnclosures(){
  // get all enclosures
  enclosuresData = await getEnclosures();

  const head = "<tr><th>id</th><th>nom</th><th>forme</th><th>surface (m²)</th><th>biome</th><th>actions</th></tr>"
  const body = enclosuresData.reduce((stack, current) => {
    // open new row after current stack
    let row = stack + "<tr>";
    row += `<td>${current.id}</td>`;
    row += `<td>${current.name}</td>`;
    row += `<td>${shapeLabels[current.shape]}</td>`;
    row += `<td>${current.surface}</td>`;
    row += `<td>${biomeLabels[current.biome]}</td>`;

    // add modify button
    row += `<td><button id="enclosure-edit-${current.id}">Edit</button>`
    // add delete button
    row += `<button id="enclosure-delete-${current.id}"> X </button></td>`
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
  displayCharts()
}

// toggle visibility for create/edit form and new enclosure button
function toggleForm(){
  document.getElementById("enclosure-creation-container").classList.toggle("hidden");
  document.getElementById("create-button-container").classList.toggle("hidden");
}

// called when New enclosure button is clicked
function startCreation() {
  document.getElementById("form-title").innerText = "Créer un nouvel enclos";
  toggleForm();
}

// called when edit enclosure button is clicked
async function startEdit(id) {
  const item = await getEnclosureById(id);
  if (document.getElementById("enclosure-creation-container").classList.contains("hidden")) {
    toggleForm();
  }
  document.getElementById("form-title").innerText = `Editer l'enclos #${item.id}`;

  document.getElementById("id").setAttribute('value', (item.id).toString())
  document.getElementById("input-name").setAttribute('value', (item.name))
  document.getElementById("shape").value = item.shape
  document.getElementById("surface").setAttribute('value', (item.surface).toString())
  document.getElementById("biome").value = item.biome
}

// called when delete enclosure button is clicked
async function requestDelete(id) {
  if (window.confirm('Voulez vous vraiment supprimer cet enclos?')) {
    
    await deleteEnclosure(id);
    displayEnclosures();
  }
}

// called when create/edit enclosure form is submitted
async function handleSubmit(event){
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
    await postEnclosure(payload)
  } else {
    await patchEnclosure(id, payload)
  }
  toggleForm();
  displayEnclosures();
}

// call enclosures display on start
displayEnclosures();
