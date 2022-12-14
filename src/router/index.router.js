const router = require("express").Router();
const controller = require("../controller/index.controller");

router.delete("/users/:id", controller.deleteUser);
router.post("/register/cart", controller.registerNewCart); // Pensar em eliminar
router.post("/register/game", controller.registerNewGame);
router.post("/register/user", controller.registerNewUser);
router.get("/users", controller.findUsers);
router.get("/games", controller.findGames);
router.get("/cart", controller.findCart);
router.get("/", controller.index);

module.exports = router;
