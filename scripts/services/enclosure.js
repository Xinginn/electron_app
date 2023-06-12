const apiUrl = "http://localhost:3000";
let enclosures = [
  {id:1, name: "La savane", shape: "square", surface: 450, biome: "desert"},
  {id:2, name: "la fosse aux ours", shape: "circle", surface: 120, biome: "jungle"},
]


async function getEnclosures() {
  const response = await fetch(`${apiUrl}/enclosures`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
  const enclosures = await response.json();
  return enclosures;
}

async function getEnclosureById(id) {
  
  for (let item of enclosures) {
    if (item.id == id) {
      return item;
    }
  }
}

async function postEnclosure(payload) {
  // temp
  const id = (enclosures[enclosures.length -1].id) +1;
  const data = {id, ...payload};
  enclosures.push(data);


}

async function patchEnclosure(id, payload){
  for (let i = 0; i < enclosures.length; i++){
    if (enclosures[i].id === id){
      const newItem = Object.assign(enclosures[i], payload);
      enclosures[i] = newItem;
    }
  }
}

async function deleteEnclosure(id){
  console.log('delete ', id )
  for (let i = 0; i < enclosures.length; i++){
    console.log('index: ', i)
    console.log('enclosure id: ', enclosures[i].id)
    if (enclosures[i].id === id){
      console.log('should delete')
      enclosures.splice(i,1);
    }
  }
}

