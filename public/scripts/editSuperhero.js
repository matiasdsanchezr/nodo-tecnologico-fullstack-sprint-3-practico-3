function agregarPoder() {
  const poderesContainer = document.getElementById("poderesContainer");
  const nuevoInput = document.createElement("input");
  nuevoInput.type = "text";
  nuevoInput.name = "poderes[]";
  nuevoInput.placeholder = "Ingrese un poder";
  nuevoInput.className = "p-1 rounded-md";
  poderesContainer.appendChild(nuevoInput);
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

const superheroeId = document.querySelector("#superheroeId").textContent;

const filtrarCamposVacios = (object) => {
  return Object.fromEntries(
    Object.entries(object).filter(([key, value]) => {
      return value && (Array.isArray(value) ? value.length > 0 : true);
    })
  );
};

document.querySelector("#editarSuperheroeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const superheroeData = {
    nombreSuperHeroe: formData.get("nombreSuperHeroe"),
    nombreReal: formData.get("nombreReal"),
    edad: formData.get("edad"),
    planetaOrigen: formData.get("planetaOrigen"),
    debilidad: formData.get("debilidad"),
    creador: formData.get("creador"),
  };

  const poderes = formData.getAll("poderes[]").filter((poder) => poder != "");
  if (poderes.length > 0) superheroeData.poderes = poderes;

  const enemigos = formData.getAll("enemigos[]").filter((enemigo) => enemigo !== "");
  if (enemigos.length > 0) superheroeData.enemigos = enemigos;

  const aliados = formData.getAll("aliados[]").filter((aliado) => aliado !== "");
  if (aliados.length > 0) superheroeData.aliados = aliados;

  try {
    const response = await fetch(`/api/heroes/${superheroeId}/editar`, {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify(superheroeData),
    });
    if ((response.status) === 200) {
      alert("Superhéroe actualizado");
      location.reload();
    } else {
      alert("Ocurrio un error al actualizar el superhéroe");
      console.error(await response.json());
    }
  } catch (e) {
    console.error(e);
  }
});
