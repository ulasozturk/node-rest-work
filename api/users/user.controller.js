const Service = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  create: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    Service.create(body, (error, results) => {
      if (error) {
        return res.status(400).json({
          success: 0,
          message: error.sqlMessage,
        });
      }
      return res.status(201).json({ success: 1, data: results });
    });
  },
  getAll: (req, res) => {
    Service.getAll((error, results) => {
      if (error) {
        return res.status(400).json({
          success: 0,
          message: error.sqlMessage,
        });
      }
      return res.status(200).json({ success: 1, data: results });
    }, req.query.select && req.query.select.split(","));
  },
  getById: (req, res) => {
    Service.getById(
      req.params.id,
      (error, results) => {
        if (error) {
          res.status(400).json({ success: 0, message: error.sqlMessage });
        } else if (!results[0]) {
          res.status(404).json({ success: 0, message: "Not found." });
        } else {
          res.status(200).json({ success: 1, data: results[0] });
        }
      },
      req.query.select && req.query.select.split(",")
    );
  },
  updateById: (req, res) => {
    Service.updateById(req.params.id, req.body, (error, results) => {
      if (error) {
        res.status(400).json({ success: 0, message: error.sqlMessage });
      } else if (!results.affectedRows) {
        res.status(404).json({ success: 0, message: "Not found." });
      } else {
        res.status(200).json({ success: 1, data: results });
      }
    });
  },
  deleteById: (req, res) => {
    Service.deleteById(req.params.id, (error, results) => {
      if (error) {
        res.status(400).json({ success: 0, message: error.sqlMessage });
      } else if (!results.affectedRows) {
        res.status(404).json({ success: 0, message: "Not found." });
      } else {
        res.status(200).json({ success: 1, data: results });
      }
    });
  },
  login: (req, res) => {
    Service.getByEmail(req.body.email, (error, results) => {
      if (error) {
        res.status(400).json({ success: 0, message: error.sqlMessage });
      } else if (!results[0]) {
        res
          .status(404)
          .json({ success: 0, message: "Invalid email or password." });
      } else {
        const user = results[0];
        const isEqual = compareSync(req.body.password, user.password);
        if (isEqual) {
          const jwt = sign(
            { email: user.email, name: user.name },
            process.env.TOKEN_SECRET,
            {
              expiresIn: "2h",
            }
          );
          res
            .status(200)
            .json({ success: 1, message: "Login succesful", token: jwt });
        } else {
          res
            .status(404)
            .json({ success: 0, message: "Invalid email or password." });
        }
      }
    });
  },
  photoUpload: (req, res) => {
    const photo = `${process.env.APP_HOST}:${process.env.APP_PORT}/images/profile/${req.file.filename}`;
    Service.updateById(req.body.id, { photo }, (error, results) => {
      if (error) {
        res.status(400).json({ success: 0, message: error.sqlMessage });
      } else if (!results.affectedRows) {
        res.status(404).json({ success: 0, message: "Not found." });
      } else {
        res.status(200).json({
          success: 1,
          photo,
        });
      }
    });
  },
};
