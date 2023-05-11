const { saveMonster } = require("../database/dao/monsters");
const { getMonsters } = require("../services/api");

const bankCharge = async (state) => {
  const { config, writeLog } = state;

  writeLog(`Iniciando carga de dados com os parametros`);

  do {
    const { monsters, infos } = await getMonsters(config.page, writeLog);

    for (const monster of monsters) {
      await saveMonster(state, monster);
    }

    config.page.current += 1;
    config.page.continues =
      config.page.current <= config.page.end && !!infos.next;
  } while (config.page.continues);
};

module.exports = bankCharge;
