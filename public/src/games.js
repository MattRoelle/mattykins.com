;(function(){ 
	let games;

	$.urlParam = function (name) {
		try {
			var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
			return results[1] || 0;
		} catch(e) {
			return null;
		}

	};

	function loadGame(id) {
		const gameToLoad = games[id];
		$("#game-host").html(``);
		$("#game-title").html(gameToLoad.title);
		$("#game-description").html(gameToLoad.description);
		$("#github-link").attr("href", gameToLoad.github);
		$("#event-link").attr("href", gameToLoad.eventLink);
		$("#event-type").html(gameToLoad.eventType);
		$("#game-released").html(gameToLoad.releaseDate);
		$("#game-instructions").html(gameToLoad.instructions);
	}

	function main() {
		$.ajax("./games.json").done(result => {
			games = result.games;
			const gameId = $.urlParam("gameId");
			if (!!gameId && !!games[gameId]) {
				loadGame(gameId);
			} else {
				$("#loading-error").show();
				$("#loading-error").html("ERROR: Couldn't find the game you were looking for. Try going back to home and clicking the link again.");
			}
		});
	}

	main();
})();
