const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('actions', {
    name: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    damage_dice: {
      type: DataTypes.STRING,
      allowNull: true
    },
    attack_bonus: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    monster_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'monsters',
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
    tableName: 'actions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "actions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
