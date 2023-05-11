const fs = require("fs");
const path = require("path");
const colors = require("colors");

const LOG_PATH = path.join(__dirname, "../logs");

const createLogFile = () => {
  const filename = `${Date.now()}.log`;
  const filepath = path.join(LOG_PATH, filename);

  fs.writeFileSync(filepath, "");

  return (data) => writeLog(filepath, data);
};

const writeLog = (filepath, data = "") => {
  const date = new Date().toISOString();

  if (data?.includes("Erro")) {
    console.error(data.red);
  } else {
    console.info(`[LOG] ${data}`.blue);
  }

  data = `[${date}] ${data}\n`;

  try {
    fs.appendFileSync(filepath, data);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = createLogFile;
