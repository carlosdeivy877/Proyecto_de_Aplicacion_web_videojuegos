const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

const comentarios = [];

app.get("/comentarios", (req, res) => {
  res.json(comentarios);
});

app.post("/comentarios", (req, res) => {
  const { nombre, comentario } = req.body;

  if (!nombre || !comentario) {
    return res.status(400).json({
      mensaje: "Todos los campos son obligatorios"
    });
  }

  comentarios.push({
    nombre,
    comentario,
    fecha: new Date().toLocaleString("es-CO")
  });

  res.status(201).json({
    mensaje: "Comentario guardado correctamente"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});