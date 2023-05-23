const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('skills', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    athletics: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    perception: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    stealth: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    intimidation: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    history: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    deception: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    performance: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    persuasion: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    medicine: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    religion: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    insight: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    arcana: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    acrobatics: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    survival: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    investigation: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    nature: {
      type: DataTypes.SMALLINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'skills',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "skills_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
