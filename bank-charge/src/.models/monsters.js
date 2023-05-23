const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('monsters', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    size: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    subtype: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    groupp: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    strength: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dexterity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    constitution: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    intelligence: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    wisdom: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    charisma: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    strength_save: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dexterity_save: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    constitution_save: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    intelligence_save: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    wisdom_save: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    charisma_save: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    perception: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    skill_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'skills',
        key: 'id'
      }
    },
    speed_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'speed',
        key: 'id'
      }
    },
    damage_vulnerabilities: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    damage_resistances: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    damage_immunities: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    condition_immunities: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    senses: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    languages: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    challenge_rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    legendary_desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    legendary_actions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    page_no: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    img_main: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: "monsters_slug_key"
    }
  }, {
    sequelize,
    tableName: 'monsters',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "monsters_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "monsters_slug_key",
        unique: true,
        fields: [
          { name: "slug" },
        ]
      },
    ]
  });
};
