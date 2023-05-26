const includes = async (state, special_abilities, transaction) => {
  const { conn, writeLog } = state;

  if (special_abilities === "") {
    return [];
  }

  writeLog(
    `Salvando special_abilities: [${special_abilities
      ?.map((special_ability) => special_ability.name)
      .join(", ")}]`
  );

  const list = await special_abilities?.map(async (special_ability) => {
    const [created] = await conn.models.special_abilities.findOrCreate({
      where: {
        name: special_ability.name,
      },
      defaults: {
        ...special_ability,
      },
      transaction,
    });

    return created;
  });

  return await Promise.all(list).then((values) => {
    return values;
  });
};

module.exports = {
  includes,
};
