const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('spells_list_monsters', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    monster_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'monsters',
        key: 'id'
      }
    },
    spells_list_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'spells_list',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'spells_list_monsters',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "spells_list_monsters_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
