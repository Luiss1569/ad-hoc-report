require("dotenv").config();
const createLogFile = require("./services/logs");
const pg = require("./database");
const { getInputsInitial } = require("./utils/prompt");
const bankCharge = require("./utils/bank-charge");

function main() {
  console.log(" > Bem vindo ao sistema de carga de dados");

  const writeLog = createLogFile();
  const state = {};

  try {
    state.config = getInputsInitial();
    state.conn = pg.connect();
    state.writeLog = writeLog;

    writeLog(
      `Iniciando aplicação com os parametros: ${JSON.stringify(
        state.config,
        0,
        2
      )}`
    );

    bankCharge(state);
  } catch (error) {
    writeLog(`[Erro] ${error.message}`);
  } finally {
    writeLog("Finalizando aplicação");
    state.conn.close();
  }
}

main();
