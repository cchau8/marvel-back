const express = require("express");
const router = express.Router();
const axios = require("axios");

// ROUTES

// /comics
router.get("/comics", async (req, res) => {
	try {
		const limit = req.query.limit ? `&limit=${req.query.limit}` : "";
		const skip = req.query.skip ? `&skip=${req.query.skip}` : "";
		const title = req.query.title ? `&title=${req.query.title}` : "";
		const response = await axios.get(
			`https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}${limit}${skip}${title}`
		);

		res.json(response.data);
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
});

// /comics/:charcterId
router.get("/comics/:characterId", async (req, res) => {
	try {
		const response = await axios.get(
			`https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.MARVEL_API_KEY}`
		);
		res.json(response.data);
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
});

module.exports = router;
