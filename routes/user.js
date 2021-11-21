const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const User = require("../models/User");
const generateHash = (password, salt) => {
	return SHA256(password + salt).toString(encBase64);
};

router.post("/user/signup", async (req, res) => {
	if (!req.fields.username) {
		res.json({ message: "Please enter a valid username" });
	}
	try {
		const duplicate = await User.findOne({ email: req.fields.email });
		if (duplicate !== null) {
			res.json({ message: "E-mail already linked to another account" });
		} else {
			const salt = uid2(64);
			const hash = generateHash(req.fields.password, salt);
			const token = uid2(64);
			const newUser = new User({
				email: req.fields.email,
				username: req.fields.username,
				token: token,
				hash: hash,
				salt: salt,
			});

			await newUser.save();
			res.json({
				id: newUser.id,
				token: newUser.token,
				username: newUser.username,
			});
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.post("/user/login", async (req, res) => {
	// check if password is null
	if (!req.fields.password) {
		return res.status(400).json({ message: "Please enter password." });
	}
	try {
		// check if user exists
		const user = await User.findOne({ email: req.fields.email });
		if (!user) {
			res.status(400).json({
				message: "E-mail/password combination is not valid",
			});
		} else {
			// check if crypted (password + salt) === hash
			if (generateHash(req.fields.password, user.salt) === user.hash) {
				const loginRes = {
					id: user.id,
					token: user.token,
					username: user.username,
				};
				res.json(loginRes);
			} else {
				// password is incorrect
				res.status(400).json({
					message: "E-mail/password combination is not valid",
				});
			}
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.post("/favorites/:user/add", async (req, res) => {
	try {
		const user = await User.findOne({ token: req.params.user });
		if (user) {
			if (
				user.favoritesCharacters.some((el) => el._id === req.fields._id) ||
				user.favoritesComics.some((el) => el._id === req.fields._id)
			) {
				res.json({ message: "Already in your favorites" });
			} else {
				if (req.fields.name) {
					user.favoritesCharacters.push(req.fields);
				} else if (req.fields.title) {
					user.favoritesComics.push(req.fields);
				}
			}
		}
		await user.save();
		res.status(200).json({
			message: `${
				req.fields.name ? req.fields.name : req.fields.title
			} has been added to the favorites`,
		});
	} catch (error) {
		console.log(error.message);
	}
});

router.get("/favorites/:user", async (req, res) => {
	try {
		const user = await User.findOne({ token: req.params.user });
		if (user) {
			res.json({
				characters: user.favoritesCharacters,
				comics: user.favoritesComics,
			});
		}
	} catch (error) {
		res.status(400).json({
			error: error.message,
		});
	}
});
module.exports = router;
