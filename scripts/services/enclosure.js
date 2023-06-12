const apiUrl = "http://localhost:3000";

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
  const response = await fetch(`${apiUrl}/enclosures/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
  const enclosure = await response.json();
  return enclosure;
}

async function postEnclosure(payload) {
  const response = await fetch(`${apiUrl}/enclosures`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  })
}

async function patchEnclosure(id, payload){
  const response = await fetch(`${apiUrl}/enclosures/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  })
}

async function deleteEnclosure(id){
  const response = await fetch(`${apiUrl}/enclosures/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  })
}

