const Controller = require("./user.controller");
const router = require("express").Router();
const verifyToken = require("../../auth/verifyToken");
const {
  createUserValidation,
} = require("../../validation/users/user.validation");
const multer = require("multer");
const path = require("path");

const multerStorage = multer.diskStorage({
  destination: "./upload/images/profile",
  filename: (req, file, cb) => {
    return cb(
      null,
      `profilePhoto_user_${req.body.id}${path.extname(file.originalname)}`
    );
  },
});

const uploadImage = multer({
  storage: multerStorage,
  limits: { fileSize: 1024 * 1024 * 10 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      return cb(new multer.MulterError("Invalid mime type"));
    }
  },
});

router.post("/", createUserValidation, Controller.create);
router.get("/", Controller.getAll);
router.get("/:id", Controller.getById);
router.patch("/:id", verifyToken, Controller.updateById);
router.delete("/:id", verifyToken, Controller.deleteById);
router.post("/login", Controller.login);
router.post(
  "/photoUpload",
  uploadImage.single("photo"),
  verifyToken,
  Controller.photoUpload
);

module.exports = router;
