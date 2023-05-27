const config = {
  uri: process.env.DATABASE_URI,
  options: {
    dialect: "postgres",
    timezone: "-03:00",
    define: {
      timestamps: false,
    },
  },
};

export default config;
