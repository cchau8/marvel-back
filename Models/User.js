const mongoose = require("mongoose");

const User = mongoose.model("User", {
	email: {
		unique: true,
		type: String,
	},
	username: {
		unique: true,
		type: String,
	},
	favoritesComics: [{ type: mongoose.Schema.Types.Mixed, default: {} }],
	favoritesCharacters: [{ type: mongoose.Schema.Types.Mixed, default: {} }],
	token: String,
	hash: String,
	salt: String,
});

module.exports = User;
