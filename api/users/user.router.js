const Controller = require("./user.controller");
const router = require("express").Router();
const verifyToken = require("../../auth/verifyToken");
const {
  createUserValidation,
} = require("../../validation/users/user.validation");

router.post("/", createUserValidation, Controller.create);
router.get("/", Controller.getAll);
router.get("/:id", Controller.getById);
router.patch("/:id", verifyToken, Controller.updateById);
router.delete("/:id", verifyToken, Controller.deleteById);
router.post("/login", Controller.login);

module.exports = router;
