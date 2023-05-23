const models = require("./models");

const Monster = require("./dao/monster");

const { Sequelize } = require("sequelize");
const dbConfig = require("../config/database");

const conn = new Sequelize(...dbConfig);

models.initModels(conn);

module.exports = {
  conn,
  Monster,
};
