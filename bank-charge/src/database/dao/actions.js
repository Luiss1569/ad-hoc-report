const includes = async (state, actions, transaction) => {
  const { conn, writeLog } = state;

  writeLog(
    `Salvando actions: [${actions.map((action) => action.name).join(", ")}]`
  );

  const created = await conn.models.actions.bulkCreate(actions, {
    transaction,
  });

  return created;
};

module.exports = {
  includes,
};
