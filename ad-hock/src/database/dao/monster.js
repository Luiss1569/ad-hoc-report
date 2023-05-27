const add = async (state, monster, transaction) => {
  const { conn, writeLog } = state;

  writeLog(`Salvando monster: [${monster.slug}]`);

  const [created] = await conn.models.monsters.findOrCreate({
    where: {
      slug: monster.slug,
    },
    defaults: {
      ...monster,
    },
    transaction,
  });

  return created;
};

module.exports = {
  add,
};
