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

  actions.belongsTo(monsters, { as: "monster", foreignKey: "monster_id" });
  monsters.hasMany(actions, { as: "actions", foreignKey: "monster_id" });
  reactions.belongsTo(monsters, { as: "monster", foreignKey: "monster_id" });
  monsters.hasMany(reactions, { as: "reactions", foreignKey: "monster_id" });
  special_abilities_monsters.belongsTo(monsters, {
    as: "monster",
    foreignKey: "monster_id",
  });
  monsters.hasMany(special_abilities_monsters, {
    as: "special_abilities_monsters",
    foreignKey: "monster_id",
  });
  spells_list_monsters.belongsTo(monsters, {
    as: "monster",
    foreignKey: "monster_id",
  });
  monsters.hasMany(spells_list_monsters, {
    as: "spells_list_monsters",
    foreignKey: "monster_id",
  });
  monsters.belongsTo(skills, { as: "skill", foreignKey: "skill_id" });
  skills.hasMany(monsters, { as: "monsters", foreignKey: "skill_id" });
  special_abilities_monsters.belongsTo(special_abilities, {
    as: "special_ability",
    foreignKey: "special_abilities_id",
  });
  special_abilities.hasMany(special_abilities_monsters, {
    as: "special_abilities_monsters",
    foreignKey: "special_abilities_id",
  });
  monsters.belongsTo(speed, { as: "speed", foreignKey: "speed_id" });
  speed.hasMany(monsters, { as: "monsters", foreignKey: "speed_id" });
  spells_list_monsters.belongsTo(spells_list, {
    as: "spells_list",
    foreignKey: "spells_list_id",
  });
  spells_list.hasMany(spells_list_monsters, {
    as: "spells_list_monsters",
    foreignKey: "spells_list_id",
  });

  return {
    Actions: actions,
    Monsters: monsters,
    Reactions: reactions,
    Skills: skills,
    SpecialAbilities: special_abilities,
    SpecialAbilitiesMonsters: special_abilities_monsters,
    Speed: speed,
    SpellsList: spells_list,
    SpellsListMonsters: spells_list_monsters,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
