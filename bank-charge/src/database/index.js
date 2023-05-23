const models = require("./models");

const { Sequelize } = require("sequelize");
const dbConfig = require("../config/database");

const conn = new Sequelize(...dbConfig);

models.initModels(conn);

module.exports = {
  conn,
};
