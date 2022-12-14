const mongoose = require("mongoose");

const GameconGames = mongoose.model("GameconGames", {
    gameName: {type: String, unique: true},
    gameDeveloper: {type: String, required: true},
    gameDescription: {type: String, required: true},
    gamePlatform: {type: [], required: true},
    gameGenre: {type: String, required: true},
    gameValue: {type: mongoose.Types.Decimal128, required: true}
});

module.exports = GameconGames;
