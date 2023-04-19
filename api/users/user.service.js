const pool = require("../../config/database");

module.exports = {
  create: (data, callback) => {
    pool.query("insert into user set ?", data, callback);
  },
  getAll: (callback, select = ["id", "name", "email", "gender", "phone"]) => {
    pool.query("select ?? from user", [select], callback);
  },
  getById: (
    id,
    callback,
    select = ["id", "name", "email", "gender", "phone"]
  ) => {
    pool.query("select ?? from user where id = ?", [select, id], callback);
  },
  updateById: (id, data, callback) => {
    pool.query("update user set ? where id = ?", [data, id], callback);
  },
  deleteById: (id, callback) => {
    pool.query("delete from user where id = ?", [id], callback);
  },
};
