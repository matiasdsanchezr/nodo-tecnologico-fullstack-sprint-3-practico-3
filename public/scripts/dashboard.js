const eliminarSuperheroe = async (e) => {
  const superheroeId = e.getAttribute("superheroeId");
  const nombreSuperHeroe = e.getAttribute("nombreSuperHeroe");

  if (!confirm(`Se eliminará el heroe: ${nombreSuperHeroe}`)) return;
  console.log(superheroeId);
  try {
    console.log(superheroeId);
    const response = await fetch(`/api/heroes/${superheroeId}`, {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
    });
    if (response.status === 204) {
      console.log("Superhéroe eliminado");
    }
    location.reload();
  } catch (e) {
    console.error(e);
  }
};
