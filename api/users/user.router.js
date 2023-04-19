const Controller = require("./user.controller");
const router = require("express").Router();

router.post("/", Controller.create);
router.get("/", Controller.getAll);
router.get("/:id", Controller.getById);
router.patch("/:id", Controller.updateById);
router.delete("/:id", Controller.deleteById);

module.exports = router;
