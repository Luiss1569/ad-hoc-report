const saveMonster = async (state, monster) => {
  const { conn, writeLog } = state;
  writeLog("\tInciando Transacao no banco de dados");
  const transaction = await conn.transaction();

  try {
    writeLog("\tCriando models do monstro");

    

    await transaction.commit();
    writeLog("\tSalvo no banco de dados".green);
  } catch (error) {
    writeLog(`\t[Erro] ${error.message}`.red);
    writeLog(`\t[Erro] : SQL: ${JSON.stringify(error.sql, 0, 2)}`.red);
    writeLog(`\t[Erro] : Params: ${JSON.stringify(error.parameters, 0, 2)}`.red);
    await transaction.rollback();

    throw new Error(
      `[Erro] Salvar o monstro ${monster.slug} no banco de dados`
    );
  }
};

module.exports = {
  saveMonster,
};
