const includes = async (state, legendary_actions, transaction) => {
  const { conn, writeLog } = state;

  if (legendary_actions === "") {
    return [];
  }

  writeLog(
    `Salvando reactions [${legendary_actions
      ?.map((legendary_action) => legendary_action.name)
      .join(", ")}]`
  );

  const created = await conn.models.legendary_actions.bulkCreate(
    legendary_actions,
    {
      transaction,
    }
  );

  return created;
};

module.exports = {
  includes,
};
