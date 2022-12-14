const GameconUsers = require("../models/GameconUsers.model");
const GameconGames = require("../models/GameconGames.model");
const GameconCart = require("../models/GameconCart.model");

module.exports = {
    findAll: async(req, res) => {
        const allUsersFinded = await GameconUsers.find();
        const allGamesFinded = await GameconGames.find();
        const allCartFinded = await GameconCart.find();

        res.json({allUsersFinded, allGamesFinded, allCartFinded});
    }
};
