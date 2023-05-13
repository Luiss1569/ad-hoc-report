module.exports = [
  process.env.DATABASE_URI,
  {
    dialect: "postgres",
    timezone: "-03:00",
    define: {
      timestamps: false,
    },
  },
];
