const mongoose = require("mongoose");

const GameconUsers = mongoose.model("GameconUsers", {
    userLevel: {type: Number, required: true, min: 1, max: 2},
    userName: {type: String, required: true},
    userEmail: {type: String, required: true, unique: true},
    userPassword: {type: String, required: true}
});

module.exports = GameconUsers;
