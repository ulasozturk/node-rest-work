require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const userRouter = require("./api/users/user.router");
const rfs = require("rotating-file-stream");
const path = require("path");
const multer = require("multer");

app.use(express.json());
app.use(
  morgan("dev", {
    skip: (req, res) => res.statusCode < 400,
  })
);
const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: path.join(__dirname, "log"),
});
app.use(
  morgan("common", {
    stream: accessLogStream,
  })
);

app.use("/images", express.static("upload/images"));
app.use("/api/users", userRouter);

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      success: 0,
      message: error.message ? error.message : error.code,
    });
  }
  next();
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Server up and running on PORT: ${process.env.APP_PORT}`);
});
