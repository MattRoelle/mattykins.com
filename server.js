const express = require("express");
const path = require("path");
const exphb = require("express-handlebars");
const fs = require("fs");

const content = JSON.parse(fs.readFileSync("./content.json"));
const currentGame = content.games.filter(g => g.id == content.currentGame)[0];
const recentGames = content.games.filter((g, i) => g.id != content.currentGame && i < 3);

const app = express();

const hbs = exphb.create({
	defaultLayout: "main",
	helpers: {
		if_eq: (a, b, opts) => {
			if (a == b) return opts.fn(this);
			else return opts.inverse(this);
		}
	}
})

app.engine("handlebars", hbs.engine);

app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public"), {
	dotfiles: "ignore",
	index: false
}));

app.get("/", (req, res) => {
	res.render("home", {
		content: content,
		currentGame: currentGame,
		activeRoute: "home",
		layout: "main",
		recentGames: recentGames
	});
});

app.get("/game/:gameId", (req, res) => {
	const gameToLoad = content.games.filter(g => g.id == req.params.gameId)[0];
	console.log(gameToLoad);
	res.render("game", {
		content: content,
		currentGame: currentGame,
		activeRoute: "games",
		gameToLoad: gameToLoad,
		layout: "main",
	});
});

app.get("/games", (req, res) => {
	res.render("games", {
		content: content,
		currentGame: currentGame,
		activeRoute: "games",
		layout: "main",
	});
});

app.get("/contact", (req, res) => {
	res.render("contact", {
		content: content,
		currentGame: currentGame,
		activeRoute: "contact",
		layout: "main",
	});
});

const port = 3000;
app.listen(port, () => console.log(`Application running on port ${port}`));
