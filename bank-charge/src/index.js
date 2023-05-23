require("dotenv").config();
const createLogFile = require("./services/logs");
const { getInputsInitial } = require("./utils/prompt");
const bankCharge = require("./utils/bank-charge");
const { conn } = require("./database");

async function main() {
  console.log(" > Bem vindo ao sistema de carga de dados");

  const writeLog = createLogFile();
  const state = {};

  try {
    state.config = getInputsInitial();
    state.writeLog = writeLog;
    state.conn = conn;

    await conn.authenticate();

    writeLog(
      `Iniciando aplicação com os parametros: ${JSON.stringify(
        state.config,
        0,
        2
      )}`
    );

    await bankCharge(state);
  } catch (error) {
    writeLog(`[Erro] ${error.message}`);
    writeLog(`[Erro] ${error.stack}`);
  } finally {
    writeLog("Finalizando aplicação");
    state.conn.close();
  }
}

(async () => {
  await main();
})();
