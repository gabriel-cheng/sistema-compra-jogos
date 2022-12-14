const mongoose = require("mongoose");

const GameconCart = mongoose.model("GameconCart", {
    gameName: {type: String, required: true},
    gamePlatform: {type: String, required: true},
    gameQuantity: {type: Number, required: false, min: 1},
    gameValue: {type: mongoose.Types.Decimal128, required: true}
});

module.exports = GameconCart;
