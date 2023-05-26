const includes = async (state, reactions, transaction) => {
  const { conn, writeLog } = state;

  if (reactions === "") {
    return [];
  }

  writeLog(
    `Salvando reactions [${reactions
      ?.map((reaction) => reaction.name)
      .join(", ")}]`
  );

  const created = await conn.models.reactions.bulkCreate(reactions, {
    transaction,
  });

  return created;
};

module.exports = {
  includes,
};
