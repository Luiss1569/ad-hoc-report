const models = require("./models");

const { Sequelize } = require("sequelize");
const dbConfig = require("../configs/database");

let sequelize = null;

async function loadSequelize() {
  const sequelize = new Sequelize(dbConfig.uri, {
    pool: {
      max: 2,
      idle: 0,
      acquire: 3000,
      evict: 20000,
    },
    ...dbConfig.options,
  });

  await sequelize.authenticate();

  models.initModels(sequelize);

  return sequelize;
}

const functions = {
  async connect() {
    if (!sequelize) {
      sequelize = await loadSequelize();
    }

    return sequelize;
  },
  async disconnect() {
    if (sequelize) {
      await sequelize.close();
      sequelize = null;
    }
  },
};

export default functions;
