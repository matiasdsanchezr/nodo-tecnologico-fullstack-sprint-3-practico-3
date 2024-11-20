const superheroeIdInput = document.querySelector("#superheroeIdInput");

const mostrarModal = async (superheroeId) => {
  const modalContainer = document.querySelector("#modalContainer");
  modalContainer.classList.remove("hidden");
  modalContainer.classList.add("flex");
  focus(modalContainer);
  superheroeIdInput.value = superheroeId;
};

const ocultarModal = () => {
  const modalContainer = document.querySelector("#modalContainer");
  modalContainer.classList.remove("flex");
  modalContainer.classList.add("hidden");
};

const onSubmitDeleteForm = async (e) => {
  e.preventDefault();
  const superheroeId = superheroeIdInput.value;

  try {
    const response = await fetch(`/api/heroes/${superheroeId}`, {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
    });
    if (response.status === 204) {
      console.log("Superhéroe eliminado");
      location.reload();
    }
  } catch (e) {
    console.error(e);
  }
};

document
  .querySelector("#eliminarSuperheroeForm")
  .addEventListener("submit", onSubmitDeleteForm);

document.querySelector("#eliminarSuperheroeForm").addEventListener("reset", async (e) => {
  e.preventDefault();
  ocultarModal();
});

document.querySelector("#modalContainer").addEventListener("click", async (e) => {
  if (e.target == e.currentTarget) {
    ocultarModal();
  }
});
