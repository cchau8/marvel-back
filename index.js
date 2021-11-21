// imports des packages
require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/marvel");

// création de l'app et utilisations des différents modules
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(formidable());

// import et utilisation des routes
const charactersRoutes = require("./routes/characters");
const comicsRoutes = require("./routes/comics");
const userRoutes = require("./routes/user");
app.use(charactersRoutes);
app.use(comicsRoutes);
app.use(userRoutes);

// Test route "/"
app.get("/", (req, res) => {
	res.send("Welcome to my MARVEL API");
});

// Page not found route
app.all("*", (req, res) => {
	res.send("Page not found");
});

// lancement du serveur sur le port 4000
app.listen(4000, () => {
	console.log("Server has started");
});
