const { Sequelize } = require("sequelize");

const connect = () => {
  const sequelize = new Sequelize(process.env.DATABASE_URI, {
    dialect: "postgres",
    timezone: "-03:00",
  });

  return sequelize;
};

module.exports = {
  connect,
};
