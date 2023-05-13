const { saveMonster } = require("../controller/monster");
const { getMonsters } = require("../services/api");

const bankCharge = async (state) => {
  const { config, writeLog } = state;

  writeLog(`Iniciando carga de dados\n`);

  do {
    const { monsters, infos } = await getMonsters(config.page, writeLog);

    for (const _monster of monsters) {
      writeLog("Iniciando" + `[${_monster.slug}]`.yellow);

      const monster = formatterMonster(writeLog, _monster);
      await saveMonster(state, monster);

      writeLog("Finalizando" + `[${_monster.slug}]\n`.green);
    }

    config.page.current += 1;
    config.page.continues =
      config.page.current <= config.page.end && !!infos.next;
  } while (config.page.continues);
};

const formatterMonster = (writeLog, monster) => {
  writeLog("\tFormatando monstro");

  return monster;
};

module.exports = bankCharge;
