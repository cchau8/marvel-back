// imports des packages
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// création de l'app et utilisations des différents modules
const app = express();
app.use(cors());
app.use(morgan("dev"));

// import et utilisation des routes
const charactersRoutes = require("./routes/characters");
const comicsRoutes = require("./routes/comics");
app.use(charactersRoutes);
app.use(comicsRoutes);

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
