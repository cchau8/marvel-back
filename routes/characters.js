const express = require("express");
const router = express.Router();
const axios = require("axios");

// ROUTES

// /characters
router.get("/characters", async (req, res) => {
	try {
		const limit = req.query.limit ? `&limit=${req.query.limit}` : "";
		const skip = req.query.skip ? `&skip=${req.query.skip}` : "";
		const name = req.query.name ? `&name=${req.query.name}` : "";
		const response = await axios.get(
			`https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}${limit}${skip}${name}`
		);
		res.json(response.data);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
