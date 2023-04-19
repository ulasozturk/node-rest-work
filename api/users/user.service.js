const pool = require("../../config/database");

module.exports = {
  create: (data, callback) => {
    pool.query(
      `insert into user(name, gender, email, password, phone)
                    values(?,?,?,?,?)`,
      [data.name, data.gender, data.email, data.password, data.phone],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
