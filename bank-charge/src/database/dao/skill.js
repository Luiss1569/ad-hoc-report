const add = async (state, skill, transaction) => {
  const { conn } = state;

  const created = await conn.models.skills.create(
    {
      ...skill,
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
