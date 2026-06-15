const formulario = document.getElementById("formulario");
const listaComentarios = document.getElementById("listaComentarios");
const botonTema = document.getElementById("toggleTema");

// ====== MODO CLARO / OSCURO ======

const temaGuardado = localStorage.getItem("tema");

if (temaGuardado === "claro") {
  document.body.classList.add("tema-claro");
  botonTema.innerHTML = "☀️ Modo claro";
} else {
  botonTema.innerHTML = "🌙 Modo oscuro";
}

botonTema.addEventListener("click", () => {
  document.body.classList.toggle("tema-claro");

  const esTemaClaro = document.body.classList.contains("tema-claro");

  botonTema.innerHTML = esTemaClaro
    ? "☀️ Modo claro"
    : "🌙 Modo oscuro";

  localStorage.setItem(
    "tema",
    esTemaClaro ? "claro" : "oscuro"
  );
});

// ====== CARGAR COMENTARIOS ======

async function cargarComentarios() {
  try {
    const respuesta = await fetch("/comentarios");
    const comentarios = await respuesta.json();

    listaComentarios.innerHTML = "";

    comentarios.forEach((item) => {
      listaComentarios.innerHTML += `
        <div class="comentario">
          <strong>${item.nombre}</strong>
          <small class="d-block mb-2">${item.fecha}</small>
          <p class="mb-0">${item.comentario}</p>
        </div>
      `;
    });
  } catch (error) {
    console.error("Error al cargar comentarios:", error);
  }
}

// ====== ENVIAR COMENTARIOS ======

formulario.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const comentario = document.getElementById("comentario").value.trim();

  if (!nombre || !comentario) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  try {
    const respuesta = await fetch("/comentarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        comentario,
      }),
    });

    if (!respuesta.ok) {
      throw new Error("No se pudo guardar el comentario.");
    }

    formulario.reset();
    cargarComentarios();

  } catch (error) {
    console.error("Error:", error);
    alert("Ocurrió un error al enviar el comentario.");
  }
});

// ====== INICIAR LA APLICACIÓN ======

cargarComentarios();