const add = async (state, skill, transaction) => {
  const { conn, writeLog } = state;

  writeLog(`Salvando skill`);

  const created = await conn.models.skills.create(
    {
      ...skill,
    },
    {
      transaction,
    }
  );

  return created;
};

module.exports = {
  add,
};
