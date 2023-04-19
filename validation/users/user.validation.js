const { user } = require("./user.schema");

module.exports = {
  createUserValidation: (req, res, next) => {
    const value = user.validate(req.body);
    if (value.error) {
      res.status(400).json({
        success: 0,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
