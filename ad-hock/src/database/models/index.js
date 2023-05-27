const DataTypes = require("sequelize").DataTypes;
const _actions = require("./actions");
const _monsters = require("./monsters");
const _reactions = require("./reactions");
const _skills = require("./skills");
const _special_abilities = require("./special_abilities");
const _special_abilities_monsters = require("./special_abilities_monsters");
const _speed = require("./speed");
const _spells_list = require("./spells_list");
const _spells_list_monsters = require("./spells_list_monsters");
const _legendary_actions = require("./legendary_actions");

function initModels(sequelize) {
  const actions = _actions(sequelize, DataTypes);
  const monsters = _monsters(sequelize, DataTypes);
  const reactions = _reactions(sequelize, DataTypes);
  const skills = _skills(sequelize, DataTypes);
  const special_abilities = _special_abilities(sequelize, DataTypes);
  const special_abilities_monsters = _special_abilities_monsters(
    sequelize,
    DataTypes
  );
  const speed = _speed(sequelize, DataTypes);
  const spells_list = _spells_list(sequelize, DataTypes);
  const spells_list_monsters = _spells_list_monsters(sequelize, DataTypes);
  const legendary_actions = _legendary_actions(sequelize, DataTypes);

  actions.belongsTo(monsters, { as: "monster", foreignKey: "monster_id" });
  monsters.hasMany(actions, { as: "actions", foreignKey: "monster_id" });
  reactions.belongsTo(monsters, { as: "monster", foreignKey: "monster_id" });
  monsters.hasMany(reactions, { as: "reactions", foreignKey: "monster_id" });
  monsters.belongsTo(skills, { as: "skill", foreignKey: "skill_id" });
  skills.hasOne(monsters, { as: "monsters", foreignKey: "skill_id" });
  monsters.belongsTo(speed, { as: "speed", foreignKey: "speed_id" });
  speed.hasOne(monsters, { as: "monsters", foreignKey: "speed_id" });
  legendary_actions.belongsTo(monsters, {
    as: "monster",
    foreignKey: "monster_id",
  });
  monsters.hasMany(legendary_actions, {
    as: "legendary_actions",
    foreignKey: "monster_id",
  });
  monsters.belongsToMany(special_abilities, {
    as: "special_abilities",
    through: special_abilities_monsters,
    foreignKey: "monster_id",
    otherKey: "special_abilities_id",
  });
  special_abilities.belongsToMany(monsters, {
    as: "monsters",
    through: special_abilities_monsters,
    foreignKey: "special_abilities_id",
    otherKey: "monster_id",
  });
  monsters.belongsToMany(spells_list, {
    as: "spells_lists",
    through: spells_list_monsters,
    foreignKey: "monster_id",
    otherKey: "spells_list_id",
  });
  spells_list.belongsToMany(monsters, {
    as: "monsters",
    through: spells_list_monsters,
    foreignKey: "spells_list_id",
    otherKey: "monster_id",
  });

  return {
    actions,
    monsters,
    reactions,
    skills,
    special_abilities,
    special_abilities_monsters,
    speed,
    spells_list,
    spells_list_monsters,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
