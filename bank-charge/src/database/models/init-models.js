var DataTypes = require("sequelize").DataTypes;
var _actions = require("./actions");
var _monsters = require("./monsters");
var _reactions = require("./reactions");
var _skills = require("./skills");
var _special_abilities = require("./special_abilities");
var _special_abilities_monsters = require("./special_abilities_monsters");
var _speed = require("./speed");
var _spells_list = require("./spells_list");
var _spells_list_monsters = require("./spells_list_monsters");

function initModels(sequelize) {
  var actions = _actions(sequelize, DataTypes);
  var monsters = _monsters(sequelize, DataTypes);
  var reactions = _reactions(sequelize, DataTypes);
  var skills = _skills(sequelize, DataTypes);
  var special_abilities = _special_abilities(sequelize, DataTypes);
  var special_abilities_monsters = _special_abilities_monsters(sequelize, DataTypes);
  var speed = _speed(sequelize, DataTypes);
  var spells_list = _spells_list(sequelize, DataTypes);
  var spells_list_monsters = _spells_list_monsters(sequelize, DataTypes);

  actions.belongsTo(monsters, { as: "monster", foreignKey: "monster_id"});
  monsters.hasMany(actions, { as: "actions", foreignKey: "monster_id"});
  reactions.belongsTo(monsters, { as: "monster", foreignKey: "monster_id"});
  monsters.hasMany(reactions, { as: "reactions", foreignKey: "monster_id"});
  special_abilities_monsters.belongsTo(monsters, { as: "monster", foreignKey: "monster_id"});
  monsters.hasMany(special_abilities_monsters, { as: "special_abilities_monsters", foreignKey: "monster_id"});
  spells_list_monsters.belongsTo(monsters, { as: "monster", foreignKey: "monster_id"});
  monsters.hasMany(spells_list_monsters, { as: "spells_list_monsters", foreignKey: "monster_id"});
  monsters.belongsTo(skills, { as: "skill", foreignKey: "skill_id"});
  skills.hasMany(monsters, { as: "monsters", foreignKey: "skill_id"});
  special_abilities_monsters.belongsTo(special_abilities, { as: "special_ability", foreignKey: "special_abilities_id"});
  special_abilities.hasMany(special_abilities_monsters, { as: "special_abilities_monsters", foreignKey: "special_abilities_id"});
  monsters.belongsTo(speed, { as: "speed", foreignKey: "speed_id"});
  speed.hasMany(monsters, { as: "monsters", foreignKey: "speed_id"});
  spells_list_monsters.belongsTo(spells_list, { as: "spells_list", foreignKey: "spells_list_id"});
  spells_list.hasMany(spells_list_monsters, { as: "spells_list_monsters", foreignKey: "spells_list_id"});

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
