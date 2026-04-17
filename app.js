const express = require("express");
const cors = require("cors");
const path = require("path"); 

const app = express();
app.use(cors());
app.use(express.json());

// Servir imágenes (CORREGIDO)
app.use("/images", express.static(path.join(__dirname, "images")));

/* DATOS DE PRUEBA */

let movies = [
  {
    id: 1,
    title: "Mario",
    duration: "190 min",
    classification: "B",
    genre: "Ciencia Ficción",
    image: "https://apirest-y0s6.onrender.com/images/mario.jpg",
    showtimes: ["14:00", "18:00", "21:30"]
  },
  {
    id: 2,
    title: "Predator",
    duration: "175 min",
    classification: "B15",
    genre: "Acción",
    image: "https://apirest-y0s6.onrender.com/images/predator.jpg",
    showtimes: ["13:00", "16:30", "20:00"]
  },
  {
    id: 3,
    title: "Avispon",
    duration: "92 min",
    classification: "A",
    genre: "Acción",
    image: "https://apirest-y0s6.onrender.com/images/avispon.jpg",
    showtimes: ["11:00", "13:00", "15:00"]
  },
  {
    id: 4,
    title: "Rango",
    duration: "180 min",
    classification: "B",
    genre: "Comedia",
    image: "https://apirest-y0s6.onrender.com/images/rango.jpg",
    showtimes: ["15:00", "19:00"]
  },
  {
    id: 5,
    title: "Warfare",
    duration: "114 min",
    classification: "C",
    genre: "Drama",
    image: "https://apirest-y0s6.onrender.com/images/warfare.jpg",
    showtimes: ["12:00", "14:30", "17:00"]
  }
];

// Butacas
let seats = Array(5).fill(null).map(() => Array(5).fill(0));

/*  RUTAS */

app.get("/", (req, res) => {
  res.send("API de Cine funcionando 🎬");
});

app.get("/movies", (req, res) => {
  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  const movie = movies.find(m => m.id == req.params.id);

  if (!movie) {
    return res.status(404).json({ message: "Película no encontrada" });
  }

  res.json(movie);
});

app.get("/seats", (req, res) => {
  res.json(seats);
});

app.post("/seats/reserve", (req, res) => {
  const { row, col } = req.body;

  if (seats[row][col] === 1) {
    return res.status(400).json({ message: "Butaca ocupada" });
  }

  seats[row][col] = 1;
  res.json({ message: "Butaca reservada", seats });
});

app.post("/movies", (req, res) => {
  const newMovie = {
    id: movies.length + 1,
    ...req.body
  };

  movies.push(newMovie);
  res.json(newMovie);
});

/* SERVIDOR  */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});