const add = async (state, monster, transaction) => {
  const { conn } = state;

  const { legendary_actions, ...rest } = monster;

  const [created] = await conn.models.monsters.findOrCreate({
    where: {
      slug: monster.slug,
    },
    defaults: {
      ...rest,
    },
    transaction,
  });

  return created;
};

module.exports = {
  add,
};
