const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('special_abilities_monsters', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    special_abilities_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'special_abilities',
        key: 'id'
      }
    },
    monster_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'monsters',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'special_abilities_monsters',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "special_abilities_monsters_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
