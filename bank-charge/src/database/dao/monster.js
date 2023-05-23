const add = async (state, monster, transaction) => {
  const { conn } = state;

  const created = await conn.models.monsters.findOrCreate({
    where: {
      slug: monster.slug,
    },

    defaults: {
      name: monster.name,
      description: monster.description,
      slug: monster.slug,
    },
    transaction,
  });

  return created;
};

module.exports = {
  add,
};
