const add = async (state, monster, transaction) => {
  const { conn } = state;
  
  const created = await conn.models.monsters.create(
    {
      name: monster.name,
      slug: monster.slug,
    },
    { transaction }
  );

  return created;
};

module.exports = {
  add,
};
