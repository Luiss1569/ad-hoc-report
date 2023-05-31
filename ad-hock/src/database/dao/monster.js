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

const getFull = async (conn, where, columns, order, options = {}) => {
  const result = await conn.models.monsters.findAndCountAll({
    attributes: columns?.monsters || [],
    where,
    include: [
      {
        model: conn.models.actions,
        attributes: columns?.actions || [],
        as: "actions",
      },
      {
        model: conn.models.reactions,
        attributes: columns?.reactions || [],
        as: "reactions",
      },
      {
        model: conn.models.skills,
        attributes: columns?.skills || [],
        as: "skill",
      },
      {
        model: conn.models.speed,
        attributes: columns?.speed || [],
        as: "speed",
      },
      {
        model: conn.models.legendary_actions,
        attributes: columns?.legendary_actions || [],
        as: "legendary_actions",
      },
      {
        model: conn.models.special_abilities,
        attributes: columns?.special_abilities || [],
        as: "special_abilities",
      },
      {
        model: conn.models.spells_list,
        attributes: columns?.spells_list || [],
        as: "spells_lists",
      },
    ],
    subQuery: false,
    order,
    ...options,
  });

  return result;
};

module.exports = {
  add,
  getFull,
};
