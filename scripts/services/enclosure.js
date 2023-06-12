let enclosures = [
  {id:1, name: "La savane", shape: "square", surface: 450, biome: "desert"},
  {id:2, name: "la fosse aux ours", shape: "circle", surface: 120, biome: "jungle"},
]


function getEnclosures() {
  return enclosures;
}

function getEnclosureById(id) {
  for (let item of enclosures) {
    if (item.id == id) {
      return item;
    }
  }
}

function postEnclosure(payload) {
  // temp
  const id = (enclosures[enclosures.length -1].id) +1;
  const data = {id, ...payload};
  enclosures.push(data);
}

function patchEnclosure(id, payload){
  for (let i = 0; i < enclosures.length; i++){
    if (enclosures[i].id === id){
      const newItem = Object.assign(enclosures[i], payload);
      enclosures[i] = newItem;
    }
  }
}

function deleteEnclosure(id){
  for (let i = 0; i < enclosures.length; i++){
    if (enclosures[i].id === id){
      enclosures.splice(i,0);
    }
  }
}

