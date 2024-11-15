function agregarPoder() {
  const poderesContainer = document.getElementById("poderesContainer");
  const newPowerField = document.createElement("input");
  newPowerField.type = "text";
  newPowerField.name = "poderes[]";
  newPowerField.placeholder = "Ingrese un poder";
  newPowerField.className = "p-1 rounded-md";
  poderesContainer.appendChild(newPowerField);
}

function agregarEnemigo() {
  const enemigosContainer = document.getElementById("enemigosContainer");
  const nuevoInput = document.createElement("input");
  nuevoInput.type = "text";
  nuevoInput.name = "enemigos[]";
  nuevoInput.placeholder = "Ingrese un enemigo";
  nuevoInput.className = "p-1 rounded-md";
  enemigosContainer.appendChild(nuevoInput);
}

function agregarAliado() {
  const aliadosContainer = document.getElementById("aliadosContainer");
  const nuevoInput = document.createElement("input");
  nuevoInput.type = "text";
  nuevoInput.name = "aliados[]";
  nuevoInput.placeholder = "Nombre del aliado";
  nuevoInput.className = "p-1 rounded-md";
  aliadosContainer.appendChild(nuevoInput);
}

document.querySelector("#agregarSuperheroeForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const superheroe = {
    nombreSuperHeroe: formData.get("nombreSuperHeroe"),
    nombreReal: formData.get("nombreReal"),
    edad: formData.get("edad"),
    planetaOrigen: formData.get("planetaOrigen"),
    debilidad: formData.get("debilidad"),
    creador: formData.get("creador"),
    poderes: formData.getAll("poderes[]").filter((poder) => poder != ""),
    enemigos: formData.getAll("enemigos[]").filter((enemigo) => enemigo != ""),
    aliados: formData.getAll("aliados[]").filter((aliado) => aliado != ""),
  };
  try {
    const response = await fetch("/api/heroes/agregar", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(superheroe),
    });
    console.log(await response.json());
    window.location.href = "/api/heroes";
  } catch (e) {
    console.error(e);
  }
});
