const add = async (state, speed, transaction) => {
  const { conn } = state;

  const created = await conn.models.speed.create(
    {
      ...speed,
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
