import models from "./models";
import { Sequelize } from "sequelize";
import dbConfig from "../configs/database";

async function loadSequelize() {
  try {
    const conn = new Sequelize(dbConfig.uri, {
      pool: {
        max: 2,
        idle: 0,
        acquire: 3000,
        evict: 20000,
      },
      ...dbConfig.options,
      dialectModule: require("pg"),
    });

    await conn.authenticate();

    models.initModels(conn);

    return conn;
  } catch (err) {
    console.log("Error connecting to database: ", err);
    throw err;
  }
}

const functions = {
  async connect() {
    const sequelize = await loadSequelize();
    return sequelize;
  },
  async disconnect(sequelize) {
    if (sequelize) {
      await sequelize.close();
    }
  },
};

export default functions;
