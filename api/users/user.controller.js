const Service = require("./user.service");
const { genSaltSync, hashSync } = require("bcrypt");

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
        } else if (!results) {
          res.status(200).json({ success: 1, data: results[0] });
        } else {
          res.status(404).json({ success: 0, message: "Not found." });
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
        res.status(200).json({ success: 0, message: "Not found." });
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
        res.status(200).json({ success: 0, message: "Not found." });
      } else {
        res.status(200).json({ success: 1, data: results });
      }
    });
  },
};
