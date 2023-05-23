const Monster = require("../database/dao/monster");

const saveInDatabase = async (state, _monster) => {
  const { conn, writeLog } = state;

  writeLog("\tIniciando transação");

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
    writeLog(`Erro: ${error.message}`.red);
    writeLog(`Erro: ${JSON.stringify(error, 0, 2)}`.red);
    throw new Error(writeLog(`Erro ao salvar monstro ${_monster.slug}`.orange));
  }
};

module.exports = saveInDatabase;
