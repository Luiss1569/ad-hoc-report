const includes = async (state, spells_list, transaction) => {
  const { conn, writeLog } = state;

  if (spells_list === "") {
    return [];
  }

  writeLog(
    `Salvando spells_list: [${spells_list
      ?.map((spell) => spell.name)
      .join(", ")}]`
  );

  const list = await spells_list.map(async (spell) => {
    const [created] = await conn.models.spells_list.findOrCreate({
      where: {
        slug: spell.slug,
      },
      defaults: {
        ...spell,
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
