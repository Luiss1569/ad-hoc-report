const Monster = require("../database/dao/monster");
const { getMonsters } = require("../services/api");

const bankCharge = async (state) => {
  const { config, writeLog, conn } = state;

  writeLog(`Iniciando carga de dados\n`);

  do {
    const { monsters, infos } = await getMonsters(config.page, writeLog);

    for (const _monster of monsters) {
      writeLog("Iniciando" + `[${_monster.slug}]`.yellow);

      const monsterFormatted = formatterMonster(writeLog, _monster);
      await saveInDatabase(state, monsterFormatted);

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

const saveInDatabase = async (state, _monster) => {
  const { conn, writeLog } = state;

  writeLog("\tSalvando dados");

  const transaction = await conn.transaction();

  try {
    const monster = await Monster.add(state, _monster, transaction);

    monster.save();

    await transaction.commit();

    writeLog(
      `Todos os dados do monstro ${_monster.slug} salvo com sucesso`.green
    );
  } catch (error) {
    await transaction.rollback();
    writeLog(`Erro ao salvar monstro ${_monster.slug}`.orange);
    writeLog(`Erro: ${error.message}`.red);
    writeLog(`Erro: ${JSON.stringify(error, 0, 2)}`.red);
  }
};

module.exports = bankCharge;
