const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('spells_list_monsters', {
    monster_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'monsters',
        key: 'id'
      }
    },
    spells_list_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'spells_list',
        key: 'id'
      }
    },
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
