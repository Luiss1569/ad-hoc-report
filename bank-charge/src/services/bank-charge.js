const { getMonsters } = require("./api");
const { formatterMonster } = require("../utils/formatter");
const saveInDatabase = require("./saveDatabase");

const bankCharge = async (state) => {
  const { config, writeLog } = state;

  writeLog(`Iniciando carga de dados\n`);

  do {
    const { monsters, infos } = await getMonsters(config.page, writeLog);

    for (const _monster of monsters) {
      writeLog("Iniciando" + `[${_monster.slug}]`.yellow);

      const monsterFormatted = await formatterMonster(writeLog, _monster);
      await saveInDatabase(state, monsterFormatted);

      writeLog("Finalizando" + `[${_monster.slug}]\n`.green);
    }

    config.page.current += 1;
    config.page.continues =
      config.page.current <= config.page.end && !!infos.next;
  } while (config.page.continues);
};

module.exports = bankCharge;
