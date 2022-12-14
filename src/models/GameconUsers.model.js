const mongoose = require("mongoose");

const GameconUsers = mongoose.model("GameconUsers", {
    userName: {type: String, required: true},
    userEmail: {type: String, required: true, unique: true},
    userPassword: {type: String, required: true}
});

module.exports = GameconUsers;
