const add = async (state, speed, transaction) => {
  const { conn, writeLog } = state;

  writeLog(`Salvando speed`);

  const created = await conn.models.speed.create(
    {
      ...speed,
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
