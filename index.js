require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const logger = require("./config/logger");

app.use(express.json());

app.use("/api/users", userRouter);

app.listen(process.env.APP_PORT, () => {
  logger.info(`Server up and running on PORT: ${process.env.APP_PORT}`);
});
