const router = require("express").Router();
const controller = require("../controller/index.controller");

router.delete("/games/delete/:id", controller.deleteGame);
router.delete("/users/delete/:id", controller.deleteUser);
router.post("/games/register", controller.registerNewGame);
router.post("/users/register", controller.registerNewUser);
router.get("/users", controller.findUsers);
router.get("/games", controller.findGames);
router.get("/", controller.index);

module.exports = router;
